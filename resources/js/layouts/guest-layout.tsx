import React, { PropsWithChildren } from "react";
import { usePage } from "@inertiajs/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { PageProps } from "@/types";

import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

import ThemeDataProvider from "@/components/theme-data-provider";
import Navbar from "@/layouts/partials/navbar";

function GuestLayout({ children }: PropsWithChildren) {
    // hooks
    const { sessions, status } = usePage<PageProps>().props;
    const { toast } = useToast();

    // mounted
    React.useEffect(() => {
        if (status) {
            toast({
                title: "Berhasil",
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
                <main>
                    <Navbar />
                    {children}
                    <Toaster />
                </main>
            </ThemeDataProvider>
        </NextThemesProvider>
    );
}

export default GuestLayout;
