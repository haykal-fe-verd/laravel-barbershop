import React from "react";

import { TypewriterEffectSmooth } from "@/components/aceternity/typewriter-effect";
import { TextGenerateEffect } from "@/components/aceternity/text-generate-effect";
import { FlipWords } from "@/components/aceternity/flip-words";

function SectionHero() {
    const words = [
        {
            text: "Selamat",
        },
        {
            text: "datang",
        },
        {
            text: "di",
        },
        {
            text: "Barbershop.",
            className: "text-primary font-bold",
        },
    ];

    const kata = ["nyaman", "mudah", "aman", "cepat"];

    const text = `Nikmati pengalaman pemotongan rambut yang tak tertandingi dengan layanan profesional. Apakah Anda siap untuk penampilan baru atau sekadar ingin merawat diri, tim ahli kami siap memberikan pelayanan terbaik untuk Anda. Jadwalkan janji temu dengan mudah, pilih dari berbagai layanan kami, dan rasakan transformasi yang membuat Anda semakin percaya diri.`;

    return (
        <section
            id="home"
            className="container mx-auto my-24 mt-32 mb-24 flex flex-col text-center"
        >
            <h1 className="text-4xl font-extrabold text-center leading-relaxed sm:text-6xl">
                <TypewriterEffectSmooth words={words} className="mt-32" />
                <br />

                <FlipWords words={kata} />
            </h1>
            <div className="mt-5 text-xl text-muted-foreground text-justify">
                <TextGenerateEffect words={text} />
            </div>

            <div className="mt-5 w-full items-center justify-center">
                <img
                    src="/images/hero.png"
                    alt="hero"
                    className="pointer-events-none mx-auto max-h-[300px] w-fit"
                />
            </div>
        </section>
    );
}

export default SectionHero;
