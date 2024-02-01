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
