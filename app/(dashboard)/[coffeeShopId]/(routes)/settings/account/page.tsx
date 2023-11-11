import { Separator } from "@/components/ui/separator";
import api from "@/lib/axios-interceptor";
import { redirect } from "next/navigation";
import { AccountSettingsForm } from "./account-form";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export default async function AccountSettingsPage() {
  const session = await getServerSession(authConfig);
  const user = session?.user;

  if (!user) {
    redirect("/");
  }

  const res = await api.get(`/api/users/${user.id}`);
  const userInfo = res.data;
  userInfo.phoneNumber = userInfo.phoneNumber || undefined;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account information</h3>
        <p className="text-sm text-muted-foreground">
          This is your account information.
        </p>
      </div>
      <Separator />
      <AccountSettingsForm initialData={userInfo} />
    </div>
  );
}
