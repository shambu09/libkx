import { ModulusKeyBundle } from "../../domain/ModulusKeyBundle";

type FPower = (value: bigint, power: bigint, modulus: bigint) => bigint;

export interface OPrivateKeyGenerator {
    generate(
        oPublicKey: bigint,
        privateKey: bigint,
        modulusKeyBundle: ModulusKeyBundle
    ): bigint;
}

const FGenerate =
    (power: FPower) =>
    (
        oPublicKey: bigint,
        privateKey: bigint,
        modulusKeyBundle: ModulusKeyBundle
    ): bigint => {
        return power(oPublicKey, privateKey, modulusKeyBundle.PrimeModulus);
    };

export const MakeSharedKeyGenerator = (power: FPower): OPrivateKeyGenerator => {
    return {
        generate: FGenerate(power),
    };
};
