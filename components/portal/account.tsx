import { auth, signOut } from "@/auth";
import { LogOut } from "lucide-react";
import { AccountControl } from "./account-control";
export async function Account() {
 const session = await auth();
 if(!session?.user?.id) return <AccountControl/>;
 const {user} = session;
 const raw = user.name?.trim() || "";
 const name = !raw || raw.includes('@') || raw === user.id || raw === user.wiseUserId || /^[\d\s()+-]{7,}$/.test(raw) ? "我的账户" : raw;
 const tier = user.membershipTier === 'VIP_PLUS' ? 'VIP+' : user.membershipTier === 'VIP' ? 'VIP 会员' : '普通用户';
 return <AccountControl profile={{name,tier,image:user.image}}><form action={async()=>{"use server";await signOut({redirectTo:'/'});}}><button type="submit"><LogOut size={15}/>退出登录</button></form></AccountControl>;
}
