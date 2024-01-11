## Part 1 Identification And Authentication

### Password and Token and Biometrics

- Password

Password

### Multi Factor and Single Factor

### Data aggregation Anonmity And Pseudoanonimity

## Part 2 Monitoring And Intrusion Detection

### Audit AND Intrusion Detection

### Techniques of intrusion detection

## Part 3 Protocol And Algorithms

### 1. Protocol Design

The main factors of protocol is:

- Syntax: To define the structure and format of the protocol
- Semantics: To define the meaning of data and ensure both parties know the meaning of each expression
- Timing: To establish the sending and receving data sequence of the protocol

### 2. Cryptography for secrecy for signing

Cryptography is a collect of mathmatical techniques for protecting information.

Type of cryptography:

1. Type of operations used:

   - Subsitution
   - Transpositions

2. The way in which plaintext is processed

   - Block cipher
   - Stream cipher

### 3. Symmetric key and asymmetric protocols

- Symmetric encryption: Encryption and Decryption are use a same secret key.
  Example: DES, AES, 3DES
- Asymmetric encryption: Encryption uses public key, while decryption uses pricate key.
  Example: RSA

### 4. 3DES and RSA

The process of Feistel cipher algorithm:

1. Choose 2 plaintext blocks (2w bits)
2. Divide 2w into 2 parts L_0, R_0
3. Two parts going through n rounds
4. Every round, function F applied to the right half, the result is XOR'ed with the left half of the data round.

DES:

1. Each block have 64 bits
2. Secret key have 56 bits
3. Number of round 16

3DES: Use DES for 3 times

C = E_k3[D_k2[E_k1[P]]]
P = D_k1[E_k2[D_k3[C]]]

AES:

1. Key size is 128, 192 or 256
2. Number of round is 10, 12, 14
3. Every block of 128 bits is presented as 4 by 4 array of bytes

## Part 4 Advanced Crypto

## Part 5 Legal And Social Issues
