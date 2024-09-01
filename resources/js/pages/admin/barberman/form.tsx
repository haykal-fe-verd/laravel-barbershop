import React from "react";
import { useForm } from "@inertiajs/react";

import { BarbermanType } from "@/types";
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface FormBarbermanProps {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    isEditing: boolean;
    dataEdit?: BarbermanType | null;
}

function FormBarberman({
    setOpenModal,
    isEditing,
    dataEdit,
}: FormBarbermanProps) {
    // hooks
    const { data, setData, post, reset, errors, processing } = useForm({
        name: dataEdit ? dataEdit?.name : "",
        status: dataEdit ? dataEdit?.status : "",
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
            post(route("barberman.update", dataEdit?.id), {
                onSuccess: () => {
                    setOpenModal(false);
                    reset();
                },
            });
        } else {
            post(route("barberman.store"), {
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
                    {isEditing ? "Edit" : "Tambah"} Barberman
                </DialogTitle>
                <DialogDescription>
                    Form ini akan {isEditing ? "mengedit" : "menambahkan"} data
                    barberman.
                </DialogDescription>
            </DialogHeader>

            <form
                onSubmit={onSubmit}
                encType="multipart/form-data"
                className="space-y-8"
            >
                <div>
                    <Label htmlFor="name">Nama</Label>
                    <Input
                        type="text"
                        placeholder="Jhon Doe"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    <InputError message={errors.name} />
                </div>

                <div>
                    <Label htmlFor="status">Status</Label>
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
                            <SelectItem value="online">
                                <div className="inline-flex flex-row items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-green-500" />
                                    <span>Online</span>
                                </div>
                            </SelectItem>
                            <SelectItem value="offline">
                                <div className="inline-flex flex-row items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-rose-500" />
                                    <span>Offline</span>
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.status} />
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
                        src={`/barbermans/${dataEdit?.photo}`}
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
