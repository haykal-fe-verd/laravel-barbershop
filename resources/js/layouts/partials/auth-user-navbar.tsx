import React from "react";
import { router, useForm, usePage } from "@inertiajs/react";

import { PageProps } from "@/types";

import { cn, getInitial } from "@/lib/utils";
import { authNavigations } from "@/data/navigations";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function AuthUserNav() {
    // hooks
    const { ziggy, user } = usePage<PageProps>().props;
    const { post } = useForm();

    // states
    const falbackAvatar = getInitial(user.name);
    const role = user.role;

    // events
    const filteredNavigations = authNavigations.filter((item) => {
        if (!item.roles || item.roles.length === 0) {
            return true;
        }
        return item.roles.includes(role!);
    });

    const handleLogout = () => {
        post(route("logout"));
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                >
                    <Avatar className="h-8 w-8">
                        <AvatarImage
                            src={`/avatars/${user.photo}`}
                            alt={`@${user.name}`}
                        />
                        <AvatarFallback>{falbackAvatar}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuGroup className="block md:hidden">
                    {filteredNavigations.map((item, index) => (
                        <DropdownMenuItem
                            key={index}
                            onClick={() => router.get(item.href)}
                            className={cn(
                                "",
                                ziggy.location === item.href &&
                                    "font-bold text-primary"
                            )}
                        >
                            {item.name}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        onClick={() => router.get(route("profile.edit"))}
                    >
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => router.get(route("password.index"))}
                    >
                        Ganti Password
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleLogout}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default AuthUserNav;
