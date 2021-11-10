# Lecture 9

```sh
cal | sed '\ 1 d'
cal | sed '/1/d'
```

```sh
cal | sed -n '1p'
```

### Pattern match conditionals - the DFA analogy
```sh
% cat script
#!/usr/bin/sed -f
/start/,/stop/ s/#.*//
```
```sh
cat f1
star #
start #
sto
sto#
stop#
star#
% ./script < f1
```

| Input line | Action                                            |
|------------|---------------------------------------------------|
| `star #`   | Print the line                                    |
| `start #`  | Go to state 1 and remove `#`, then print the line |
| `sto`      | Still in state 1, print the line                  |
| `sto#`     | Remove `#` and print the line                     |
| `stop#`    | Remove `#`, print the line, then go to state 0    |
| `star#`    | Print the line                                    |

```sh
% cat f2
ffstart #ff
stop #
start#
ggg#
% ./script < f2
```
| Input line    | Action                                              |
|---------------|-----------------------------------------------------|
| `ffstart #ff` | Go to state 1 and remove `#ff`, then print the line |
| `stop #`      | Remove `#`, print the line, then go to state 0      |
| `start#`      | Go to state 1 and remove `#`, the print the line    |
| `ggg#`        | Remove `#` and print the line                       |

```sh
% cat f2
ffstart #stop
stop # start
ggg#
start#
stop # start
ggg#
% ./script < f2
```
| Input line      | Action                                                |
|-----------------|-------------------------------------------------------|
| `ffstart #stop` | Go to state 1 and remove `#stop`, then print the line |
| `stop # start`  | Remove `# start`, print the line, then go to state 0  |
| `ggg#`          | Print the line                                        |
| `start#`        | Go to state 1, remove `#` and print the line          |
| `stop # start`  | Remove `# start`, print the line and go to state 0    |
| `ggg#`          | Print the line                                        |

The following only works in Linux sed but not in macOS sed

```sh
seq 3 | sed 's/2/two/;t;d'
```

```sh
seq 3 | sed '/2/b;d'
seq 3 | sed '/2/!d'
```


