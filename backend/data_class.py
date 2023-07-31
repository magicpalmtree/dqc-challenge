from typing import Dict, Any, List, Tuple
import pandas as pd


# - **UNIFORMITY** Is the data in the same format (per column)?
# - **DUPLICATES** Are no duplicates in the data?
# - **MISSING VALUES** Are there any null / missing values?
# - **OUTLIERS** Any outliers in the data (per column)?




column_name = str


class DataClass:
    def __init__(self, path: str, separator: str = ",") -> None:
        self.df: pd.DataFrame = pd.read_csv(path, sep=separator)

    def check_uniformity(self) -> Dict[column_name, List[int]]:
        # Return a dict mapping column name to a list of row indexes which are not uniform

        return {}

    def check_duplicates(self) -> List[Tuple[int]]:
        # Return a list of tuples of row indexes where each tuple represents a duplicate group
        return []

    def check_missing_values(self) -> List[int]:
        # Return the row indexes which contain empty values
        return []

    def check_outliers(self) -> Dict[column_name, List[int]]:
        # Outliers are defined by the 1.5 IQR method.
        # see https://towardsdatascience.com/why-1-5-in-iqr-method-of-outlier-detection-5d07fdc82097
        # for a detailed explanation
        # Return a dict mapping column name to a list of row indexes which are outliers

        return {}

    def generate_report(self) -> Dict[str, Any]:
        report = {
            "UNIFORMITY": self.check_uniformity(),
            "DUPLICATE_ROWS": self.check_duplicates(),
            "MISSING_VALUE_ROWS": self.check_missing_values(),
            "OUTLIERS": self.check_outliers(),
        }
        return report
