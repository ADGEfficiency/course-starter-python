---
title: Should you be using pathlib?
description: A comparison of two Python path libraries - os and pathlib.
date: 2021-01-20
type: post
slug: "/blog/python-file-system"

---

This post compares two Python libraries for working with file paths - `os` and `pathlib`.  Both are part of the Python standard library.

**It is a duel at dawn** - a four round showdown comparing the two approaches on common programming tasks:

- [Round One - Single Paths](#round-one---single-paths)
- [Round Two - Making Things](#round-two---making-things)
- [Round Three - Reading and Finding](#round-three---reading-and-finding)
- [Round Four - Removing Things](#final-round---removing-things)

**Who will be our champion?**


## `os` or `pathlib`?

If you've been programming in Python a while, it's likely you are using the functions in `os` such as `os.path.join` - historically this was the best functionality offered by the standard library for handling file paths.

`pathlib` was introduced in Python 3.4, and offers a different set of abstractions for working with paths.  However, just because it is newer, doesn't mean it's better! 

So how to decide which to use?  How about a good old fashioned duel?  **Pistols at dawn!**


## Round One - Single Paths

Our first round is composed of the tasks commonly done with a single file path:

- forming file paths from strings,
- getting the home & current working directory,
- working with file names & suffixes.


### Creating a single file path

Operating systems take different approaches with file paths - LINUX uses `/` as a separator where Windows uses `\`.

Because of this complexity portability is a key concern - both `os.path` and `pathlib` offer portable ways to construct paths.  This means the same piece of Python code can be run on either LINUX or Windows, with the path created being compatible with that OS.

`os` offers `os.path.join` to create a file path:

```python
import os
path = os.path.join(os.path.expanduser('~'), 'data', 'file.txt')
# /Users/adam/data/file.txt
```

In `pathlib` the path is formed using the division operator `/` with an initialized `Path` object:

```python
from pathlib import Path
path = Path.home() / 'data' / 'file.txt'
# /Users/adam/data/file.txt
```

The `Path` object is the focus of `pathlib` - almost all of the functionality we need can be accessed as either attributes or methods on this object.


### Get the home directory

The home directory is in different places on different operating systems - both our contenders offer a way to get the user's home directory that will work on both UNIX & Windows systems:

- Ubuntu - `/home/$USER` 
- MacOS - `/Users/$USER`
- Windows - `C:\Users\$USER`

With `os`:

```python
import os
os.path.expanduser('~')
# /Users/adam
```

And with `pathlib`:

```python
from pathlib import Path
Path.home()
# /Users/adam
```


### Get the current working directory

With `os`:

```python
import os
os.getcwd()
```

And with `pathlib`:

```python
from pathlib import Path
Path.cwd()
```


### Working with file names and suffixes

The name of a file includes the suffix.

Getting this with `os` requires using `basename`:

```python
import os
os.path.basename('/path/file.suffix')
# file.suffix
```

With `pathlib` we can use the `name` attribute on a `Path` object:

```python
from pathlib import Path
Path('/path/file.suffix').name
# file.suffix
```

The stem doesn't include the suffix.  Getting this with `os` requires using both `basename` and `splitext`:

```python
from os.path import basename, splitext
splitext(basename('/path/file.suffix'))[0]
# file
```

With `pathlib` we can use the `stem` attribute on a `Path` object:

```python
from pathlib import Path
Path('/path/file.suffix').stem
# file
```

The suffix is the final part of a filepath - usually indicating the file type. To get the suffix with `os.path`:

```python
import os
os.path.splitext('/path/file.suffix')[-1]
# .suffix
```

`pathlib` has `suffix` as an attribute of the `Path` object:


```python
from pathlib import Path
Path('/path/file.suffix').suffix
# .suffix
```


### Summary - Single Paths

Our first round is done - **the winner is `pathlib`!**  Some of the things our judges (one person, many minds) liked:

- moving data & functionality onto a single `Path` object,
- remembering some of the `os` methods (such as `os.path.expanduser`) is difficult.


## Round Two - Making Things

Our second round consists of tasks commonly done when making things, including:

- making directories
- saving data to text files
- appending data to text files


### Making directories

First with `os`:

```python
import os
path = os.path.join(os.path.expanduser('~'), 'python-file-paths')
os.mkdir(path)
```

And with `pathlib`:

```python
from pathlib import Path
path = Path.home() / 'python-file-paths'
path.mkdir()
```

Sometimes we want to make a new folder that is deeper than the last folder that exists - trying this will raise an error (as `foo` doesn't exist yet):

```python
from pathlib import Path
path = Path.home() / 'python-file-paths' / 'foo' / 'bar'
path.mkdir()
# FileNotFoundError
```

We can avoid this by using `parents=True`:

```python
from pathlib import Path
path = Path.home() / 'python-file-paths' / 'foo' / 'bar'
path.mkdir(parents=True)
```

Another cause of error is trying to make a directory that already exists:

```python
from pathlib import Path
path = Path.home() / 'python-file-paths' 
path.mkdir()
# FileExistsError
```

We commonly use both `parents=True` and `exist_ok=True` whenever we make a folder:

```python
from pathlib import Path
path = Path.home() / 'python-file-paths' / 'foo' / 'bar'
path.mkdir(parents=True, exist_ok=True)
```

The examples above are all about creating a directory from a path.  Sometimes we have a path with a filename as well

Sometimes we actually have a full file path (including both folders and a filename). If use `mkdir` on a full file path, we will end up making a directory with the same name as our soon to be file!

We can use `Path.parent` to access the enclosing folder of our file, and call `.mkdir` on that folder:

```python
from pathlib import Path
path = Path.home() / 'python-file-paths' / 'foo' / 'bar' / 'baz.file'
path.parent.mkdir(parents=True, exist_ok=True)
```


### Writing data to files

Imagine we have a dataset of 32 samples, and we want to save each sample in a file in `$HOME/python-file-paths/`.

First using `os`, where we the lack of the `exist_ok` argument in `os.mkdir` means we need to check if the `base` folder exists before making it:

```python
from os import mkdir
from os.path import join, expanduser, exists
import numpy as np

np.random.seed(42)
dataset = np.random.uniform(0, 100, 32 * 4).reshape(32, 4)

base = join(expanduser('~'), 'python-file-paths')

if not exists(base):
    mkdir(base)

for n, sample in enumerate(dataset):
    path = join(base, f'sample_{n}.data')
    with open(path, 'w') as fi:
        fi.write(str(sample))
```

We can use `cat` to print out our first sample:

```sh
$ cat ~/python-file-paths/sample_0.data
[37.45401188 95.07143064 73.19939418 59.86584842]
```

And then using `pathlib`, where we can using `exist_ok=True` along with a `write_text` method on our `Path` object:

```python
from pathlib import Path
import numpy as np

np.random.seed(42)
dataset = np.random.uniform(0, 100, 32 * 4).reshape(32, 4)
for n, sample in enumerate(dataset):
    path = Path.home() / 'python-file-paths' / f'sample_{n}.data'
    path.parent.mkdir(exist_ok=True)
    path.write_text(str(sample))
```

Again using `cat` to print out our first sample, which due to our random seed, is the same:

```sh
$ cat ~/python-file-paths/sample_0.data
[37.45401188 95.07143064 73.19939418 59.86584842]
```


### Appending data to a file

The above task was writing to many files - one file per sample.  Other times we want to append to a file - the advantage being all our data is stored in one file.

These examples append text to a single file `all_samples.data`.  First with `os`:

```python
from os import mkdir
from os.path import join, expanduser, exists
import numpy as np

np.random.seed(42)
dataset = np.random.uniform(0, 100, 32 * 4).reshape(32, 4)

base = join(expanduser('~'), 'python-file-paths')

if not exists(base):
    mkdir(base)

for n, sample in enumerate(dataset):
    path = join(base, f'sample_{n}.data')
    with open(path, 'a') as fi:
        fi.write(str(sample)+'\n')
```

And with `pathlib` - note here we are forced to use context management to be able to pass an append flag of `a`:

```python
from pathlib import Path
import numpy as np

np.random.seed(42)
dataset = np.random.uniform(0, 100, 32 * 4).reshape(32, 4)
for n, sample in enumerate(dataset):
    path = Path.home() / 'python-file-paths' / 'samples.data'
    path.parent.mkdir(exist_ok=True)
    with path.open('a') as fi:
        fi.write(str(sample)+'\n')
```

Now our data is stored in a single file (one line per row):

```bash
$ head -n 2 ~/python-file-paths/samples.data
[37.45401188 95.07143064 73.19939418 59.86584842]
[15.60186404 15.59945203  5.80836122 86.61761458]
```

### Summary - Making Things

Ding ding ding!  **The winner is again `pathlib`!**  Some of the things our judges liked this round:

- the argument of `exist_ok` in `Path.mkdir()` avoids an error in making a directory that already exists,
- the `Path.parents` attribute allows easy access of the folder a file is in,
- writing data to text files with `Path.write_text`.


## Round Three - Reading and Finding

Our third round is about working with things that already exist, such as:

- reading text files,
- finding files,
- finding directories.


### Reading from text files

Let's open one of the text files we created earlier.

First with `os`, which requires context management to properly close the file after opening:

```python
from os.path import join, expanduser
path = join(expanduser('~'), 'python-file-paths', 'samples.data')
with open(path, 'r') as fi:
    data = fi.read()
```

And then with `pathlib`, where can open, read & close the file using the `read_text()` method on our `Path` object:

```python
from pathlib import Path
path = Path.home() / 'python-file-paths', 'samples.data')
data = path.read_text()
```


### Finding many files recursively

Sometimes we want to find the paths for many files.  We want to find paths deep in the file system - i.e. recursively.

With `os` we can use `os.walk` to do this:

```python
from os import walk
from os.path import join, expanduser
home = expanduser('~')

files = []
for root, dirs, files in walk(join(expanduser('~'), 'python-file-paths')):
    for path in files:
        if path.endswidth('.py'):
            files.append(join(root, path))
```


With `pathlib`, `glob` is best:

```python
from pathlib import Path
path = Path().home()
paths = [p for p in path.glob('**/*.py') if p.is_file()]
```

`glob` will not return path orders deterministically - if you are relying on the order, be sure to call `sorted` on `paths`.


### Finding all directories

Often we want a list of directories at a certain path - here we use the user's home directory.  We don't want this to be recursive.

For `os.path` we use `os.path.listdir` to iterate over a path, with `os.path.isdir` to check the path is a directory:

```python
from os import listdir
from os.path import expanduser, join, isdir
path = expanduser('~')
dirs = [join(path, p) for p in listdir(path) if isdir(join(path, p))]
```

For `pathlib` we use `path.iterdir` and `path.is_dir` - both methods are called on the `Path` object:

```python
from pathlib import Path
path = Path().home()
dirs = [p.name for p in path.iterdir() if p.is_dir()]
```


### Finding all directories recursively

Sometimes we want to look beyond a single path, and recursively search for folders.

We can do this using `os.walk`:

```python
from os import walk
from os.path import expanduser, join, isdir

paths = []
for root, dirs, files in walk(join(expanduser('~'), 'python-file-paths')):
    for path in files:
        full_path = join(root, path)
        if isdir(full_path):
            paths.append(join(root, path))
```

With `pathlib` this is best done using `path.glob`:

```python
from pathlib import Path
path = Path().home()
paths = [p for p in path.glob('**/*') if p.is_dir()]
```


### Summary - Reading and Finding

Our third round is done - **the winner is `pathlib`!**  Some of the things our judges liked:

- reading from text files with `Path.read_text`
- being able to check if a path is a directory using `Path.is_dir()` or a folder with `Path.is_file()`


## Final Round - Removing Things

Our final round is about removing things:

- removing directories,
- removing files.

Here is where things get messy for `Pathlib` - for the first time we need to use a function from outside `pathlib` - using `shuti.rmtree` to remove a non-empty directory.


### Removing directories

The best way to do this is with `shutil.rmtree`, which will remove the directory even if it is not empty.

There is no real difference between `os` & `pathlib` except for when creating the filepath - the example below uses `pathlib`:

```python
from shutil import rmtree
from pathlib import Path
path = Path.home() / 'python-file-paths'
rmtree(path)
```

This is usually the behaviour you want when removing directories - remove even if not empty.


### Removing files

Sometimes we want to remove specific files - when we know the path.

We can do this with `os`:

```python
import os
from os.path import expanduser, isdir, join
path = join(expanduser('~'), 'python-file-paths', 'data.txt')
if os.path.exists(path):
    os.remove(path)
```

And with `pathlib`:

```python
from pathlib import Path
path = Path.home() / 'python-file-paths' / 'data.txt'
path.unlink(missing_ok=True)
```

Because there is a lot of complexity in this task, a summary is given below:

| Task                   | `os.path`       | `pathlib`       |
|------------------------|-----------------|-----------------|
| Remove empty directory | `os.rmdir`      | `path.rmdir`    |
| Remove file            | `os.remove`     | `path.unlink`   |
| Remove directory       | `shutil.rmtree` | `shutil.rmtree` |


### Summary - Removing Things

Our final round is done - **and it's a draw!**  This was the final task, and due to the complexity of both approaches needing to use the additional library `shutil`.

It's a fair result by our judges - perhaps a tint of sympathy for `os` -  a valiant competitor but outclassed by it's successor.


## Summary

The duel is over - **the final results are in**:

- Round One - Single Paths - `pathlib`,
- Round Two - Making Things - `pathlib`,
- Round Three - Reading and Finding - `pathlib`,
- Round Four - Removing Things - `draw`.

`pathlib` comes out on top!  Key to it's victory are:

- moving most functionality into one place (the `Path` class),
- the `exist_ok` argument on `Path.mkdir()`,
- avoiding the need to use context management when reading & writing to text files.

---

Thanks for reading!
