## Elements of Cryptography. Symmetric Encryption.

## Cryptography

- Cryptography is a collection of mathematical techniques for protecting information;

- Most important cryptographic technique is encryption/decryption

### Cryptography for information protection

| Level | What to protect      | Method                         |
| ----- | -------------------- | ------------------------------ |
| 3     | Existence of message | Steganography                  |
| 2     | Metadata of message  | Privacy-enhancing technologies |
| 1     | Content of message   | Encryption                     |
| 0     | Nothing              | None                           |

Encryption is important for all levels.

### Two categories of encryption algorithms

- Symmetric encryption (对称加密) (or symmetric key encryption):
  - to encrypt and decrypt a message the same key (a piece of information; sequence of bits) is used
- Asymmetric encryption (非对称加密) (or asymmetric key encryption):
  - One key is used for encryption (usually publicly known, public key);
  - Another key is used for decryption (usually private, or secret key)

### Components of Symmetric Encryption

- Plaintext
- Encryption algorithm
- Secret key
- Ciphertext (encrypted text) • Decryption algorithm

### Security of symmetric encryption

- security of symmetric encryption depends on

  - the secrecy of the key,
  - Not the secrecy of the algorithm

- Strong encryption algorithm:
  - The adversary (opponent) should be unable to decrypt encrypted text, even if he/she knows several pairs
    (plaintext, encrypted plaintext)
- Sender and receiver must have obtained copies of the secret key in a secure way and must keep the key secure

### Two more classifications of cryptosystems

- Type of operations used

  - Substitutions;
  - Transpositions;

- The way in which plaintext is processed
  - Block cipher: input block of elements (e.g. characters) is transformed to the output block at once;
  - Stream cipher: processes the input elements continuously, one element at a time.

// interleaving substitutions （交叉替换）

### Cryptanalysis and computationally secure schemes

- Cryptanalysis: The process of attempting to discover the plaintext or key;
- Depends very much on the information available;

- An encryption scheme is computationally secure if
  - The cost of breaking the scheme exceeds the value of the encrypted information;
  - The time required to break the scheme is more than lifetime of the information;

### Brute-Force Approach in Cryptanalysis

// brute-force （暴力破解）

- If nothing else helps and there is no weakness in the encryption algorithms, brute-force approach may be applied;
- Try every possible key until correct translation of the encrypted text into plaintext is obtained;
- Possible issue: how does cryptanalyst recognize correct plaintext? Imagine it has been compressed before encryption;
- Main issue: time

### Block vs stream ciphers

- The way in which plaintext is processed
  - Block cipher: input block of elements is transformed to the output block at once.
  - Stream cipher: processes the input elements continuously, one element at a time.

### Feistel cipher structure

- Most symmetric block encruption algorithms have a structure proposed by H.Feistel in 1973.
- The input is divided into the blocks of even numbers of elements.
- Then multiple stages of substitutions and transpositions is applied.
- Multiple keys are used at different rounds of the algorithm.

![Feistel cipher structure](image.png)

### Symmetric Encryption Algorithms

Most important symmetric block ciphers

- DES (Data Encryption Standard)
- 3DES (triple DES)
- AES (Advenced Encryption Standard)
