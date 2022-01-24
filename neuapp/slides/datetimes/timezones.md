---
type: slides
---

## Why timezones are hard

Timezones are hard because it forces us to do something unnatural - consider the same point in time at different places.

Timezones are also arbitrary - where we draw timezone boundaries is mostly a political problem.  China for example has only a single timezone.

Timezones can change - cities can go from one timezone to another, or change timezone, due to either daylight savings or political decisions.


## Advice for working with timezones

Stick to one (if you can). Use standard timezones (timezones that do not observe daylight saving) when possible.

Default to UTC - [even if it's not a silver bullet](https://codeblog.jonskeet.uk/2019/03/27/storing-utc-is-not-a-silver-bullet/).  Consider storing the timezone alongside a UTC timestamp, or even storing the elements of the datetime (such as year or day) as separate columns.

Make the decision about whether you need to support multiple timezones in your project.  If all your data is in a single timezone, you may be able to use timezone naive timestamps.

The requirements of your project will determine what the correct decision is for you.  The important thing is to spend time thinking about how you should be storing dates.


---

## What is a timezone?

Imagine a small planet with two villages - Alpha and Omega.

<img src="/datetimes/f2.png" alt="This image is in /static" width="50%">

Because of how the sun moves around this planet, different parts of the planet are in light or darkness at the same moment in time.

In order for the time to make sense in both villages, we implement timzezones.  

One timezone we call UTC, which stands for *Coordinated Universal Time*. 

---

## UTC

UTC serves as the anchor that we base all our other timezones off.

<img src="/datetimes/f2.png" alt="This image is in /static" width="50%">

UTC (or Coordinated Universal Time) is a *standard* timezone - it does not observe daylight saving.

---

## Offset timezones

Our second timezone covers the village of Omega - and is two hours ahead of UTC - or `UTC+2`.  We also call this time *Omega Standard Time* - which is always `UTC+2`.

Omega also decides to implement a daylight saving time - for half of the year they move their clocks ???, and they follow a timezone of `UTC+???`.

---

## Working with timezones in Python

We will be using the `pytz` library - this library is not part of the Python standard library.

- `pytz`,
- naive versus aware timezones,
- localization versus conversion.

---

## `pytz`

`pytz` uses the *tz* database - a standardization of timezones that includes good support for timezones that are not constant offsets from UTC - such as daylight savings timezones (also known as *non-standard* timezones).

An important technicality with the `tz` database (and by extension `pytz` and `pandas`) is that the `+/-` in the `GMT` offsets are *reversed* from the way offsets are defined for ISO 8061:

| Timezone | pytz timezone | ISO 8061 timezone | 
|----------|---------------|-------------------|
|          |               |                   | 
|          |               |                   |
|          |               |                   |


---

## Timezone naive versus timezone aware

In Chapter 1 all the methods we looked at for creating datetimes were *timezone-naive* - they had no indication of timezone (even somewhat confusingly for `datetime.utcnow()`):

```python
from datetime import datetime

dt = datetime.utcnow()
```

```out
datetime.datetime(2022, 1, 7, 19, 18, 31, 298118)
```

We could make this timestamp *timezone-aware* by using the `pytz` library:

```python
from datetime import datetime
import pytz

dt = datetime.utcnow()
tz = pytz.timezone('UTC')
aware = tz.localize(dt)
```

```out
datetime.datetime(2022, 1, 15, 12, 48, 28, 892076, tzinfo=<UTC>)
```

---

## Timezone localization

Localization is used when you have a naive timezone, and you want to make it timezone aware.

We can start out creating a datetime using `utcnow`, which creates a timezone naive datetime:

```python
from datetime import datetime
dt = datetime.utcnow()
```
```out
datetime.datetime(2022, 1, 7, 19, 18, 31, 298118)
```

We can then localize this timezone to UTC, by creating a pytz timezone:

```python
from datetime import datetime
import pytz

dt = datetime.utcnow()
tz = pytz.timezone('UTC')
dt = tz.localize(dt)
```

```out
datetime.datetime(2022, 1, 7, 19, 18, 31, 298118, tzinfo=<UTC>)
```

This makes a datetime timezone aware.

```python
dt.isoformat()
```

```out
'2022-01-07T19:18:31.298118+00:00'
```

---

## Timezone conversion

Timezone conversion is similar to localization - except in conversion we start with a timezone aware datetime.

In `pytz` conversion is done using the `astimezone` method:

```python
import datetime
import pytz

dt = pytz.timezone('UTC').localize(datetime.datetime.utcnow())
dt.astimezone(pytz.timezone('Pacific/Auckland'))
```

```out
datetime.datetime(
  2022, 1, 8, 8, 23, 30, 946353, 
  tzinfo=<DstTzInfo 'Pacific/Auckland' NZDT+13:00:00 DST>
 )
```

We can now see our datetime is timezone aware, by the inclusion of `+13:00` in the ISO 8061 timestamp:

```python
dt.isoformat()
```

```out
'2022-01-08T08:23:30.946353+13:00'
```




## References

https://codeblog.jonskeet.uk/2019/03/27/storing-utc-is-not-a-silver-bullet/






