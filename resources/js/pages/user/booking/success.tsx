import React from "react";
import { Head, Link } from "@inertiajs/react";
import Lottie from "lottie-react";
import { BadgeCheck } from "lucide-react";

import AuthLayout from "@/layouts/auth-layout";
import animationData from "@/assets/lottie/success.json";
import { buttonVariants } from "@/components/ui/button";

function Success() {
    return (
        <AuthLayout>
            <Head title="Success" />

            <div className="flex min-h-[calc(100vh-121px)] w-full items-center justify-center">
                <div className="flex flex-col items-start justify-center leading-relaxed">
                    <div className="flex w-full items-center justify-center">
                        <Lottie
                            animationData={animationData}
                            className="h-64 w-64"
                            loop
                        />
                    </div>
                    <h1 className="inline-flex items-center gap-2 text-4xl font-bold">
                        <span>Berhasil</span>{" "}
                        <BadgeCheck className="text-sky-500" />
                    </h1>
                    <p className="text-muted-foreground">
                        Transaksi berhasil dilakukan. silahkan menunggu nomor
                        antrian!
                    </p>
                    <Link
                        href={route("transaction.user")}
                        className={buttonVariants({
                            size: "default",
                            className: "mt-5 inline-flex items-center gap-2",
                        })}
                    >
                        Lihat transaksi saya
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
}

export default Success;
