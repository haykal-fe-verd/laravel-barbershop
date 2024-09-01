export interface Sessions {
    message?: string;
    success?: string;
    error?: string;
    snapToken?: string | null;
}

export interface Ziggy {
    routes: {
        [name: string]: string;
    };
    location: string;
    query: any;
}

export interface Link {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginationType {
    current_page: number;
    path?: string;
    first_page_url?: string;
    last_page_url?: string;
    next_page_url?: string | null;
    prev_page_url?: string | null;
    from: number;
    to: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Link[];
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    phone?: string;
    photo?: any;
    email_verified_at?: string;
}

export interface BarbermanType {
    id: number;
    name: string;
    status: string;
    photo?: any;
}

export interface GalleryType {
    id: number;
    name: string;
    photo: string;
}

export interface ProductType {
    id: number;
    name: string;
    price: number;
    description?: string;
}

export interface TransactionType {
    id: number;
    user: User;
    product: ProductType;
    barberman: BarbermanType;
    id_user: number;
    id_barberman: number;
    id_product: number;
    invoice: string;
    snap_token: string;
    snap_url: string;
    via: string;
    total: number;
    no_antrian: string;
    is_active_antrian: boolean;
    status: string;
    status_pangkas: string;
    created_at: string;
    updated_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    user: User;
    sessions: Sessions;
    ziggy: Ziggy;
    status: string;
};
