import React from "react";
import { Head, usePage } from "@inertiajs/react";
import { RocketIcon, Scissors } from "lucide-react";

import { BarbermanType, PageProps, ProductType } from "@/types";

import { currencyFormatter } from "@/lib/utils";
import handlPayment from "@/lib/handle-payment";
import AuthLayout from "@/layouts/auth-layout";
import Title from "@/components/title";
import { Separator } from "@/components/ui/separator";
import { Dialog } from "@/components/ui/dialog";
import CustomCard from "@/components/custom-card";
import Skeleton from "./skeleton";
import FormBooking from "./form-booking";

interface IndexProps extends PageProps {
    products: ProductType[];
    barbermans: BarbermanType[];
    antrian: string | null | number;
}
function Index() {
    // hooks
    const { products, barbermans, antrian, sessions } =
        usePage<IndexProps>().props;

    // states
    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const [dataPaket, setDataPaket] = React.useState<ProductType | null>(null);

    // set midtrans
    React.useEffect(() => {
        const midtransUrl = import.meta.env.VITE_MIDTRANS_SNAP_URL;
        const midtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

        let scriptTag = document.createElement("script");
        scriptTag.src = midtransUrl;
        scriptTag.setAttribute("data-client-key", midtransClientKey);

        document.body.appendChild(scriptTag);

        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);

    // open snap
    React.useEffect(() => {
        if (
            sessions?.snapToken &&
            typeof window.snap === "object" &&
            typeof window.snap.pay === "function"
        ) {
            handlPayment(sessions.snapToken);
        }
    }, [sessions?.snapToken]);

    return (
        <AuthLayout>
            <Head title="Booking" />

            <Dialog
                open={openModal}
                onOpenChange={(isOpen) => {
                    setOpenModal(isOpen);
                    if (!isOpen) {
                        setDataPaket(null);
                    }
                }}
            >
                <div className="flex flex-col space-y-5">
                    <div>
                        <Title title="Booking" />
                        <p className="mt-2 max-w-sm text-xs leading-relaxed text-muted-foreground">
                            Ayo booking sekarang supaya anda tidak lama menunggu
                            dan dapatkan nomor antriannya.
                        </p>
                    </div>

                    <div className="flex flex-col space-y-5">
                        <Separator />

                        <div className="grid w-full grid-cols-12 gap-5">
                            {products.length <= 0 ? (
                                <div className="col-span-12">
                                    Paket tidak ditemukan...
                                </div>
                            ) : (
                                products.map((item, i) => (
                                    <CustomCard
                                        key={i}
                                        className="col-span-12 md:col-span-3"
                                        title={currencyFormatter(item.price)}
                                        description={item.name}
                                        header={<Skeleton />}
                                        icon={
                                            <Scissors className="h-4 w-4 text-primary" />
                                        }
                                        iconButton={
                                            <RocketIcon className="h-4 w-4" />
                                        }
                                        buttonText="Booking Sekarang"
                                        onClick={() => {
                                            setOpenModal(true);
                                            setDataPaket(item);
                                        }}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {openModal && (
                    <FormBooking
                        barbermans={barbermans}
                        dataPaket={dataPaket}
                        antrian={antrian}
                        setOpenModal={setOpenModal}
                    />
                )}
            </Dialog>
        </AuthLayout>
    );
}

export default Index;
