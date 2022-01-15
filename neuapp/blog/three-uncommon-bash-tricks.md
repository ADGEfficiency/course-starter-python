---
title: Three Uncommon Bash Tricks
description: Type less on the terminal with these underused Bash patterns.
date: 2020-12-16
slug: "/blog/three-uncommon-bash-tricks"
type: post

---

**Good developers type less**.  

Typing less reduces the toll that working at a computer takes on your body - reducing typing means less pain in your hands and wrists.

Typing less allows developers to work more accurately, making less mistakes by accessing previous commands from history rather than retyping each command.

For a developer, making proper use of your shell (commonly Bash) is one opportunity to type less.  

**That's what this post is about - three Bash tricks that will let you type less**:

1. **parameter expansion** with `{a,b}` - to avoid retyping within a single command,
2. **accessing the last argument** with `$_` - to avoid retyping from the last command,
3. **quick substitution** with `^old^new` - to quickly change part of the last command.


All of these tricks are compatible with zsh.

*This post follows the convention of starting shell commands with a* `$`. *For commands that would be expanded by the shell, we show the expanded command below without a* `$`.


## Parameter expansion with `{a,b}`

It's common to repeat a pattern with a single shell command.

Take the example of changing the suffix on a file, which we can do with `mv`:

```bash
$ mv README.txt README.md
```

Notice how we write `README` twice?

Parameter expansion can avoid this repetition - we can change the suffix without typing `README` twice:

```bash
$ mv README.{txt,md}
mv README.txt README.md
```

The parameter expansion we use is `{txt,md}`, which is expanded to two arguments - `txt md` (separated by a space).

### What is parameter expansion?

Parameter expansion creates one argument for each element inside the curly braces, separated by a comma:

```bash
$ echo {1,2,3}
1 2 3

$  echo pre{1,2,3}fix
pre1fix pre2fix pre3fix
```

An empty entry will create an argument with nothing substituted:

```bash
$ echo pre{,1,2}fix
prefix pre1fix pre2fix
```

Another example - renaming a `models` folder to `ml` inside a `data` folder:

```bash
$ mv data/models data/ml
```

We can save retyping `data/` by using parameter expansion:

```bash
$ mv data/{models,ml}
mv data/models data/ml
```

We can use parameter expansion with a sequence of numbers - useful to create numbered directories:

```bash
$ mkdir data{0..2}
mkdir data0 data1 data2
```

We can also do parameter expansion inside an argument - for example to change a folder halfway up a path:

```bash
$ cat models/{baseline,final}/data.csv
cat models/baseline/data.csv models/final/data.csv
```

A final example, using three parameters - moving two Python test files into a `tests` folder:

```bash
$ mv tests{_unit.py,_system.py,}
mv tests_unit.py tests_system.py tests
```

### When to use parameter expansion

*Any time you are retyping something multiple times in a single command, it's likely parameter expansion can help save your exhausted hands.*


## Accessing the last argument with `$_`

Our previous tip, parameter expansion, is about typing less on a single command - this tip is about typing less across multiple commands.

Terminals are operated by a sequence of commands - we often want reuse information across multiple commands, such as part of the previous command.


Take the case of making a folder and moving into it:

```bash
$ mkdir temp
$ cd temp
```

Notice that we reuse the argument `temp` again in our second command? 

**We can saving retyping** `temp` **and bring it forward from the previous command using** `$_`:

```bash
$ mkdir temp
$ cd $_
cd temp
```

Above we use `$_` to access the last argument of the previous command, which in this case is `temp`.

This use case of wanting to reuse the last argument of the last command (here `temp`) is so common, that Bash stores it in a special variable `_`, which we access using a `$` prefix (same as for `$PATH` or `$HOME`).

Another example of using `$_` - moving a file and printing to `STDOUT` using `cat`:

```bash
$ mv main.py src/main.py 
$ cat src/main.py
```

Notice how we are again reusing the last argument `src/main.py`?

You can rewrite this using `$_` to automatically bring forward `src/main.py` into your second command:

```bash
$ mv main.py src/main.py 
$ cat $_
cat src/main.py
```

Using `$_` means you don't need to rewrite a complicated file path, giving you no chance to incorrectly retype it.

### When to use `$_`

*Any time you are retyping something multiple times across multiple commands, it's likely using* `$_` *can help reduce the strain on your weary hands.*


## Quick substitution with `^old^new`

Sometimes (often in our case) we run a command in the Shell and quickly realize we made a mistake.  

Rather than retyping the command again, we can use **quick substitution to fix the mistake by replacing text in the previous command.**

An example - you are SSHing into a server and run the command to connect - only to realise it should be have `user` instead of `ubuntu` all along!

```bash
$ ssh ubuntu@198.compute.com
```

Instead of retyping the entire command again, you can use quick substitution to change just the part you want - here to change `ubuntu` into `user`:

```bash
$ ^ubuntu^user
ssh user@198.compute.com
```

The pattern in quick substitution is `^old^new`. It is the equivalent of doing `!!:s/old/new` - `!!` to get the last command and `:s` for a substitute regex.  

I think you'll agree `^old^new` is a little easier :)


### When to use `^old^new`

*When you want to modify a small part of the previous command via substitution, use* `^old^new`.

---

Thanks for reading!

