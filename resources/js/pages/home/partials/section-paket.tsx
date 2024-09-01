import { Link } from "@inertiajs/react";
import { ArrowRight, Rocket } from "lucide-react";

import { ProductType } from "@/types";

import { currencyFormatter } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
    GlowingStarsBackgroundCard,
    GlowingStarsDescription,
    GlowingStarsTitle,
} from "@/components/aceternity/glowing-stars";
import { Separator } from "@/components/ui/separator";

function SectionPaket({ products }: { products: ProductType[] }) {
    return (
        <section id="section-paket" className="w-full py-10 bg-background">
            <div className="container">
                <div className="w-full flex flex-col gap-10">
                    <div className="text-center leading-relaxed">
                        <h1 className="text-3xl font-bold text-primary">
                            Paket
                        </h1>
                        <h2 className="text-sm">
                            Nikmati paket terbaru dan termurah dari kami
                        </h2>
                    </div>

                    <div className="grid grid-cols-4 gap-10 w-full">
                        {products.map((item, index) => (
                            <div
                                key={index}
                                className="col-span-4 md:col-span-1"
                            >
                                <GlowingStarsBackgroundCard>
                                    <GlowingStarsTitle>
                                        {currencyFormatter(item.price)}
                                    </GlowingStarsTitle>
                                    <div className="flex justify-between items-end">
                                        <GlowingStarsDescription>
                                            {item.name}
                                        </GlowingStarsDescription>
                                        <div className="h-8 w-8 rounded-full flex items-center justify-center bg-primary">
                                            <ArrowRight className="h-4 w-4 text-primary-foreground" />
                                        </div>
                                    </div>
                                </GlowingStarsBackgroundCard>
                            </div>
                        ))}
                    </div>

                    <div className="flex w-full items-center justify-center">
                        <Link
                            href={route("booking.index")}
                            className={buttonVariants({
                                size: "sm",
                                className: "inline-flex items-center gap-2",
                            })}
                        >
                            <Rocket className="h-4 w-4" />
                            <span>Booking sekarang</span>
                        </Link>
                    </div>
                </div>
                <Separator className="mt-16" />
            </div>
        </section>
    );
}

export default SectionPaket;
