export function convertBpmToDelayMs(bpm: number) : number {
    const aBeatEveryXSeconds = 60 / bpm;
    return Math.trunc(aBeatEveryXSeconds * 1000);
}

export function convertDelayMsToBpm(delayMs: number) : number {
    const unrounded = 60 / (delayMs / 1000);

    // Round result to 1 decimal.
    return Math.round(unrounded * 10) / 10;
}