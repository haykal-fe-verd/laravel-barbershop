import React from "react";
import { useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";

import { GalleryType } from "@/types";

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

interface FormBarbermanProps {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    isEditing: boolean;
    dataEdit?: GalleryType | null;
}

function FormBarberman({
    setOpenModal,
    isEditing,
    dataEdit,
}: FormBarbermanProps) {
    // hooks
    const { data, setData, post, reset, errors, processing } = useForm({
        name: dataEdit ? dataEdit?.name : "",
        photo: dataEdit ? dataEdit?.photo : ("" as any),
    });

    // states
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

    // events
    const onChangeFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("photo", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewUrl(null);
        }
    };

    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();

        if (isEditing) {
            post(route("gallery.update", dataEdit?.id), {
                onSuccess: () => {
                    setOpenModal(false);
                    reset();
                },
            });
        } else {
            post(route("gallery.store"), {
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
                    {isEditing ? "Edit" : "Tambah"} Galeri Foto
                </DialogTitle>
                <DialogDescription>
                    Form ini akan {isEditing ? "mengedit" : "menambahkan"}{" "}
                    Galeri Foto.
                </DialogDescription>
            </DialogHeader>

            <form
                onSubmit={onSubmit}
                encType="multipart/form-data"
                className="space-y-8"
            >
                <div>
                    <Label htmlFor="name">Nama/Deskripsi</Label>
                    <Input
                        type="text"
                        placeholder="Under Cut"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    <InputError message={errors.name} />
                </div>

                <div>
                    <Label htmlFor="photo">Foto</Label>
                    <Input
                        type="file"
                        id="photo"
                        name="photo"
                        accept="image/*"
                        onChange={onChangeFoto}
                    />

                    {isEditing && (
                        <p className="ml-4 text-xs text-muted-foreground">
                            Jika edit tidak perlu merubah foto
                        </p>
                    )}

                    <InputError message={errors.photo} />
                </div>

                {previewUrl && (
                    <img
                        id="photoPreview"
                        src={previewUrl}
                        className="object-cover w-full h-[400px]"
                    />
                )}

                {isEditing && dataEdit && !previewUrl && (
                    <img
                        id="photoPreview"
                        src={`/galleries/${dataEdit?.photo}`}
                        className="object-cover w-full h-[400px]"
                    />
                )}

                <Button className="inline-flex w-fit items-center gap-2">
                    {processing && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>Simpan</span>
                </Button>
            </form>
        </DialogContent>
    );
}

export default FormBarberman;
