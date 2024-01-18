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

DES (Data Encryption Standard):

1. Each block have 64 bits
2. Secret key have 56 bits
3. Number of round 16

3DES: Use DES for 3 times

C = E_k3[D_k2[E_k1[P]]]
P = D_k1[E_k2[D_k3[C]]]

AES (Advanced Encryption Standard):

1. Key size is 128, 192 or 256
2. Number of round is 10, 12, 14
3. Every block of 128 bits is presented as 4 by 4 array of bytes

### 5. Logical representation of protocols

- Security protocols: it is a set of rules that is in order to ensure achieving various security or privcy goals.

- The correctness of protocols depends on the assumption on capabilities of possible intruder.
- Assumptions are often left implicit(入侵者).

- Logical representation: Logical representation and analysis of the security protocols is a particular successful approach for the protocols verification.

- Protocol analysis using a logic
  - M. Burrows, M.Abadi, R. Needham (BAN Logic)
  - Suitable for formal analysis of authentication protocols.
- formula of BAN logic
  1. Believes: P is entitled to conclude that X is true, or P has a justification for X;
  2. Sees:
     The principal P receives a message containing X.
     P might need to perform decryption to extract X.
     X can be a statement or a simple item of data.
     P does not necessarily believes X.
  3. Controls: P has jurisdiction over X, or P is trusted as an authority on X
  4. Said: At some point in the past, P is known to have sent a message including X
  5. Fresh: X has not been sent earlier
- Example of formula of BAN logic

  1. If P believes that it shares a secret key K with Q, and if P receives
     a message containing X encrypted with K then P believes that Q once said X.

     > P believes P <-key-> Q, P sees {X}K ==> P believes (Q said X)

  2. If P believes that Q once said X, then P believes that Q once believed X (by main assumption). If additionally P believes X is fresh then P must believe that Q currently believes X.

     > P believes Fresh(X), P believes (Q saids X) ==> P believes (Q believes X)

  3. If P believes that Q has control over whether or not X true and if P believes that Q believes it to be true, then P must believe in it also. The reason is Q is an authority on the matter as far as P is concerned.
     > P believes (Q controls X), P believes (Q believes X) ==> P believes X

### Applications

Encryption:
Symmetric encryption: DES, 3DES, AES
Asymmetric encryption: RSA

RSA

- It is a block cipher in which the plaintext and ciphertext are integers between 1 and n - 1.
- based on hardness of factoring big numbers.
- Encryption: C = M^e mod n, in which M is plaintext, e is a random number, and n is a prime number
- Decreption: M = C^d mod n = (M^e)^d mod n = M^ed mod n
- Requirements:

  1. Easy to calculate.
  2. It is possible to find e, d and n.

- Key Generation

  1. Select **2** prime numbers `x`, `y` --------- (17, 11).
  2. Calculate `O(n)` = (x - 1)(y - 1) ---- (16 \* 10) = 160.
  3. Choose a prime number `e` that less than O(n) ---- 7.
  4. Calculate `d`, use de mod O(n) = 1 and d < O(n) ---- 7d mod 160 = 1, d = 23.
  5. Public Key = {e, n}, Private Key = {d, n}.

- Discussion

  - Advantages:
    1. High security.
    2. Public keys and private keys are published in a third trust service, so the key distribution is separately.
  - Disadvantage:
    1. It needs high computation computer.
    2. It cannot defence against quantum computation attacks.
    3. It can be brute force by a program as computers become more and more powerful.

- Diffie-Hellman key exchange

  - Purpose: The purpose of this algorithm is exchange of a secret key. And it rely on discrete logarithms.
  - It is considered as a public key algorithm because:
    1. That is rely on public information and some privacy information.

- Message authentication and hash function(消息认证)

  - Message authentication is a procedure which verifies that received messages are authentic.
  - Aspect of message authentication
    1. The content of the message has not been changed.
    2. The source of the message is authentic.
    3. The message has not been delayed and replayed.
  - Techniques:
    1. Using conventional message encryption.
    2. Without message encryption.
  - Message Authentication Code
    1. A and B have a same secret key K.
    2. A would send a message to B, then calculate a MAC(K, M) using secret key.
    3. A Send message and MAC to B

- One way Hash Functions
  Hash Function don't use secret key

  - Requirements:
    1. H can be applied to a block of data of any size.
    2. H has fixed-length output.
    3. H is easy to compute for any given message.
    4. For any value h is very difficult to compute x.
    5. For any given x, it is very difficult to find y, such that H(x) = H(y)
    6. It is very difficult to find any pair (x,y) such that H(x) = H(y);
  - SHA-1
    1. input processed in 512-bits block.
    2. output a 160 bits message diest.

- Identification
  - Associating an identity with a subject.

## Part 4 Advanced Crypto

### Homomorphic encryption

- Equation
  1. Operation \*, Enc(encryption): Enc(a \* b) = Enc(a) \* Enc(b)
- Partial Homomorphic encryption: just to one operation
- Fully Homomorphic scheme:
  1. Multiple operation and addition.
  2. Allow perform arbitary computations.
  3. Existence is by no means obvious???

### CryptDB

- To query encrypted SQL database without decrypting
- Low overhead.

### Zero - knowledge proofs

- 3-colorability

  1. Alice hides her solution, and allows Bob to choose any pair of vertices.
  2. Alice reshuffles actual colours, hides modified solution, then allows Bob to open any pair of vertices again.
  3. Repeat Step 2 until Bob convince.

- Requirements

  1. Completeness: Prover should be able to convince Verifier that he has true solution
  2. Soundness: It should be able to convince Verifier only in true solutions.
  3. Zero-knowledge(nedd): Verifier should not be able to learn anything but the Prover has a solution.

- Inactive and Non-inactive

  | Features ｜ Inactive ｜ Non-inactive |
  | ------------------------------------ | -------------------------------- | --------------------------------- |
  | Inactive                             | Need                             | No                                |
  | Efficient                            | Slow                             | Fast                              |
  | Security                             | High security                    | Low security                      |
  | Scene                                | Suitable for high security scene | Suitable for high efficient scene |

### Secure MPC(Multi Party Computations)

- The process of Yao's Protocol
  1. P1 has x, P2 has y. In which x and y are private value.
  2. P1 would like to use two random keys Kx and Ky calculate F(x, y), then tabulate in table T(Tx, y).
  3. P1 send T(Tx, y) to P2.
  4. P1 send random keys Kx and Ky to P2.

## Part 5 Legal And Social Issues
