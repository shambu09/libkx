import { power } from "./internals/power";
import {
    CombinePrimalityTests,
    MakeMillerRabinPrimalityTest,
    MakeTrialDivisionPrimalityTest,
    makeRandomPrimeByBitsGenerator,
} from "./internals/prime";
import {
    generateRandomByBits,
    generateRandomByBoundary,
} from "./internals/random";
import { PRIMES } from "./domain/PreCompPrimes";

const isProbablePrime = CombinePrimalityTests([
    MakeTrialDivisionPrimalityTest(PRIMES),
    MakeMillerRabinPrimalityTest(2, power, generateRandomByBoundary),
]);

const randomPrimeGenerator = makeRandomPrimeByBitsGenerator(
    generateRandomByBits,
    isProbablePrime
);

// const prime = randomPrimeGenerator(2048);
// console.log(prime.toString(2).length);
