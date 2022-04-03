---
title: 'Chapter 4: SQLAlchemy and Postgres'
description: .
prev: null
next: /sql/ch3
type: chapter
id: 1
courseId: sql
---


<exercise id="1" title="Introduction & Motivations" >

## Introduction

The first section *Date, Time and Datetime* covers:

- working with the Python `datetime` module,
- creating `date`, `time` and `datetime` objects in Python,
- combining a `date` and `time` into a `datetime`,
- get the current time using `now` and `utcnow`,
- the UNIX representation of time,
- timedeltas.

The second section *Datetime Strings and Objects* covers:

- the difference between strings and `datetime` objects,
- ISO 8601, `isoformat` and `fromisoformat`,
- format codes - a specialized language for datetime string formatting,
- making `datetime` objects from strings with `strftime`,
- making strings from `datetime` objects with `strptime`.

All of the code in this course is compatible with Python 3.8.


## Motivations

Working with dates, times, datetimes and timestamps is part of the work of any data professional - we all need to timestamp something sometime.

Datetimes are challenging because so many things are arbitrary - where timezones are, if daylight saving applies or not - all these things are conventions that are arbitrary but consistent.

Working with datetimes requires gaining a certain amount of *boilerplate knowledge*, such:

- such as that the format code for year is `%Y`,
- what ISO861 is,
- what `strptime` and `strftime` do.

Hence a course on datetimes ^^

</exercise>

<exercise id="2" title="Common SQL Databases">

</exercise>
