import pandas as pd
from rich import print

raw = pd.read_csv(
    "https://www.bp.com/content/dam/bp/business-sites/en/global/corporate/"
    "xlsx/energy-economics/statistical-review/"
    "bp-stats-review-2021-consolidated-dataset-narrow-format.csv"
)

cols = ["Country", "Year", "Region", "SubRegion", "Var", "Value"]
data = raw[cols]
data.head(3)
