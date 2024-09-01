import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import GuestLayout from "@/layouts/guest-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

function ConfirmPassword() {
    // hooks
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    // states
    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    // events
    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.confirm"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Login" />

            <div className="min-h-screen flex flex-col sm:justify-center items-center">
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
                            <p className="text-sm">
                                Ini adalah area aman dari aplikasi. Harap
                                konfirmasikan kata sandi Anda sebelum
                                melanjutkan.
                            </p>
                        </div>

                        <form onSubmit={onSubmit} className="space-y-5 mt-5">
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="••••••••"
                                        autoComplete="current-password"
                                        autoFocus
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    <button
                                        type="button"
                                        id="showPassword"
                                        name="showPassword"
                                        aria-label="showPassword"
                                        className="absolute inset-y-0 right-0 flex items-center p-3 text-primary-foreground rounded-tr-md rounded-br-md bg-primary"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full inline-flex items-center gap-2 justify-center"
                            >
                                {processing && (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                )}
                                <span>Konfirmasi</span>
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}

export default ConfirmPassword;
