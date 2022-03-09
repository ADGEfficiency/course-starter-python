---
courseId: datetimes
title: 'Working with Datetimes in Python'
description: Time to learn about datetimes in Python.
type: course

---


```python
from datetime import datetime

#  create an ISO timestamp of current UTC time
dt = datetime.utcnow().isoformat()

#  string + format code -> object
dt = datetime.strptime('%Y-%m-%d', '2022-02-01')

#  object + format code -> string
dt.strftime("%Y-%m-%dT%H:%M:%S")

#  today's date in YYYY-MM-DD format
dt = datetime.utcnow().strftime('%Y-%m-%d')
```

