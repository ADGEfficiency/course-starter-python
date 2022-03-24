import pandas as pd
from rich import print

url = (
    "https://www.bp.com/content/dam/bp/business-sites/en/global/corporate/"
    "xlsx/energy-economics/statistical-review/"
    "bp-stats-review-2021-consolidated-dataset-narrow-format.csv"
)

raw = pd.read_csv(url)
print(list(raw.columns))
print(raw.iloc[:3, :5])
