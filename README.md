# TODO 

- ## Generation of Prime Modulus and Root Modulus
    More...

    In Diffie-Hellman key exchange, the prime modulus and generator are used as the base for the key exchange process. These values must be chosen carefully to ensure the security and effectiveness of the key exchange.

    -   The prime modulus should be a large prime number. A larger prime modulus provides stronger security, but it also requires more computation time to generate the public keys. A commonly used prime modulus is the 2048-bit prime number known as "DH Group 14", which provides strong security and is relatively fast to compute.

    -   The generator should be a number that is relatively prime to the prime modulus and generates a full cycle of residues modulo the prime. This ensures that the generator generates a sufficient number of possible public keys, which helps to increase the security of the key exchange. A commonly used generator is 2, which generates a full cycle of residues modulo most prime numbers.

    It's important to note that the prime modulus and generator must be agreed upon by both parties in the key exchange. They should be carefully chosen to provide strong security and should be kept secret to prevent potential attackers from attempting to compromise the key exchange process.

- ## Generation of Private Key
    More...

    In Diffie-Hellman key exchange, the private key is a large random number that is used to generate the public key. It is kept secret and is not shared with the other party in the key exchange.

    There are several ways to generate a private key for Diffie-Hellman key exchange:

    -   One option is to use a cryptographic random number generator (RNG) to generate a large, randomly generated number. This number should be at least 2048 bits long to provide strong security.

    -   Another option is to use a password-based key derivation function (PBKDF) to generate a private key from a password. This can be useful if you want to use a password as the private key, rather than a randomly generated number.

    -   You can also use a combination of both methods by using a PBKDF to generate a private key from a password, and then using a cryptographic RNG to generate additional randomness to mix into the private key.

- ## Default DH Object for Key Exchange API 