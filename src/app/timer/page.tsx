"use client";

import { useEffect, useState } from "react";

const TIMER_LENGTH = 150;

export default function TimerPage() {
    const [remaining, setRemaining] = useState(TIMER_LENGTH);
    const [timerInterval, setTimerInterval] = useState<number | null>(null);

    useEffect(() => {
        // @ts-expect-error `setInterval` returns `NodeJS.Timer` instead of the `number` - but this is web.
        setTimerInterval(setInterval(() => setRemaining((r) => r - 1), 1000));

        return () => {
            if (timerInterval) {
                clearInterval(timerInterval);
                setTimerInterval(null);
            }
        };
    }, [timerInterval]);
}
