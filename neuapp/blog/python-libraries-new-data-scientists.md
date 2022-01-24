---
title: Python Libraries for New Data Scientists
description: An introduction to the Python data ecosystem.
date: 2021-07-31
slug: "/blog/python-libraries-new-data-scientists"
type: post

---

## Introduction

Learning data science is an exciting and rewarding journey.  Part of this journey is learning the tools of a data scientist. One of the challenges when starting to learn data science is knowing what tools you should be using and learning.

Python is an excellent choice for working as a data scientist - partly because of the rich ecosystem of Python libraries.  We suggest starting your data science journey with two Python libraries - **pandas** and **matplotib**:

1. **pandas** for loading, transforming and saving data. 
2. **matplotib** for visualizing data.

Together these two libraries offer enough to start doing meaningful data work in Python. 


## pandas

pandas is a Python library for working with tabular data - data with rows and columns. If you have worked with Excel, you have already worked with tabular data.

In this article we will work with a simple `cities` dataset - a tabular dataset with three rows and three columns:

<center>
  <img src="/ds-libraries/tabular.png" width="80%" align="center">
  <br />
</center>

### Installing and using pandas

You can install pandas with `pip`, a Python package manager:

```bash
$ pip install pandas
```

You can also find a notebook with all the code we develop in this article [on Github](https://github.com/ADGEfficiency/data-science-south-data/blob/main/notebooks/cities.ipynb) or on [Google Colab](https://githubtocolab.com/ADGEfficiency/data-science-south-data/blob/main/notebooks/cities.ipynb).

Pandas is used by importing the `pandas` package, commonly aliased to `pd`:

```python
import pandas as pd
```


### What is a DataFrame?

At the core of pandas is the DataFrame (a `pd.DataFrame` Python object), composed of three parts:

1. **index** - 1-dimensional row labels,
2. **columns** - 1-dimensional column labels,
3. **values** - 2-dimensional data.

<center>
  <img src="/ds-libraries/df.png" width="80%" align="center">
  <br />
</center>

Both the index and columns are labels - they tell us what a row or column represents, such as the `population` column label.


#### Creating a DataFrame

One way to create a DataFrame is from a Python dictionary, with:
- the column names as dictionary keys,
- the data as the dictionary values.

Below we create a `cities` DataFrame from a dictionary:

```python
import pandas as pd

pd.DataFrame({
  'city': ['auckland', 'berlin', 'london'],
  'population': [1.6, 3.6, 8.9],
  'hemisphere': ['south', 'north', 'north']
})
"""
       city  population hemisphere
0  auckland         1.6      south
1    berlin         3.6      north
2    london         8.9      north
"""
```



#### Loading CSV data into a DataFrame

Being able to construct DataFrames from Python objects such as dictionaries and lists is useful for constructing data for unit tests.

A more common way to create a DataFrame is from a file - commonly a CSV file.  This allows us to work with data saved on files on our local machine.

Pandas handles this with `pd.read_csv`, which reads data from a CSV file on our local computer.  This same function can also be used to read data from the Internet.

Below we read in our `cities` dataset using `pd.read_csv` to read from a Github URI:

```python
import pandas as pd

data = pd.read_csv(
    'https://raw.githubusercontent.com/ADGEfficiency/data-science-south-data/main/cities/cities.csv'
)
"""
       city  population hemisphere
0  auckland         1.6      south
1    berlin         3.6      north
2    london         8.9      north
"""
```

This is the way we will load our `cities` dataset in rest of this post - reading directly from a public URI (such as a URL).


#### Index, Columns & Values

We can access the three parts of our DataFrame as attributes of an initialized `pd.Dataframe` object:

```python
data.index
# RangeIndex(start=0, stop=3, step=1)

data.columns
# Index(['city', 'population', 'hemisphere'], dtype='object')

data.values
"""
[['auckland' 1.6 'south']
 ['berlin' 3.6 'north']
 ['london' 8.9 'north']]
"""
```

The index pandas created for us is just a range index (also called an integer index) - rows are labelled with a sequence of integers (`[0, 1, 2]`):

```python
data.index
# RangeIndex(start=0, stop=3, step=1)

data
"""
       city  population hemisphere
0  auckland         1.6      south
1    berlin         3.6      north
2    london         8.9      north
"""
```

We can replace this with more meaningful index using `set_index`, turning the `city` column into the index:

```python
data.set_index('city')
"""
          population hemisphere
city
auckland         1.6      south
berlin           3.6      north
london           8.9      north
"""
```

We have lost our original integer index of `[0, 1, 2]` and gained an index of `city` - great!


### Selecting rows and columns in pandas

A basic operation in data analysis is selection - to select rows and columns.  There are two ways to do this in pandas - `loc` and `iloc`.


#### Why do we need two ways to select?

We want to select rows or columns in two ways:

1. a label using `loc`,
2. a position using `iloc`.

Both require us to specify both the row and columns (by either label or position) - using `:` to select the entire row or column.

#### `loc` uses labels

`loc` selects **based on the label** of the row and column.

`loc` allows us to use the labels of the index and columns - we use it to select data based on labels:

```python
#  select the berlin row, all columns
data.loc['berlin', :]

#  select all rows, second colun
data.loc[:, 'population']
```

#### `iloc` uses position

`iloc` selects **based on the integer position** of the row and column.

`iloc` allows us to use the position of rows and columns - we use it to select data based on position:

```python
#  select the first row, all columns
data.iloc[0, :]

#  select all rows, second column
data.iloc[:, 1]
```

Selecting based on position is very useful when your data is sorted.

`iloc` is why a range index isn't that useful in pandas - we can always use `iloc` to select data based on it's position.

Now we have been introduced to `loc` & `iloc`, let's use them to answer two questions about our `cities` dataset.


#### What is the population of Auckland?  

We can answer this using `loc`, selecting the `auckland` row and the `population` column:

```python
data.loc['auckland', 'population']
# 1.6
```

#### Which hemisphere is our first city in?

We can answer this using `iloc` to select the first row with `0` and `loc` to select the `population` column:

```python
data.iloc[0].loc['hemisphere']
# north
```


### Filtering with boolean masks in pandas

Another basic operation in data analysis is filtering - selecting rows or columns based on conditional logic (if statements, equalities like `==` and inequalities like `>` or `<`).

We can filter in pandas with a boolean mask, which can be created with a conditional statement:

```python
import pandas as pd

data = pd.read_csv('https://raw.githubusercontent.com/ADGEfficiency/data-science-south-data/main/cities/cities.csv')

#  create our boolean mask 
#  with the conditional 'population < 2.0'
#  aka population less than 2.0
mask = data.loc[:, 'population'] < 2.0
"""
city
auckland     True
berlin      False
london      False
Name: population, dtype: bool
"""
```

The boolean mask is an array of either `True` or `False` - here indicating `True` if the population of the city is less than 2.

We can use our boolean mask to filter our dataset with `loc` - `loc` understands how to use a boolean mask:

```python
subset = data.loc[mask, :]
"""
          population hemisphere
city
auckland         1.6      south
"""
```

#### Why do we need boolean masks if we can select with `loc` or `iloc`?

The power of using boolean masks is that we can select many rows at once.

Below we create a boolean mask based on the hemisphere of the city - then using this mask to select two rows:

```python
mask = data.loc[:, 'hemisphere'] == 'north'
"""
city
auckland    False
berlin       True
london       True
Name: hemisphere, dtype: bool
"""

subset = data.loc[mask, :]
"""
        population hemisphere
city
berlin         3.6      north
london         8.9      north
"""
```
 

### Aggregation with groupby in pandas

The final data analysis operation we will look at is aggregation.

In pandas aggregation can be done by grouping - using the `groupby` method on a DataFrame.


#### The two step groupby workflow

In pandas aggregation happens in two steps:

1. creating groups based on a column, such as by `hemisphere`,
2. applying an aggregation function to each group, such as counting or averaging.

Aggregation allows us to estimate statistics, lets use it to answer a few more questions.


#### What is the average population in each hemisphere?

We can answer this with our two step workflow:

1. `groupby('hemisphere')` to group by hemisphere,
2. `mean()` to calculate the average for each of our hemisphere groups (`north` and `south`).

```python
import pandas as pd

data = pd.read_csv('https://raw.githubusercontent.com/ADGEfficiency/data-science-south-data/main/cities/cities.csv').set_index('city')
data.groupby('hemisphere').mean()
"""
            population
hemisphere
north             6.25
south             1.60
"""
```

### What is the total population in each hemisphere?

Our two steps to answer this question are:

1. grouping by `hemisphere`,
2. aggregating with a `sum`.

```python
data.loc[:, ['population', 'hemisphere']].groupby('hemisphere').sum()
"""
            population
hemisphere
north             12.5
south              1.6
"""
```

### Saving our data to CSV

The last step of our process is going to be to save our data to our harddrive, in Excel friendly CSV format:

```python
data.to_csv('groups.csv')
```


### Full pandas code

That is it for our first look at pandas - all the code we looked at above is given below in full:

```python
import pandas as pd

#  read dataset from github url
data = pd.read_csv('https://raw.githubusercontent.com/ADGEfficiency/data-science-south-data/main/cities/cities.csv').set_index('city')

#  save cities dataset to local machine
data.to_csv('cities.csv')

#  select the berlin row, all columns
data.loc['berlin', :]

#  select all rows, second colun
data.loc[:, 'population']

#  select the first row, all columns
data.iloc[0, :]

#  select all rows, second column
data.iloc[:, 1]

#  What is the population of Auckland?  
data.loc['auckland', 'population']

#  Which hemisphere is our first city in?
data.iloc[0].loc['hemisphere']

#  select population less than 2
mask = data.loc[:, 'population'] < 2.0
subset = data.loc[mask, :]

#  northern hemisphere countries
mask = data.loc[:, 'hemisphere'] == 'north'
subset = data.loc[mask, :]

#  average population in each hemisphere
data.groupby('hemisphere').mean()

#  total population in each hemisphere
data.loc[:, ['population', 'hemisphere']].groupby('hemisphere').sum()

#  save to csv file on local computer
data.to_csv('groups.csv')
```


## matplotlib

matplotlib is a Python library for creating visualizations of data.

One of the challenges with learning and using matplotlib is that it offers multiple ways to plot data.  Mastering matplotlib requires understanding which API is best for your data and workflow.

We will use a single matplotlib workflow - the one we use the most ourselves. It offers the flexibility to plot multiple charts in the same figure, and integrates nicely with pandas.


### Installing and using matplotlib

You can install matplotlib with `pip`, a Python package manager:

```bash
$ pip install matplotlib
```

You can also find a notebook with all the code [on Github](https://github.com/ADGEfficiency/data-science-south-data/blob/main/notebooks/cities.ipynb) or on [Google Colab](https://githubtocolab.com/ADGEfficiency/data-science-south-data/blob/main/notebooks/cities.ipynb).

Matplotlib is used by importing the `matplotlib` package, commonly aliasing the module `pyplot` as `plt`:

```python
import matplotlib.pyplot as plt
```


### What is a matplotlib figure made of?

The core components in matplotlib are the figure and axes.  

One figure can have many axes:

<center>
  <img src="/ds-libraries/anatomy.png" width="80%" align="center">
  <br />
  <figcaption>Data flows from left to right, in a two stage ingestion & cleaning process.</figcaption>
  <a href="https://matplotlib.org/stable/tutorials/introductory/usage.html#parts-of-a-figure">From the matplotlib docs</a>
</center>
<br />


A common point of confusion is between axis (such as the x or y axis) and a matplotlib axes - they are not the same thing! 

One figure can have multiple axes - each axes is a separate plot or chart.  Each of these axes has it's own x-axis and y-axis (one of each).

We can create these two objects using `plt.subplots` - creating one figure with two axes:

```python
import matplotlib.pyplot as plt

fig, axes = plt.subplots(ncols=2)
```

All we've done above is create a figure with two axes - both empty.

Next we load our data with pandas, and create a plot on our first axes:

```python
import pandas as pd

#  run a simple data pipeline - load data from CSV with pandas
data = pd.read_csv('https://raw.githubusercontent.com/ADGEfficiency/data-science-south-data/main/cities/cities.csv').set_index('city')

#  access first axes and plot a line
data.plot('population', ax=axes[0], kind='bar')
```

Automatically makes labels for the x and y axis - quite nice!

<center>
  <img src="/ds-libraries/plot-three-1.png" width="80%" align="center">
</center>
<br />


Our second axes is still empty - we can plot something on it by passing `ax=axes[1]` into another `plot` call on our DataFrame:

```python
#  access first axes and plot a scatter plot
data.plot('land-area', 'population', ax=axes[1], kind='scatter')
```
<center>
  <img src="/ds-libraries/plot-three-2.png" width="80%" align="center">
</center>

Now we can see two visualizations of our data - a bar chart and a scatter plot.

The final step in our pipeline is to save our figure to a PNG file on our local machine:

```python
fig.savefig('cities.png')
```


### Full matplotlib code

The full code for our visualization pipeline is below:

```python
import matplotlib.pyplot as plt
import pandas as pd

#  create one figure with two axes
fig, axes = plt.subplots(nrows=2)

#  run a simple data pipeline
data = pd.read_csv('https://raw.githubusercontent.com/ADGEfficiency/data-science-south-data/main/cities/cities.csv').set_index('city')

#  access first axes and plot a line
data.plot(y='population', ax=axes[0], kind='bar')

#  access first axes and plot a scatter plot
data.plot('land-area', 'population', ax=axes[1], kind='scatter')

#  small trick to get x-axis labels to play nice
plt.tight_layout()

#  save the figure as a png file
fig.savefig('cities.png')
```


## Summary

Thanks for reading!

There is much more to learn with both of these libraries.

Suggested next steps for pandas are:

- learn about `pd.Series` - another pandas object used to store data,
- learn how to save data to Parquet format (and why),
- see how we can use `.agg` for different aggregations with a single groupby.

Suggested next steps for matplotlib are:

- learn to plot data using `plt.plot`,
- learn to plot data using `ax.plot`,
- check out seaborn - a library that extends matplotlib with charts like the pairplot.
