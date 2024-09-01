import React from "react";
import { Head, usePage } from "@inertiajs/react";

import { PageProps } from "@/types";

import AuthLayout from "@/layouts/auth-layout";
import Title from "@/components/title";
import {
    GlowingStarsBackgroundCard,
    GlowingStarsDescription,
    GlowingStarsTitle,
} from "@/components/aceternity/glowing-stars";

interface DashboardProps extends PageProps {
    antrian_berjalan_sekarang: any;
    total_transaksi_hari_ini: number;
    total_admin: number;
    total_barberman: number;
    total_paket: number;
}
function Dashboard() {
    // hooks
    const {
        antrian_berjalan_sekarang,
        total_transaksi_hari_ini,
        total_admin,
        total_barberman,
        total_paket,
    } = usePage<DashboardProps>().props;
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
                            Total Transaksi Hari Ini
                        </GlowingStarsTitle>
                        <div className="flex justify-between items-end">
                            <GlowingStarsDescription>
                                {total_transaksi_hari_ini}
                            </GlowingStarsDescription>
                        </div>
                    </GlowingStarsBackgroundCard>

                    <GlowingStarsBackgroundCard className="col-span-1 row-span-1 md:col-span-1">
                        <GlowingStarsTitle>Total Admin</GlowingStarsTitle>
                        <div className="flex justify-between items-end">
                            <GlowingStarsDescription>
                                {total_admin}
                            </GlowingStarsDescription>
                        </div>
                    </GlowingStarsBackgroundCard>

                    <GlowingStarsBackgroundCard className="col-span-1 row-span-1 md:col-span-1">
                        <GlowingStarsTitle>Total Barberman</GlowingStarsTitle>
                        <div className="flex justify-between items-end">
                            <GlowingStarsDescription>
                                {total_barberman}
                            </GlowingStarsDescription>
                        </div>
                    </GlowingStarsBackgroundCard>

                    <GlowingStarsBackgroundCard className="col-span-1 row-span-1 md:col-span-1">
                        <GlowingStarsTitle>Total Paket</GlowingStarsTitle>
                        <div className="flex justify-between items-end">
                            <GlowingStarsDescription>
                                {total_paket}
                            </GlowingStarsDescription>
                        </div>
                    </GlowingStarsBackgroundCard>
                </div>
            </div>
        </AuthLayout>
    );
}

export default Dashboard;
