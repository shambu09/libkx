import { Key } from "../../domain/Key";
import { ModulusKeyBundle } from "../../domain/ModulusKeyBundle";

type FPower = (value: Key, power: Key, modulus: Key) => Key;

export interface OPrivateKeyGenerator {
    generate(
        oPublicKey: Key,
        privateKey: Key,
        modulusKeyBundle: ModulusKeyBundle
    ): Key;
}

const FGenerate =
    (power: FPower) =>
    (
        oPublicKey: Key,
        privateKey: Key,
        modulusKeyBundle: ModulusKeyBundle
    ): Key => {
        return power(oPublicKey, privateKey, modulusKeyBundle.PrimeModulus);
    };

export const MakeSharedKeyGenerator = (power: FPower): OPrivateKeyGenerator => {
    return {
        generate: FGenerate(power),
    };
};
