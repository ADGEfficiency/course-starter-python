---
title: Three Useful Terminal One Liners
description: Get lots done with these three simple shell commands.
date: 2021-04-10
type: post
slug: "/blog/terminal-one-liners"

---

Part of maturing as a programmer is developing commands and scripts that become an integral part of your daily workflow.

**In this post we share three one line commands that are valuable parts of our workflows**. These commands are here because they are useful - not because they are complex!  

The three commands are:

1. find text in files with `grep`,
2. view JSON and CSV files,
3. update a Python requirements file.

*This post follows the convention of starting shell commands with a* `$`. *For commands that are expanded by the shell, we show the expanded command below without a* `$`. 

*We use the terms shell and terminal interchangeably.  These commands are all compatible with zsh.*


## Task 1 - Find text in files with `grep` 

A common task when working at a terminal is finding files that contain a specific string of text.

This is for answering questions like:

- in which file did I define the `Model` class?
- where did I write my notes on backpropagation?
- which file contains my grandma's secret recipe?

There are a number of tools that can achieve this task - `awk`, `sed`, `find` or `grep` can all do this.  Having so many different ways to do the same task is overwhelming - the key is to find which tool works for you.

For us this tool is `grep` - used to match text based on regular expressions (regex).  However, you don't need to know regex to get value out of `grep`!

One of the challenges when trying to learn a powerful tool like `grep` is the large amount of things it can do.  **Using powerful tools often follows a Pareto distribution - a few use cases offer much of the value**.

For `grep`, one of these powerful use cases is to search for text in files, and return the filename if there is a match.  To do this we pass three arguments to `grep`:

- `-i` to ignore case,
- `-r` to search recursively (deep into the filesystem),
- `-l` to return filenames.

For example, to search for files that contain the text `class Model`, in the current directory and deeper (hence the `.`):

```bash
$ grep -irl 'class Model' .
```

We find this configuration of `grep` so useful that we have it mapped to an alias `g` (defined in our `.zshrc`):

```bash
alias g='grep -irl '
```

This allows searching with only a single character:

```bash
$ g 'class Model' .
```

If you want to narrow down which folder you want to search in, you can specify it instead of using the `.`. 

For example, to search only in a folder named `src`, we would use:

```bash
$ g 'class Model' src
```


## Task 2 - View JSON & CSV files

One of the benefits of storing data in text is that we can work with them using the same tools we write code with.  However, often these tools will not visualize data in the best way.

Let's take the example of a simple JSON file `data.json`:

```json
# data.json
{"outer":{"inner":"value"}}
```

Using `cat` will print out the file, without any attempt to make the structure more readable:

```bash
$ cat data.json
{"outer":{"inner":"value"}}
```

A better approach here is to pipe the output of `cat` into `jq`, a program designed for handling JSON.  This will show the structure of the file in a more useful way:

```bash
$ cat data.json | jq
{
  "outer": {
    "inner": "value"
  }
}
```

We use this so often that we actually have a simple function defined in our `.zshrc`:

```bash
# ~/.zshrc
json() {
  cat $1 | jq | less
}
```

This allows quick & easy viewing of JSON files at any time from the shell:

```bash
$ json data.json
{
  "outer": {
    "inner": "value"
  }
}
```

The other common form of text data is the CSV - imagine we have some data stored in a CSV format in `data.csv`:

```bash
# data.csv
col1,col2,col3
10,20,30
30,40,50
```

Using `cat` to view this file makes the structure hard to read:

```bash
$ cat data.csv
col1,col2,col3
10,20,30
30,40,50
```

We can improve how this file is displayed by piping it through the program `column` with the following flags:

Piping this file through the program `column` will improve how it is displayed, using the following flags:

- `-t` to create a table,
- `-s,` to indicate the data is comma separated.

Because CSVs often have many rows, it can be useful to pass the output of `column` into `less` to be able to page through the file.

We can also use the `-S` flag with `less` to cut off the columns at the width of the screen:

```bash
$ cat data.csv | column -t -s, | less -S
col1  col2  col3
10    20    30
30    40    50
```

Similar to our `json` command, we have this saved in our `.zshrc` as a command called `csv`:

```bash
# ~/.zshrc
csv() {
  cat $1 | column -t -s, | less -S
}
```

Which allows easy & quick viewing of CSVs from the shell:

```bash
$ csv data.csv
col1  col2  col3
10    20    30
30    40    50
```


## Task 3 - Update a requirements file

Many programming languages use text files to track dependencies, such as a `package.json` in Javascript or a `requirements.txt` in Python.

A common workflow with Python is to install packages as we are developing a project, without specifying the package version.  Later on when we want to share the project with others, we want to specify which version we ended up using in our `requirements.txt`.

The slow way to do this would be to:
- run `pip freeze` (which prints installed packages to STDOUT), 
- scroll to find the package, 
- copy the package and paste it into our `requirements.txt` file.

We can instead do all this in a single line!

First we pipe `pip freeze` into `grep` - using `grep` to match lines that have our package name (in this case `streamlit`):

```bash
$ pip freeze | grep streamlit
streamlit==0.79.0
```

We can then append the output of this command onto our `requirements.txt` file:

```bash
$ pip freeze | grep streamlit >> requirements.txt
```

Our `requirements.txt` file will now include `streamlit`, with the correct version specified:

```bash
$ tail -n 1 requirements.txt
streamlit==0.79.0
```

---

Thanks for reading!

If you enjoyed this post, be sure to check out our article [Three Uncommon Bash Tricks](https://www.datasciencesouth.com/blog/three-uncommon-bash-tricks).
