import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import GuestLayout from "@/layouts/guest-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

function ForgotPassword() {
    // hooks
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    // events
    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

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
                                Lupa kata sandi? Tidak masalah. Cukup beri tahu
                                kami alamat email Anda dan kami akan mengirimkan
                                tautan untuk menyetel ulang kata sandi melalui
                                email yang akan memungkinkan Anda memilih kata
                                sandi baru.
                            </p>
                        </div>

                        <form onSubmit={onSubmit} className="space-y-5 mt-5">
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="username"
                                    placeholder="email@example.com"
                                    autoFocus
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />

                                <InputError message={errors.email} />
                            </div>

                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full inline-flex items-center gap-2 justify-center"
                            >
                                {processing && (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                )}
                                <span>Kirim reset link</span>
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}

export default ForgotPassword;
