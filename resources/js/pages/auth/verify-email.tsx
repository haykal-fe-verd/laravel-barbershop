import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import GuestLayout from "@/layouts/guest-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

function VerifyEmail() {
    // hooks
    const { post, processing } = useForm({});

    // events
    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();
        post(route("verification.send"));
    };

    return (
        <GuestLayout>
            <Head title="Verify Email" />

            <div className="min-h-[calc(100vh-150px)] flex flex-col sm:justify-center items-center">
                <Card
                    className={cn("max-w-md shadow-none lg:shadow lg:border")}
                >
                    <CardContent className={cn("p-5 space-y-5")}>
                        <div className="flex flex-col items-center justify-center space-y-3 text-center">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2"
                            >
                                <Icons.Logo className="h-20 w-20 dark:fill-white" />
                            </Link>
                            <h1 className="font-bold">
                                {import.meta.env.VITE_APP_NAME}
                            </h1>
                            <p className="text-sm text-justify">
                                Terima kasih telah mendaftar! Sebelum memulai,
                                dapatkah Anda memverifikasi alamat email Anda
                                dengan mengeklik tautan yang baru saja kami
                                kirimkan kepada Anda? Jika Anda tidak menerima
                                email tersebut, kami akan dengan senang hati
                                mengirimkan email lain kepada Anda.
                            </p>
                        </div>

                        <form onSubmit={onSubmit} className="space-y-5 mt-5">
                            <div className="flex items-center justify-between">
                                <Button
                                    disabled={processing}
                                    className="w-full inline-flex items-center justify-center gap-2"
                                >
                                    {processing && (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    )}
                                    <span>Kirim Ulang Email Verifikasi</span>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}

export default VerifyEmail;
