---
title: 'Chapter 3: Store Data in SQLite'
description: "Now we have a clean dataset - let's explore & visualize it with Matplotlib."
prev: null
next: /chapter2
type: chapter
id: 1
courseId: data-analysis

---

<exercise id="1" title="Loading Excel Data">

```python
import pandas as pd

df = pd.read_csv('bp.csv')
print(df.head(2))
```
