import pandas as pd
from rich import print

raw = pd.read_csv(
    "https://www.bp.com/content/dam/bp/business-sites/en/global/corporate/"
    "xlsx/energy-economics/statistical-review/"
    "bp-stats-review-2021-consolidated-dataset-narrow-format.csv"
)

data = raw[["Country", "Year", "Region", "SubRegion", "Var", "Value"]]
data = data[data["Var"].isin(["wind_twh", "solar_twh", "nuclear_twh", "pop"])]
data = data[data["Region"] == "Asia Pacific"]
data.head(3)
