## The structure of compiler

### The high level of compiler

Input Code --> Compiler --> Output Code

Compiler: Front-end --> Back-end

Front-end: Morphology --> Syntax

Back-end: Instruct --> Optimize

### A compiler structure without optimize

Morphology analysis --> Syntax analysis --> Semantic analysis --> Generate Code

The sequence of characters --> Marks --> Abstruct Syntax Tree --> Middle Code --> Target Code

A compiler is combined with multi phases, and each phase handles different problems. (There should be use different data structure and algorithms)

### Example

- Source code: Function Sum

  - There are two formal syntaxs: Integer and add

- Target machine: A stack computer

  - Two instructs: push and add
