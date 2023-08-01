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
        uniformity_report: Dict[str, List[int]] = {}

        def parse_string_to_data_type(value):
            try:
                int_value = int(value)
                return 'int'
            except ValueError:
                try:
                    float_value = float(value)
                    return 'float'
                except ValueError:
                    if value.lower() == 'true':
                        return 'boolean'
                    elif value.lower() == 'false':
                        return 'boolean'
                    elif value.lower() == 'none':
                        return 'none'
                    else:
                        return 'string'

        for column in self.df.columns:
            column_values = self.df[column]

            unique_data_types = column_values.apply(parse_string_to_data_type).unique()

            # If there's more than one unique data type in the column and the data types are not NaN, it's not uniform
            if len(unique_data_types) > 1:
                uniformity_report[column] = [index for index, value in enumerate(self.df[column]) if not pd.api.types.is_numeric_dtype(parse_string_to_data_type(value))]

        return uniformity_report

    def check_duplicates(self) -> List[Tuple[int]]:
        # Return a list of tuples of row indexes where each tuple represents a duplicate group
        duplicated_series = self.df.duplicated(keep=False)
        duplicated_indices = self.df[duplicated_series].index.tolist()

        duplicates = [];
        if duplicated_indices:
            duplicates = [tuple(duplicated_indices)]

        return duplicates

    def check_missing_values(self) -> List[int]:
        # Return the row indexes which contain empty values
        return self.df[self.df.isnull().any(axis=1)].index.tolist()

    def check_outliers(self) -> Dict[column_name, List[int]]:
        # Outliers are defined by the 1.5 IQR method.
        # see https://towardsdatascience.com/why-1-5-in-iqr-method-of-outlier-detection-5d07fdc82097
        # for a detailed explanation
        # Return a dict mapping column name to a list of row indexes which are outliers
        outliers = {}
        for col in self.df.columns:
            if self.df[col].dtype in ['int64', 'float64']:
                Q1 = self.df[col].quantile(0.25)
                Q3 = self.df[col].quantile(0.75)
                IQR = Q3 - Q1
                lower_bound = Q1 - 1.5 * IQR
                upper_bound = Q3 + 1.5 * IQR
                outliers[col] = self.df.index[(self.df[col] < lower_bound) | (self.df[col] > upper_bound)].tolist()
        return outliers

    def generate_report(self) -> Dict[str, Any]:
        report = {
            "UNIFORMITY": self.check_uniformity(),
            "DUPLICATE_ROWS": self.check_duplicates(),
            "MISSING_VALUE_ROWS": self.check_missing_values(),
            "OUTLIERS": self.check_outliers(),
        }
        return report
