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
let issuer,tier='VIP',wrongSubject=false,available=true;const grants=new Map();
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
  res.end(JSON.stringify({sub:wrongSubject?'other':'wise-real-subject',name:'QA Wise',membership_tier:tier,wise_user_id:'wise-real-subject'}));return;
 }
 res.end(JSON.stringify({issuer,authorization_endpoint:issuer+'/authorize',token_endpoint:issuer+'/token',userinfo_endpoint:issuer+'/userinfo',jwks_uri:issuer+'/jwks',response_types_supported:['code'],subject_types_supported:['public'],id_token_signing_alg_values_supported:['RS256'],code_challenge_methods_supported:['S256']}));
});
await new Promise(r=>provider.listen(0,'127.0.0.1',r));issuer=`http://127.0.0.1:${provider.address().port}`;
const app=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3028'],{cwd,env:{...process.env,AUTH_URL:base,AUTH_SECRET:randomBytes(32).toString('hex'),WISE_AUTH_ISSUER:issuer,WISE_AUTH_DISCOVERY_URL:issuer+'/discovery',WISE_AUTH_USERINFO_URL:issuer+'/userinfo',WISE_AUTH_CLIENT_ID:'qa',WISE_AUTH_CLIENT_SECRET:'qa'},stdio:['ignore','pipe','pipe']});let logs='';app.stdout.on('data',d=>logs+=d);app.stderr.on('data',d=>logs+=d);
const jar=new Map();
async function request(url,{authenticated=true,headers={}}={}){const local=new URL(url).origin===base;const r=await fetch(url,{redirect:'manual',headers:{...(local&&authenticated?{cookie:[...jar].map(([k,v])=>`${k}=${v}`).join('; ')}:{}),...headers}});if(local&&authenticated)for(const c of r.headers.getSetCookie()){const pair=c.split(';')[0],i=pair.indexOf('=');jar.set(pair.slice(0,i),pair.slice(i+1));}return r;}

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
const transports=[['HTML',{}],['RSC',{RSC:'1',Accept:'text/x-component'}]];
async function assertResearchAccess(allowed,label,{authenticated=true}={}){
 for(const article of researchArticles)for(const [transport,headers]of transports){
  const response=await request(`${base}/article/${article.slug}`,{authenticated,headers});
  assert.equal(response.status,200,`${label}: ${article.slug} ${transport} response`);
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
 const page=await(await request(base+'/chat')).text();assert.ok(page.includes('QA Wise'));assert.ok(page.includes('wise-account-panel'));assert.ok(!page.includes('href="/auth/login?callbackUrl=%2Fchat"'));console.log('PASS rendered header shows logged-in account instead of login');
 assert.ok(!(await(await request(base+'/chat/conviction-before-buying')).text()).includes('id="article-gate-title"'));console.log('PASS VIP receives full protected article');
 await assertResearchAccess(true,'VIP viewer');
 tier='VIP_PLUS';await assertResearchAccess(true,'VIP_PLUS viewer');
 tier='MEMBER';assert.ok((await(await request(base+'/chat/conviction-before-buying')).text()).includes('id="article-gate-title"'));session=await(await request(base+'/api/auth/session')).json();assert.equal(session.user.membershipTier,'MEMBER');assert.equal(session.user.id,'wise-real-subject');console.log('PASS main-site downgrade reflected without losing login identity');
 await assertResearchAccess(false,'immediate membership downgrade');
 wrongSubject=true;session=await(await request(base+'/api/auth/session')).json();assert.equal(session.user.id,'');console.log('PASS mismatched identity rejected');wrongSubject=false;available=false;
 session=await(await request(base+'/api/auth/session')).json();assert.equal(session.user.id,'');console.log('PASS unavailable membership endpoint fails closed');
 await assertResearchAccess(false,'unavailable membership provider');
}catch(e){console.error(e.message);process.exitCode=1;}finally{app.kill('SIGTERM');provider.closeAllConnections();provider.close();}
