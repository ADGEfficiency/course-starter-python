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

After this chapter you will be able to:

- understand how to use the `pytz` library, 
- create timezone aware datetimes with `localize`,
- convert timezones with `astimezone`,

- tzinfo, naive versus aware 

## Motivations

Timezones are a modern day problem.

Our ability to communicate & travel over large distances means we need to understand how to reference time all across the planet.  

Daylight savings introduce more complexity to the timezone problem - daylight savings means that a single location can have multiple timezones in a single year.

While timezones and daylight savings are complex, they are an unavoidable part of working with timestamps.  We believe that anyone can understand these systems.

</exercise>

<exercise id="2" title="Timezones" type="slides">
<slides source="datetimes/timezones"></slides>
</exercise>

<exercise id="3" title="Daylight Saving" type="slides">
<slides source="datetimes/daylight-saving"></slides>
</exercise>

<exercise id="4" title="Exercises">
</exercise>
