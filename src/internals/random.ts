import { randomBytes } from "crypto";
import { ZERO, EIGHT, ONE } from "../domain/Constants";

export type FGenerateRandomBytes = (sizeByBytes: number) => Buffer;

const parseBufToBigInt = (buf: Buffer): bigint => {
    let res = ZERO;

    for (let chunk of buf) {
        res = res << EIGHT;
        res += BigInt(chunk.toString(10));
    }

    return res;
};

export const generateRandomByBoundary = (
    left: bigint,
    right: bigint,
    generateRandomBytes: FGenerateRandomBytes = randomBytes
): bigint => {
    const diff = right - left;
    const bits = diff.toString(2).length;
    const bytes = bits / 8;
    const randomDiff = parseBufToBigInt(generateRandomBytes(bytes));

    return left + (randomDiff % diff);
};

export const generateRandomByBits = (
    sizeByBits: number,
    generateRandomBytes: FGenerateRandomBytes = randomBytes
): bigint => {
    let randomBigInt = parseBufToBigInt(generateRandomBytes(sizeByBits / 8));
    randomBigInt = randomBigInt | (ONE << BigInt(sizeByBits - 1));
    return randomBigInt;
};
