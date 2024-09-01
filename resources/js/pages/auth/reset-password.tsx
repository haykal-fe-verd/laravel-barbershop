import React from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { PageProps } from "@/types";

import { cn } from "@/lib/utils";
import GuestLayout from "@/layouts/guest-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

interface ResetPasswordProps extends PageProps {
    token: string;
    email: string;
}

function ResetPassword() {
    // hooks
    const { email, token } = usePage<ResetPasswordProps>().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    // states
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [showPasswordConfirm, setShowPasswordConfirm] =
        React.useState<boolean>(false);

    // events
    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.store"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

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
                            <p className="text-sm">
                                Selamat datang! Silahkan masukkan password baru
                                untuk mengamankan akun anda
                            </p>
                        </div>
                        <form onSubmit={onSubmit} className="space-y-5 mt-5">
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    autoComplete="username"
                                    autoFocus
                                    disabled
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />

                                <InputError message={errors.email} />
                            </div>

                            <div>
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        id="password"
                                        name="password"
                                        placeholder="••••••••"
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
                                <InputError message={errors.password} />
                            </div>

                            <div>
                                <Label htmlFor="password_confirmation">
                                    Konfirmasi Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        type={
                                            showPasswordConfirm
                                                ? "text"
                                                : "password"
                                        }
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        placeholder="••••••••"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <button
                                        type="button"
                                        id="showPasswordConfirm"
                                        name="showPasswordConfirm"
                                        aria-label="showPasswordConfirm"
                                        className="absolute inset-y-0 right-0 flex items-center p-3 text-primary-foreground rounded-tr-md rounded-br-md bg-primary"
                                        onClick={() =>
                                            setShowPasswordConfirm(
                                                !showPasswordConfirm
                                            )
                                        }
                                    >
                                        {showPasswordConfirm ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full inline-flex items-center gap-2 justify-center"
                            >
                                {processing && (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                )}
                                <span>Reset Password</span>
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}

export default ResetPassword;
