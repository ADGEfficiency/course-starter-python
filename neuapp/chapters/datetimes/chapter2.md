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

The first section *Timezones* is split into two parts - first:

- timezones explained,

In the secound part of Timezones, we focus on working with timezones in Python:

- understand how to use the `pytz` library, 
- create timezone aware datetimes with `localize`,
- convert timezones with `astimezone`,
- tzinfo, naive versus aware.

In the second section *Daylight Saving*:

- TODO


## Motivations

Timezones are a modern day problem.

Our ability to communicate & travel over large distances means requires us to reference time all across the planet - past, present and future, in many locations.

Daylight savings introduce even more complexity to the timezone problem - daylight saving means one location can have multiple timezones in a single year.

While timezones and daylight savings are complex, they are an unavoidable part of working with data.

Mastering them is well within your capability - hence this course ^^

</exercise>

<exercise id="2" title="Timezones" type="slides">
<slides source="datetimes/timezones"></slides>
</exercise>

<exercise id="3" title="Daylight Saving" type="slides">
<slides source="datetimes/daylight-saving"></slides>
</exercise>
