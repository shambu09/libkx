import { ONE, ZERO } from "../../domain/Constants";
import { Key } from "../../domain/Key";
import { ModulusKeyBundle } from "../../domain/ModulusKeyBundle";

export type FGenerateRandomByBoundary = (left: Key, right: Key) => Key;

export interface OPrivateKeyGenerator {
    generate(modulusKeyBundle: ModulusKeyBundle): Key;
}

const FGenerate =
    (generateRandomByBoundary: FGenerateRandomByBoundary) =>
    (modulusKeyBundle: ModulusKeyBundle): Key => {
        return generateRandomByBoundary(ZERO, modulusKeyBundle.PrimeModulus);
    };

export const MakePrivateKeyGenerator = (
    generateRandomByBoundary: FGenerateRandomByBoundary
): OPrivateKeyGenerator => {
    return {
        generate: FGenerate(generateRandomByBoundary),
    };
};
