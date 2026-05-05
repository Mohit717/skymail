"use client";
import Image from "next/image";
import SwitchMode from "@/components/SwitchMode";
import { HelpCircle, LogOut, Settings, User } from "lucide-react";
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
import { logout } from "@/app/actions/auth";
import { UserType } from "@/types/user";
import Link from "next/link";

const Header = ({ user }: { user: UserType }) => {
  return (
    <header className="sticky top-0 z-20 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="flex h-16 w-full items-center justify-between px-6 sm:px-8">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="SkyMail logo"
              width={170}
              height={48}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <SwitchMode />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="relative h-10 w-10 rounded-full"
                variant="ghost"
              >
                <Avatar>
                  <AvatarImage
                    alt="@haydenbleasel"
                    src="https://github.com/haydenbleasel.png"
                  />
                  <AvatarFallback>HB</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="font-medium text-sm leading-none">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-muted-foreground text-xs leading-none">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle />
                Help
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onSelect={() => logout()}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
