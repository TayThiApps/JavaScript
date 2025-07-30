import { myFunction } from '../src/main.js';

describe('myFunction', () => {
    test('should return the correct value for input 1', () => {
        expect(myFunction(1)).toBe('Expected Output 1');
    });

    test('should return the correct value for input 2', () => {
        expect(myFunction(2)).toBe('Expected Output 2');
    });

    test('should handle edge cases', () => {
        expect(myFunction(0)).toBe('Expected Output for Edge Case');
    });
});