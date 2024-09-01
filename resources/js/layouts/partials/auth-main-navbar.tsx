import React from "react";
import { Link, usePage } from "@inertiajs/react";

import { PageProps } from "@/types";

import { cn } from "@/lib/utils";
import { authNavigations } from "@/data/navigations";

interface AuthMainNavbarProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}
function AuthMainNavbar({ className, ...props }: AuthMainNavbarProps) {
    // hooks
    const { ziggy, user } = usePage<PageProps>().props;

    // states
    const role = user?.role;
    const filteredNavigations = authNavigations.filter(
        (item) => !item.roles || item.roles.includes(role)
    );

    return (
        <nav
            className={cn(
                "hidden items-center space-x-4 md:flex lg:space-x-6",
                className
            )}
            {...props}
        >
            {filteredNavigations.map((item, index) => (
                <Link
                    key={index}
                    href={item.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        ziggy.location === item.href &&
                            "font-bold underline text-primary decoration-primary underline-offset-4"
                    )}
                >
                    {item.name}
                </Link>
            ))}
        </nav>
    );
}

export default AuthMainNavbar;
