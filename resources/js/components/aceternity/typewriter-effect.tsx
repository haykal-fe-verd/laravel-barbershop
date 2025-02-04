import { useEffect } from "react";
import { motion, stagger, useAnimate, useInView } from "framer-motion";

import { cn } from "@/lib/utils";

export function TypewriterEffect({
    words,
    className,
    cursorClassName,
}: {
    words: {
        text: string;
        className?: string;
    }[];
    className?: string;
    cursorClassName?: string;
}) {
    // split text inside of words into array of characters
    const wordsArray = words.map((word) => ({
        ...word,
        text: word.text.split(""),
    }));

    const [scope, animate] = useAnimate();
    const isInView = useInView(scope);
    useEffect(() => {
        if (isInView) {
            animate(
                "span",
                {
                    display: "inline-block",
                    opacity: 1,
                    width: "fit-content",
                },
                {
                    duration: 0.3,
                    delay: stagger(0.1),
                    ease: "easeInOut",
                }
            );
        }
    }, [animate, isInView]);

    const renderWords = () => (
        <motion.div ref={scope} className="inline">
            {wordsArray.map((word, idx) => (
                <div key={`word-${idx}`} className="inline-block">
                    {word.text.map((char, index) => (
                        <motion.span
                            initial={{}}
                            key={`char-${index}`}
                            className={cn(
                                "hidden text-black opacity-0 dark:text-white",
                                word.className
                            )}
                        >
                            {char}
                        </motion.span>
                    ))}
                    &nbsp;
                </div>
            ))}
        </motion.div>
    );
    return (
        <div
            className={cn(
                "text-center text-base font-bold sm:text-xl md:text-3xl lg:text-5xl",
                className
            )}
        >
            {renderWords()}
            <motion.span
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                className={cn(
                    "inline-block h-4 w-[4px] rounded-sm bg-blue-500 md:h-6 lg:h-10",
                    cursorClassName
                )}
            />
        </div>
    );
}

export function TypewriterEffectSmooth({
    words,
    className,
    cursorClassName,
}: {
    words: {
        text: string;
        className?: string;
    }[];
    className?: string;
    cursorClassName?: string;
}) {
    // split text inside of words into array of characters
    const wordsArray = words.map((word) => ({
        ...word,
        text: word.text.split(""),
    }));
    const renderWords = () => (
        <div>
            {wordsArray.map((word, idx) => (
                <div key={`word-${idx}`} className="inline-block">
                    {word.text.map((char, index) => (
                        <span
                            key={`char-${index}`}
                            className={cn(
                                "text-black dark:text-white",
                                word.className
                            )}
                        >
                            {char}
                        </span>
                    ))}
                    &nbsp;
                </div>
            ))}
        </div>
    );

    return (
        <div
            className={cn(
                "flex space-x-1 items-center justify-center ",
                className
            )}
        >
            <motion.div
                className="overflow-hidden pb-2"
                initial={{
                    width: "0%",
                }}
                whileInView={{
                    width: "fit-content",
                }}
                transition={{
                    duration: 2,
                    ease: "linear",
                    delay: 1,
                }}
            >
                <div
                    className="text-xl md:text-5xl font-bold"
                    style={{
                        whiteSpace: "nowrap",
                    }}
                >
                    {renderWords()}{" "}
                </div>{" "}
            </motion.div>
            <motion.span
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    duration: 0.8,

                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                className={cn(
                    "block h-4 w-[4px] rounded-sm bg-primary sm:h-6 xl:h-12",
                    cursorClassName
                )}
            />
        </div>
    );
}
