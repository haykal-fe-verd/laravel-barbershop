import React from "react";

interface TitleProps {
    title: string;
}

function Title({ title }: TitleProps) {
    return (
        <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        </div>
    );
}

export default Title;
