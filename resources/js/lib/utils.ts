import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getInitial(name: string | null | undefined): string {
    if (!name) return "?";

    const nameParts = name.split(" ");
    const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || "";
    const lastInitial =
        nameParts.length > 1 ? nameParts[1]?.charAt(0).toUpperCase() || "" : "";
    return firstInitial + lastInitial;
}

export const currencyFormatter = (
    value: number,
    currencyCode: string = "IDR",
    locale: string = "id-ID"
): string => {
    const options: Intl.NumberFormatOptions = {
        style: "currency",
        currency: currencyCode,
        currencyDisplay: "symbol",
        minimumFractionDigits: 0,
    };

    return new Intl.NumberFormat(locale, options).format(value);
};

export function dateFormatter(dateStr: string) {
    const date = new Date(dateStr);
    const formatter = new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return formatter.format(date);
}

export function truncateText(text: string, maxWord: number) {
    const words = text.split(" ");

    if (words.length > maxWord) {
        return words.slice(0, maxWord).join(" ") + "...";
    }

    return text;
}

export const splitBarbermanValue = (
    item: string
): { id: string; name: string } => {
    const [id, name] = item.split("-");

    return { id, name };
};
