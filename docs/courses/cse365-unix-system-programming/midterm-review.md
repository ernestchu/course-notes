# Midtern Review
## Commands
### Viewing Files

| Command                      | Description                                                             |
|------------------------------|-------------------------------------------------------------------------|
| `cat [-n] [filename]`        | Display a file on screen                                                |
| `less [filename]`            | Display a file as a book (you can scroll back & forth)                  |
| `head [-n count] [filename]` | Display the first n lines                                               |
| `tail [-n count] [filename]` | Display the last n lines                                                |
| `paste [filename|-]`         | `cat` concatenates **vertically** while `paste` pastes **horizontally** |

### Managing Files and Directories

| Command            | Description                               |
|--------------------|-------------------------------------------|
| `ls [-lrt]`        | list files and directories in a directory |
| `cd [directory]`   | change current directory                  |
| `pwd`              | print working directory                   |
| `cp [src] [dst]`   | copy files                                |
| `mv [src] [dst]`   | move files                                |
| `rm [-rf]`         | remove files                              |
| `mkdir`            | create directory                          |
| `rmdir`            | delete directory (must be empty)
| `tar [-xcvf]`      | create (or extract) on archive file       |
| `ln -s`            | create a symbolic link                    |
| `chmod [ugo+-rwx]` | change file permissions                   |

### File Analysis

| Command                    | Description                                             |
|----------------------------|---------------------------------------------------------|
| `diff [-qy] [--color]`     | Compare files                                           |
| `wc [-cwl] [filename]`     | Word count. \[#lines]\[#words]\[#characters]\[filename] |
| `sort (-gk)`               | Sort the lines of a file                                |
| `uniq (-c)`                | Delete repeated lines (leave unique lines)              |
| `fgrep [-inovw] [--color]` | Fixed string search                                     |
| `grep [-inovw] [--color]`  | Regular expression search                               |
| `egrep [-inovw] [--color]` | Extended regular expression search                      |

### Other Basic Commands
| Command            | Description                                                 |
|--------------------|-------------------------------------------------------------|
| `echo [string]`    | print the string, use `-n` to prevent newline               |
| `shift`            | remove \$1 from \$*, and then renumber                      |
| `exit`             | exit a script, returning the specified value                |
| `find . -name`     | search for a file recursively                               |
| `history`          | list the history of commands you typed                      |
| `which`            | identify the location of an executable                      |
| `man`              | display the manual page for a command                       |
| `![number|prefix]` | return an old command based on its history number or prefix |

### More Advanced Commands
| `xargs`                                | Add the pipe input to the argument list                    |
|----------------------------------------|------------------------------------------------------------|
| `expr`                                 | Calculate an expression from arguments                     |
| `tr (-dc)`                             | Replace (translate) or delete characteers                  |
| `cut [-fcd] [--complement] [filename]` | `cut` charaters(`-c`) or fields(`-f`) from each input line |
| `sed [-nf]`                            | Stream editor (Actions will be on the test: `p=syz`)       |

## C-shell
### Commands

- if () cmd
- if () then
    - else if () then
    - else
    - endif
- if (-z/e file)
- switch ()
- while ()
- foreach  ($*)
- $#argv
- \$argv[\$#argv]
- set X = $<
- set X = word
- set X = $3:q
- set T
- unset T
- @ X = $2 + $Y

### Variables

- User created variables
    - `$myvar`, `$file1`, etc.
        - This also include array definition and usage based on subscript range
- Keyword shell variables
    - `$PATH`, `$prompt`, `$HOME`, etc.
        - These have special meaning to the shell
- Positional parameters
    - `$1`, `$2`, etc.
        - You will need to use shift if there are more than 9
- Special parameters
    - `$*` - All arguments as a single string
    - `$#` - The number of command-line arguments
    - `$#X` - The number of elements in array X
    - `$<` - A line typed from keyboard (or redirected from a file)
    - `$?` - The exit status of the last command
    - `$?X`-Test to see if variable X exists

### Symbols

| Symbol             | Description                                                      |
|--------------------|------------------------------------------------------------------|
| `.` , `..` , `~`   |   Current directory  /  Parent directory  /  Home directory      |
| `/`                |   Subdirectory separator in a path name                          |
| `? `, `*`          |   Match one character  /  Match any number of characters         |
| `[]`, `[^]`        |   Match one character from a set  /  not from a set              |
| `cmd<file`         |   Take standard input from a file                                |
| `cmd>file`         |   Redirect standard output to a file                             |
| `cmd>>file`        |   Redirect standard output to the end of a file                  |
| `cmd>& file`       |   Send standard error messages also to file                      |
| `cmd | cmd`        |   Use the 1st command’s output as input to the 2nd command       |
| `cmd ; cmd`        |   Run the 1st command and then run the 2nd                       |
| `cmd && cmd`       |   Run the 2nd command only if the 1st fails                      |
| `cmd || cmd`       |   Run the 2nd command only if the 1st succeeds                   |
| `(cmd; cmd; ...)`  |   Run command(s) in a subshell                                   |
| `` cmd `cmd` ``    |   Command substitution as an argument to another command         |
| `"`, `'`, `\`      |   Quoting characters to control symbol substitution              |
| `$?`, `$?V`        |   exit status of last command, existence check for variable V    |
| `$#`, `$#V`        |   Number of: arguments to a script, elements in an array V       |
| `$*`, `$num`, `$V` |   Access the value(s) of: all arguments, an argument, a variable |

## Regular Expression
### Wild card v.s. regex

- A wild card pattern:
    - `ls [a-e]*`
        - This lists all files beginning with one of the first 5 letters
- A regular expression pattern:
    - `grep '[a-e]*' file`
        - This matches all lines with 0 or more elements of the first 5 letters
            - For example, `abcdebaceda`
            - But the empty string is also a match (because 0 is allowed)
- An extended regular expression pattern:
    - `egrep '[a-e]*' file`
        - This matches the same lines as the above grep did
        - But the matches would be different for egrep `'[a-e]+'` file
- A simple list:
    - `tr -d '[a-e]*' < file`
        - This deleted every instance of any of the first 5 letters. But it also deletes the `[`, `]`, and `*` symbols
        - You see that? You don’t use `[` and `]` to enclose the lists for tr.

| In regex | In csh wilcard | Meaning                    |
|----------|----------------|----------------------------|
| `\`      | `\`            | Same                       |
| `[]`     | `[]`           | Same?                      |
| `.`      | `?`            | Same but different symbols |
| `*`      | `*`            | Different                  |

### Regex symbols

| Symbol | Description                                                                                     | Example                       |
|--------|-------------------------------------------------------------------------------------------------|-------------------------------|
| `^`    | caret, as the first symbol of a regex, requires the expression to match the front of a line.    | line begins with 'A': `^A`    |
| `$`    | dollar sign, as the last symbol of a regex, requires the expression to match the end of a line. | line ends with 'Z': `Z$`      |
| `\`    | backslash, turns off special meaning for the next character.                                    | match to a literal '$': `\$`  |
| `[]`   | brackets, matches to any one of the enclosed characters.                                        | match to any vowel: `[aeiou]` |
| `.`    | period, matches to any 1 character.                                                             | a 1-character line: `^.$`     |

::: tip Special Symbols Inside Brackets
| Symbol | Description                                                                                         | Example                   |
|--------|-----------------------------------------------------------------------------------------------------|---------------------------|
| `-`    | hyphen, inside `[]`, matches to a range.                                                            | a digit: `[0-9]`          |
| `^`    | caret, as the first symbol inside `[]`, matches any one character except those enclosed in the `[]` | not a letter: `[^a-zA-Z]` |
::: warning The Position of The Caret
If the caret was not placed as the first symbol inside `[]`, for example, `[ab^cd]`, then it just represents a literal `^'.
:::

### Normal regex only


| Expression       | Description                                                                                                                                     |
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| `\{x\}`          | Matches `x` repetitions of the preceding regex.                                                                                                 |
| `\{x,y\}`        | Matches `x` to `y` repetitions of the preceding regex.                                                                                          |
| `\{,x\}`         | Matches if the number of repetitions of the preceding regex $\leq$ `x`.                                                                         |
| `\{x,\}`         | Matches if the number of repetitions of the preceding regex $\geq$ `x`.                                                                         |
| `\>`             | The preceding regex must end at the end of a **word**.                                                                                          |
| `\<`             | The preceding regex must end at the start of a **word**.                                                                                        |
| `\(...\)`        | Define a **group** for a sub-portion of the regex. A group can be used before `*` or `\{...\}`, which match the repetition of the entire group. |
| `\1`, `\2`, etc. | Backreference. Identify a rematch to the earlier pattern. We'll see the detail below.                                                           |

### Extended regex only

|Symbol|Description|
|-|-|
|`?`|Makes the preceding expression optional, i.e. `\{0,1\}`.|
|`+`|Requires the preceding expression to occur **at least once**, i.e. `\{1,\}`.|
|`|`|The OR operation. To search for one of 2 different patterns.|
|`()`|Can be used to change the associatibity of `|`. E.g. `x(w|y)z` matches to `xwz` or `xyz`. Also it can extend the range of `*`, `+`, and `?`|

### Regex vs. eregex


| Expression       | In `grep`                      | In `egrep`                                     |
|------------------|--------------------------------|------------------------------------------------|
| `abc|def`        | the string `abc|def`           | `abc` or `def`                                 |
| `(a$)|(b(c|d)e)` | the string `(a$)|(b(c|d)e)`    | lines ending in `a` or contains `bce` or `bde` |
| `ab+c`           | the string `ab+c`              | `abc` or `abbc`, or `abbbc`, etc.              |
| `\([ab]\)\1`     | `aa` or `bb`                   | `(a)1` or `(b)1`                               |
| `a\{2`           | an error, closing \} not found | `a{2`                                          |
| `\<a`            | words begin with `a`           | `<a` (in standard egrep)                       |


