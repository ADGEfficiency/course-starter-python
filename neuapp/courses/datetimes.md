---
courseId: datetimes
title: 'Working with Datetimes in Python'
description: Time to learn about datetimes in Python.
type: course
---

## Datetimes in Python Cheat Sheet

```python
from datetime import date, datetime

#  convert a date to datetime
dt = datetime.combine(date.today(), datetime.min.time())

#  ISO timestamp string of current UTC time
dt = datetime.utcnow().isoformat()

#  string + format -> object
dt = datetime.strptime('%Y-%m-%d', '2022-02-01')

#  datetime object + format -> string
dt.strftime("%Y-%m-%dT%H:%M:%S")

#  today's date as YYYY-MM-DD string
dt = datetime.utcnow().strftime('%Y-%m-%d')
```
