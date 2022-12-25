import { ModulusKeyBundle } from "../../domain/ModulusKeyBundle";

type FPower = (value: bigint, power: bigint, modulus: bigint) => bigint;

export interface OPublicKeyGenerator {
    generate(privateKey: bigint, modulusKeyBundle: ModulusKeyBundle): bigint;
}

const FGenerate =
    (power: FPower) =>
    (privateKey: bigint, modulusKeyBundle: ModulusKeyBundle): bigint => {
        return power(
            modulusKeyBundle.RootModulus,
            privateKey,
            modulusKeyBundle.PrimeModulus
        );
    };

export const MakePublicKeyGenerator = (power: FPower): OPublicKeyGenerator => {
    return {
        generate: FGenerate(power),
    };
};
