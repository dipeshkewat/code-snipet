# PASS 1 

OPTAB = {
    "MOVER": ("IS", "01"),
    "MOVEM": ("IS", "02"),
    "ADD": ("IS", "03"),
    "SUB": ("IS", "04"),
    "MULT": ("IS", "05"),
    "DIV": ("IS", "06"),
    "PRINT": ("IS", "09"),
    "READ": ("IS", "10"),
    "START": ("AD", "01"),
    "END": ("AD", "02"),
    "ORIGIN": ("AD", "04"),
    "LTORG": ("AD", "05"),
    "DS": ("DL", "01"),
    "DC": ("DL", "02"),
}

REG = {"AREG": 1, "BREG": 2, "CREG": 3, "DREG": 4}

def pass1():
    lc = 0
    symtab = {}
    littab = []
    inter = []

    with open("Input.txt") as f:
        lines = f.readlines()

    for line in lines:
        parts = line.strip().split()
        if len(parts) < 4:
            continue

        label, opcode, op1, op2 = parts

        if opcode == "START":
            lc = int(op1)
            inter.append(f"--- (AD,01) (C,{op1})")
            continue

        if label != "NAN":
            symtab[label] = lc

        if opcode in OPTAB:
            cls, code = OPTAB[opcode]

            if opcode == "START":
                lc = int(op1)
                inter.append(f"--- (AD,01) (C,{op1})")
                continue

            if cls == "IS":
                reg = REG.get(op1, 0) if op1 != "NAN" else 0

                if op2.startswith("="):
                    littab.append(op2)
                    operand = f"(L,{len(littab)})"
                elif op2 != "NAN":
                    operand = f"(S,{op2})"
                else:
                    operand = "NAN"

                inter.append(f"{lc} ({cls},{code}) {reg} {operand}")
                lc += 1

            elif cls == "DL":
                if opcode == "DS":
                    inter.append(f"{lc} (DL,01) (C,{op1})")
                    lc += int(op1)
                elif opcode == "DC":
                    inter.append(f"{lc} (DL,02) (C,{op1})")
                    lc += 1

            elif cls == "AD":
                if opcode == "END":
                    inter.append("--- (AD,02)")
                    break

    # Save files
    with open("Intermediate.txt", "w") as f:
        f.write("\n".join(inter))

    with open("SymTab.txt", "w") as f:
        for k, v in symtab.items():
            f.write(f"{k} {v}\n")

    with open("LitTab.txt", "w") as f:
        for i, lit in enumerate(littab, 1):
            f.write(f"{i} {lit}\n")

    print("PASS 1 Completed")



    # PASS 2 

def load_table(filename):
    table = {}
    with open(filename) as f:
        for line in f:
            parts = line.split()
            if len(parts) >= 2:
                table[parts[0]] = parts[1]
    return table

def pass2():
    symtab = load_table("SymTab.txt")

    with open("Intermediate.txt") as f:
        lines = f.readlines()

    machine = []

    for line in lines:
        if "(IS," in line:
            parts = line.split()
            lc = parts[0]
            opcode = parts[1][4:6]
            reg = parts[2]

            if "(S," in parts[3]:
                sym = parts[3][3:-1]
                addr = symtab.get(sym, "000")
            else:
                addr = "000"

            machine.append(f"{lc} {opcode} {reg} {addr}")

        elif "(DL,01)" in line:
            parts = line.split()
            lc = parts[0]
            val = parts[-1].strip(")")
            machine.append(f"{lc} 00 0 {val}")

    with open("MachineCode.txt", "w") as f:
        f.write("\n".join(machine))

    print("PASS 2 Completed")


if __name__ == "__main__":
    pass1()
    pass2()
