# Lecture 7
## More `sed`

After the `c` command, the program don't go to the next state. Instead, it clears the pattern space and resets the program to the first state. i.e., the presence of `-n` doesn't matter because the state handling it has been dropped.

The rest of line after `i`, `a`, `c` is the argument for the commands. So the semicolon and everything else would be the part of the argument for `iac`, i.e., the `;` would not be a command separtor.

In a sed file, use them like
```
-aeverything is part of the argument until newline
-creset
```
In co
