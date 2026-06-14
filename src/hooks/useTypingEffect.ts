import { useEffect, useState } from "react";

export function useTypingEffect(
    words: string[],
    typeSpeed: number = 80,
    deleteSpeed: number = 50,
    pauseMs: number = 1500,
) {
    const [text, setText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[wordIndex];

        if (isDeleting && text === "") {
            const timeout = setTimeout(() => {
                setWordIndex((prev) => (prev + 1) % words.length);
                setIsDeleting(false);
            }, typeSpeed);
            return () => clearTimeout(timeout);
        }

        if (!isDeleting && text === currentWord) {
            const timeout = setTimeout(() => {
                setIsDeleting(true);
            }, pauseMs);
            return () => clearTimeout(timeout);
        }

        const timeout = setTimeout(
            () => {
                if (isDeleting) {
                    setText(currentWord.slice(0, text.length - 1));
                } else {
                    setText(currentWord.slice(0, text.length + 1));
                }
            },
            isDeleting ? deleteSpeed : typeSpeed,
        );

        return () => clearTimeout(timeout);
    }, [text, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, pauseMs]);

    return text;
}
