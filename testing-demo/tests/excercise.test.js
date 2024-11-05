const excercise = require('../exercise1');

describe('fizzBuzz', () => {
    it('should throws an error if the input is not a number', () => {
        const args = [null, '', 'string', NaN, false];
        args.forEach(a => {
            expect(() => { excercise.fizzBuzz(a) })
        });
    });
    it('should return fizzBuzz if the input is divsible by 3 and 5', () => {
        const result = excercise.fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    });

    it('should return Fizz if the input only divisible by 3', () => {
        const result = excercise.fizzBuzz(6);
        expect(result).toBe('Fizz');
    });
    it('should return Buzz if the input only divisible by 5', () => {
        const result = excercise.fizzBuzz(10);
        expect(result).toBe('Buzz');
    });
    it('should return the input if a number is neither divisble by 5 nor 3', () => {
        const result = excercise.fizzBuzz(7);
        expect(result).toBe(7);
    });
});
