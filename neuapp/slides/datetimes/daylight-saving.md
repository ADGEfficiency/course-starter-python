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

Imagine we lived life in a single village our entire life.

This village is located far to the north, where the summer days are much longer than the days in winter.

<img src="/datetimes/f1.png" alt="This image is in /static" width="50%">

This seasonal pattern means that for the same time of the day (like 1200 or 1800) the sun is in a very different position.

---

For years our village has only had one timezone to worry about

To change this, our village implements daylight saving (they didn't need to, but they did) - our village now has two timezones - one for summer, one for winter:

Decide to maintain two timezones - one timezone we follow in the summer, one timezone we follow in the winter

```python
import pandas as pd
from datetime import timedelta

st = "2020-12-25T00:00:00"
en = "2020-12-26T00:00:00"

df = pd.DataFrame({
  "summer": pd.date_range(start=st, end=en, freq='4H')
})
df['winter'] = df['summer'] - timedelta(hours=1)
```

see https://docs.google.com/presentation/d/1VVKMJWfghU_v4Z0Bu5srnnMgWXoz6BWIX_jLt8MFlRE/edit#slide=id.gcf89a93e1e_0_0 for images

---

The consequences of our decision to maintain two timezones

Let's look what happens during spring, when we transition from winter to summer.  When we choose to transition is arbitrary

Let's look what happens during autumn, when we transition from summer to winter:




