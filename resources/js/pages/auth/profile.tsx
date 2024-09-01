import React from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import { CameraIcon, Loader2 } from "lucide-react";

import { PageProps } from "@/types";

import { cn, getInitial } from "@/lib/utils";
import AuthLayout from "@/layouts/auth-layout";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import InputError from "@/components/input-error";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Title from "@/components/title";

interface ProfileProps extends PageProps {
    mustVerifyEmail?: boolean;
}

function Profile() {
    // hooks
    const { mustVerifyEmail, user } = usePage<ProfileProps>().props;
    const { data, setData, post, processing, errors } = useForm({
        name: user?.name,
        email: user?.email,
        role: user?.role,
        phone: user?.phone,
        photo: user?.photo,
    });

    // states
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

    // events
    const browse = () => {
        inputRef.current?.click();
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setData("photo", file);
        if (file) {
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

        post(route("profile.update"), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <AuthLayout>
            <Head title="Profile" />

            <div className="flex flex-col space-y-5">
                <Title title="Profile" />

                <div className="w-full flex flex-col space-y-5">
                    <form
                        onSubmit={onSubmit}
                        encType="multipart/form-data"
                        className="w-full space-y-5"
                    >
                        <div className="relative w-full h-60 justify-center items-center flex">
                            <input
                                id="photo"
                                name="photo"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={inputRef}
                                onChange={onChange}
                            />
                            <Avatar
                                className={cn(
                                    "absolute object-cover border-2 rounded-full w-60 h-60"
                                )}
                            >
                                {previewUrl ? (
                                    <AvatarImage
                                        id="photoPreview"
                                        src={previewUrl}
                                        className="object-cover border-2 rounded-full w-60 h-60"
                                    />
                                ) : (
                                    <AvatarImage
                                        id="photoPreview"
                                        src={`/avatars/${user?.photo}`}
                                        className="object-cover border-2 rounded-full w-60 h-60"
                                    />
                                )}
                                <AvatarFallback>
                                    {getInitial(user?.name)}
                                </AvatarFallback>
                            </Avatar>
                            <button
                                type="button"
                                onClick={browse}
                                className="absolute flex items-center justify-center text-white transition-opacity duration-300 bg-black rounded-full opacity-50 w-60 h-60 hover:opacity-80"
                            >
                                <CameraIcon className="w-5 h-5" />
                            </button>
                            <div className="text-center -bottom-5 absolute">
                                <InputError message={errors.photo} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            <div className="col-span-2 lg:col-span-1">
                                <Label htmlFor="name">Nama Lengkap</Label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="col-span-2 lg:col-span-1">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="col-span-2 lg:col-span-1">
                                <Label htmlFor="phone">No HP</Label>
                                <Input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                />
                                <InputError message={errors.phone} />
                            </div>

                            <Button
                                type="submit"
                                disabled={processing}
                                className={cn(
                                    "inline-flex flex-row gap-2 col-span-2 items-center w-fit"
                                )}
                            >
                                {processing && (
                                    <Loader2 className=" w-4 h-4 animate-spin" />
                                )}
                                <span>Simpan</span>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthLayout>
    );
}

export default Profile;
