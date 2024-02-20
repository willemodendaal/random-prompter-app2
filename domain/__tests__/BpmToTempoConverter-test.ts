import { convertBpmToDelayMs, convertDelayMsToBpm } from "../BpmToTempoConverter";

describe('BpmToTempoConverter, bpm to delay', () => {

    it('bpm to delayMs 1s', () => {
        const delayMs = convertBpmToDelayMs(1);

        // 1 bpm means there is a delay of 60 seconds between beats.
        // (there is only one per minute).
        // (converted to milliseconds by x100)
        expect(delayMs).toBe(60 * 1000);
    });

    it('2 bpm to delayMs', () => {
        const delayMs = convertBpmToDelayMs(2);
        expect(delayMs).toBe(60 * 500);
    });

    it('60 bpm to delayMs', () => {
        const delayMs = convertBpmToDelayMs(60);
        expect(delayMs).toEqual(1000);
    });

    it('delayMs result is truncated (no need for sub-millisecond results)', () => {
        const delayMs = convertBpmToDelayMs(211);
        expect(delayMs).toEqual(284);
    });
});

describe('BpmToTempoConverter, delay to bpm', () => {
    it('delayMs 60 seconds is 1bpm', () => {
        const bpm = convertDelayMsToBpm(60 * 1000);
        expect(bpm).toBe(1);
    });

    it('delayMs 30 seconds is 2bpm', () => {
        const bpm = convertDelayMsToBpm(30 * 1000);
        expect(bpm).toBe(2);
    });

    it('delayMs 120 seconds is 0.5bpm', () => {
        const bpm = convertDelayMsToBpm(120 * 1000);
        expect(bpm).toBe(0.5);
    });

    it('delayMs 1 second is 60bpm', () => {
        const bpm = convertDelayMsToBpm(1 * 1000);
        expect(bpm).toBe(60);
    });

    it('delayMs 0.5 second is 60bpm', () => {
        const bpm = convertDelayMsToBpm(500);
        expect(bpm).toBe(120);
    });

    it('Bpm result is rounded to 1 decimal', () => {
        const bpm = convertDelayMsToBpm(511);
        expect(bpm).toBe(117.4);
    });
});