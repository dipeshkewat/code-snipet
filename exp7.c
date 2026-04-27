TITLE

Implementation of Code Generation Phase of Compiler

AIM

To study and implement code generation for the given intermediate code in C.

THEORY

Code generation is the final phase of a compiler where the intermediate representation of a program is converted into target code such as assembly or machine language. The input to this phase is usually a form like three-address code, and the output is low-level code that can be executed by a machine.

The main task of the code generator is to translate each intermediate instruction into a sequence of target instructions. It also manages the use of registers and memory efficiently. The generated code should be correct and optimized for performance.

In this phase, the compiler uses concepts like register descriptors and address descriptors. A register descriptor keeps track of the contents of registers, while an address descriptor stores the location of variables during execution.

For example:
Three-address code: x = y + z
Generated code:

MOV R0, y
ADD R0, z
MOV x, R0

Thus, code generation converts high-level representations into machine-level instructions that can be executed.





#include <stdio.h>
#include <string.h>

struct quad {
    char result[10], arg1[10], arg2[10], op;
} q[10];

int n;

// Function to generate code
void generateCode() {
    int i;

    for (i = 0; i < n; i++) {

        if (q[i].op == '+') {
            printf("MOV R0, %s\n", q[i].arg1);
            printf("ADD R0, %s\n", q[i].arg2);
            printf("MOV %s, R0\n\n", q[i].result);
        }

        else if (q[i].op == '-') {
            printf("MOV R0, %s\n", q[i].arg1);
            printf("SUB R0, %s\n", q[i].arg2);
            printf("MOV %s, R0\n\n", q[i].result);
        }

        else if (q[i].op == '*') {
            printf("MOV R0, %s\n", q[i].arg1);
            printf("MUL R0, %s\n", q[i].arg2);
            printf("MOV %s, R0\n\n", q[i].result);
        }

        else if (q[i].op == '/') {
            printf("MOV R0, %s\n", q[i].arg1);
            printf("DIV R0, %s\n", q[i].arg2);
            printf("MOV %s, R0\n\n", q[i].result);
        }

        else if (q[i].op == '=') {
            printf("MOV R0, %s\n", q[i].arg1);
            printf("MOV %s, R0\n\n", q[i].result);
        }
    }
}

int main() {
    int i;

    printf("Enter number of statements: ");
    scanf("%d", &n);

    printf("Enter Three Address Code (result op arg1 arg2):\n");

    for (i = 0; i < n; i++) {
        scanf("%s %c %s %s", q[i].result, &q[i].op, q[i].arg1, q[i].arg2);
    }

    printf("\nGenerated Target Code:\n\n");
    generateCode();

    return 0;
}