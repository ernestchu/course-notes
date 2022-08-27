# Lecture 4

## C-Shell Control Flow

- if
    - then, else, endif
- switch
    - case, default, breaksw, end
- while
    - continue, break, end
- foreach
    - continue, break, end

### if statement

#### Simple format
```sh
if ( <expression> ) <statement>
```
#### Full format
```sh
if ( <expression> ) then
    <statement>
else if ( <expression> ) then
    <statement>
else
    <statement>
endif
```
::: warning Spaces
C-shell is super picky about spaces between words and symbles. The spaces in the example above is necessary. If you get an error message while developing, first try fixing it by **adding spaces**
:::

#### Csh condition test operators

<table>
    <tr>
        <th>Symbol</th>
        <th>Name</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>!</td>
        <td>Negate</td>
        <td rowspan=4>Works just as they do in C conditionals</td>
    </tr>
    <tr>
        <td>!=</td>
        <td>Not equal</td>
    </tr>
    <tr>
        <td>==</td>
        <td>Equal</td>
    </tr>
    <tr>
        <td>>, &lt;, &lt;=, >=</td>
        <td>Relational</td>
    </tr>
    <tr>
        <td>=~</td>
        <td>Match to wildcard pattern</td>
        <td>[variable] =~ [pattern]</td>
    </tr>
    <tr>
        <td>!~</td>
        <td>Not match to wildcard pattern</td>
        <td>[variable] !~ [pattern]</td>
    </tr>
</table>

#### Csh conditional file tests

```sh
if ( -d filename ) # true if filename is a directory
if ( -e filename ) # true if filename exists
if ( -f filename ) # true if filename is a plain file
if ( -o filename ) # true if you own the file
if ( -r filename ) # true if filename is readable
if ( -w filename ) # true if filename is writable
if ( -x filename ) # true if filename is executalbe
if ( -z filename ) # true if filename is empty
```

::: warning Examing Flags From Arguments
Suppose you want to  write a script that accepts a `-r` option as an script arguments. The following won't work.
```sh
if ( $1 == -r ) echo "The -r flag was given"
```
If `$1` is indeed `-r`, after the substitution, it would become
```sh
% if ( -r == -r ) echo "The -r flag was given"
if: Missing file name.
```
which examine if the file `==` is readable and a trailing `-r` causing the error.
:::
::: tip Adding a dummy prefix
The best you can do is to add a dummy prefix, for example
```sh
if ( d$1 == d-r ) echo "The -r flag was given"
```
:::

### while loop
#### Emulating for loop with `while`
```sh
#!/bin/tcsh
@ i = 0
while ( `expr $i \< 3` )
    echo -n $i
    @ i++
end
```
::: details Output
```sh
0 1 2
```
:::

### foreach
Dive into an example
```sh
#!/bin/tcsh
foreach person (Bob Susan Nico)
    echo Hello $person
end
```
::: details Output
```sh
Hello Bob
Hello Susan
Hello Nico
```
:::

::: tip Still A Better For Loop
```sh
#!/bin/tcsh
foreach i (`seq 10 10 100`)
    echo $i + 1 = `expr $i + 1`
end
```
::: details Output
```sh
10 + 1 = 11
20 + 1 = 21
30 + 1 = 31
40 + 1 = 41
50 + 1 = 51
60 + 1 = 61
70 + 1 = 71
80 + 1 = 81
90 + 1 = 91
100 + 1 = 101
```
:::

## A Delete Script
Let's write a scrtpt!

### List of functionalities
For each command-line argument

1. Ask about whether it should be deleted.
1. Read the user's response from stdin.
1. Perform the action indicated by the user's response.

### Source code
```sh
#!/bin/tcsh
foreach name ($argv) # loop through arguments
    if ( -f $name ) then # test if it is a file
        echo -n "delete the file $name (y/n/q)? "
    else
        echo -n "delete the entire directory"\
                "$name (y/n/q)? "
    endif
    set ans = $< # This symbol indicates to take input from keyboard
    switch ( $ans )
        case n:
            continue
        case q:
            exit # no args means $? will be 0
        case y:
            rm -rf $name
    endsw
end
```
## Quote
So far, we've seen many special symbols that have their own special meanings, such as `|` is for pipelining, `$` is for variables, etc.. However, what if we want those symbols literally, i.e. the plaintext, no special meaning. Then we **quote** them.

There're three quoting symbols
| Symbol | Description           |
|--------|-----------------------|
| `\`    | Single charater quote |
| `'`    | Strong quotes         |
| `"`    | Weak quotes           |

### Strong quote
Stong quote `'`. What do you mean by strong? If it's strong, it can turn other special symbols into plaintexts. If a special symbol is **stronger** then it, such as `![prefix]`, then it cannot suppress the symbol
```sh{4}
% echo 'Hi! Hi!'
Hi! Hi!
% echo 'Hi!Hi!'
Hi!: Event not found.
```
On the line 4, the `!` thought `Hi!` was a prefix of a previous command, but obviously, we don't have commnads with prefix of `Hi!`.

### Weak quote
Weak quote `"`. Allow dollar sign `$` and backtick execution `` `[command]` `` to expand inside two quotes. i.e. it's not strong enough to supress these two special symbols.
```sh
% echo "Is the executable under $PATH?"
Is the executable under /usr/local/opt/tcl-tk/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Applications/VMware Fusion.app/Contents/Public:/Library/TeX/texbin:/Library/Apple/usr/bin?
% echo "My current directory is `pwd`"
My current directory is /Users/ernestchu
```

::: tip Strength
**`\` > `'` > `"`**

- `\` supresses `!` (history expansion) and all other commands, even EOL can be quoted. That's why we can add `\` at the end of lines to have multi-line commands.
- `'` as *weaker* quotes, cannot supresses `!`
- `"` as even weaker quotes, cannot surpress `!`, `$` and backticks ` `` `

:::
::: danger Quotes Within Quotes
The strength is based on what commands do they surpress. But it doesn't mean `\` surpresses `'` or `'` surpresses `"`.
```sh{9-12}
% echo "'"
'
% echo '"'
"
% echo '\'"\"
\\
% echo \'\\\"
'\"
% echo '''
Unmatched '''.
% echo """
Unmatched """.
```
Interestingly, the only quote that can quote itself is `\`. Neither `'` nor `"` can quote themselves. Why? We'll see below
:::
The shell parsed commands from left to right
```sh{1}
'I am in the stong quote interpretation rule.'
↑                                            ↑
│                                  turn off ─┘
└─ turn on strong quote interpretation
```
So actually, quotes doesn't generate string, they just change the way a shell interpretates commands.

Once it entered the **zone** by hitting `'`, the shell turn on plaintext interpretation until it hits next `'`. (Yet except `!`)

### Exercise
```
% echo 'This doesn\'t work'
Unmatched '''.
% echo 'Turn off the "strong quote interpretation" first, then it'\''ll work!'
Turn off the "strong quote interpretation" first, then it'll work!
```

## Backslash'es'
How does `echo` interpret the `\` symbol?
### Can we use the escape sequences inside quotes?
It's really depends on the shell
```sh
# In tcsh on Steve's computer
% echo 'a\tb\\'
a   b\
# In tcsh on my MacBook
% echo 'a\tb\\'
a\tb\\
```
We'd better follow Steve's computer...

### From 1 to n backslashes
```sh
% echo \ # 1
? 
# this is not an output, it's an indicator telling you 
# that the command hasn't finished, because EOL was suprressed
% echo \\ # 2
\
% echo \\\ # 3
? # same as line 2
% echo \\\\ # 4
\
# csh substitute \\\\ with \\. However, when \\ is sent into echo
# as an argument, echo has it's own substitution again, thus /
% echo \\\\\ # 5
? # same as line 2, so we know odd number of \ would all get this
% echo \\\\\\\\ # 8
\\ # echo receives \\\\, hence substitute with \\ internally
% echo \\\\\\\\\\\\\\\\ # 16
\\\\ # echo receives \\\\\\\\.
% echo \\\\\\\\\\\\\\\\ | xargs echo
\\ # been through two internal substitutions of echo
% echo '\\\\\\\\' | xargs echo
\\ # quoted, hence \\\\\\\\ -> \\\\ -> \\
```
::: warning xargs Do Not Substitute
We've said `echo` does it own expansion, what about `xargs`? Does the `\\` in `xargs echo \\` become `\` before send into `echo`? The anwser is negative. Let's look at an example on wildcard expansion
```sh
% ls ?
A B
% echo ? '?'
A B ?
% echo ? | xargs echo
A B # A B were sent to xargs echo, so it makes sense
% echo '?' | xargs echo
? # ? was sent to xargs echo, and xargs don't do the expansion
% echo `echo '?'`
A B 
# while backticks simply substitute echo '?' with ? (without quotes).
# so it becomes echo ?
```
:::

## Debugging
Not sure if you quote correctly? Especially when you writing a script. Well, Unix provides a great tool to help you out!

- `set echo` print every command executed **after** the subsitution
- `set verbose` print every command executed **before** the substution

And you can `unset` them if you want to turn off the behavior.
