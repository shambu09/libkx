# libkx

This is a TypeScript implementation of the Diffie-Hellman key exchange algorithm. It allows two parties to generate a shared secret key over an insecure communication channel, without the need to exchange the key in plaintext.

## Example
```typescript
import assert from "assert";
import {
    INode,
    primeModulusGenerator,
    defaultRootModulus,
    isProbablePrime,
    privateKeyGenerator,
    publicKeyGenerator,
    sharedKeyGenerator,
} from "libkx";

const size = 2048;

const modulusKeyBundle = {
    PrimeModulus: primeModulusGenerator(size),
    RootModulus: defaultRootModulus,
};

assert(isProbablePrime(modulusKeyBundle.PrimeModulus));

//--------------------------------------------------------------
const alicePrivateKey = privateKeyGenerator.generate(modulusKeyBundle);
assert(alicePrivateKey < modulusKeyBundle.PrimeModulus);

let alice: INode = {
    privateKey: alicePrivateKey,
    publicKey: publicKeyGenerator.generate(alicePrivateKey, modulusKeyBundle),
};

//--------------------------------------------------------------
const bobPrivateKey = privateKeyGenerator.generate(modulusKeyBundle);
assert(bobPrivateKey < modulusKeyBundle.PrimeModulus);

let bob: INode = {
    privateKey: bobPrivateKey,
    publicKey: publicKeyGenerator.generate(bobPrivateKey, modulusKeyBundle),
};

//--------------------------------------------------------------
assert(alicePrivateKey !== bobPrivateKey);

alice.sharedKey = sharedKeyGenerator.generate(
    bob.publicKey,
    alice.privateKey,
    modulusKeyBundle
);

bob.sharedKey = sharedKeyGenerator.generate(
    alice.publicKey,
    bob.privateKey,
    modulusKeyBundle
);

//--------------------------------------------------------------
assert(alice.sharedKey === bob.sharedKey);

//--------------------------------------------------------------
console.log(modulusKeyBundle);
console.log("alice", alice);
console.log("bob", bob);
```
