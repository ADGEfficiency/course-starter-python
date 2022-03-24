import pandas as pd

url = (
    "https://www.bp.com/content/dam/bp/business-sites/en/global/corporate/"
    "xlsx/energy-economics/statistical-review/"
    "bp-stats-review-2021-consolidated-dataset-narrow-format.csv"
)

raw = pd.read_csv(url)
