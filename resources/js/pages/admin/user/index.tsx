import React from "react";
import { Head, router, usePage } from "@inertiajs/react";
import {
    Camera,
    MoreHorizontal,
    Pencil,
    PlusCircle,
    Trash2,
} from "lucide-react";

import { PageProps, PaginationType, User } from "@/types";

import { cn, getInitial } from "@/lib/utils";
import AuthLayout from "@/layouts/auth-layout";
import Title from "@/components/title";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PerpageSearch from "@/components/perpage-search";
import Pagination from "@/components/pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FormBarberman from "./form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserResponse extends PaginationType {
    data: User[];
}

interface IndexProps extends PageProps {
    users: UserResponse;
}

function Index() {
    // hooks
    const { users } = usePage<IndexProps>().props;

    // states
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const [isEditing, setIsEditing] = React.useState<boolean>(false);
    const [dataEdit, setDataEdit] = React.useState<User | null>(null);

    // events
    const onEdit = (item: User) => {
        setIsEditing(true);
        setDataEdit(item);
        setOpenModal(true);
    };

    const onDelete = (item: User) => {
        router.delete(route("user.destroy", item.id));
    };

    // table
    const columns = [
        { name: "#", className: "text-center w-10" },
        { name: "Nama", className: "text-left" },
        { name: "Email", className: "text-left" },
        { name: "No Hp", className: "text-left" },
        { name: "Role", className: "text-center" },
        { name: "Foto", className: "text-center" },
        { name: "@", className: "text-center w-20" },
    ];

    return (
        <AuthLayout>
            <Head title="User" />

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
                    <Title title="User" />

                    <div className="flex flex-col space-y-5">
                        <Button
                            onClick={() => setOpenModal(true)}
                            className="inline-flex w-fit items-center gap-2"
                        >
                            <PlusCircle className="h-4 w-4" />
                            <span>Tambah Admin Barber</span>
                        </Button>

                        <Separator />

                        <PerpageSearch
                            setIsLoading={setIsLoading}
                            link="user.index"
                            perpages={users.per_page.toString()}
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
                                    ) : users.data.length <= 0 ? (
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
                                        users.data.map((item, index) => {
                                            const falbackAvatar = getInitial(
                                                item.name
                                            );

                                            return (
                                                <TableRow
                                                    key={index}
                                                    className="odd:bg-white even:bg-muted dark:odd:bg-slate-700"
                                                >
                                                    <TableCell className="text-center">
                                                        {users.from + index}
                                                    </TableCell>
                                                    <TableCell className="">
                                                        {item.name}
                                                    </TableCell>
                                                    <TableCell className="">
                                                        {item.email}
                                                    </TableCell>
                                                    <TableCell className="">
                                                        {item.phone}
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <span
                                                            className={cn(
                                                                "rounded-md px-2 py-1 text-xs text-white",
                                                                item.role ===
                                                                    "admin"
                                                                    ? "bg-amber-500"
                                                                    : "bg-sky-500"
                                                            )}
                                                        >
                                                            {item.role}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <Avatar className="h-8 w-8 border">
                                                            <AvatarImage
                                                                src={`/avatars/${item.photo}`}
                                                                alt={`@${item.name}`}
                                                            />
                                                            <AvatarFallback>
                                                                {falbackAvatar}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        {item.role ===
                                                        "admin" ? (
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger
                                                                    asChild
                                                                >
                                                                    <Button
                                                                        variant="ghost"
                                                                        className="z-50 h-8 w-8 p-0"
                                                                    >
                                                                        <span className="sr-only">
                                                                            Open
                                                                            menu
                                                                        </span>
                                                                        <MoreHorizontal className="h-4 w-4" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end">
                                                                    <DropdownMenuItem
                                                                        className="items-center gap-3"
                                                                        onClick={() =>
                                                                            onEdit(
                                                                                item
                                                                            )
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
                                                        ) : null}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        <Pagination
                            current_page={users.current_page}
                            first_page_url={users.first_page_url}
                            from={users.from}
                            last_page={users.last_page}
                            last_page_url={users.last_page_url}
                            path={users.path}
                            per_page={users.per_page}
                            prev_page_url={users.prev_page_url}
                            to={users.to}
                            total={users.total}
                            links={users.links}
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
