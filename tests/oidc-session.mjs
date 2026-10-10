// Integration regression: run after npm run build. Uses only local fictional identities.
import http from 'node:http';
import {fileURLToPath} from 'node:url';
import {spawn} from 'node:child_process';
import {randomBytes,generateKeyPairSync,sign,createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const cwd=fileURLToPath(new URL('..',import.meta.url)),base='http://localhost:3028';
const {privateKey,publicKey}=generateKeyPairSync('rsa',{modulusLength:2048});
const jwk={...publicKey.export({format:'jwk'}),kid:'qa-key',alg:'RS256',use:'sig'};
const encode=x=>Buffer.from(JSON.stringify(x)).toString('base64url');
let issuer,tier='VIP',wrongSubject=false,available=true,userinfoGate=null;const grants=new Map();
function jwt(body){const data=encode({alg:'RS256',kid:'qa-key'})+'.'+encode(body);return data+'.'+sign('RSA-SHA256',Buffer.from(data),privateKey).toString('base64url');}
const provider=http.createServer(async(req,res)=>{
 const url=new URL(req.url,issuer);res.setHeader('Content-Type','application/json');
 if(url.pathname==='/authorize'){
  const code=randomBytes(12).toString('hex');grants.set(code,Object.fromEntries(url.searchParams));
  const target=new URL(url.searchParams.get('redirect_uri'));target.searchParams.set('code',code);target.searchParams.set('state',url.searchParams.get('state'));
  res.writeHead(302,{Location:target.href});res.end();return;
 }
 if(url.pathname==='/token'){
  let raw='';for await(const chunk of req)raw+=chunk;const params=new URLSearchParams(raw),grant=grants.get(params.get('code'));
  assert.ok(grant);assert.equal(createHash('sha256').update(params.get('code_verifier')).digest('base64url'),grant.code_challenge);
  grants.delete(params.get('code'));const now=Math.floor(Date.now()/1000);
  res.end(JSON.stringify({access_token:'qa-access',token_type:'Bearer',expires_in:3600,id_token:jwt({iss:issuer,aud:'qa',sub:'wise-real-subject',iat:now,exp:now+3600,nonce:grant.nonce,name:'QA Wise',membership_tier:tier,wise_user_id:'wise-real-subject'})}));return;
 }
 if(url.pathname==='/jwks'){res.end(JSON.stringify({keys:[jwk]}));return;}
 if(url.pathname==='/userinfo'){
  assert.equal(req.headers.authorization,'Bearer qa-access');if(!available){res.writeHead(503);res.end('{}');return;}
  const gate=userinfoGate;
  if(gate){
   gate.requests++;
   res.once('close',()=>{if(!res.writableEnded)gate.disconnected=true;});
   gate.entered.resolve();
   await gate.release.promise;
   if(res.destroyed)return;
   gate.responses++;
  }
  res.end(JSON.stringify({sub:wrongSubject?'other':'wise-real-subject',name:'QA Wise',membership_tier:tier,wise_user_id:'wise-real-subject'}));return;
 }
 res.end(JSON.stringify({issuer,authorization_endpoint:issuer+'/authorize',token_endpoint:issuer+'/token',userinfo_endpoint:issuer+'/userinfo',jwks_uri:issuer+'/jwks',response_types_supported:['code'],subject_types_supported:['public'],id_token_signing_alg_values_supported:['RS256'],code_challenge_methods_supported:['S256']}));
});
await new Promise(r=>provider.listen(0,'127.0.0.1',r));issuer=`http://127.0.0.1:${provider.address().port}`;
const app=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3028'],{cwd,env:{...process.env,AUTH_URL:base,AUTH_SECRET:randomBytes(32).toString('hex'),WISE_AUTH_ISSUER:issuer,WISE_AUTH_DISCOVERY_URL:issuer+'/discovery',WISE_AUTH_USERINFO_URL:issuer+'/userinfo',WISE_AUTH_CLIENT_ID:'qa',WISE_AUTH_CLIENT_SECRET:'qa'},stdio:['ignore','pipe','pipe']});let logs='';app.stdout.on('data',d=>logs+=d);app.stderr.on('data',d=>logs+=d);
const jar=new Map();
async function request(url,{authenticated=true,headers={},signal}={}){const local=new URL(url).origin===base;const r=await fetch(url,{redirect:'manual',signal,headers:{...(local&&authenticated?{cookie:[...jar].map(([k,v])=>`${k}=${v}`).join('; ')}:{}),...headers}});if(local&&authenticated)for(const c of r.headers.getSetCookie()){const pair=c.split(';')[0],i=pair.indexOf('=');jar.set(pair.slice(0,i),pair.slice(i+1));}return r;}

// These sentences occur near the end of each full article, outside its trial text.
// Check both document HTML (including embedded Flight data) and standalone RSC.
const researchArticles=[
 {slug:'Kcr8I81t',tail:'美联储会继续改变政策，市场也会继续改变预期。',preview:'今天想和大家认真聊一次美联储。'},
 {slug:'WGa8Mm2t',tail:'以上，就是目前我对于整个市场比较完整的一次思考，也算是 Wise VIP 的第一篇正式市场文章。',preview:'今天给大家推送一篇我们 VIP 体系正式上线之后的第一篇文章。'},
];
function decodeTransportText(text){
 const entities={amp:'&',lt:'<',gt:'>',quot:'"',apos:"'"};
 for(let i=0;i<4;i++)text=text
  .replace(/\\+u([0-9a-f]{4})/gi,(_,hex)=>String.fromCharCode(parseInt(hex,16)))
  .replace(/&#x([0-9a-f]+);/gi,(_,hex)=>String.fromCodePoint(parseInt(hex,16)))
  .replace(/&#(\d+);/g,(_,decimal)=>String.fromCodePoint(Number(decimal)))
  .replace(/&(amp|lt|gt|quot|apos);/g,(_,name)=>entities[name]);
 return text;
}
function deferred(){let resolve;const promise=new Promise(done=>{resolve=done;});return {promise,resolve};}
async function withWatchdog(promise,label){
 let timer;
 // Only prevents a hung regression from leaving the test server running. Success
 // depends on the unreleased provider gate and stream contents, never elapsed time.
 try{return await Promise.race([promise,new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error(`Timed out: ${label}`)),15000);})]);}
 finally{clearTimeout(timer);}
}
const publicPaths=['/','/learn','/point','/article',...['us-markets','earnings','companies','crypto'].map(category=>`/article/category/${category}`)];
async function assertPublicPagesAreShared(){
 for(const path of publicPaths){
  const anonymous=await request(base+path,{authenticated:false});
  const member=await request(base+path);
  assert.equal(anonymous.status,200,`${path}: public response`);
  assert.equal(member.status,200,`${path}: member response`);
  for(const response of [anonymous,member]){
   assert.match(response.headers.get('cache-control')??'',/s-maxage=[1-9]\d*/,`${path}: public HTML uses shared cache`);
   assert.equal(response.headers.get('x-nextjs-cache'),'HIT',`${path}: built public page is served from cache`);
   assert.equal(response.headers.getSetCookie().length,0,`${path}: cached page must not set a user's cookie`);
  }
  const html=await anonymous.text();
  assert.equal(await member.text(),html,`${path}: cached HTML must not depend on the visitor's identity`);
  assert.ok(html.includes('data-account-pending=""'),`${path}: neutral account placeholder`);
  assert.ok(!html.includes('QA Wise'),`${path}: no member identity in cached HTML`);
  for(const article of researchArticles)assert.ok(!decodeTransportText(html).includes(article.tail),`${path}: shared cache excludes protected text`);
 }
 const missing=await request(base+'/article/category/not-a-category',{authenticated:false});
 assert.equal(missing.status,404,'unknown static category must remain a real HTTP 404');
 console.log(`PASS ${publicPaths.length} public pages: cached HTML is identical for anonymous and VIP users, without cookies or private content`);
}
async function assertHomepageDoesNotWaitForAccount(){
 const gate={entered:deferred(),release:deferred(),requests:0,responses:0,disconnected:false};
 userinfoGate=gate;
 const controller=new AbortController();
 const heroPreload=text=>[...text.matchAll(/<link\b[^>]*>/g)].some(([tag])=>/\brel="preload"/.test(tag)&&/\bas="image"/.test(tag)&&/\/(?:images\/portal\/vip-research-atrium|_next\/static\/media\/vip-research-atrium\.[a-f0-9]+)\.webp(?=[?&\s",]|$)/i.test(decodeURIComponent(tag)));
 // Simulate the browser's independent session fetch while its provider is held.
 // The whole public document must finish without waiting or timing out auth.
 const sessionRequest=request(base+'/api/auth/session',{signal:controller.signal});
 sessionRequest.catch(()=>{});
 try{
  await withWatchdog(gate.entered.promise,'session request enters held provider');
  const response=await withWatchdog(request(base+'/',{signal:controller.signal}),'cached homepage response');
  const html=await withWatchdog(response.text(),'complete cached homepage');
  assert.equal(response.status,200,'homepage response');
  assert.equal(response.headers.get('x-nextjs-cache'),'HIT','homepage is served from shared cache');
  assert.ok(html.includes('id="home-title"')&&html.includes('把认知，变成长期的复利。')&&html.includes('data-account-pending=""')&&heroPreload(html),'complete public homepage and priority image must arrive before account verification');
  assert.equal(gate.requests,1,'only the session endpoint requests membership; public HTML does not');
  assert.equal(gate.responses,0,'provider must not have sent membership information yet');
  assert.equal(gate.disconnected,false,'must stream before membership timeout, not after failing closed');
  assert.ok(!html.includes('QA Wise'),'account identity is withheld until verification');
  assert.ok(!html.includes('aria-controls="wise-account-panel"'),'no premature member account control');
  assert.ok(!/href="\/auth\/login(?:\?|\")/.test(html),'pending account must not masquerade as a login button');
  for(const article of researchArticles)assert.ok(!decodeTransportText(html).includes(article.tail),'public homepage never sends protected article text');
  gate.release.resolve();
  const sessionResponse=await withWatchdog(sessionRequest,'verified session response');
  assert.match(sessionResponse.headers.get('cache-control')??'',/no-store/,'private session must never enter a shared cache');
  const session=await sessionResponse.json();
  assert.equal(gate.responses,1,'released provider responded exactly once');
  assert.equal(session.user.name,'QA Wise','verified identity arrives via the separate session endpoint');
  assert.equal(session.user.membershipTier,'VIP');
  assert.ok(!JSON.stringify(session).includes('qa-access'),'client session never exposes the main-site access token');
  console.log('PASS held userinfo: complete cached homepage and hero preload arrive independently; verified account follows via private session endpoint');
 }finally{
  userinfoGate=null;
  gate.release.resolve();
  controller.abort();
 }
}
const transports=[['HTML',{}],['RSC',{RSC:'1',Accept:'text/x-component'}]];
async function assertResearchAccess(allowed,label,{authenticated=true}={}){
 for(const article of researchArticles)for(const [transport,headers]of transports){
  const response=await request(`${base}/article/${article.slug}`,{authenticated,headers});
  assert.equal(response.status,200,`${label}: ${article.slug} ${transport} response`);
  assert.match(response.headers.get('cache-control')??'',/no-store/,`${label}: protected article must never enter shared cache`);
  if(transport==='RSC')assert.match(response.headers.get('content-type')??'',/text\/x-component/,`${label}: verify the actual Flight response`);
  const text=decodeTransportText(await response.text());
  assert.ok(text.includes(article.preview),`${label}: ${article.slug} must still render public content`);
  assert.equal(text.includes(article.tail),allowed,`${label}: ${article.slug} full-text boundary in ${transport}`);
  assert.equal(text.includes('以上为公开试读。VIP 可阅读后续分析与完整结论'),!allowed,`${label}: ${article.slug} paywall in ${transport}`);
 }
 console.log(`PASS ${label}: both research articles ${allowed?'include the full ending':'exclude protected text'} in HTML and RSC`);
}
try{
 for(let i=0;i<90;i++){try{if((await fetch(base+'/login')).ok)break;}catch{}await new Promise(r=>setTimeout(r,200));}
 await assertResearchAccess(false,'anonymous viewer',{authenticated:false});
 for(const [transport,headers]of transports){
  const missing=await request(base+'/article/not-a-real-article',{authenticated:false,headers});
  const payload=await missing.text();
  if(transport==='HTML')assert.equal(missing.status,404,'unknown research slug must return HTTP 404 in HTML');
  else{
   assert.match(missing.headers.get('content-type')??'',/text\/x-component/,'unknown slug must return a real RSC response');
   assert.ok(missing.status===404||missing.status===200,`unexpected RSC status ${missing.status}`);
   if(missing.status===200){
    // Flight can flush HTTP 200 before a Server Component throws notFound().
    // Require the actual error row with Next's exact 404 digest, not merely the
    // shared not-found UI that also appears in successful navigation payloads.
    const errors=[...payload.matchAll(/(?:^|\n)[0-9a-f]+:E(\{[^\n]*\})/gi)].map(match=>JSON.parse(match[1]));
    assert.ok(errors.some(error=>error.digest==='NEXT_HTTP_ERROR_FALLBACK;404'),'streamed RSC 200 must carry the explicit not-found 404 error digest');
   }
  }
  const decoded=decodeTransportText(payload);
  for(const article of researchArticles)assert.ok(!decoded.includes(article.tail),`unknown slug must exclude protected text in ${transport}`);
 }
 console.log('PASS unknown research article: HTML HTTP 404 and RSC not-found boundary with no protected content');
 let r=await request(base+'/auth/login?callbackUrl=%2Fchat');assert.equal(r.status,303);
 r=await request(r.headers.get('location'));assert.equal(r.status,302);
 r=await request(r.headers.get('location'));assert.equal(new URL(r.headers.get('location')).pathname,'/chat');if(new URL(r.headers.get('location')).searchParams.has('error'))console.log('Callback error:',new URL(r.headers.get('location')).searchParams.get('error'));
 let session=await(await request(base+'/api/auth/session')).json();assert.equal(session.user.id,'wise-real-subject','SSO return must retain the MAIN SITE subject, not Auth.js random UUID');assert.equal(session.user.membershipTier,'VIP');assert.ok(!JSON.stringify(session).includes('qa-access'));
 console.log('PASS complete signed OIDC authorization + PKCE + callback + persistent session');
 await assertPublicPagesAreShared();
 await assertHomepageDoesNotWaitForAccount();
 const page=await(await request(base+'/chat')).text();assert.ok(page.includes('data-account-pending=""'));assert.ok(!page.includes('href="/auth/login?callbackUrl=%2Fchat"'));console.log('PASS account placeholder never falsely renders a login action while browser session is loading');
 assert.ok(!(await(await request(base+'/chat/conviction-before-buying')).text()).includes('id="article-gate-title"'));console.log('PASS VIP receives full protected article');
 await assertResearchAccess(true,'VIP viewer');
 tier='VIP_PLUS';await assertResearchAccess(true,'VIP_PLUS viewer');
 tier='MEMBER';assert.ok((await(await request(base+'/chat/conviction-before-buying')).text()).includes('id="article-gate-title"'));session=await(await request(base+'/api/auth/session')).json();assert.equal(session.user.membershipTier,'MEMBER');assert.equal(session.user.id,'wise-real-subject');console.log('PASS main-site downgrade reflected without losing login identity');
 await assertResearchAccess(false,'immediate membership downgrade');
 wrongSubject=true;session=await(await request(base+'/api/auth/session')).json();assert.equal(session.user.id,'');console.log('PASS mismatched identity rejected');wrongSubject=false;available=false;
 session=await(await request(base+'/api/auth/session')).json();assert.equal(session.user.id,'');console.log('PASS unavailable membership endpoint fails closed');
 await assertResearchAccess(false,'unavailable membership provider');
 if(process.argv.includes('--serve')){
  tier='VIP';wrongSubject=false;available=true;
  console.log(`Browser QA fixture ready: ${base} (fictional VIP account only)`);
  await new Promise(resolve=>{process.once('SIGINT',resolve);process.once('SIGTERM',resolve);});
 }
}catch(e){console.error(e.message);process.exitCode=1;}finally{app.kill('SIGTERM');provider.closeAllConnections();provider.close();}
