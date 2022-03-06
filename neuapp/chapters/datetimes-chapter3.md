---
title: 'Chapter 3: Datetimes in Pandas'
description: 'pd.Timestamp, pd.to_datetime, day versus month first, creating date ranges, working with datetime columns, timezones, resampling, groupby.'
prev: /datetimes/chapter2
next: null
type: chapter
id: 3
courseId: datetimes
---

<exercise id="1" title="Introduction" >

## Introduction

The first section *Pandas Datetime Ecosystem* covers 

- `pd.Timestamp`,
- `pd.to_datetime`,
- day versus month first,
- `pd.date_range`,
- working with datetime columns,
- using `apply`,
- timezones in pandas,
- resampling and groupby.

The second section *Pandas Datetime Workflows* covers 

- combining year, month and day,
- selecting values between dates,
- selecting first Monday of the month,

???
- make dummy time series data,
- check data quality,
- test driven development of a datetime transform,
- cleaning New Zealand electricity price data.


## Motivations

pandas is a foundational library in the Python data ecosystem.

Many data professionals spend their days in pandas.

There are additional ideas that only occur when you start to group or collect datetimes

To demonstrate these ideas we will cover the following use cases:

</exercise>

<exercise id="2" title="Pandas Datetime Ecosystem" type="slides">
<slides source="datetimes/pandas-tools"></slides>
</exercise>

<exercise id="3" title="Pandas Datetime Patterns" type="slides">
<slides source="datetimes/pandas-patterns"></slides>
</exercise>
