---
type: slides
---

## Why timezones are hard

Timezones force us to do something unnatural - consider the **same point in time** in **different places**.

Timezones are arbitrary - where we draw timezone boundaries is a political decision.  China for example has only a single timezone.

Timezones can change - cities can change from timezone to another, due to either daylight savings or a change of timezone.

---

## Advice for working with timezones

Make the decision early on about whether you need to support multiple timezones.

Stick to one timezone if you can - if your entire business is within a single timezone, use this to your advantage!  You may even be able to use timezone naive timestamps.

Use standard timezones (timezones that do not observe daylight saving) where possible.

Default to UTC - [even if it's not a silver bullet](https://codeblog.jonskeet.uk/2019/03/27/storing-utc-is-not-a-silver-bullet/).  Consider storing the timezone alongside a UTC timestamp.

Consider storing the elements of the datetime (such as year or day) as separate columns (which we know know is a partitioned representation).


---

## What is a timezone?

Imagine a small planet with one village - Alpha.

<img src="/datetimes/f2.png" alt="This image is in /static" width="50%">

Because of how the sun moves around this planet, different parts of the planet are in light or darkness at the same moment in time. 

For the inhabitants of Alpha, *who abhor to explore*, this doesn't matter - they live in Alpha, and always follow Alpha Standard Time - a 24 hour clock.

Until one day, a group of villagers leave for the unknown.

---

## What is a timezone?

One day a second village is discovered - named Omega, located on the other side of the planet.  When it's day in Alpha, it is night in Omega (and vice versa).

Eager to share and learn, the village of Omega adopts Alpha Standard Time.  Quickly the effects of this decision start to become apparent.

School starts at 0600 in Alpha Standard Time - for the residents of Omega to start school at the same time of day, they start school at 1800!

In order for the time to make sense in both villages, our planet three implements timezones:

- Alpha Standard Time,
- Omega Standard Time,
- Coordinated Universal Time (known as UTC).


---

## UTC

One timezone we call UTC, which stands for *Coordinated Universal Time*. 

UTC serves as the anchor that we base all our other timezones off.  

UTC (or Coordinated Universal Time) is a *standard* timezone - it does not observe daylight saving.

We locate UTC in Alpha - Alpha Standard Time and UTC are the same time.  We can say that Alpha Standard Time is `UTC+00:00`.

Why have two timezones that cover the same timezone exactly?  The reason is that Alpha Standard Time may change in the future - for example, we may decide to shift AST to `UTC-01:00` - one hour behind UTC.  UTC avoids all this complication and will not change for any reason, making it a useful place to reference all other timezones from.

---

## Offset timezones

Our other two timezones covers our two villages - Alpha Standard Time at `UTC+00:00` and Omega Standard Time at `UTC+12:00`.


---

## Working with timezones in Python

This section is focused on how to work with timezones in Python.

We will be using the `pytz` library - which is not part of the Python standard library, but is used by many popular data science libraries (such as `pandas`).

This section covers:

- `pytz` and the `tz` database,
- naive versus aware timestamps,
- timezone localization versus timezone conversion,

---

## `pytz`

`pytz` uses the *tz database* - a standardization of timezones that includes good support for timezones that are not constant offsets from UTC - such as daylight savings timezones (also known as *non-standard* timezones).

`pytz` attempts to model all timezones and their changes since 1970 - including daylight saving time and leap seconds.

An important technicality with the `tz` database (and by extension `pytz` and `pandas`) is that the `+/-` in the `GMT` offsets are *reversed* from the way offsets are defined for ISO 8061:

| pytz timezone | ISO 8061 UTC offset | 
|---------------|-------------------|
| ETC/GMT-10     | +10:00             | 
| ETC/GMT-2     | +02:00             | 
| ETC/GMT+0     | +00:00             | 
| ETC/GMT+2     | -02:00             | 
| ETC/GMT+10     | -10:00             | 

This reversal of sign can cause problems - especially with users that are used to the more common ISO8061 UTC offsets. 

---

## Naive versus timezone aware timestamps

Give examples of the ISO datetimes with timezones:

```
```

---

## How to make a timezone aware datetime object in Python?

Timezone naive versus timezone aware

In Chapter 1 all the methods we looked at for creating datetimes were *timezone-naive* - they had no indication of timezone (even somewhat confusingly) for `datetime.utcnow()`:

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

## How to convert timezones with `astimezone`

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

---

## tzinfo

---

## References

https://codeblog.jonskeet.uk/2019/03/27/storing-utc-is-not-a-silver-bullet/
