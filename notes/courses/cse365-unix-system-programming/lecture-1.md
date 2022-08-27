# Lecture 1
## The Unix Philosophy

- Provide tools that do one thing **well**
- Let you combine these simple tools into a more powerful Unix commands
- Treat all communication as being via **files**
- A file is modeled as a **character stream**, for example
    - The keyboard input & screen output
    - Input from or output to a file by **redirection** or **pipeline**

### Introducing Unix commands

Commands consist of 

- A name
- Optional flags
- Arguments

For example: Flag `-n` display files with line numbers.

| Name  | Flag | Argument   |
|-------|------|------------|
| `cat` | `-n` | `filename` |

#### For any command, you can easily find the usage with flags and arguments by
```sh
man [command name]
```

## Viewing Files

| Command              | Description                                                             |
|----------------------|-------------------------------------------------------------------------|
| `cat [filename]`     | Display a file on screen                                                |
| `cat -n [filename]`  | Display a file with line numbers                                        |
| `less [filename]`    | Display a file as a book (you can scroll back & forth)                  |
| `head -n [filename]` | Display the first n lines                                               |
| `tail -n [filename]` | Display the last n lines                                                |
| `paste [filename]`   | `cat` concatenates **vertically** while `paste` pastes **horizontally** |

### Useful but less important commands

| Command           | Description                                    |
|-------------------|------------------------------------------------|
| `tac [filename]`  | `cat` file upside-down (`cat`->`tac`)          |
| `rev [filename]`  | `cat` file horizontally reversed               |
| `fold [filename]` | Fold long lines for finite width output device |

## Navigating in Unix

| Command          | Description                               |
|------------------|-------------------------------------------|
| `ls`             | list files and directories in a directory |
| `cd [directory]` | change current directory                  |
| `pwd`            | print working directory                   |

### Absolute & Relative addressing

For example

```sh
/ (root)
├── bin
├── etc
├── home
│   ├── alice
│   │   ├── document *
│   │   ├── download
│   │   ├── image
│   │   └── video
│   └── bob
│       ├── document
│       ├── download
│       ├── image
│       └── video
├── tmp
└── usr
```
If we are currently under the directory `alice` and want to change to the directory the star noted, we can use

| Absolute Path             | Relative Path |
|---------------------------|---------------|
| `cd /home/alice/document` | `cd document` |

Also, if I logged in as Alice, `/home/alice` equals `~alice` and `~`. So I can go to alice's document from anywhere by `cd ~/document`, which is an absolute path.

If we are at the directory `alice` and want to go to bob's document, we can use `cd ../bob/document`. Because `..` means the parent directory (`.` means the current one, that why we used `./` to execute executable under the current directory)

Or we can simply just use `cd ~bob/document`

## File Creation and Deletion

| Command          | Description                                 |
|------------------|---------------------------------------------|
| `cp [src] [dst]` | copy files                                  |
| `mv [src] [dst]` | move files                                  |
| `rm`             | remove files                                |
| `mkdir`          | create directory                            |
| `rm -r`          | remove files recursively (remove directory) |

If you use `cp` or `mv` with more than two arguments, the last one must be a directory and rest of the files will be copied into that directory with the name intact

## Wildcards

- `*` can replace any strings with arbitrary length
- `?` can replace exactly one charator.

For example

| name    | effect                            |
|---------|-----------------------------------|
| `a*`    | all files starting with `a`       |
| `*a*`   | all files with `a` in their names |
| `*.cpp` | all files with `.cpp` extension   |
| `?????` | all files with 5-charater names   |

You can use them with a set or a range as well

| name     | effect                                                   |
|----------|----------------------------------------------------------|
| `[abc]*` | all files with the name contains `a`, `b` or `c`         |
| `[a-c]*` | same as above                                            |
| `[^a-c]` | all files with the name **not** contains `a`, `b` or `c` |
| `[ab^c]` | all files with the name contains `a`, `b`, `^` or `c`    |

::: warning Remarks

- You might think that the order w.r.t the range is based on ASCII but it's not.
- It depends on the shell. Some shell would allow you to do `a-B` but not `A-b`.
- The inverse `^` only works if it is the first character, otherwise it would be treated as a key.

:::

### Exercise
Assume
```sh
% ls -l
-rw-r--r--  1 user  group  0 Feb 23 23:24 file1
-rw-r--r--  1 user  group  0 Feb 23 23:24 file2
-rw-r--r--  1 user  group  0 Feb 23 23:24 zfile
```
Perform
```sh
cp *
```
**Problem:** What's the effect?
::: tip Answer
Error, because what `*` expands into will be `file1 file2 zfile`, but zfile is not a directory hence can't perform the copy.
:::
Assume
```sh
% ls -l
-rw-r--r--  1 user  group   0 Feb 23 23:38 file1
-rw-r--r--  1 user  group   0 Feb 23 23:38 file2
drwxr-xr-x@ 2 user  group  64 Feb 23 23:38 zdir
```
Perform
```sh
cp *
```
**Problem:** What's the effect?
::: tip Answer
`file1` and `file2` will be copy into `zdir`, like below
```sh
.
├── file1
├── file2
└── zdir
    ├── file1
    └── file2
```
:::
## Managing Files and Directories

| Command        | Description                   |
|----------------|-------------------------------|
| `ln -s`        | create a symbolic link        |
| `chmod`        | change file permissions       |
| `find . -name` | search for a file recursively |
| `diff`         | compare two files             |
| `fgrep`        | fixed string search           |

### ln
Symbolic link:

- Is a neew i-node pointing to the file's data block
- Deleting a symbolic link will not effect the original file
- Deleting or renaming the file a symbolic link points to will leave you with a link that points to nothin, a.k.a a hanging link
- Symbolic links can span across file system(disk partitions)
- Works with files and directories

### chmod

Recall
```sh
-rw-r--r--  1 user  group   0 Feb 23 23:38 file1
```
`rw-r--r--` among it represents the permission of **UGO**, user, group and others, respectively. Here, everyone can read, only user can write and nobody can execute it.

To be clear, if all of the permissions are enabled, it will be `rwxrwxrwx`.

The owner of the file, `user` here, can use `chmod` to modify the permissions. `chmod` can be followed by `[identities]+/-[permissions]`. 

To enable all the permissions for everyone, use
```sh
chmod ugo+rwx [target]
```
or don't specify the identities, which is the same as `ugo`
```sh
chmod +rwx [target]
```

To disable readability from group and others, use
```sh
chmod go-r [target] 
```
If you are familiar with the encoding, `[1, 2, 4]` are for `[x, w, r]`, respectively. So `rwx` will be `7`, `rw` will be `6`, etc.

To enable all the permissions for everyone and to disable readability from group and others, use
```sh
chmod 777 [target]
chmod 733 [target]
```

### diff
`diff` takes two text files and shows their differences. It's super useful when your professor keeps modifying an announced assignment whose instrucions are so long and monotonous. Then `diff` would be a good friend of yours keeping you from reading the entire instructions over again.

#### Useful flags

| Flag     | Description                                                 |
|----------|-------------------------------------------------------------|
| `-c`     | To display changes in **c**ontext                           |
| `-q`     | Be **q**uiet, just print whether the files have differences |
| `-y`     | Side b**y** side comparison                                 |
| `-W=num` | Set the display **w**idth, useful with `-y`                 |

