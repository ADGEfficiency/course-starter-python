---
type: slides
---

## Why a section on patterns?

We have an entire section of this course on datetimes dedicated to pandas.

The previous chapter focused on the low level, atomic functionality of pandas.

This chapter focuses on a higher level - combining many of the pandas datetime tools into a more complex and useful workflow.

---

## Combine year, month and day in pandas to create a date

Imagine you have a dataset like the following:

```python
import pandas as pd

df = pd.DataFrame({
  'year': [2020, 2020, 2021, 2025],
  'month': [2020, 2020, 2021, 2025],
  'day': [2, 4, 6, 8]
})
```

What is the best way to create a single datetime column?

```python
date = pd.to_datetime(df[["year", "month", "day"]])
```

```out
0   2020-12-02
1   2020-12-04
2   2021-12-06
3   2025-12-08
dtype: datetime64[ns]
```

```python
df.apply(lambda x: datetime(x.year, x.month, x.day), axis=1)
```

---

## How select all values between two dates by year, month, day columns?

Imagine you have a dataset like the following:

```python
import pandas as pd

df = pd.DataFrame({
    'date': pd.date_range('2020-01-01', '2023-01-01', freq='D')
})
```

What is the best way to select all rows between April 2020 and September 2022?

If we set our datetime as the index, we can slice the dataframe with strings:

```python
import pandas as pd

len(df.set_index('date')['2021-01-01': '2022-01-01'])
```

```out
366
```

---

## Select all Mondays in a year

Imagine you have a dataset like the following:

```python
import pandas as pd
df = pd.DataFrame({
    'date': pd.date_range('2020-01-01', '2020-02-01', freq='D')
})
```

What is the best way to select all the Mondays?  One way is to use `.day_of_week`:

```python
mask = df['date'].dt.day_of_week == 0
df[mask]
```

```out
date
5  2020-01-06
12 2020-01-13
19 2020-01-20
26 2020-01-27
```
