import { power } from "./internals/power";
import {
    CombinePrimalityTests,
    MakeMillerRabinPrimalityTest,
    MakeTrialDivisionPrimalityTest,
    MakeRandomPrimeByBitsGenerator,
} from "./internals/prime";
import {
    generateRandomByBits,
    generateRandomByBoundary,
} from "./internals/random";
import { PRIMES } from "./domain/PreCompPrimes";
import { MakePublicKeyGenerator } from "./core/publicKey/generator";
import { MakeSharedKeyGenerator } from "./core/sharedKey/generator";
import { TWO } from "./domain/Constants";
import { MakePrivateKeyGenerator } from "./core/privateKey/generator";

export const isProbablePrime = CombinePrimalityTests([
    MakeTrialDivisionPrimalityTest(PRIMES),
    MakeMillerRabinPrimalityTest(2, power, generateRandomByBoundary),
]);

export const randomPrimeGenerator = MakeRandomPrimeByBitsGenerator(
    generateRandomByBits,
    isProbablePrime
);

export const publicKeyGenerator = MakePublicKeyGenerator(power);
export const sharedKeyGenerator = MakeSharedKeyGenerator(power);
export const privateKeyGenerator = MakePrivateKeyGenerator(
    generateRandomByBoundary
);
export const primeModulusGenerator = randomPrimeGenerator;
export const defaultRootModulus = TWO;
