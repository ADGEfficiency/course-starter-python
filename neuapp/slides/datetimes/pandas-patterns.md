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

---

## How select all values between two dates by year, month, day columns?

Imagine you have a dataset like the following:

```python
df = pd.DataFrame({
    'date': pd.date_range('2020-01-01', '2023-01-01', freq='D')
})
```

What is the best way to select all rows between April 2020 and September 2022?

---

## Select first Monday of the month

Imagine you have a dataset like the following:

```python
df = pd.DataFrame({
    'date': pd.date_range('2020-01-01', '2020-02-01', freq='D')
})
```

What is the best way to select the first Monday in January 2020?

