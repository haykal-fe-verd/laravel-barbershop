import React from "react";

function Skeleton({ href }: { href: string }) {
    return (
        <div className="flex h-full min-h-[6rem] w-full flex-1 rounded-xl border border-transparent bg-background">
            <img
                src={`/barbermans/${href}`}
                alt="skeleton"
                className="h-60 w-full rounded-md border border-primary object-cover"
            />
        </div>
    );
}

export default Skeleton;
