---
courseId: datetimes
title: 'Working with Datetimes in Python'
description: TODO
type: course

---

Research


I googled
- datetimes in Python
- working with datetimes timezones


Real python - https://realpython.com/python-datetime/

w3 schools - https://www.w3schools.com/python/python_datetime.asp
https://www.youtube.com/watch?v=-5wpm-gesOY
https://www.youtube.com/watch?v=rz3D8VG_2TY
https://www.mojotech.com/blog/the-complexity-of-time-data-programming/
https://www.guru99.com/date-time-and-datetime-classes-in-python.html
https://blog.teclado.com/how-to-work-with-dates-times-python-datetime/
https://howchoo.com/g/ywi5m2vkodk/working-with-datetime-objects-and-timezones-in-python

---

projects
- timezone converter - compare times in different places

how deep you need to go depends on your work

- sometimes only need

execises
- same time or different time?

---

https://strftime.org/

chapter 1 - datetime
- date, time and datetime, combine
- datetime.today, now, 
- making datetimes from strings with strftime
- making strings from datetimes with strptime - specalized language 
- timedelta (converting from timedelta in col)

chapter 2 - timezones & daylight saving

- isoformat fromisoformat
- localize versus convert (table showing what combos will error and work etc)
- tzinfo, naive versus aware (always aware versus always naive - but not inbetween - only use naive if you only work in one timezone ever)


chapter 3 - datetimes with pandas

- pd.Datetime, pd.day etc
- datetimeindex


---

concepts to cover
- daylight saving
- standard times
- timezones (offsets, nepal time on 0545)
- day / month first( month first common in US )
- unix epoch (doesn't include leap seconds) `time.time()`, always no timezone / utc
- UTC / GMT / Zulu (occasionally adds leap seconds)

---

why time hard
- different ways to represent date & time
- timezones + daylight saving

solns
- use iso standard
- try to use standard times where possible

---
Do not confuse a "time zone", such as America/New_York with a "time zone offset", such as -05:00

--- 

why timezones
- old days, each village has own time
- long distance travel

UTC = not time zone, but a international time standard reference


daylight saving means we need to know more than location - also need to know the offset at that point in time


