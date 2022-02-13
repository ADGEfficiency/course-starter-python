---
type: slides
---

## Combine year, month and day in pandas to create a date

```python

df = pd.DataFrame({
  'year': [2020, 2020, 2021, 2025],
  'month': [2020, 2020, 2021, 2025],
  'day': [2, 4, 6, 8]
})
```


## How select all values between 2 date by year, month, day columns?


## Getting today's date in YYYY-MM-DD in Python?


## Convert string into datetime object


## Convert datetime object into string



## Select first Monday of the month


## How to make a timezone aware datetime object in Python?



## Cleaning NZ Electricity Price Data

The dataset we are using is [available here](https://www.emi.ea.govt.nz/Wholesale/Datasets/FinalPricing/EnergyPrices/ByMonth) through the New Zealand Electricity Market Authority.

DST in NZ ends on the first Sunday in April, when 3.00am becomes 2.00am -> 50 period day

https://forum.emi.ea.govt.nz/thread/daylight-saving-time-and-trading-periods/

```python
import pandas as pd

data = pd.read_csv("https://www.emi.ea.govt.nz/Wholesale/Datasets/FinalPricing/EnergyPrices/ByMonth/202112_FinalEnergyPrices.csv")
print(data.head())
print(data.tail())

#  select one region
mask = data['PointOfConnection'] == 'HAY2201'
data = data[mask]
print(data.shape)

#  select one day
date = '2021-12-01'
mask = data['TradingDate'] == date
data = data[mask]

#  do the transform by creating range index with correct freq, sort by trading period

rng = pd.date_range(date+'T00:00:00', date+'T23:30:00', freq='30T', tz='Pacific/Auckland')
data['datetime'] = rng

#  then create test for special day, with mock data
#  first sunday in april
date = '2021-04-04'
rng = pd.date_range(date+'T00:00:00', date+'T23:30:00', freq='30T', tz='Pacific/Auckland')
assert len(rng) == 50

#  let's check what our algorithm does

```
