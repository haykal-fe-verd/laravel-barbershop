interface ProtectedNavigationType {
    name: string;
    href: string;
    roles: string[];
}

export const authNavigations: ProtectedNavigationType[] = [
    {
        name: "Dashboard",
        href: route("dashboard"),
        roles: ["admin", "user"],
    },

    // admin
    {
        name: "Antrian",
        href: route("antrian.index"),
        roles: ["admin"],
    },
    {
        name: "Barberman",
        href: route("barberman.index"),
        roles: ["admin"],
    },
    {
        name: "Gallery",
        href: route("gallery.index"),
        roles: ["admin"],
    },
    {
        name: "Paket Barber",
        href: route("product.index"),
        roles: ["admin"],
    },

    {
        name: "User",
        href: route("user.index"),
        roles: ["admin"],
    },
    {
        name: "Transaksi",
        href: route("transaction.index"),
        roles: ["admin"],
    },
    {
        name: "Laporan",
        href: route("report.index"),
        roles: ["admin"],
    },

    // user
    {
        name: "Booking",
        href: route("booking.index"),
        roles: ["user"],
    },
    {
        name: "Barberman",
        href: route("barberman.user"),
        roles: ["user"],
    },
    {
        name: "Riwayat Transaksi",
        href: route("transaction.user"),
        roles: ["user"],
    },
];
