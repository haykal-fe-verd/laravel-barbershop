import React from "react";
import { Head, router, usePage } from "@inertiajs/react";
import { Pencil, PlusCircle, Trash2, VenetianMask } from "lucide-react";

import { BarbermanType, PageProps, PaginationType } from "@/types";
import { cn } from "@/lib/utils";

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

interface BarbermanResponse extends PaginationType {
    data: BarbermanType[];
}

interface IndexProps extends PageProps {
    barbermans: BarbermanResponse;
}

function Index() {
    // hooks
    const { barbermans } = usePage<IndexProps>().props;

    // states
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const [isEditing, setIsEditing] = React.useState<boolean>(false);
    const [dataEdit, setDataEdit] = React.useState<BarbermanType | null>(null);

    // events
    const onEdit = (item: BarbermanType) => {
        setIsEditing(true);
        setDataEdit(item);
        setOpenModal(true);
    };

    const onDelete = (item: BarbermanType) => {
        router.delete(route("barberman.destroy", item.id));
    };

    return (
        <AuthLayout>
            <Head title="Barberman" />

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
                    <Title title="Barberman" />

                    <div className="flex flex-col space-y-5">
                        <Button
                            onClick={() => setOpenModal(true)}
                            className="inline-flex w-fit items-center gap-2"
                        >
                            <PlusCircle className="h-4 w-4" />
                            <span>Tambah Barberman</span>
                        </Button>

                        <Separator />

                        <PerpageSearch
                            setIsLoading={setIsLoading}
                            link="barberman.index"
                            perpages={barbermans.per_page.toString()}
                        />

                        <div className="grid w-full grid-cols-12 gap-5">
                            {barbermans.data.length <= 0 ? (
                                <div className="col-span-12">
                                    Barberman tidak ditemukan...
                                </div>
                            ) : (
                                barbermans.data.map((item, i) => (
                                    <CustomCard
                                        key={i}
                                        className="col-span-12 md:col-span-3"
                                        title={
                                            <span className="flex items-center gap-1">
                                                <div
                                                    className={cn(
                                                        "h-3 w-3 rounded-full",
                                                        item.status === "online"
                                                            ? "bg-green-500"
                                                            : "bg-destructive"
                                                    )}
                                                />
                                                {item.status}
                                            </span>
                                        }
                                        description={item.name}
                                        header={<Skeleton href={item.photo} />}
                                        icon={
                                            <VenetianMask className="h-4 w-4 text-primary-foreground" />
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
                            current_page={barbermans.current_page}
                            first_page_url={barbermans.first_page_url}
                            from={barbermans.from}
                            last_page={barbermans.last_page}
                            last_page_url={barbermans.last_page_url}
                            path={barbermans.path}
                            per_page={barbermans.per_page}
                            prev_page_url={barbermans.prev_page_url}
                            to={barbermans.to}
                            total={barbermans.total}
                            links={barbermans.links}
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
