import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import GuestLayout from "@/layouts/guest-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

function Register() {
    // hooks
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
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

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    // mounted
    React.useEffect(() => {
        reset("password", "password_confirmation");
    }, []);

    return (
        <GuestLayout>
            <Head title="Register" />

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
                                Selamat datang! Silahkan mendaftar untuk
                                melanjutkan
                            </p>
                        </div>
                        <form onSubmit={onSubmit} className="space-y-5 mt-5">
                            <div>
                                <Label htmlFor="name">Nama</Label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />

                                <InputError message={errors.name} />
                            </div>

                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={data.email}
                                    autoComplete="username"
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
                                <span>Register</span>
                            </Button>
                        </form>

                        <p className="text-xs text-center">
                            Sudah punya akun?{" "}
                            <Link
                                href={route("login")}
                                className="text-primary"
                            >
                                Login sekarang
                            </Link>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}

export default Register;
