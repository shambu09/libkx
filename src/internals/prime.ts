import { ZERO, ONE, TWO } from "../domain/Constants";

export type FPower = (value: bigint, power: bigint, modulus: bigint) => bigint;
export type FGenerateRandomByBoundary = (left: bigint, right: bigint) => bigint;
export type FGenerateRandomByBits = (sizeByBits: number) => bigint;
export type FPrimalityTest = (n: bigint) => boolean;

export const CombinePrimalityTests =
    (tests: FPrimalityTest[]): FPrimalityTest =>
    (n: bigint): boolean => {
        for (let test of tests) {
            if (!test(n)) return false;
        }
        return true;
    };

export const MakeTrialDivisionPrimalityTest =
    (primes: number[]) =>
    (n: bigint): boolean => {
        for (let prime of primes) {
            if (n % BigInt(prime) === ZERO) return false;
        }

        return true;
    };

export const MakeMillerRabinPrimalityTest =
    (t: number, power: FPower, generateRandom: FGenerateRandomByBoundary) =>
    (n: bigint): boolean => {
        if (n < TWO) return false;
        if (n === TWO) return true;
        if (n % TWO === ZERO) return false;

        const n_1 = n - ONE;
        let s = ONE;
        let r = n_1 >> ONE;

        while (r % TWO === ZERO) {
            s += ONE;
            r = r >> ONE;
        }

        for (let epoch = 1; epoch < t; epoch++) {
            const a = generateRandom(TWO, n - TWO);
            let y = power(a, r, n);

            if (y !== ONE && y !== n_1) {
                let j = ONE;
                while (j <= s - ONE && y !== n_1) {
                    y = power(y, TWO, n);
                    if (y === ONE) return false;
                    j += ONE;
                }
                if (y !== n_1) return false;
            }
        }

        return true;
    };

export const MakeRandomPrimeByBitsGenerator =
    (randomByBits: FGenerateRandomByBits, primalityTest: FPrimalityTest) =>
    (sizeByBits: number): bigint => {
        let randomBigInt = randomByBits(sizeByBits);
        randomBigInt |= ONE;

        while (!primalityTest(randomBigInt)) {
            randomBigInt += TWO;
        }

        return randomBigInt;
    };
