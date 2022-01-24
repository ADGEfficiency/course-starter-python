---
type: slides
---


### What is a date?

A date is made of a year, month and day:

```python
import datetime
datetime.date(2020, 1, 1)
```

```out
datetime.date(2020, 1, 1)
```

We can access the elements of our `date` object as attributes, like for year using `.year`:

```python
dt = datetime.date(2020, 1, 1)
dt.year
```

```out
2020
```

And day using `.day`:

```python
dt.day
```

```out
1
```

---


### What is a time?

A time is made of hours, minutes and seconds:

```python
import datetime
datetime.time(12, 30, 0)
```

```out
datetime.time(12, 30)
```

We can access the elements of our `time` object as attributes, the same as we did for our `date`. We can access the hour using `.hour`:

```python
dt = datetime.time(12, 30, 0)
dt.hour
```

```out
12
```

And minute using `.minute`:

```python
dt.minute
```

```out
30
```

---


### What is a datetime?

A datetime is a combination of the two objects we have been looking at - **a date and a time**.

We can create a `datetime` object from scratch, using the same syntax as for dates and times:

```python
import datetime
datetime.datetime(2050, 12, 25, 18, 30)
```

```out
datetime.datetime(2050, 12, 25, 18, 30)
```

We can access the elements of our `datetime` object (such as the year) with the same attribute syntax as `date` or `time`:

```python
import datetime
dt = datetime.datetime(2050, 12, 25, 18, 30)
dt.year
```

```out
2050
```


---

### Combine

The `combine` method of the `datetime` *object* in the `datetime` *module* (hence the `datetime.datetime`) allows us to create a `datetime` object from a `date` and a `time`:

```python
import datetime

datetime.datetime.combine(datetime.date(2020, 1, 1), datetime.time(12, 30))
```

```out
datetime.datetime(2020, 1, 1, 12, 30)
```


### Replace

The `replace` method allows changing the attributes of a `datetime` object, such as changing the year:

```python
import datetime

dt = datetime.datetime(2020, 1, 1, 12, 30)
dt.replace(year=2021)
```

```out
datetime.datetime(2021, 1, 1, 12, 30)
```

---

### Getting the current time

We can get a Python object representing the current time using your computer clock:

```python
import datetime
datetime.datetime.today()
```

```out
datetime.datetime(2021, 11, 13, 9, 23, 33, 496290)
```

We can also get the current time in the UTC timezone using `datetime.datetime.utcnow()`, which also returns a `datetime` object, but in UTC time.

Both `utcnow` and `today` return objects that are timezone naive (they have no timezone attached to them).

---

### Datetime Representations

So

1. Partitioned

Integers for all the components of time

2. Offsets

Offset from anchor (such as seconds since UNIX epoch)


---

### Timedeltas

The `timedelta` allows us to create offsets from `datetime` objects, such as one hour ahead:

```python
import datetime

dt = datetime.datetime(2020, 1, 1, 12, 30)
dt + datetime.timedelta(hours=1)
```

```out
datetime.datetime(2021, 1, 1, 13, 30)
```

Timedeltas are useful when you want to transform a date by a fixed length of time - such as the same time the next day:

```python
import datetime
datetime.datetime(2020, 1, 1, 12, 30) + datetime.timedelta(hours=24)
```

```out
datetime.datetime(2021, 1, 2, 12, 30)
```

---

### UNIX Time

The UNIX time is an numeric represenation of time - it is the number of seconds that have elapsed since the *UNIX epoch* (arbitrarly set at 1st January 1970).

You can get a UNIX timestamp of the current time using `time.time`:

```python
import time

time.time()
```

```out
1642256638.807711
```

If you ever see a long float or integer in a datetime column, it is likely UNIX time.
