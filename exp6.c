TITLE

Implementation of Intermediate Code Generation

AIM

To study and implement intermediate code generation for simple expressions in C.

THEORY

Intermediate code generation is a phase of a compiler where the source program is converted into an intermediate representation (IR). This representation is between high-level language and machine code, making it easier to optimize and translate into different target machines.

One common form of intermediate code is three-address code (TAC). In TAC, each instruction contains at most three operands and one operator. Complex expressions are broken into simpler steps using temporary variables.

For example:
Expression: a = b + c * d
Intermediate Code:

t1 = c * d
t2 = b + t1
a = t2

The compiler generates such code to simplify further processing like optimization and final code generation.

The main advantage of intermediate code is that it is machine-independent, easy to optimize, and improves compiler design by separating different phases.














#include <stdio.h>
#include <string.h>

int main() {
    char input[50];
    char op1, op2, operator;
    int tempCount = 1;

    printf("Enter expression (e.g. a=b+c*d): ");
    scanf("%s", input);

    printf("\nThree Address Code:\n");

    // Example: a=b+c*d
    // Step 1: find operator precedence (* or / first)
    for (int i = 0; i < strlen(input); i++) {

        if (input[i] == '*' || input[i] == '/') {
            op1 = input[i - 1];
            op2 = input[i + 1];
            operator = input[i];

            printf("t%d = %c %c %c\n", tempCount, op1, operator, op2);

            input[i - 1] = 't';
            input[i] = '0' + tempCount; // replace with t1, t2...
            input[i + 1] = ' ';

            tempCount++;
        }
    }

    // Step 2: handle + and -
    for (int i = 0; i < strlen(input); i++) {

        if (input[i] == '+' || input[i] == '-') {
            op1 = input[i - 1];
            op2 = input[i + 1];
            operator = input[i];

            printf("t%d = %c %c %c\n", tempCount, op1, operator, op2);

            input[i - 1] = 't';
            input[i] = '0' + tempCount;
            input[i + 1] = ' ';

            tempCount++;
        }
    }

    // Final assignment
    printf("%c = t%d\n", input[0], tempCount - 1);

    return 0;
}