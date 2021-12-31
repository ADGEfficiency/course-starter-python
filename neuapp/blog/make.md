---
title: Make for Data Science
description: Make your data science workflows better with this classic UNIX tool.
date: 2021-01-20
featured_image: /images/photos/gokyo-wide.jpg
slug: "/blog/make"

---

`make` is a UNIX program, of a similar vintage to `grep` and `ssh` - **a powerful tool**, that has **stood test of time** and is **available everywhere serious compute is done**.

`make` has it's origin compiling C programs - not a common task for a data professional! 

This post will show you how to use this **classic tool** in a **modern data project**.


##  Der Anfang ist das Ende

We start where we will end - at the final `Makefile` we will develop together in this post.

By the end you'll understand how it all works (don't worry if you don't right now!).

```make
# Makefile

all: ./data/clean.json

./data/raw.json: ./data/raw.json ./ingest.py
	mkdir -p data
	./ingest.py

./data/clean.json: ./data/raw.json ./clean.py
	./clean.py
```

## Notation

*Just a quick note to make sure we are on the same page*.

Shell commands start with a `$`, with shell output shown below unindented.

```bash
$ shell-command
printed output
```

Filenames are given at the top of the codeblock, separated from the start of the file by one line.

```
file.name

first_line_of_file
second_line_of_file
```

The shell code blocks were run with `zsh`, but should be totally `bash` compatabile.  The Python code blocks were run with Python `3.8.10`.


## Anatomy of a Makefile

A `Makefile` has three components:

1. targets - either files you are trying to make or a `PHONY` target,
2. dependencies - targets that need to be run before,
3. workflow - the sequence of steps needed to make your target.


```make
target: dependencies
<TAB>workflow
```

## Running a Makefile

Take the very simple `Makefile` below, that creates an empty `data.html` file:

```make
# Makefile

data.html:
	echo "making data.html"
	touch data.html
```

Running `make` without a target will run the first target - in our case the only target, `data.html`:

```bash
$ make
making data.html
touch data.html
```

If we run this again, we see that `make` doesn't make `data.html` again:

```bash
$ make
make: `data.html' is up to date.
```

Finally, if we do reset our pipeline, running `make` runs our pipeline again:

```bash
$ rm data.html; make
making data.html
touch data.html
```

Already we have demonstrated one of the big features of `make` we think is useful (intelligent re-execution).

Before we get too carried away, lets set our motivation for using `make` in a data project.
cliff stick street liar raccoon lizard exact bundle cry obvious youth cousin

## Why `make` for data science?


### Workflow documentation

When you start to use a `Makefile` in your project, they become anchors that your project is setup around - it is a natural central place to document and execute your entire project.

It's also machine readable & executable documentation (the best kind), and it's easy to track changes in source control.

Creating your data science workflow in a sequence of `make` targets massages your pipelines to be more modular - encouraging functional decomposition of shell or Python scripts.


### CLI for free

A `Makefile` tightly integrates with the shell environment it was born in.  

We can easily configure variables at runtime via either shell environment variables or via command line arguments:

```make
# Makefile

all:
	echo "$(NAME) is from $(COUNTRY)"
```

We can run this `Makefile` - setting our variable `NAME` by an environment variable and our `COUNTRY` variable by an argument passed to the `make` command:

```bash
$ export NAME=adam; make COUNTRY=NZ 
echo "$(NAME) is from $(COUNTRY)"
adam is from nz
```


### Intelligent pipeline re-execution

The final feature of `make` thats useful in data workflows is **intelligent pipeline re-execution**.

`make` uses timestamps on files to track what to re-run (or not re-run) - it won't re-run code that has already been run and will re-run if the source code changes.

To demonstrate this intelligent re-execution we need to develop full pipeline.


## Our pipeline

We will build a simple data pipeline - using simple Python scripts as mock for real data tasks - with data flowing from left to right:

<center>
  <img src="/images/posts/make/data.png" width="60%" align="center">
  <br />
  <figcaption>Data flows from left to right, in a two stage ingestion & cleaning process.</figcaption>
</center>
<br />

We can look at the same pipeline in terms of the dependency between the data artefacts & source code of our pipeline - with dependency flowing from right to left:

<center>
  <img src="/images/posts/make/dep.png" width="60%" align="center">
  <br />
  <figcaption>Dependency flows from right to left, with the data depending on the code that makes it.</figcaption>
</center>
<br />


## Developing our pipeline in a `Makefile`

Now we will go step by step through our two step pipeline.

### 0. Our pipeline components

First, lets look at the two components in our pipeline - an ingestion step and a cleaning step.

Our ingest step writes some data to a JSON file:

```python
#  ingest.py

#!/usr/bin/env python3
from datetime import datetime
import json
from pathlib import Path

fi = Path.cwd() / "data" / "raw.json"
fi.parent.mkdir(exist_ok=True)
fi.write_text(json.dumps({"data": "raw", "ingest-time": datetime.utcnow().isoformat()}))
```

We can run this Python script and use `cat` to take a look at it's JSON output:

```bash
$ ./ingest.py; cat data/raw.json
{"data": "raw", "ingest-time": "2021-12-19T13:57:53.407280"}
```

Our clean step takes the raw data generated and updates the `data` field to `clean`:

```python
#  clean.py

#!/usr/bin/env python3
from datetime import datetime
import json
from pathlib import Path
all: ./data/clean.json

data = json.loads((Path.cwd() / "data" / "raw.json").read_text())
data["data"] = "clean"
data["clean-time"] = datetime.utcnow().isoformat()
fi = Path.cwd() / "data" / "clean.json"
fi.write_text(json.dumps(data))
```

We can use the same pattern to generate and look at the result of our cleaning step:

```bash
$ ./clean.py; cat data/clean.json
{"data": "clean", "ingest-time": "2021-12-19T13:57:53.407280", "clean-time": "2021-12-19T13:59:47.640153"
```


### 1. Track pipeline dependencies

Let's start out with a `Makefile` that runs our two stage data pipeline.

We are already taking advantage of the ability to create dependencies between our pipeline stages, making our `clean` target depend on our `raw` target.

We have also included a top level meta target which

```make
all: clean

raw:
	mkdir -p data
	./ingest.py

clean: raw
	./clean.py
```

We can use this `Makefile` from a terminal using by running `make`, which will run our meta target `all`:

```bash
$ make
mkdir -p data
./ingest.py
ingesting {'data': 'raw', 'ingest-time': '2021-12-19T14:14:54.765570'}
./clean.py
cleaning {'data': 'clean', 'ingest-time': '2021-12-19T14:14:54.765570', 'clean-time': '2021-12-19T14:14:54.922659'}
```

If we go and run only the `clean` step of our pipeline, we run both the ingest and cleaning step again.  This is because our cleaning step depends on the output of data ingestion:

```bash
$ make clean
mkdir -p data
./ingest.py
ingesting {'data': 'raw', 'ingest-time': '2021-12-19T14:15:21.510687'}
./clean.py
cleaning {'data': 'clean', 'ingest-time': '2021-12-19T14:15:21.510687', 'clean-time': '2021-12-19T14:15:21.667561'}
```

What if we only want to re-run our cleaning step?  Our next `Makefile` iteration will avoid this unnecessary re-execution.


### 2. Track pipeline outputs

Now let's improve our `Makefile`, by making changing our targets to be actual files - the files generated by that target. 

```make
all: clean

./data/raw.json:
	mkdir -p data
	./ingest.py

./data/clean.json: ./data/raw.json
	./clean.py
```

Removing any output from previous runs with `rm -rf ./data`, we can run full our pipeline with `make`:

```bash
$ rm -rf ./data; make
mkdir -p data
./ingest.py
ingesting {'data': 'raw', 'ingest-time': '2021-12-27T13:56:30.045009'}
./clean.py
cleaning {'data': 'clean', 'ingest-time': '2021-12-27T13:56:30.045009', 'clean-time': '2021-12-27T13:56:30.193770'}
```

Now if we run `make` a second time, nothing happens:

```bash
$ make
make: Nothing to be done for `all'.
```

```bash
$ make ./data/clean.json
make: `data/clean.json' is up to date.
```

If we do want to only re-run our cleaning step, we can remove the previous output and run our pipeline again - with `make` knowing that it only needs to run the cleaning step again with existing raw data:

```bash
$ rm ./data/clean.json; make 
./clean.py
cleaning {'data': 'clean', 'ingest-time': '2021-12-27T13:56:30.045009', 'clean-time': '2021-12-27T14:02:30.685974'}
```



### 3. Track source code dependencies 

The final improvement we will make to our pipeline is to track dependencies on source code.

Let's update our `clean.py` script to also track `clean-date`:

```python
#  clean.py

#!/usr/bin/env python3
from datetime import datetime
import json
from pathlib import Path

data = json.loads((Path.cwd() / "data" / "raw.json").read_text())
data["data"] = "clean"
data["clean-time"] = datetime.utcnow().isoformat()
data["clean-date"] = datetime.utcnow().strftime("%Y-%m-%d")
fi = Path.cwd() / "data" / "clean.json"
fi.write_text(json.dumps(data))
```

And now our final `Makefile` pipeline:

```make
# Makefile

all: ./data/clean.json

./data/raw.json: ./data/raw.json ./ingest.py
	mkdir -p data
	./ingest.py

./data/clean.json: ./data/raw.json ./clean.py
	./clean.py
```

Our final step, after updating only our `clean.py` script, `make` will run our cleaning step again:

```bash
$ make
./clean.py
ingesting {'data': 'clean', 'ingest-time': '2021-12-27T13:56:30.045009', 'clean-time': '2021-12-27T14:10:06.799127', 'clean-date': '2021-12-27'}
```


## Summary

A quick reminder of the journey we have been on - we have learnt:
- Workflow documentation

Central point of execution

Intelligent re-execution

Parameterize variables (example)


There is so much more depth and complexity

Parallel execution of targets

---

/Users/adam/programming-resources/bash-and-unix/make/README.md
