import React from "react";
import { DollarSign, Loader2 } from "lucide-react";
import { useForm } from "@inertiajs/react";

import { BarbermanType, ProductType } from "@/types";

import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import InputError from "@/components/input-error";
import { cn, currencyFormatter, splitBarbermanValue } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FormBookingProps {
    barbermans: BarbermanType[];
    dataPaket: ProductType | null;
    antrian: string | null | number;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function FormBooking({
    barbermans,
    dataPaket,
    antrian,
    setOpenModal,
}: FormBookingProps) {
    // hooks
    const { data, setData, post, reset, errors, processing } = useForm({
        barberman: "",
        via: "",
        id_barberman: 0,
        id_product: dataPaket?.id ?? "",
        total: dataPaket?.price ?? 0,
    });

    // events
    const onChangeBarberman = (item: string) => {
        const [id, name] = item.split("-");

        setData({
            ...data,
            barberman: item,
            id_barberman: parseInt(id),
        });
    };

    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();

        post(route("booking.store"), {
            onSuccess: () => {
                setOpenModal(false);
                reset();
            },
        });
    };

    return (
        <DialogContent className="max-w-2xl">
            <DialogHeader>
                <DialogTitle>Konfirmasi Booking</DialogTitle>
                <DialogDescription>
                    Silahkan konfirmasi bookingan anda.
                </DialogDescription>
            </DialogHeader>

            <form
                onSubmit={onSubmit}
                encType="multipart/form-data"
                className="space-y-8"
            >
                <div className="grid grid-cols-2 gap-5">
                    <div className="col-span-2 md:col-span-1">
                        <Select
                            onValueChange={(e) => onChangeBarberman(e)}
                            defaultValue={data.barberman}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Pilih Barberman" />
                            </SelectTrigger>
                            <SelectContent>
                                <ScrollArea className="h-[200px]">
                                    {barbermans?.map((item) => (
                                        <SelectItem
                                            key={item.id}
                                            value={`${item.id}-${item.name}`}
                                            disabled={item.status !== "online"}
                                        >
                                            <div className="inline-flex w-full flex-row items-center gap-2">
                                                <div
                                                    className={cn(
                                                        "h-2 w-2 rounded-full",
                                                        item.status === "online"
                                                            ? "bg-green-500"
                                                            : "bg-red-500"
                                                    )}
                                                />
                                                {item.name}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </ScrollArea>
                            </SelectContent>
                        </Select>

                        <InputError message={errors.barberman} />
                    </div>

                    <div className="col-span-2 md:col-span-1">
                        <Select
                            onValueChange={(e) => setData("via", e)}
                            defaultValue={data.via}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Pilih Via Transaksi" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="tunai">
                                    Tunai (Cash)
                                </SelectItem>
                                <SelectItem value="transfer">
                                    Transfer (Online)
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        <InputError message={errors.via} />
                    </div>
                </div>

                <table className="w-full">
                    <thead>
                        <tr>
                            <th colSpan={2} className="text-left">
                                Detail Transaksi
                            </th>
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        <tr className="w-full">
                            <td className="w-full text-left">
                                {dataPaket?.name}
                            </td>
                            <td className="w-full text-nowrap text-right font-bold">
                                {currencyFormatter(dataPaket?.price!)}
                            </td>
                        </tr>
                        <tr className="w-full">
                            <td className="w-full text-left">Barberman</td>
                            <td className="w-full text-nowrap text-right font-bold">
                                {splitBarbermanValue(data.barberman).name ??
                                    "-"}
                            </td>
                        </tr>
                        <tr className="w-full">
                            <td className="w-full text-left">Via</td>
                            <td className="w-full text-nowrap text-right font-bold">
                                {data.via === "tunai"
                                    ? "Tunai (Cash)"
                                    : "Transfer (Online)"}
                            </td>
                        </tr>
                        <tr className="w-full">
                            <td className="w-full text-left">No Antrian</td>
                            <td className="w-full text-nowrap text-right font-bold">
                                {antrian ?? "-"}
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr className="w-full border-t border-border">
                            <td className="text-left font-bold">Total</td>
                            <td className="text-nowrap text-right font-bold">
                                {currencyFormatter(dataPaket?.price!)},-
                            </td>
                        </tr>
                    </tfoot>
                </table>
                <Button className="inline-flex w-fit items-center gap-2">
                    {processing ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <DollarSign className="w-4 h-4" />
                    )}
                    <span>Bayar</span>
                </Button>
            </form>
        </DialogContent>
    );
}

export default FormBooking;
