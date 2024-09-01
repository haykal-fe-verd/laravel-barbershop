import React from "react";
import { useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";

import { GalleryType, ProductType } from "@/types";

import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface FormProductProps {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    isEditing: boolean;
    dataEdit?: ProductType | null;
}

function FormProduct({ setOpenModal, isEditing, dataEdit }: FormProductProps) {
    // hooks
    const { data, setData, post, reset, errors, processing } = useForm({
        name: dataEdit ? dataEdit?.name : "",
        price: dataEdit ? dataEdit?.price : 0,
        description: dataEdit ? dataEdit?.description : "",
    });

    // events
    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();

        if (isEditing) {
            post(route("product.update", dataEdit?.id), {
                onSuccess: () => {
                    setOpenModal(false);
                    reset();
                },
            });
        } else {
            post(route("product.store"), {
                onSuccess: () => {
                    setOpenModal(false);
                    reset();
                },
            });
        }
    };

    return (
        <DialogContent className="max-w-2xl">
            <DialogHeader>
                <DialogTitle>
                    {isEditing ? "Edit" : "Tambah"} Paket Barber
                </DialogTitle>
                <DialogDescription>
                    Form ini akan {isEditing ? "mengedit" : "menambahkan"} Paket
                    Barber.
                </DialogDescription>
            </DialogHeader>

            <form
                onSubmit={onSubmit}
                encType="multipart/form-data"
                className="space-y-8"
            >
                <div>
                    <Label htmlFor="name">Nama Paket</Label>
                    <Input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    <InputError message={errors.name} />
                </div>

                <div>
                    <Label htmlFor="price">Harga Paket</Label>
                    <div className="relative">
                        <Input
                            type="number"
                            name="price"
                            className="pl-12"
                            min={0}
                            value={data.price}
                            onChange={(e) =>
                                setData("price", parseInt(e.target.value))
                            }
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center rounded-l-md bg-primary px-2 text-primary-foreground">
                            Rp.
                        </div>
                    </div>
                    <InputError message={errors.price} />
                </div>

                <div>
                    <Label htmlFor="description">Deskripsi Paket</Label>
                    <Textarea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                    />
                    <InputError message={errors.description} />
                </div>

                <Button className="inline-flex w-fit items-center gap-2">
                    {processing && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>Simpan</span>
                </Button>
            </form>
        </DialogContent>
    );
}

export default FormProduct;
