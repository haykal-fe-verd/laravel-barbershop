import React from "react";

function AuthDate() {
    // states
    const [currentDate, setCurrentDate] = React.useState(new Date());

    // events
    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    };

    const currentDateFormatted = currentDate.toLocaleDateString(
        "id-ID",
        options
    );

    // mounted
    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="hidden items-center space-x-2 lg:flex">
            <div className="rounded-md border border-primary px-2 py-1 text-sm">
                {currentDateFormatted}
            </div>
        </div>
    );
}

export default AuthDate;
