---
type: slides
---

## pd.Timestamp

`pd.Timestamp` is the atomic unit `pandas` uses for datetime objects.  It's largely interchangeable with `datetime.datetime` class from the Python standard library.

Unlike a `datetime.datetime` object (which have unambigious methods of creation, such from a partitioned integer representation or a string and format code), a `pd.Timestamp` can be created from a much wider range of input.  `pandas` is able to figure out and parse a datetime string without a format code:

```python
import pandas as pd

dt = pd.Timestamp('2nd Feb 2020')
#  Timestamp('2020-02-02 00:00:00')

dt = pd.Timestamp('02-04-2020')
#  Timestamp('2020-02-04 00:00:00')
```

This ability of `pandas` to coerce out the datetime object from a string is powerful.  This flexibility and power comes with the potential for error.

---

## pd.to_datetime

It's rare in `pandas` to work with a single `pd.Timestamp` - more often we work with a collection of data in a `pd.Series` or `pd.DataFrame` - both of which have special functionality for working with collections of datetimes.

Let's start by creating a dataframe with a column of datetime strings:

```python
import pandas as pd
df = pd.DataFrame({'datetime-str': ['2020-01-01T00:00:00', '2020-01-01T00:05:00', '2020-01-01T00:10:00']})
```

```out
datetime-str    object
```

We can create a column of `pd.Timestamp` objects using `pd.to_datetime`:

```python
df['datetime-obj'] = pd.to_datetime(df['datetime-str'])
```

```out
datetime-str            object
datetime-obj    datetime64[ns]
```

---

## Beware Day versus Month First

A major feature of `pd.to_datetime` is automatic parsing of the datetime from a string, without additional input from the programmer.

This power comes at a cost (it always does).  Take for example the datetime below:

```python
import pandas as pd
pd.to_datetime('02-04-2020').strftime('%d %B %Y')
```

```out
04 April 2020
```

This same datetime can be parsed in a different way, by changing `dayfirst` to `False`:

```python
pd.to_datetime('02-04-2020', dayfirst=False).strftime('%d %B %Y')
```

```out
04 February 2020
```

The ambiguity caused by the day versus month first problem is always something to consider if you don't control the format of your timestamps.

---

## Creating datetime data with `pd.date_range`

Often we want to create datetime data from thin air - such as creating each hour between two dates.  

We can do this using `pd.date_range` - below we create a sequence of datetimes with an hourly frequency:

```python
rng = pd.date_range('2020-01-01', '2020-01-02', freq='H')
len(rng), rng[0], rng[-1]
```

```out
(25,
 Timestamp('2020-01-01 00:00:00', freq='H'),
 Timestamp('2020-01-02 00:00:00', freq='H'))
```

The `freq` argument can take on the values of any *offset alias* - ([full list of offset aliases here](https://pandas.pydata.org/pandas-docs/stable/user_guide/timeseries.html#offset-aliases)) - commonly used are:

- `H` = hourly,
- `MS` = month start,
- `15T` = 15 minutes.

---

## Creating datetime data with `pd.date_range`

A `pd.date_range` can also be defined in terms of the number of periods

For example -  the next 4 half-hour timestamps after a date:

```python
rng = pd.date_range('2020-01-01', periods=4, freq='30T')
len(rng), rng[0], rng[-1]
```

```out
(4,
 Timestamp('2020-01-01 00:00:00', freq='30T'),
 Timestamp('2020-01-01 01:30:00', freq='30T'))
```

---


## Working with datetime columns - accessing datetime attributes

Both `datetime.datetime` and `pd.Timestamp` objects have useful attributes like `hour` or methods `isoformat()`.

We have similar functionality attached to datetime columns and indexes:

```python
rng = pd.date_range('2020-01-01', '2020-01-02', freq='H')
rng.hour
```

```out
```

```python
rng.strftime('hour:%H')
```

---

## DatetimeIndex versus a datetime column

An important distinction in `pandas` is the difference between the *index* and a *colutrftime('hour:%H, min:%M')

n* of a `pd.DataFrame`.

We can illustrate this difference by using `pd.date_range` to create two sequences of a datetimes, using them to create the index and a column.

```python
import pandas as pd

df = pd.DataFrame(
    data={'data': pd.date_range('1990-01-01', '1990-01-02', freq='H')}, 
    index=pd.date_range('2020-01-01', '2020-01-02', freq='H')
)
type(df.index)
```

```out
pandas.core.indexes.datetimes.DatetimeIndex
```

These two parts of our dataframe (the datetime index and the datetime column) will behave slightly differently - one example of the difference is the need for `.dt` attribute when using a datetime column, which is not needed on the index:

```python
print(df.index.hour[4], df['data'].dt.hour[4])
```

```out
4 4
```

---

## Working with datetime columns - filtering with a boolean mask

A common pattern is to use these attributes (like `.hour` or `.day_of_week`) to filter data using a boolean mask:

```python
import pandas as pd

#  create dataframe
df = pd.DataFrame(
    data={'data': pd.date_range('1990-01-01', '1990-01-02', freq='H')}, 
    index=pd.date_range('2020-01-01', '2020-01-02', freq='H')
)
df.index.name = 'dt-idx'
#  create mask
mask = df.index.day == 2
#  filter
df[mask]
```

```out
dt-idx           data
2020-01-02 1990-01-02
```
---

## Manipulating datetime strings in a column


apply - to clean datetime columns in place


data = pd.DataFrame({
  'date/name': [
    '2020-01-01/adam',
    '2020-02-01/bill',
    '2020-03-01/adam'
  ]
})

---

## Timezones in pandas

pandas uses `pytz` for working with timezones.

We can create a timezone naive index:

```python
import pandas as pd
rng = pd.date_range('2020-01-01', '2021-01-01', freq='D')
rng[0]
```

```out
Timestamp('2020-01-01 00:00:00', freq='D'), pandas._libs.tslibs.timestamps.Timestamp
```

We can make these datetimes timezone aware using `tz_localize` - this will not change the date or time:

```python
rng = rng.tz_localize('Pacific/Auckland')
rng[0]
```

```out
Timestamp('2020-01-01 00:00:00+1300', tz='Pacific/Auckland')
```

Now that our datetimes are timezone aware, we can convert them to another timezone - this will change the date and/or time, depending on the differences between the two timezones:

```python
rng = rng.tz_convert('Europe/Berlin')
rng[0]
```

```out
Timestamp('2019-12-31 12:00:00+0100', tz='Europe/Berlin')
```

---

## Resampling

Resampling is one of the most powerful tools in pandas.  The resample operation is particularly diffucilt in a spreadsheet.


## Grouping with groupby

Particularly power when grouping by
