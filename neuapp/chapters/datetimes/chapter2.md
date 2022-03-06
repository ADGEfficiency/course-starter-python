---
title: 'Chapter 2: Timezones & Daylight Saving'
description: 'Timezones, why they are hard, advice, timezone naive & aware, pytz, localization, conversion, standard timezones, day-light saving.'
prev: /datetimes/chapter1
next: /datetimes/chapter3
type: chapter
id: 2
courseId: datetimes
---

<exercise id="1" title="Introduction" >

## Introduction

The first section *Timezones* is split into two parts - first we look at:

- why timezones are hard,
- advice for working with timezones,
- timezones explained,
- UTC and offset timezones,
- naive versus aware timestamps

In the second part of *Timezones*, we focus on working with timezones in Python:

- how to use `pytz`,
- the subtle complexity of the `tz` database,
- how to create timezone aware datetimes with `localize`,
- how to convert timezones with `astimezone`,
- how to access and use `tzinfo`.

In the second section *Daylight Saving*, we look at:

- why daylight saving is hard,
- advice for working with day light saving,
- standard versus non-standard timezones,
- what is daylight saving,
- the consequences of daylight saving.

## Motivations

Timezones are a modern problem.

Our ability to communicate & travel over large distances means requires us to reference time all across the planet - past, present and future, in many locations.

Daylight savings introduces even more complexity to the timezone problem - daylight saving means that a single location can have multiple timezones in one year.

While timezones and daylight savings are complex, they are an undeniably important part of working with data.

Mastering them is well within your capability - hence this course ^^

</exercise>

<exercise id="2" title="Timezones" type="slides">
<slides source="datetimes/timezones"></slides>
</exercise>

<exercise id="3" title="Daylight Saving" type="slides">
<slides source="datetimes/daylight-saving"></slides>
</exercise>
