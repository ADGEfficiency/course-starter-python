---
type: slides
---

## Strings versus objects

Understanding the difference between `strftime` and `strptime` requires understanding the difference between a Python *string* and *object*.

With a string, what you see is what you get.  While the Python string also has additional data (class attributes) and functionality (class methods), a string is a straightforward piece of data.

A Python object can be arbitrary complex - making

The complexity with this distinction is that *technically*, a Python string *is* a Python object as well. However, a string that lives in a text file (such as in a CSV or JSON file) is not a Python object.

---

## Datetime strings versus datetime objects

We can create different representations of the same datetime as both an object and a string.

First we can create a Python `datetime` object:

```python
import datetime
dt = datetime.datetime(2020, 12, 25, 18, 30)
```

```out
datetime.datetime(2020, 12, 25, 18, 30)
```

This representation of the datetime lives inside a Python process - it's a rich Python object, that has data and functionality beyond just showing the datetime.

If we wanted to store (or read) this piece of data in a text file (like a CSV or JSON file), we need to transform this Python `datetime` object into a string.

A string is a concrete representation - its a simple, what you see is what you get representation of time.  That's not to say everything is clear - a datetime string can be ambigious.  But the Python `datetime` object is much more abstract than the string representation.

---

## Representing datetimes as strings

There are many ways to represent a datetime as a string.  A good habit to set is to use ISO 8601 wherever possible - most libraries will handle ISO 8601 formatted data easily.

The Python `datetime` object has a `isoformat` method which will create an ISO8061 formatted string for us:

```python
import datetime
dt = datetime.datetime(2020, 12, 25, 18, 30)
dt.isoformat()
```

```out
'2020-12-25T18:30:00'
```

Likewise


```python
import datetime
datetime.datetime.fromisoformat('2020-12-25T18:30:00')
```

```out
datetime(2020, 12, 25, 18, 30)
```

---

## ISO 8061

The ISO 8061 format specifies:

---

## Format codes and `strftime`

There are lots of different ways to format datetimes as strings - format codes allow us to start to make sense of how to structure a datetime as a string.

Let's stick with our familiar datetime of Christmas 2050:

```python
import datetime
dt = datetime.datetime(2020, 12, 25, 18, 30)
```

Let's start with a few format codes:

- weekday - `%A`,
- day of the month - `%d`
- month - `%B`

Use format codes to define how we want our datetime string to look:

```python
dt.strftime('%A %d of %B')
```

```out
'Friday 25 of December'
```

---

## Format codes and `strftime`

We can change the string we produce with `strftime` by changing the format code for month:

```python
dt.strftime('%A %d of %m')
```

```out
'Friday 25 of 12'
```

We can also include the year:

```python
dt.strftime('%A %d of %B of %Y')
```

```out
'Friday 25 of December 2050'
```

For the day to day work of a data professional, we hope familiarity with that the following format codes for 

For a full list of format codes, check out the [Python strftime cheat sheet](https://strftime.org/).  For an interactive experience, check out [strftime reference and sandbox](https://www.strfti.me/).


---

## Parsing datetime strings into datetime objects

So far we have focused on creating strings from our datetime objects.  What if we have the opposite - we have a string and want to make a datetime object?

We can do this using `strptime` - which strips the datetime from a string:

```python
from datetime import datetime

dt ='Friday 25 of December 2050'
dt.strptime(dt, '%A %d of %B of %Y')
```

A practical example of this is 

```python
date = "2020-01-01"
date = datetime.strptime(date, "%Y-%M-%d")
#  convert back into a string suitable for the url
date = date.strftime("%Y%M%d")
url = f"https://www.emi.ea.govt.nz/Wholesale/Datasets/FinalPricing/EnergyPrices/{date}_FinalEnergyPrices.csv"
```

Chaining and combining `strftime` and `strptime` enables you to create and process datetime data in flexible and powerful ways.
