---
type: slides
---

## pd.Timestamp

`pd.Timestamp` is the atomic unit `pandas` uses for datetime objects.  It's largely interchangeable with the Python `datetime.datetime`.

Unlike a `datetime.datetime` object (which have unambigious methods of creation, such from a partitioned integer representation or a string and format code), a `pd.Timestamp` can be created from a much wider range of input.

```python
import pandas as pd

dt = pd.Timestamp('2nd Feb 2020')
#  Timestamp('2020-02-02 00:00:00')

dt = pd.Timestamp('02-04-2020')
#  Timestamp('2020-02-04 00:00:00')
```

This ability of pandas to coerce out the datetime from a string is powerful.  This flexbility and power comes with the potential for error.

---

## pd.to_datetime

It's rare in pandas to work with a single `pd.Timestamp` - more often we are working with `pd.Series` or `pd.DataFrame` - both of which have special funcitonality for working with collections of datetimes.

Let's start by creating a dataframe with a column of datetime strings:

```python
df = pd.DataFrame({'datetime-str': ['2020-01-01T00:00:00', '2020-01-01T00:05:00', '2020-01-01T00:10:00']})
```

```out
datetime-str    object
dtype: object
```

```python
import pandas as pd

df = pd.DataFrame({'datetime-str': ['2020-01-01T00:00:00', '2020-01-01T00:05:00', '2020-01-01T00:10:00']})
df['datetime-obj'] = pd.to_datetime(df['datetime-str'])
```

```out
datetime-str            object
datetime-obj    datetime64[ns]
dtype: object
```

```
df.iloc[0, 0]
Timestamp('2020-01-01 00:00:00')
```

pd.read_csv(parse_datetimes=True) 


## To index or not?

DatetimeIndex



## Beware Day versus Month First

---

## Working with datetime columns

```python
df['datetime-obj'].dt.hour
```

```out
0    0
1    0
2    0
Name: datetime-obj, dtype: int64
```

.day_of_week

Using this to mask out data

---

## Manipulating datetime strings in a column

apply - to clean datetime columns in place

---

## Creating datetime data

pd.date_range

freq

---

## Timezones in pandas

pytz

tz convert

---

## Resampling



## groupby

Particularly power when grouping by
