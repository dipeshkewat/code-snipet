TITLE

Implementation of Lexical Analyzer

AIM

To study and implement a lexical analyzer using Python.

THEORY

A lexical analyzer is the first phase of a compiler that reads the source program and converts it into a sequence of tokens. A token is the smallest unit of a program such as keywords, identifiers, operators, constants, and symbols. This process is called lexical analysis or scanning.

The lexical analyzer scans the input character by character and groups them into meaningful patterns. It removes unnecessary elements like spaces, tabs, and comments. It also identifies different types of tokens and classifies them accordingly.

The common types of tokens are:

Keywords (e.g., int, if, while)
Identifiers (variable names)
Operators (+, -, *, /, =)
Constants (numbers, strings)
Special symbols (;, {, }, etc.)

The output of the lexical analyzer is a stream of tokens which is passed to the next phase of the compiler (syntax analyzer).






# Lexical Analyzer (Medium Version)

keywords = ["int", "float", "if", "else", "while", "return"]
operators = ['+', '-', '*', '/', '=']
special_symbols = [';', ',', '(', ')', '{', '}']

def is_identifier(word):
    if word[0].isalpha():
        for ch in word:
            if not (ch.isalnum() or ch == '_'):
                return False
        return True
    return False

def is_number(word):
    for ch in word:
        if not ch.isdigit():
            return False
    return True

def lexical_analyzer(code):
    words = code.split()

    for word in words:

        if word in keywords:
            print(word, "-> Keyword")

        elif word in operators:
            print(word, "-> Operator")

        elif word in special_symbols:
            print(word, "-> Special Symbol")

        elif is_number(word):
            print(word, "-> Constant")

        elif is_identifier(word):
            print(word, "-> Identifier")

        else:
            print(word, "-> Unknown")

# Example input
code = "int a = 10 ; float b = a + 20 if a return b"

lexical_analyzer(code)