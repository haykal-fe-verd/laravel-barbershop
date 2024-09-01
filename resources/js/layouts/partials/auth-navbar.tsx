import React from "react";

import { Icons } from "@/components/icons";
import AuthMainNavbar from "@/layouts/partials/auth-main-navbar";
import AuthDate from "@/layouts/partials/auth-date";
import AuthUserNav from "@/layouts/partials/auth-user-navbar";
import ThemeColorToggle from "@/components/theme-color-toggle";
import ThemeModeToggle from "@/components/theme-mode-toggle";

function AuthNavbar() {
    return (
        <header className="border-b">
            <div className="flex h-16 items-center px-4">
                <div className="flex items-center gap-2">
                    <Icons.Logo className="h-8 w-auto dark:fill-white" />
                    <h1 className="text-xl font-bold">
                        {import.meta.env.VITE_APP_NAME}
                    </h1>
                </div>
                <AuthMainNavbar className="mx-5" />
                <div className="ml-auto flex items-center space-x-4">
                    <AuthDate />
                    <div className="hidden lg:flex">
                        <ThemeColorToggle />
                    </div>
                    <div className="hidden lg:flex">
                        <ThemeModeToggle />
                    </div>
                    <AuthUserNav />
                </div>
            </div>
        </header>
    );
}

export default AuthNavbar;
