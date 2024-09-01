import React from "react";
import { Head, router, usePage } from "@inertiajs/react";
import { MoreHorizontal, Pencil, PlusCircle, Trash2 } from "lucide-react";

import { PageProps, PaginationType, ProductType } from "@/types";

import { cn, currencyFormatter, truncateText } from "@/lib/utils";
import AuthLayout from "@/layouts/auth-layout";
import Title from "@/components/title";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import PerpageSearch from "@/components/perpage-search";
import Pagination from "@/components/pagination";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FormProduct from "./form";

interface ProductResponse extends PaginationType {
    data: ProductType[];
}

interface IndexProps extends PageProps {
    products: ProductResponse;
}

function Index() {
    // hooks
    const { products } = usePage<IndexProps>().props;

    // states
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const [isEditing, setIsEditing] = React.useState<boolean>(false);
    const [dataEdit, setDataEdit] = React.useState<ProductType | null>(null);

    // events
    const onEdit = (item: ProductType) => {
        setIsEditing(true);
        setDataEdit(item);
        setOpenModal(true);
    };

    const onDelete = (item: ProductType) => {
        router.delete(route("product.destroy", item.id));
    };

    // table
    const columns = [
        { name: "#", className: "text-center w-10" },
        { name: "Nama Paket", className: "text-left" },
        { name: "Harga Paket", className: "text-left" },
        { name: "Deskripsi", className: "text-left" },
        { name: "@", className: "text-center w-20" },
    ];

    return (
        <AuthLayout>
            <Head title="Paket Barber" />

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
                    <Title title="Paket Barber" />

                    <div className="flex flex-col space-y-5">
                        <Button
                            onClick={() => setOpenModal(true)}
                            className="inline-flex w-fit items-center gap-2"
                        >
                            <PlusCircle className="h-4 w-4" />
                            <span>Tambah Paket Barber</span>
                        </Button>

                        <Separator />

                        <PerpageSearch
                            setIsLoading={setIsLoading}
                            link="product.index"
                            perpages={products.per_page.toString()}
                        />

                        <div className="border rounded-md overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-primary hover:bg-primary/90">
                                        {columns.map((column) => (
                                            <TableHead
                                                key={column.name}
                                                className={cn(
                                                    column.className,
                                                    "text-primary-foreground"
                                                )}
                                            >
                                                {column.name}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {isLoading ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={columns.length}
                                                className="text-center"
                                            >
                                                Loading...
                                            </TableCell>
                                        </TableRow>
                                    ) : products.data.length <= 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={columns.length}
                                                className="text-center"
                                            >
                                                Tidak ada data untuk
                                                ditampilkan.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        products.data.map((item, index) => (
                                            <TableRow
                                                key={index}
                                                className="odd:bg-white even:bg-muted dark:odd:bg-slate-700"
                                            >
                                                <TableCell className="text-center">
                                                    {products.from + index}
                                                </TableCell>
                                                <TableCell className="">
                                                    {item.name}
                                                </TableCell>
                                                <TableCell className="">
                                                    {currencyFormatter(
                                                        item.price
                                                    )}
                                                </TableCell>
                                                <TableCell className="">
                                                    {item.description
                                                        ? truncateText(
                                                              item.description,
                                                              10
                                                          )
                                                        : "-"}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                className="z-50 h-8 w-8 p-0"
                                                            >
                                                                <span className="sr-only">
                                                                    Open menu
                                                                </span>
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem
                                                                className="items-center gap-3"
                                                                onClick={() =>
                                                                    onEdit(item)
                                                                }
                                                            >
                                                                <Pencil className="h-4 w-4" />
                                                                <span>
                                                                    Edit
                                                                </span>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                className="items-center gap-3"
                                                                onClick={() =>
                                                                    onDelete(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                                <span>
                                                                    Hapus
                                                                </span>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        <Pagination
                            current_page={products.current_page}
                            first_page_url={products.first_page_url}
                            from={products.from}
                            last_page={products.last_page}
                            last_page_url={products.last_page_url}
                            path={products.path}
                            per_page={products.per_page}
                            prev_page_url={products.prev_page_url}
                            to={products.to}
                            total={products.total}
                            links={products.links}
                        />
                    </div>
                </div>

                {/* modal */}
                {openModal && (
                    <FormProduct
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
