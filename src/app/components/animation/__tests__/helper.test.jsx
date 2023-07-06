import { getAnimationDelays } from '../helper';

describe('getAnimationDelays function', () => {
    it('returns an array of lengths equal to amountParent input', () => {
        const result = getAnimationDelays(3);
        expect(result).toHaveLength(3);
    });

    it('returns an array with first element equal to parentDelay', () => {
        const result = getAnimationDelays(3);
        expect(result[0]).toEqual(1000);
    });

    it('returns the expected delay values based on amountChildren and previous delay', () => {
        const result = getAnimationDelays(3, 2);
        expect(result).toEqual([1000, 1470, 1963]);
    });
});
