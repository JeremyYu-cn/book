## Phrase

Source programme --> Front-end --> IR --> Back-end --> Target Programme

Source programme --> Lexical analysis --> Marked --> Syntax analysis --> AST --> Semantic analysis --> Target

## The definition of the data structure of marks

### Example

```C
enum kind {IF, LPAREN, ID, INTLIT, ...}
struct token {
  enum kind k;
  char *lexeme;
}
```

- The mission of lexical analysis: From character flow to token flow

## The implementation of lexical analysis

### Method: Manual construction

- Vary complex and easy to error

- But it is very influence

### Using generator for lexical analysis

- It can generated very fast.

- But it can not control details.

### Transition graph

Example

```procedure

token nextToken()
  c = getChar();
  switch (c)
    case '<' : c = getChar();
                switch (c)
                  case '=': return LE;
                  case '>': return NE;
                  default: rollback(); return LT;
    case '=' : return EQ;
    case '>' : c = getChar();
                switch (c):
                  case '=': return GE;
                  default: rollback(); return GT;

```

### Identifier and Keyword

- Keyword is a part of identifier

- Keyword: if, while, else, ....

- We can use a hash table to check keywords.

### Regexp
