---
type: slides
---

## Why daylight saving is hard


Like timezones, daylight savings is hard because it forces us to do something unnatural - consider the same point in time at different places.

Daylight savings is also hard because it forces us to do something unnatural - consider a discontinuity in time.  Daylight savings means we end up with both missing and duplicate timestamps.


## Advice for working with daylight saving

Where possible - don't!  A **standard** timezone is a timezone that is unaffected by daylight saving, such as UTC, or Australian Eastern Standard Time (AEST).

If you are working with daylight savings,

---

## Standard versus non-standard timezones

An important distinction in timezones is the difference between standard timezones (which are not affected by daylight savings) and non-standard timezones (where daylight is in effect).

---

## Daylight Saving

Let's return to the plant we explored in our section on timezones.  Our planet has two villages - Alpha and Omega - and three timezones:

- Coordinated Universal Time (UTC+00:00).
- Alpha Standard Time (UTC+00:00),
- Omega Standard Time (UTC+12:00),

Omega is located far to the south where the summer days are much longer than the days in winter.

This seasonal pattern means that for the same time of the day (like 1200 or 1800) the sun is in a very different position at different times of the year.

Omega decides to implement a daylight saving time - decide to maintain two timezones - one timezone we follow in the summer, one timezone we follow in the winter.

We now end up with:

- Coordinated Universal Time (UTC+00:00).
- Alpha Standard Time (UTC+00:00),
- Omega Standard Time (UTC+12:00),
- Omega Daylight Time (UTC+13:00).
- 

---

## The consequences of daylight saving

To demonstrate the consequences of our decision to maintain two timezones, we will use `pytz` to generate the what happens in the daylight savings days:

- one short (23 hour) day with missing times,
- and one long (25 hour) day with duplicate times.

Let's look what happens during spring, when we transition from winter to summer.  We will use `pandas` to do this - don't worry if some of the code is unfamiliar at this stage:

```python
date = date.fromisoformat('2020-09-27')

df = pd.DataFrame({
    'datetime': pd.date_range(
        date, date + timedelta(days=1), freq='H', tz='Pacific/Auckland'
    )
})
print(df.shape)
print(df.head(10))
```

Let's look what happens during autumn, when we transition from summer to winter:

Daylight saving currently commences on:

- the last Sunday in September, when 2.00am becomes 3.00am, 
- ends on the first Sunday in April, when 3.00am becomes 2.00am.

2020
- begins 0200 Sunday 27 Sept

2021
- ends 0300 Sunday 4 April 2021
