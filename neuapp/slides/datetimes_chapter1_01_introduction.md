---
type: slides
---


### What is a date?

A date is made of a year, month and day:

```python
import datetime
datetime.date(2020, 1, 1)
```

### What is a time?

A time is made of hours, minutes and seconds:

```python
import datetime
datetime.time(12, 30, 0)
```

---


### What is a datetime?

A datetime is a combination of two things - a date and a time.

We can use the `combine` method of the `datetime` object in the `datetime` module (hence the double `datetime`):

```python
import datetime

datetime.datetime.combine(datetime.date(2020, 1, 1), datetime.time(12, 30))
```

```out
datetime.datetime(2020, 1, 1, 12, 30)
```

---

### Getting the current time

We can get a Python object representing the time now (usually the same as your computer clock):

```python
import datetime
datetime.datetime.today()
```

```out
datetime.datetime(2021, 11, 13, 9, 23, 33, 496290)
```

We can also get the current time in the UTC timezone:


```python
import datetime

datetime.datetime.utcnow()
```

---

### Replace

```python
import datetime

dt = datetime.datetime(2020, 1, 1, 12, 30)
dt.replace(year=2021)
```

```out
datetime.datetime(2021, 1, 1, 12, 30)
```

### Timedelta

```python
import datetime

dt = datetime.datetime(2020, 1, 1, 12, 30)
dt + datetime.timedelta(hours=1)
```

```out
datetime.datetime(2021, 1, 1, 13, 30)
```
