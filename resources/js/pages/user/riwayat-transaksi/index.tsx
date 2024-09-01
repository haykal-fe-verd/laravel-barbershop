import React from "react";
import { Head, usePage } from "@inertiajs/react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { DollarSign } from "lucide-react";

import { PageProps, PaginationType, TransactionType } from "@/types";

import { cn, currencyFormatter } from "@/lib/utils";
import AuthLayout from "@/layouts/auth-layout";
import Title from "@/components/title";
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
import handlPayment from "@/lib/handle-payment";

interface TransactionResponse extends PaginationType {
    data: TransactionType[];
}

interface IndexProps extends PageProps {
    transactions: TransactionResponse;
}

function Index() {
    // hooks
    const { transactions } = usePage<IndexProps>().props;

    // states
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    // events
    const onBayar = (item: TransactionType) => {
        handlPayment(item.snap_token);
    };

    // set midtrans
    React.useEffect(() => {
        const midtransUrl = import.meta.env.VITE_MIDTRANS_SNAP_URL;
        const midtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

        let scriptTag = document.createElement("script");
        scriptTag.src = midtransUrl;
        scriptTag.setAttribute("data-client-key", midtransClientKey);

        document.body.appendChild(scriptTag);

        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);

    // table
    const columns = [
        { name: "#", className: "text-center w-10" },
        { name: "Tanggal", className: "text-left" },
        { name: "Invoice", className: "text-left" },
        { name: "Nama", className: "text-left" },
        { name: "Paket", className: "text-left" },
        { name: "Barberman", className: "text-left" },
        { name: "No Antrian", className: "text-left" },
        { name: "Via", className: "text-left" },
        { name: "Total", className: "text-left" },
        { name: "Status Bayar", className: "text-center" },
        { name: "Status Pangkas", className: "text-center" },
        { name: "@", className: "text-center w-10" },
    ];

    return (
        <AuthLayout>
            <Head title="Transaksi Saya" />

            <div className="flex flex-col space-y-5">
                <Title title="Transaksi Saya" />

                <div className="flex flex-col space-y-5">
                    <Separator />

                    <PerpageSearch
                        setIsLoading={setIsLoading}
                        link="transaction.user"
                        perpages={transactions.per_page.toString()}
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
                                ) : transactions.data.length <= 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="text-center"
                                        >
                                            Tidak ada data untuk ditampilkan.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    transactions.data.map((item, index) => (
                                        <TableRow
                                            key={index}
                                            className="odd:bg-white even:bg-muted dark:odd:bg-slate-700"
                                        >
                                            <TableCell className="text-center">
                                                {transactions.from + index}
                                            </TableCell>
                                            <TableCell className="">
                                                {format(
                                                    item.created_at,
                                                    "d MMMM y",
                                                    { locale: id }
                                                )}
                                            </TableCell>
                                            <TableCell className="">
                                                {item.invoice}
                                            </TableCell>
                                            <TableCell className="">
                                                {item.user.name}
                                            </TableCell>
                                            <TableCell className="">
                                                {item.product.name}
                                            </TableCell>
                                            <TableCell className="">
                                                {item.barberman.name}
                                            </TableCell>
                                            <TableCell className="">
                                                {item.no_antrian}
                                            </TableCell>
                                            <TableCell className="">
                                                {item.via}
                                            </TableCell>
                                            <TableCell className="">
                                                {item.total !== null
                                                    ? currencyFormatter(
                                                          item.total
                                                      )
                                                    : "-"}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <span
                                                    className={cn(
                                                        "rounded-md px-3 py-1 text-sm text-white text-nowrap",
                                                        item.status ===
                                                            "settlement"
                                                            ? "bg-green-500"
                                                            : "bg-red-500"
                                                    )}
                                                >
                                                    {item.status ===
                                                    "settlement"
                                                        ? "Lunas"
                                                        : "Belum Lunas"}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <span
                                                    className={cn(
                                                        "rounded-md px-3 py-1 text-sm text-white text-nowrap",
                                                        item.status_pangkas !==
                                                            "pending"
                                                            ? "bg-green-500"
                                                            : "bg-red-500"
                                                    )}
                                                >
                                                    {item.status_pangkas !==
                                                    "pending"
                                                        ? "Sudah Pangkas"
                                                        : "Belum Pangkas"}
                                                </span>
                                            </TableCell>
                                            <TableCell className="">
                                                {item.status === "pending" &&
                                                    item.via !== "tunai" && (
                                                        <button
                                                            onClick={() =>
                                                                onBayar(item)
                                                            }
                                                            className="flex items-center justify-center gap-2 px-3 py-1 text-center text-primary-foreground rounded-md bg-primary"
                                                        >
                                                            <DollarSign className="w-4 h-4 mr-3" />
                                                            Bayar
                                                        </button>
                                                    )}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <Pagination
                        current_page={transactions.current_page}
                        first_page_url={transactions.first_page_url}
                        from={transactions.from}
                        last_page={transactions.last_page}
                        last_page_url={transactions.last_page_url}
                        path={transactions.path}
                        per_page={transactions.per_page}
                        prev_page_url={transactions.prev_page_url}
                        to={transactions.to}
                        total={transactions.total}
                        links={transactions.links}
                    />
                </div>
            </div>
        </AuthLayout>
    );
}

export default Index;
