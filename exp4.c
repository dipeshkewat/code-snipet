TITLE

Implementation of Top-Down Parser (Recursive Descent Parser)

AIM

To study and implement a top-down parser using recursive descent method in C.

THEORY

A top-down parser is a type of syntax analyzer that builds the parse tree from the start symbol to the input string. It tries to derive the input string by applying production rules of a grammar. One common method of top-down parsing is the recursive descent parser.

A recursive descent parser uses a set of recursive functions, where each function corresponds to a non-terminal in the grammar. It processes the input from left to right and checks whether the given string can be derived from the grammar.

This parser does not use backtracking in simple cases and works efficiently for grammars that are left-factored and free from left recursion.

For this experiment, a common grammar used is:

E → T E'
E' → + T E' | ε
T → F T'
T' → * F T' | ε
F → (E) | id

The parser checks whether the given input string is valid according to the grammar. If all symbols are matched and input is completely consumed, the string is accepted; otherwise, it is rejected.





#include <stdio.h>
#include <string.h>

char input[50];
int i = 0;

// Function declarations
void E();
void Eprime();
void T();
void Tprime();
void F();

void E() {
    T();
    Eprime();
}

void Eprime() {
    if (input[i] == '+') {
        i++;
        T();
        Eprime();
    }
}

void T() {
    F();
    Tprime();
}

void Tprime() {
    if (input[i] == '*') {
        i++;
        F();
        Tprime();
    }
}

void F() {
    if (input[i] == '(') {
        i++;
        E();
        if (input[i] == ')') {
            i++;
        } else {
            printf("Error: Missing )\n");
        }
    }
    else if (input[i] == 'i' && input[i+1] == 'd') {
        i += 2; // for 'id'
    }
    else {
        printf("Error: Invalid symbol\n");
    }
}

int main() {
    printf("Enter input string: ");
    scanf("%s", input);

    E();

    if (input[i] == '\0') {
        printf("String is accepted\n");
    } else {
        printf("String is rejected\n");
    }

    return 0;
}