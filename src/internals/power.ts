import { ZERO, ONE } from "../domain/Constants";

export const power = (
    value: bigint,
    power: bigint,
    modulus: bigint
): bigint => {
    let result = ONE;
    value = value % modulus;

    if (value === ZERO) return ZERO;

    while (power > ZERO) {
        if (power & ONE) result = (result * value) % modulus;

        power = power >> ONE;
        value = (value * value) % modulus;
    }

    return result;
};
