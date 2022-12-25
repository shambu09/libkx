import { ZERO } from "../../domain/Constants";
import { ModulusKeyBundle } from "../../domain/ModulusKeyBundle";

export type FGenerateRandomByBoundary = (left: bigint, right: bigint) => bigint;

export interface OPrivateKeyGenerator {
    generate(modulusKeyBundle: ModulusKeyBundle): bigint;
}

const FGenerate =
    (generateRandomByBoundary: FGenerateRandomByBoundary) =>
    (modulusKeyBundle: ModulusKeyBundle): bigint => {
        return generateRandomByBoundary(ZERO, modulusKeyBundle.PrimeModulus);
    };

export const MakePrivateKeyGenerator = (
    generateRandomByBoundary: FGenerateRandomByBoundary
): OPrivateKeyGenerator => {
    return {
        generate: FGenerate(generateRandomByBoundary),
    };
};
