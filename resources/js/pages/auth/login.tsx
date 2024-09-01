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

function Login() {
    // hooks
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    // states
    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    // events
    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Login" />

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
                                Selamat datang! Silahkan login untuk melanjutkan
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

                            <div className="flex items-center justify-between">
                                {/* remember me */}
                                <div className="flex items-start space-x-2">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        onCheckedChange={(e) =>
                                            setData("remember", Boolean(e))
                                        }
                                        checked={data.remember}
                                    />
                                    <label
                                        htmlFor="remember"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Ingat saya
                                    </label>
                                </div>

                                {/* forgot password */}
                                <Link
                                    href={route("password.request")}
                                    className="text-sm font-medium hover:underline hover:text-primary"
                                >
                                    Lupa password?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full inline-flex items-center gap-2 justify-center"
                            >
                                {processing && (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                )}
                                <span>Login</span>
                            </Button>
                        </form>

                        <p className="text-xs text-center">
                            Belum punya akun?{" "}
                            <Link
                                href={route("register")}
                                className="text-primary"
                            >
                                Daftar sekarang
                            </Link>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}

export default Login;
