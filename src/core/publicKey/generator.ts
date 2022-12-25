import { Key } from "../../domain/Key";
import { ModulusKeyBundle } from "../../domain/ModulusKeyBundle";

type FPower = (value: Key, power: Key, modulus: Key) => Key;

interface Generator {
    generate(privateKey: Key, modulusKeyBundle: ModulusKeyBundle): Key;
}

const FGenerate =
    (power: FPower) =>
    (privateKey: Key, modulusKeyBundle: ModulusKeyBundle): Key => {
        return power(
            modulusKeyBundle.RootModulus,
            privateKey,
            modulusKeyBundle.PrimeModulus
        );
    };

export const makePublicKeyGenerator = (power: FPower): Generator => {
    return {
        generate: FGenerate(power),
    };
};
