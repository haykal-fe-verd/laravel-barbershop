import React from "react";
import { useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";

import { TransactionType } from "@/types";

import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface FormTransactionProps {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    status: string;
    dataTransaction?: TransactionType | null;
}

function FormTransaction({
    setOpenModal,
    status,
    dataTransaction,
}: FormTransactionProps) {
    console.log("🚀  status ==>", status);
    // hooks
    const { data, setData, post, reset, errors, processing } = useForm({
        status: dataTransaction?.status ?? "",
        status_pangkas: dataTransaction?.status_pangkas ?? "",
    });

    // events
    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();
        post(route("transaction.status", dataTransaction?.id), {
            onSuccess: () => setOpenModal(false),
        });
    };

    return (
        <DialogContent className="max-w-2xl">
            <DialogHeader>
                <DialogTitle>Edit Status Transaksi</DialogTitle>
                <DialogDescription>
                    Form ini akan mengubah status transaksi pengguna.
                </DialogDescription>
            </DialogHeader>

            <form
                onSubmit={onSubmit}
                encType="multipart/form-data"
                className="space-y-8"
            >
                {status === "bayar" && (
                    <div>
                        <Label htmlFor="status">Status Bayar</Label>
                        <Select
                            onValueChange={(e) => setData("status", e)}
                            defaultValue={data.status}
                        >
                            <SelectTrigger
                                className="w-full"
                                id="status"
                                name="status"
                            >
                                <SelectValue placeholder="Pilih Status..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="settlement">
                                    Lunas
                                </SelectItem>
                                <SelectItem value="pending">
                                    Belum Lunas
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.status} />
                    </div>
                )}

                <div>
                    <Label htmlFor="status_pangkas">Status Pangkas</Label>
                    <Select
                        onValueChange={(e) => setData("status_pangkas", e)}
                        defaultValue={data.status_pangkas}
                    >
                        <SelectTrigger
                            className="w-full"
                            id="status_pangkas"
                            name="status_pangkas"
                        >
                            <SelectValue placeholder="Pilih Status..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="success">
                                Sudah Pangkas
                            </SelectItem>
                            <SelectItem value="pending">
                                Belum Pangkas
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.status_pangkas} />
                </div>

                <Button className="inline-flex w-fit items-center gap-2">
                    {processing && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>Simpan</span>
                </Button>
            </form>
        </DialogContent>
    );
}

export default FormTransaction;
