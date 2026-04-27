TITLE

Implementation of Bottom-Up Parser (Shift Reduce Parser)

AIM

To study and implement a bottom-up parser using shift-reduce parsing technique in Python.

THEORY

A bottom-up parser is a type of syntax analyzer that builds the parse tree from the input string to the start symbol. It attempts to reduce the input string step by step into the start symbol by applying production rules in reverse. One common method of bottom-up parsing is the shift-reduce parser.

In shift-reduce parsing, the parser uses a stack and an input buffer. It performs two main operations:

Shift: Moves the next input symbol onto the stack
Reduce: Replaces a sequence of symbols on the stack with a non-terminal based on grammar rules

The parser continues shifting and reducing until the stack contains only the start symbol and the input is fully consumed.

This method is efficient and widely used in compiler design. If the parser successfully reduces the input to the start symbol, the string is accepted; otherwise, it is rejected.
















# Shift Reduce Parser (Bottom-Up)

stack = []
input_string = ""
i = 0

# Grammar rules
# E -> E+E | E*E | (E) | id

def check():
    global stack

    # Convert list to string for pattern matching
    s = ''.join(stack)

    # Reduce id to E
    if "id" in s:
        index = s.index("id")
        stack[index:index+2] = ["E"]
        print("Reduce: id -> E")
        return True

    # Reduce E+E to E
    if "E+E" in s:
        index = s.index("E+E")
        stack[index:index+3] = ["E"]
        print("Reduce: E+E -> E")
        return True

    # Reduce E*E to E
    if "E*E" in s:
        index = s.index("E*E")
        stack[index:index+3] = ["E"]
        print("Reduce: E*E -> E")
        return True

    # Reduce (E) to E
    if "(E)" in s:
        index = s.index("(E)")
        stack[index:index+3] = ["E"]
        print("Reduce: (E) -> E")
        return True

    return False


def shift_reduce_parser(inp):
    global i
    print("Stack\tInput\tAction")

    while True:
        # Shift
        if i < len(inp):
            stack.append(inp[i])
            print(''.join(stack), "\t", inp[i+1:], "\tShift")
            i += 1

            # Try reduce after shift
            while check():
                print(''.join(stack), "\t", inp[i:], "\tReduce")

        else:
            # Final reductions
            while check():
                print(''.join(stack), "\t", "", "\tReduce")
            break

    # Final check
    if ''.join(stack) == "E":
        print("\nString Accepted")
    else:
        print("\nString Rejected")


# Input (use id+id*id format)
input_string = "id+id*id"
shift_reduce_parser(input_string)