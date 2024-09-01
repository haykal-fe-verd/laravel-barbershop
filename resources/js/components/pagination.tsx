import React from "react";
import { Link } from "@inertiajs/react";

import { PaginationType } from "@/types";

import { Button } from "@/components/ui/button";

function Pagination({
    current_page,
    first_page_url,
    from,
    last_page,
    last_page_url,
    path,
    per_page,
    prev_page_url,
    to,
    total,
    links,
}: PaginationType) {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center items-start justify-between gap-5">
            <p className="text-sm">
                Showing <span className="font-bold">{from}</span> to{" "}
                <span className="font-bold">{to}</span> of{" "}
                <span className="font-bold">{total}</span> results
            </p>

            <div className="flex flex-wrap items-center justify-end space-x-1">
                {links.map((item: any, index: number) => {
                    return (
                        <Button
                            key={index}
                            variant={item.active ? "default" : "outline"}
                            size="sm"
                            disabled={!item.url}
                            className={`p-0 ${index > 0 ? "ml-2" : ""}`}
                            style={{ flexShrink: 0, minWidth: "30px" }}
                        >
                            <Link
                                href={item.url}
                                preserveState
                                className="px-3"
                            >
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: item.label,
                                    }}
                                />
                            </Link>
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}

export default Pagination;
