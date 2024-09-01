import React from "react";
import { usePage } from "@inertiajs/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { PageProps } from "@/types";

import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import ThemeDataProvider from "@/components/theme-data-provider";
import AuthNavbar from "@/layouts/partials/auth-navbar";

function AuthLayout({ children }: React.PropsWithChildren) {
    // hooks
    const { sessions, status } = usePage<PageProps>().props;
    const { toast } = useToast();

    // mounted
    React.useEffect(() => {
        if (status) {
            toast({
                description: status,
            });
        }

        if (sessions?.success) {
            toast({
                title: "Berhasil",
                description: sessions.success,
            });
        }

        if (sessions?.error) {
            toast({
                variant: "destructive",
                title: "Oops",
                description: sessions.success,
            });
        }
    }, [sessions]);

    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <ThemeDataProvider>
                <AuthNavbar />
                <div className="flex-1 space-y-4 p-8 pt-6">
                    {children}
                    <Toaster />
                </div>
            </ThemeDataProvider>
        </NextThemesProvider>
    );
}

export default AuthLayout;
