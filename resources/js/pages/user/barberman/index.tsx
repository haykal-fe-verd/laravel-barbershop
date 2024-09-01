import React from "react";
import { Head, router, usePage } from "@inertiajs/react";
import { Component } from "lucide-react";

import { BarbermanType, PageProps } from "@/types";

import AuthLayout from "@/layouts/auth-layout";
import Title from "@/components/title";
import { Separator } from "@/components/ui/separator";
import CustomCard from "@/components/custom-card";
import Skeleton from "./skeleton";

interface IndexProps extends PageProps {
    barbermans: BarbermanType[];
}

function Index() {
    // hooks
    const { barbermans } = usePage<IndexProps>().props;

    return (
        <AuthLayout>
            <Head title="Barberman" />

            <div className="flex flex-col space-y-5">
                <div>
                    <Title title="Barbeman" />
                    <p className="mt-2 max-w-sm text-xs leading-relaxed text-muted-foreground">
                        Nikmati pelayanan yang terbaik dari kualitas barberman
                        kami.
                    </p>
                </div>

                <div className="flex flex-col space-y-5">
                    <Separator />

                    <div className="grid w-full grid-cols-12 gap-5">
                        {barbermans.length <= 0 ? (
                            <div className="col-span-12">
                                barberman tidak ditemukan...
                            </div>
                        ) : (
                            barbermans.map((item, i) => (
                                <CustomCard
                                    key={i}
                                    className="col-span-12 md:col-span-3"
                                    title={item.status}
                                    description={item.name}
                                    header={<Skeleton href={item.photo} />}
                                    icon={
                                        <Component className="h-4 w-4 text-primary" />
                                    }
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}

export default Index;
