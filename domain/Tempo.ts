
export enum KindOfTiming {
    Bpm,
    DelaySeconds
}

export type SelectedTempo = {
    kind: KindOfTiming,
    value: number,
    asBpm: number
}

