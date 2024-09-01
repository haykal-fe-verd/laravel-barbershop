import React from "react";
import { router } from "@inertiajs/react";
import { pickBy } from "lodash";
import { Search } from "lucide-react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface PerpageProps {
    perpages: string;
    link: string;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
function PerpageSearch({ perpages, link, setIsLoading }: PerpageProps) {
    // states
    const perpage = React.useRef<string>(perpages ?? "8");
    const [search, setSearch] = React.useState<string>("");
    const [searchChanged, setSearchChanged] = React.useState<boolean>(false);

    // events
    const handlePerPageChange = (e: string) => {
        perpage.current = e;
        getData();
    };

    const getData = () => {
        setIsLoading(true);
        router.get(route(link), pickBy({ perpage: perpage.current, search }), {
            preserveScroll: true,
            preserveState: true,
            onFinish: () => setIsLoading(false),
        });
    };

    React.useEffect(() => {
        if (searchChanged) {
            const delaySearch = setTimeout(() => {
                getData();
            }, 300);

            return () => {
                clearTimeout(delaySearch);
            };
        }
        setSearchChanged(true);
    }, [search, setSearchChanged]);

    return (
        <div className="flex flex-col items-start justify-between lg:flex-row gap-5">
            <div className="flex items-center">
                <span className="mr-2">Show</span>
                <Select
                    name="perpage"
                    onValueChange={handlePerPageChange}
                    defaultValue={perpage.current.toString()}
                >
                    <SelectTrigger className="w-20">
                        <SelectValue placeholder={perpage.current} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={String(8)}>8</SelectItem>
                        <SelectItem value={String(10)}>10</SelectItem>
                        <SelectItem value={String(50)}>50</SelectItem>
                        <SelectItem value={String(100)}>100</SelectItem>
                    </SelectContent>
                </Select>
                <span className="ml-2">Entries</span>
            </div>

            <div className="relative w-full rounded-md md:w-1/3">
                <div className="absolute inset-y-0 left-0 flex items-center p-3 pointer-events-none rounded-tl-md rounded-bl-md bg-primary">
                    <Search className="text-primary-foreground" />
                </div>
                <Input
                    name="search"
                    id="search"
                    autoComplete="search"
                    type="search"
                    placeholder="Search something..."
                    className="pl-14"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </div>
    );
}

export default PerpageSearch;
