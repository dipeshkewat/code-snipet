TITLE
Implementation of Two Pass Macro Processor

AIM
To study and implement a two-pass macro processor using Java.

THEORY
A macro processor is a system software that allows the use of macros, which are predefined sequences of instructions identified by a name. Instead of writing the same code repeatedly, a programmer can define it once and reuse it multiple times by invoking the macro. This helps in reducing code duplication and improving readability.
A macro consists of a macro name, parameters, and a body. Parameters are usually written with a & symbol and are replaced by actual arguments during macro expansion. The macro processor performs text substitution, meaning it replaces the macro call with its corresponding instructions without analyzing their meaning.
A two-pass macro processor works in two phases:

Pass 1 (Definition Phase)
In this phase, the processor scans the program and processes all macro definitions. It stores the information in tables such as:

MNT (Macro Name Table): stores macro names and pointers
MDT (Macro Definition Table): stores the macro body
ALA (Argument List Array): stores parameters

Macro definitions are removed after processing, and the remaining code is passed to the next phase.

Pass 2 (Expansion Phase)
In this phase, macro calls are expanded. The processor replaces each macro call with the corresponding code from MDT, using ALA to substitute actual arguments for parameters.







import java.io.*;
import java.util.*;

class MNTEntry {
    String name;
    int index;

    MNTEntry(String name, int index) {
        this.name = name;
        this.index = index;
    }
}

public class MacroProcessor {

    static List<MNTEntry> MNT = new ArrayList<>();
    static List<String> MDT = new ArrayList<>();
    static Map<String, List<String>> ALA = new HashMap<>();

    public static void main(String[] args) throws Exception {
        pass1();
        pass2();
    }

    // ---------------- PASS 1 ----------------
    static void pass1() throws Exception {
        BufferedReader br = new BufferedReader(new FileReader("Input.txt"));
        PrintWriter out = new PrintWriter("Pass1Output.txt");

        String line;
        boolean isMacro = false;
        String macroName = "";
        List<String> params = new ArrayList<>();

        while ((line = br.readLine()) != null) {

            if (line.equalsIgnoreCase("MACRO")) {
                isMacro = true;
                line = br.readLine();

                String[] parts = line.split("[ ,]+");
                macroName = parts[0];

                params = new ArrayList<>();
                for (int i = 1; i < parts.length; i++) {
                    params.add(parts[i]);
                }

                ALA.put(macroName, params);
                MNT.add(new MNTEntry(macroName, MDT.size()));

                MDT.add(line);

                while (!(line = br.readLine()).equalsIgnoreCase("MEND")) {
                    MDT.add(line);
                }

                MDT.add("MEND");
                isMacro = false;
            } 
            else {
                out.println(line);
            }
        }

        br.close();
        out.close();
    }

    // ---------------- PASS 2 ----------------
    static void pass2() throws Exception {
        BufferedReader br = new BufferedReader(new FileReader("Pass1Output.txt"));
        PrintWriter out = new PrintWriter("Pass2Output.txt");

        String line;

        while ((line = br.readLine()) != null) {
            String[] parts = line.split("[ ,]+");
            String word = parts[0];

            MNTEntry entry = null;
            for (MNTEntry m : MNT) {
                if (m.name.equals(word)) {
                    entry = m;
                    break;
                }
            }

            if (entry != null) {
                List<String> argsList = new ArrayList<>();
                if (parts.length > 1) {
                    argsList = Arrays.asList(parts[1].split(","));
                }

                int mdtIndex = entry.index + 1;

                while (!MDT.get(mdtIndex).equals("MEND")) {
                    String expanded = MDT.get(mdtIndex);

                    for (int i = 0; i < argsList.size(); i++) {
                        expanded = expanded.replace("&" + (i + 1), argsList.get(i));
                    }

                    out.println(expanded);
                    mdtIndex++;
                }
            } 
            else {
                out.println(line);
            }
        }

        br.close();
        out.close();
    }
}