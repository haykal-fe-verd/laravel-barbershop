import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { Rocket, Scissors } from "lucide-react";

import { PageProps, ProductType } from "@/types";

import AuthLayout from "@/layouts/auth-layout";
import Title from "@/components/title";
import {
    GlowingStarsBackgroundCard,
    GlowingStarsDescription,
    GlowingStarsTitle,
} from "@/components/aceternity/glowing-stars";
import { Separator } from "@/components/ui/separator";
import { currencyFormatter } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DashboardProps extends PageProps {
    antrian_berjalan_sekarang: any;
    total_transaksi_saya: number;
    paket: ProductType[];
}
function Dashboard() {
    // hooks
    const { antrian_berjalan_sekarang, total_transaksi_saya, paket } =
        usePage<DashboardProps>().props;

    return (
        <AuthLayout>
            <Head title="Dashboard" />
            <div className="flex flex-col space-y-5">
                <div>
                    <Title title="Dashboard" />
                    <p className="mt-2 max-w-sm text-xs leading-relaxed text-muted-foreground">
                        Cepat, bersih, nyaman & mudah.
                    </p>
                </div>

                <div className="grid grid-cols-1 w-full gap-5 md:auto-rows-[20rem] md:grid-cols-3">
                    <GlowingStarsBackgroundCard className="col-span-1 row-span-1 md:col-span-2">
                        <GlowingStarsTitle>
                            Antrian Berjalan Sekarang
                        </GlowingStarsTitle>
                        <div className="flex justify-between items-end">
                            <GlowingStarsDescription>
                                {antrian_berjalan_sekarang?.no_antrian ?? "-"}
                            </GlowingStarsDescription>
                        </div>
                    </GlowingStarsBackgroundCard>

                    <GlowingStarsBackgroundCard className="col-span-1 row-span-1 md:col-span-1">
                        <GlowingStarsTitle>
                            Total Transaksi Saya
                        </GlowingStarsTitle>
                        <div className="flex justify-between items-end">
                            <GlowingStarsDescription>
                                {total_transaksi_saya}
                            </GlowingStarsDescription>
                        </div>
                    </GlowingStarsBackgroundCard>
                </div>

                <h1 className="text-2xl font-bold">Daftar Paket</h1>
                <Separator />

                <div className="grid grid-cols-1 gap-5 md:auto-rows-[20rem] md:grid-cols-3">
                    {paket.map((item, index) => (
                        <GlowingStarsBackgroundCard className="col-span-1 row-span-1 md:col-span-1">
                            <Scissors className="h-4 w-4 mb-3" />
                            <GlowingStarsTitle>
                                {currencyFormatter(item.price)}
                            </GlowingStarsTitle>
                            <div className="flex justify-between items-end">
                                <GlowingStarsDescription>
                                    {item.name}
                                </GlowingStarsDescription>

                                <Button
                                    asChild
                                    className="inline-flex items-center justify-center gap-2"
                                >
                                    <Link href={route("booking.index")}>
                                        <Rocket className="h-4 w-4" />
                                        <span> Lihat Paket</span>
                                    </Link>
                                </Button>
                            </div>
                        </GlowingStarsBackgroundCard>
                    ))}
                </div>
            </div>
        </AuthLayout>
    );
}

export default Dashboard;
