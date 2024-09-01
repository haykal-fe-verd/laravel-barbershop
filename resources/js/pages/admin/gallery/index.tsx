import React from "react";
import { Head, router, usePage } from "@inertiajs/react";
import { Camera, Pencil, PlusCircle, Trash2 } from "lucide-react";

import { GalleryType, PageProps, PaginationType } from "@/types";

import AuthLayout from "@/layouts/auth-layout";
import Title from "@/components/title";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PerpageSearch from "@/components/perpage-search";
import Pagination from "@/components/pagination";
import CustomCard from "@/components/custom-card";
import Skeleton from "./skeleton";
import FormBarberman from "./form";

interface GalleryResponse extends PaginationType {
    data: GalleryType[];
}

interface IndexProps extends PageProps {
    galleries: GalleryResponse;
}

function Index() {
    // hooks
    const { galleries } = usePage<IndexProps>().props;

    // states
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const [isEditing, setIsEditing] = React.useState<boolean>(false);
    const [dataEdit, setDataEdit] = React.useState<GalleryType | null>(null);

    // events
    const onEdit = (item: GalleryType) => {
        setIsEditing(true);
        setDataEdit(item);
        setOpenModal(true);
    };

    const onDelete = (item: GalleryType) => {
        router.delete(route("gallery.destroy", item.id));
    };

    return (
        <AuthLayout>
            <Head title="Gallery" />

            <Dialog
                open={openModal}
                onOpenChange={(isOpen) => {
                    setOpenModal(isOpen);
                    if (!isOpen) {
                        setIsEditing(false);
                        setDataEdit(null);
                    }
                }}
            >
                <div className="flex flex-col space-y-5">
                    <Title title="Gallery" />

                    <div className="flex flex-col space-y-5">
                        <Button
                            onClick={() => setOpenModal(true)}
                            className="inline-flex w-fit items-center gap-2"
                        >
                            <PlusCircle className="h-4 w-4" />
                            <span>Tambah Galeri Foto</span>
                        </Button>

                        <Separator />

                        <PerpageSearch
                            setIsLoading={setIsLoading}
                            link="gallery.index"
                            perpages={galleries.per_page.toString()}
                        />

                        <div className="grid w-full grid-cols-12 gap-5">
                            {galleries.data.length <= 0 ? (
                                <div className="col-span-12">
                                    Gallery foto tidak ditemukan...
                                </div>
                            ) : (
                                galleries.data.map((item, i) => (
                                    <CustomCard
                                        key={i}
                                        className="col-span-12 md:col-span-3"
                                        title="Galeri Foto"
                                        description={item.name}
                                        header={<Skeleton href={item.photo} />}
                                        icon={
                                            <Camera className="h-4 w-4 text-primary-foreground" />
                                        }
                                        other={
                                            <div className="flex gap-3">
                                                <Button
                                                    size="icon"
                                                    onClick={() => onEdit(item)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    onClick={() =>
                                                        onDelete(item)
                                                    }
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        }
                                    />
                                ))
                            )}
                        </div>

                        <Pagination
                            current_page={galleries.current_page}
                            first_page_url={galleries.first_page_url}
                            from={galleries.from}
                            last_page={galleries.last_page}
                            last_page_url={galleries.last_page_url}
                            path={galleries.path}
                            per_page={galleries.per_page}
                            prev_page_url={galleries.prev_page_url}
                            to={galleries.to}
                            total={galleries.total}
                            links={galleries.links}
                        />
                    </div>
                </div>

                {/* modal */}
                {openModal && (
                    <FormBarberman
                        setOpenModal={setOpenModal}
                        isEditing={isEditing}
                        dataEdit={dataEdit}
                    />
                )}
            </Dialog>
        </AuthLayout>
    );
}

export default Index;
