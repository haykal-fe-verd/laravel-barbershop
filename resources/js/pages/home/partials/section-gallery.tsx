/* eslint-disable no-plusplus */

import React from "react";

import { GalleryType } from "@/types";

import { Separator } from "@/components/ui/separator";
import { ParallaxScroll } from "@/components/aceternity/parallax-scroll";

function SectionGaleri({ galleries }: { galleries: GalleryType[] }) {
    const imageUrls = galleries
        .map((gallery) => {
            return `/galleries/${gallery.photo}`;
        })
        .flat();

    return (
        <section id="section-galeri" className="w-full py-10 bg-background">
            <div className="container">
                <div className="w-full flex flex-col gap-10">
                    <div className="text-center leading-relaxed">
                        <h1 className="text-3xl font-bold text-primary">
                            Galeri
                        </h1>
                        <h2 className="text-sm">Foto terbaru dari kami</h2>
                    </div>
                    <div className="w-full">
                        <ParallaxScroll images={imageUrls} />
                    </div>
                </div>
                <Separator className="mt-16" />
            </div>
        </section>
    );
}

export default SectionGaleri;
