import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authConfig } from "@/lib/auth";
import api from "@/lib/axios-interceptor";
import { User } from "@/types/schemas";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function UserNav() {
  const session = await getServerSession(authConfig);
  const user = session?.user;

  if (!user) {
    redirect("/");
  }

  const res = await api.get(`/api/users/${user.id}`);
  const userInfo: User = res.data;

  const initials =
    userInfo.firstName.charAt(0).toUpperCase() +
    userInfo.lastName.charAt(0).toUpperCase();
  let avatarUrl;
  if (userInfo.avatarNumber != null) {
    avatarUrl = `/avatars/0${userInfo.avatarNumber}.png`;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl} alt="@avatar" />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/api/auth/signout">
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
