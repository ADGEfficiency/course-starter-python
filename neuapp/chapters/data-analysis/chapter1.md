---
title: 'Chapter 1: Working With Spreadsheet Data with Pandas'
description: 'The world runs on spreadsheets - in this chapter you will learn to work with Excel & CSV data with Pandas.'
prev: null
next: /chapter2
type: chapter
id: 1
courseId: data-analysis

---

<exercise id="1" title="Loading Excel Data">

Business question = `what is the primary enercy cons of south + central america` as a percentage of global primary energy?

If you want to run this locally, install the packages below:

```bash
pandas==1.3.3
openpyxl==3.0.9
```

`pandas` is a foundational library for working with tabular data in Python.

Let's start by loading an Excel workbook directly from an URL using pandas:

```python
import pandas as pd

data = pd.read_excel(
  "https://www.bp.com/content/dam/bp/"
  "business-sites/en/global/corporate/xlsx/"
  "energy-economics/statistical-review/"
  "bp-stats-review-2021-all-data.xlsx",
  sheet_name=None
)
```

A Excel workbook can have multiple tabs - by passing `sheet_name=None` into `pd.read_excel`, we will load the data in each tab into a dictionary like the below:

```json
{"tab-name": pd.DataFrame}
```

We can measure how many tabs we have by measuring the size of the `data` dictionary returned by `pd.read_excel`:

```python
len(data)
# 83
```

```python
import pandas as pd

data = pd.read_excel(
  "https://www.bp.com/content/dam/bp/"
  "business-sites/en/global/corporate/xlsx/"
  "energy-economics/statistical-review/"
  "bp-stats-review-2021-all-data.xlsx",
  sheet_name=None
)
df = data["Primary Energy Consumption"]
print(df.head(2))

#  Primary Energy: Consumption*  Unnamed: 1  ...  Unnamed: 60  Contents.1
# 0                          NaN         NaN  ...          NaN         NaN
# 1                    Exajoules      1965.0  ...          NaN         NaN
```

What a mess!  The data `Primary Energy Consumption` needs some work before we can work with it well in `pandas`.

```
exercise
- different sheet

```

</exercise>

<exercise id="2" title="Cleaning Data">

*Why not start with a clean dataset?*  Most data work requires heavy amount of data cleaning.

A `pandas` DataFrame has three components:

1. columns,
2. index,
3. data.

Let's start by cleaning our columns.  Looking at our data we have a row that has the year (our second row) - let's make this row our columns:

```python
df.columns = df.iloc[1, :]
df.columns.name = 'year'
print(df.columns)
```

And then remove this row from the original dataset:

```python
df = df.drop(df.index[1])
print(df.head(2))
```

This looks a bit better - but we still have two issues: 

1. the columns at the end,
2. the `Exajoules` is actually our country column.

Looking at the data we can see that our last three columns aren't the annual primary energy, instead these columns are percentage growth rates.  We can remove these three columns by:

```python
df = df.iloc[:, :-5]
```

Checking our columns again, things look a lot better:

```python
df.columns
# Index(['Exajoules', 1965.0, 1966.0, 1967.0, 1968.0, 1969.0, 1970.0, 1971.0, 1972.0, 1973.0, 1974.0, 1975.0, 1976.0, 1977.0, 1978.0, 1979.0, 1980.0, 1981.0, 1982.0, 1983.0, 1984.0, 1985.0, 1986.0, 1987.0, 1988.0, 1989.0, 1990.0, 1991.0, 1992.0, 1993.0, 1994.0, 1995.0, 1996.0, 1997.0, 1998.0, 1999.0, 2000.0, 2001.0, 2002.0, 2003.0, 2004.0, 2005.0, 2006.0, 2007.0, 2008.0, 2009.0, 2010.0, 2011.0, 2012.0, 2013.0, 2014.0, 2015.0, 2016.0, 2017.0, 2018.0, 2019.0, 2020.0], dtype='object', name=1)
```

We now have columns - let's now work on the index (or the row labels).  Our Excel workbook has a number of rows with no data - we can drop all of these using

We can set our `Exajoules` column as the index using `set_index`:

```python
df = df.set_index('Exajoules')
df.index.name = 'country'
print(df)
```

Now we have the `'Exajoules'` column as the index, we can cast our columns to integers (like `2020`) rather than floats (like `2020.0`):

```python
df.columns = df.columns.astype(int)
```

Looks much better!

```python
print(df)
```

One final step - let's drop all the rows with missing values:

```python
df = df.dropna(axis=0)
```

```
exercise
- different sheet
- select different countries
```

</exercise>

<exercise id="3" title="Analyzing Data">

Now we have a clean dataset, we can now get back to answering our original question - `what is the primary enercy cons of south + central america as a percentage of global primary energy?`

Let's wrap our work from `Cleaning Data` into a function named `pipeline`:

```python
import pandas as pd

def pipeline():
  #  read the Excel workbook into a dictionary of {sheet_name: dataframe}
  data = pd.read_excel(
    "https://www.bp.com/content/dam/bp/"
    "business-sites/en/global/corporate/xlsx/"
    "energy-economics/statistical-review/"
    "bp-stats-review-2021-all-data.xlsx",
    sheet_name=None
  )
  #  select one sheet as our dataframe
  df = data["Primary Energy Consumption"]

  #  set year as the columns
  df.columns = df.iloc[1, :]
  df.columns.name = 'year'
  df = df.drop(df.index[1])

  #  remove % change columns
  df = df.iloc[:, :-5]

  #  set index as country
  df = df.set_index('Exajoules')
  df.index.name = 'country'

  #  cast columns to int
  df.columns = df.columns.astype(int)

  #  drop row with all missing values
  return df.dropna(axis=0)

df = pipeline()
```

Now just the code to do the pct of world thing

Then do a quick check of data quality

`to_csv`

</exercise>

