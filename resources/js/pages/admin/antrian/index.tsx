import React from "react";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { PageProps, TransactionType } from "@/types";

import AuthLayout from "@/layouts/auth-layout";
import Title from "@/components/title";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { currencyFormatter } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface IndexProps extends PageProps {
    queu: TransactionType[];
}

function Index() {
    // hooks
    const { queu } = usePage<IndexProps>().props;
    const { post } = useForm();

    // states
    const [activeAntrian, setActiveAntrian] = React.useState<string | null>(
        null
    );
    const [dataAntrian, setDataAntrian] =
        React.useState<TransactionType | null>(null);

    // events
    const findActiveAntrian = React.useMemo(
        () => queu.find((item) => Boolean(item.is_active_antrian)),
        [queu]
    );

    const isFirstAntrian = React.useMemo(() => {
        if (!dataAntrian) return true;
        const currentIndex = queu.findIndex(
            (item) => item.id === dataAntrian.id
        );
        return currentIndex === 0;
    }, [dataAntrian, queu]);

    const isLastAntrian = React.useMemo(() => {
        if (!dataAntrian) return true;
        const currentIndex = queu.findIndex(
            (item) => item.id === dataAntrian.id
        );
        return currentIndex === queu.length - 1;
    }, [dataAntrian, queu]);

    const handleMulaiAntrian = async () => {
        if (queu.length <= 0) {
            toast("Belum ada antrian yang tersedia!");
        } else {
            const id = queu[0]?.id ?? "";
            router.post(route("antrian.set.active", id));
        }
    };

    const handleNextAntrian = async () => {
        if (!dataAntrian) return;

        try {
            const currentIndex = queu.findIndex(
                (item) => item.id === dataAntrian.id
            );
            if (currentIndex === -1 || currentIndex === queu.length - 1) return;

            const nextAntrian = queu[currentIndex + 1];

            post(route("antrian.set.inactive", dataAntrian.id), {
                onSuccess: () => {
                    post(route("antrian.set.active", nextAntrian.id));
                },
            });
            toast("Antrian selanjutnya berhasil diaktifkan!");
        } catch (error) {
            toast.error("Gagal memproses antrian berikutnya!");
            console.error("Error handling next queue:", error);
        }
    };

    const handlePreviousAntrian = async () => {
        if (!dataAntrian) return;

        try {
            const currentIndex = queu.findIndex(
                (item) => item.id === dataAntrian.id
            );
            if (currentIndex === -1 || currentIndex === 0) return;

            const previousAntrian = queu[currentIndex - 1];

            post(route("antrian.set.inactive", dataAntrian.id), {
                onSuccess: () => {
                    post(route("antrian.set.active", previousAntrian.id));
                },
            });

            toast("Antrian sebelumnya berhasil diaktifkan!");
        } catch (error) {
            toast.error("Gagal memproses antrian sebelumnya!");
            console.error("Error handling next queue:", error);
        }
    };

    // mounted
    React.useEffect(() => {
        if (findActiveAntrian) {
            setActiveAntrian(findActiveAntrian.no_antrian);
            setDataAntrian(findActiveAntrian);
        }
    }, [findActiveAntrian]);

    return (
        <AuthLayout>
            <Head title="Antrian" />

            <div className="flex flex-col space-y-5">
                <Title title="Antrian" />

                <div className="flex flex-col space-y-5">
                    <Separator />
                    <div className="grid grid-cols-3 gap-5">
                        <div className="col-span-3 flex h-full items-center justify-center rounded-md border border-border p-3 shadow md:col-span-1">
                            <div className="text-7xl font-bold">
                                {activeAntrian || "-"}
                            </div>
                        </div>
                        <div className="col-span-3 p-3 md:col-span-2">
                            {activeAntrian ? (
                                <Table>
                                    <TableBody>
                                        <TableRow className="border-none">
                                            <TableCell className="w-[200px]">
                                                Nama
                                            </TableCell>
                                            <TableCell>
                                                :{" "}
                                                {dataAntrian?.user.name ?? "-"}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className="border-none">
                                            <TableCell className="w-[200px]">
                                                Paket
                                            </TableCell>
                                            <TableCell>
                                                :{" "}
                                                {dataAntrian?.product.name ??
                                                    "-"}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className="border-none">
                                            <TableCell className="w-[200px]">
                                                Barberman
                                            </TableCell>
                                            <TableCell>
                                                :{" "}
                                                {dataAntrian?.barberman.name ??
                                                    "-"}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className="border-none">
                                            <TableCell className="w-[200px]">
                                                Total
                                            </TableCell>
                                            <TableCell>
                                                :{" "}
                                                {currencyFormatter(
                                                    dataAntrian?.total ?? 0
                                                )}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className="border-none">
                                            <TableCell className="w-[200px]">
                                                Via
                                            </TableCell>
                                            <TableCell>
                                                : {dataAntrian?.via ?? "-"}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            ) : (
                                "Belum ada antrian berjalan, silahkan klik tombol mulai antrian"
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-span-3 row-span-1 flex gap-3 rounded-md border border-border bg-card p-5 text-card-foreground shadow-md md:col-span-1 md:flex-col">
                    <div className="flex h-full w-full flex-col items-center justify-center gap-5 md:flex-row">
                        {activeAntrian ? (
                            <>
                                <Button
                                    disabled={isFirstAntrian}
                                    onClick={handlePreviousAntrian}
                                    className="inline-flex h-full w-full items-center justify-center gap-2"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                    <span>Antrian Sebelumnya</span>
                                </Button>
                                <Button
                                    disabled={isLastAntrian}
                                    onClick={handleNextAntrian}
                                    className="inline-flex h-full w-full items-center justify-center gap-2"
                                >
                                    <span>Antrian Selanjutnya</span>
                                    <ChevronRight className="h-5 w-5" />
                                </Button>
                            </>
                        ) : (
                            <Button onClick={handleMulaiAntrian}>
                                Mulai antrian
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}

export default Index;
