import React from "react";
import { useForm } from "@inertiajs/react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { User } from "@/types";

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

interface FormUserProps {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    isEditing: boolean;
    dataEdit?: User | null;
}

function FormUser({ setOpenModal, isEditing, dataEdit }: FormUserProps) {
    // hooks
    const { data, setData, post, reset, errors, processing } = useForm({
        name: dataEdit ? dataEdit?.name : "",
        email: dataEdit ? dataEdit?.email : "",
        phone: dataEdit ? dataEdit?.phone : "",
        role: "admin",
        photo: dataEdit ? dataEdit?.photo : ("" as any),
        password: "",
        password_confirmation: "",
    });

    // states
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
    const [showCurrentPassword, setShowCurrentPassword] =
        React.useState<boolean>(false);
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [showPasswordConfirm, setShowPasswordConfirm] =
        React.useState<boolean>(false);

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
            post(route("user.update", dataEdit?.id), {
                onSuccess: () => {
                    setOpenModal(false);
                    reset();
                },
            });
        } else {
            post(route("user.store"), {
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
                <DialogTitle>{isEditing ? "Edit" : "Tambah"} Admin</DialogTitle>
                <DialogDescription>
                    Form ini akan {isEditing ? "mengedit" : "menambahkan"} Admin
                    Barber.
                </DialogDescription>
            </DialogHeader>

            <form
                onSubmit={onSubmit}
                encType="multipart/form-data"
                className="space-y-8"
            >
                <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-12 md:col-span-6">
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

                    <div className="col-span-12 md:col-span-6">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="text"
                            placeholder="jhon@doe.com"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="col-span-12 md:col-span-6">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative mt-2">
                            <Input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="••••••••"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            <button
                                type="button"
                                id="showPassword"
                                name="showPassword"
                                aria-label="showPassword"
                                className="absolute inset-y-0 right-0 flex items-center p-3 text-white rounded-tr-md rounded-br-md bg-primary"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>

                        <InputError message={errors.password} />
                    </div>

                    <div className="col-span-12 md:col-span-6">
                        <Label htmlFor="password_confirmation">
                            Konfirmasi Password
                        </Label>
                        <div className="relative mt-2">
                            <Input
                                type={showPasswordConfirm ? "text" : "password"}
                                id="password_confirmation"
                                name="password_confirmation"
                                placeholder="••••••••"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                            />
                            <button
                                type="button"
                                id="showPasswordConfirm"
                                name="showPasswordConfirm"
                                aria-label="showPasswordConfirm"
                                className="absolute inset-y-0 right-0 flex items-center p-3 text-white rounded-tr-md rounded-br-md bg-primary"
                                onClick={() =>
                                    setShowPasswordConfirm(!showPasswordConfirm)
                                }
                            >
                                {showPasswordConfirm ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>

                        <InputError message={errors.password_confirmation} />
                    </div>

                    <div className="col-span-12 md:col-span-6">
                        <Label htmlFor="role">Role</Label>
                        <Input
                            type="text"
                            placeholder="admin"
                            name="role"
                            value={data.role}
                            readOnly
                            onChange={(e) => setData("role", e.target.value)}
                        />
                        <InputError message={errors.role} />
                    </div>

                    <div className="col-span-12 md:col-span-6">
                        <Label htmlFor="phone">No HP</Label>
                        <Input
                            type="text"
                            placeholder="08xxxxxxx"
                            name="phone"
                            value={data.phone}
                            onChange={(e) => setData("phone", e.target.value)}
                        />
                        <InputError message={errors.phone} />
                    </div>

                    <div className="col-span-12">
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
                        src={`/avatars/${dataEdit?.photo}`}
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

export default FormUser;
