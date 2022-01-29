---
title: Make for Data Science
description: Make your data science workflows better with this classic UNIX tool.
date: 2022-01-20
slug: "/blog/make"
type: post

---

`make` is a command-line program of the same class as `grep` and `ssh`. 

A powerful tool that has stood the test of time, `make` is available in terminals everywhere serious compute is done.

Originally used as a build automation tool - `make` can be used for any shell workflows that involve running programs and making files.

`make` isn't commonly used in data projects - I've found it very useful in my day-to-day work!  Here is how to use this classic tool in a modern data project.


##  Der Anfang ist das Ende

We start where we will end - at the `Makefile` we will develop together in this post:

```makefile
# Makefile

all: ./data/clean.json

./data/raw.json: ./data/raw.json ./ingest.py
	mkdir -p data
	./ingest.py

./data/clean.json: ./data/raw.json ./clean.py
	./clean.py
```

Don't worry if it doesn't make sense now!  By the end you'll understand how it all works.


## Notation

*Just a quick note to make sure we are on the same page*.

Shell commands start with a `$`, with shell output shown below unindented.

```shell-session
$ shell-command
printed output
```

Filenames are given at the top of the codeblock, separated from the start of the file by one line.

```bash
file.name

first_line_of_file - commonly a shebang like #!/usr/bin/env python3
second_line_of_file
```

The shell code blocks were run with `zsh` on `MacOS`, and are `bash` compatible.  The Python code was run with `3.8.10`.


## Anatomy of a Makefile

A `Makefile` has three components:

1. targets - files you are trying to make or a `PHONY` target,
2. dependencies - targets that need to be run before a target,
3. workflow - the sequence of steps needed to make your target.


```makefile
target: dependencies
<TAB>workflow
```

Much of the power of a `Makefile` comes from being able to make targets depend on other targets. 

The simple `Makefile` below shows a simple pipeline with one dependency - `end` *depends on* `begin`. Both `begin` and `end` are `PHONY` targets - meaning they do not create a file:

```makefile
# Makefile

.PHONY: begin end

begin:
  echo "The beginning is the end"

end: begin
  echo "Der Anfang is das Ende"
```

A `Makefile` can represent & manage complex data pipelines.  A single workflow can do anything you can do with a shell, making even a single workflow arbitrarily powerful.


## Running a Makefile

Take the `Makefile` below, that creates an empty `data.html` file:

```makefile
# Makefile

data.html:
	echo "making data.html"
	touch data.html
```

Running `make` without a target will run the first target - in our case the only target, `data.html`. 

`make` prints out the commands it runs:

```sh-session
$ make
making data.html
touch data.html
```

If we run this again, we see that `make` runs differently - it doesn't make `data.html` again:

```sh-session
$ make
make: `data.html' is up to date.
```

If we do reset our pipeline (by deleting `data.html`), running `make` will run our pipeline again:

```sh-session
$ rm data.html; make
making data.html
touch data.html
```

Above we have demonstrated one useful feature of `make` - **intelligent re-execution of pipelines**.

Under the hood, `make` makes use of the timestamps on files to understand what to run (or not run).

Before we get too carried away, lets set our motivation for using `make` in a data project.


## Why `make` for data science?

### Workflow documentation

Documenting project workflow is a [basic quality of a good data project](https://www.datasciencesouth.com/blog/data-science-project-checklist).

Most projects will need only one `Makefile` - making this file a natural, central place for your project (second only to the `README.md`).   It's an anchor your project is setup around.  

A `Makefile` is excellent documentation because it is **machine readable & executable** - the best kind of documentation. Like any text file it's easy to track changes in source control.

Creating your data science workflow in a sequence of `make` targets also has the benefit of massaging your pipelines to be more modular - encouraging functional decomposition of shell or Python scripts.


### CLI for free

A `Makefile` tightly integrates with the shell environment it runs in. We can easily configure variables at runtime via either shell environment variables or via command line arguments.

The `Makefile` below has two variables - `NAME` and `COUNTRY`:

```makefile
# Makefile

all:
	echo "$(NAME) is from $(COUNTRY)"
```

We can set our two variables using two different methods:

 - `EXPORT name=adam` - setting our variable `NAME` by to a shell environment variable,
 - `COUNTRY=NZ` - our `COUNTRY` variable by an argument passed to the `make` command.

```sh-session
$ export NAME=adam; make COUNTRY=NZ 
echo "$(NAME) is from $(COUNTRY)"
adam is from nz
```


### Intelligent pipeline re-execution

We have already seen the functionality of intelligent pipeline re-execution - it's a powerful way to not re-run code that doesn't need to run.

`make` uses timestamps on files to track what to re-run (or not re-run) - it won't re-run code that has already been run and will re-run if dependencies of the target change.


## Our pipeline

We will build a data pipeline - using Python scripts as mock for real data tasks - with data flowing from left to right:

<center>
  <img src="/make/data.png" width="80%" align="center">
  <br />
  <figcaption>Data flows from left to right, in a two stage ingestion & cleaning process.</figcaption>
</center>
<br />

Our ingestion step creates raw data, and our cleaning step creates clean data.

We can look at the same pipeline in terms of the dependency between the data artifacts & source code of our pipeline - with dependency flowing from right to left:

<center>
  <img src="/make/dep.png" width="80%" align="center">
  <br />
  <figcaption>Dependency flows from right to left, with the data depending on the code that makes it.</figcaption>
</center>
<br />

Our cleaning data depeneds on both the code used to generate it and the raw data.  Our raw data depends only on the ingestion Python script.


## Developing our pipeline in a `Makefile`


### 0. Our pipeline components

Lets look at the two components in our pipeline - an ingestion step and a cleaning step, both of which are Python scripts.

`ingest.py` writes some data to a JSON file:

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

```sh-session
$ ./ingest.py; cat data/raw.json
{"data": "raw", "ingest-time": "2021-12-19T13:57:53.407280"}
```

`clean.py` takes the raw data generated and updates the `data` field to `clean`:

```python
#  clean.py

#!/usr/bin/env python3
from datetime import datetime
import json
from pathlib import Path

data = json.loads((Path.cwd() / "data" / "raw.json").read_text())
data["data"] = "clean"
data["clean-time"] = datetime.utcnow().isoformat()
fi = Path.cwd() / "data" / "clean.json"
fi.write_text(json.dumps(data))
```

We can use `cat` again to look at the result of our cleaning step:

```sh-session
$ ./clean.py; cat data/clean.json
{"data": "clean", "ingest-time": "2021-12-19T13:57:53.407280", "clean-time": "2021-12-19T13:59:47.640153"
```


### 1. Track pipeline dependencies

Let's start out with a `Makefile` that runs our two stage data pipeline.

We are already taking advantage of the ability to create dependencies between our pipeline stages, making our `clean` target depend on our `raw` target.

We have also included a top level meta target `all` which

```makefile
#  Makefile

all: clean

raw:
	mkdir -p data
	./ingest.py

clean: raw
	./clean.py
```

We can use this `Makefile` from a terminal using by running `make`, which will run our meta target `all`:

```sh-session
$ make
mkdir -p data
./ingest.py
ingesting {'data': 'raw', 'ingest-time': '2021-12-19T14:14:54.765570'}
./clean.py
cleaning {'data': 'clean', 'ingest-time': '2021-12-19T14:14:54.765570', 'clean-time': '2021-12-19T14:14:54.922659'}
```

If we go and run only the `clean` step of our pipeline, we run both the ingest and cleaning step again.  This is because our cleaning step depends on the output of data ingestion:

```sh-session
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

```makefile
all: clean

./data/raw.json:
	mkdir -p data
	./ingest.py

./data/clean.json: ./data/raw.json
	./clean.py
```

Removing any output from previous runs with `rm -rf ./data`, we can run full our pipeline with `make`:

```sh-session
$ rm -rf ./data; make
mkdir -p data
./ingest.py
ingesting {'data': 'raw', 'ingest-time': '2021-12-27T13:56:30.045009'}
./clean.py
cleaning {'data': 'clean', 'ingest-time': '2021-12-27T13:56:30.045009', 'clean-time': '2021-12-27T13:56:30.193770'}
```

Now if we run `make` a second time, nothing happens:

```sh-session
$ make
make: Nothing to be done for `all'.
```

```sh-session
$ make ./data/clean.json
make: `data/clean.json' is up to date.
```

If we do want to only re-run our cleaning step, we can remove the previous output and run our pipeline again - with `make` knowing that it only needs to run the cleaning step again with existing raw data:

```sh-session
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

And now our final pipeline:

```makefile
# Makefile

all: ./data/clean.json

./data/raw.json: ./data/raw.json ./ingest.py
	mkdir -p data
	./ingest.py

./data/clean.json: ./data/raw.json ./clean.py
	./clean.py
```

Our final step, after updating only our `clean.py` script, `make` will run our cleaning step again:

```sh-session
$ make
./clean.py
ingesting {'data': 'clean', 'ingest-time': '2021-12-27T13:56:30.045009', 'clean-time': '2021-12-27T14:10:06.799127', 'clean-date': '2021-12-27'}
```


## Summary

That's it!  We hope you have enjoyed learning a bit about `make` & `Makefile`, and are enthusiastic to experiment with it in your data work.

There is more depth and complexity to `make` and the `Makefile` - what you have seen so far is hopefully enough to encourage you to experiment and learn more while using a `Makefile` in your own project.

A quick reminder of what we have learnt in this post:

- a `Makefile` can be arbitrary complex, and execute pipelines based on the dependencies between code and data,
- a `Makefile` can document your workflow,
- is a central point of execution for your project,
- can intelligently re-execute your pipeline.
