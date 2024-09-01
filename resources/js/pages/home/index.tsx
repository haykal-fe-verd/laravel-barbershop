import React from "react";
import { Head, usePage } from "@inertiajs/react";

import { BarbermanType, GalleryType, PageProps, ProductType } from "@/types";

import GuestLayout from "@/layouts/guest-layout";
import Footer from "./partials/footer";
import SectionHero from "./partials/section-hero";
import SectionPaket from "./partials/section-paket";
import SectionBarberman from "./partials/section-barberman";
import SectionGaleri from "./partials/section-gallery";
import SectionMap from "./partials/section-map";
import InfiniteMoving from "@/components/aceternity/infinite-moving";
import logos from "@/data/logos";

interface HomeIndexProps extends PageProps {
    products: ProductType[];
    barbermans: BarbermanType[];
    galleries: GalleryType[];
}
function HomeIndex() {
    // hooks
    const { products, barbermans, galleries } = usePage<HomeIndexProps>().props;

    return (
        <GuestLayout>
            <Head title="Home" />

            <div className="pointer-events-none fixed z-10 flex min-h-screen w-screen justify-center px-6 py-40">
                <div className="bg-dot-thick absolute inset-0 opacity-25 bg-dot-thick-black/[0.5] dark:bg-dot-thick-white/[0.5]" />
                <img
                    src="/images/mesh.svg"
                    alt="bg-mesh"
                    className="absolute bottom-1 z-10 h-[600px] opacity-15"
                />
            </div>

            <div className="relative z-20">
                <SectionHero />
                <SectionPaket products={products} />
                <SectionBarberman barbermans={barbermans} />
                <SectionGaleri galleries={galleries} />
                <SectionMap />
                <div className="w-full bg-background antialiased items-center justify-center relative overflow-hidden">
                    <InfiniteMoving
                        items={logos}
                        direction="right"
                        speed="fast"
                    />
                </div>

                <Footer />
            </div>
        </GuestLayout>
    );
}

export default HomeIndex;
