# 객체지향설계 + TDD 개발

Cardoc 객체지향 개발을 하기 위한 회고 작성

```python
# -*- coding: utf-8 -*-
# !/usr/bin/env python3
import string_util
import util
import csv
import pymysql

from part_export import config, database_module

file_read = open("/Users/lenkim/cardoc-parts-crawlers/2018_06-10_reuslt/audi/merged_audi.csv", "r", encoding='utf-8')
contents = file_read.readlines()

data = []
column: str = ""
placeholder: str = ""

for index, file_single_data in enumerate(contents):

    file_single_data = str(file_single_data).rstrip('\n')
    array_datas = str(file_single_data).split('|')

    if len(array_datas) != 8:
        continue

    # NO|모델명|부품그룹|부품번호|부품명(영문)|부품명(국문)|세부부품정보|소비자가격(VAT별도)
    _index = string_util.default_string(array_datas[0])
    model = string_util.default_string(array_datas[1])
    part_group = string_util.default_string(array_datas[2])
    part_id = string_util.default_string(array_datas[3])
    part_name_eng = string_util.default_string(array_datas[4])
    part_name_kor = string_util.default_string(array_datas[5])
    detail = string_util.default_string(array_datas[6])
    price = string_util.extract_number_from_price(string_util.default_string(array_datas[7]))

    row = {"brand": "audi", "no": _index, "model": model, "part_category": part_group, "part_id": part_id,
           "part_name_eng": part_name_eng, "part_name_kor": part_name_kor, "detail": detail, "price": price}

    data.append(row)
    if index == 1:
        column = database_module.make_column_text(row)
        placeholder = database_module.make_placeholder_text(row)
file_read.close()

conn = database_module.init(config.host, config.username, config.password, config.database)
database_module.insert_data_v2(conn, column, placeholder, data)

```

## 위 코드의 문제점은 무엇일까요?

모든 자동차 브랜드는 위와 같은 CSV file 로부터 ReadLines 한 뒤, 이를 `database_module.init()`, `database_module.insert_data_v2()` 로직으로 구현되어 Cardoc DB에 Dict(str, Any) 형태의 적절한 Columns으로 적재되어 집니다.

 다시 물어보겠습니다. 혹시 이 코드의 문제점은 무엇일까요?

문제점이라기보다는(동작은 정상적으로 하기 때문에) 구린내가 나는 코드임을 알 수 있었습니다. 

가장 첫번째로 발생할 수 있었던 문제는 DB의 접근을 외부로 노출했습니다.
또한, 어떤 문제가 있을까요?

객체지향의 원칙 중 SRP라는 것이 있습니다. 클래스는 그 클래스가 의미하는 내용만을 책임져야 한다는 의미로서 각 브랜드 별로 같은 로직이 반복되면서 SRP의 원칙을 철저하게 무시하게 되었습니다.

또한, 변수명도 틀렸습니다. datas => date가 되어야겠습니다.

문제점이 많은 코드이지만, 본래 의도하는 기능은 동작합니다. 그러나 리펙토링이 절실하게 필요한 코드입니다.
해당 작업은 하루 종일 Cardoc의 신계현님과 함께 작업했습니다.

### 어떻게 리팩토링 할 것인가?

무작정 코드를 수정하기 전에 고려해야될 점, 어떻게 작업을 하겠다라는 것을 명확히 하고 작업해야 합니다. 

다음은 코드의 리팩토링 포인트를 파악한 뒤 구두로 생각했던 내용을 글로 정리한 부분입니다.

![](https://ws1.sinaimg.cn/large/006tKfTcgy1ft1a5hs670j31642dc7jo.jpg)



위 내용을 간략히 정리해보면, 

- DB는 모듈로서 기능 명세가 명확해야 한다.
- CSV reader도 CSV 모듈로 명확히 분리되어야 한다.
- 칼럼은 transformming 할 수 있는 로직이 필요하다.
- facade 패턴을 활용해야 한다.
- template 패턴을 활용하면 다양한 브랜드의 컬럼명 변경에 용이할 수 있다.
- args로 동작시킬 수 있는 스크립트 작성하기

*번외로, 적어도 패턴은 strategy pattern 만 알아도 코드의 양을 대폭 줄일 수 있다.*

가장 먼저 기존의 DBModule 부분을 살펴보겠습니다.

```python
# 초기 설정
def init(host, user, password, db_name):
    _db = pymysql.connect(host=str(host),
                          user=str(user),
                          password=str(password),
                          db=str(db_name),
                          charset='utf8')

    return _db


# 하나의 테이블 안에 모든 데이터를 넣을 경우
def insert_data_v2(_db, select_property, placeholder, data):
    q = []
    for sinle_data in data:
        q.append(tuple(sinle_data.values()))

    try:
        sql = "INSERT INTO " + "dt_brand_part_all" + "( " + select_property + ")" + " VALUES (" + placeholder + ")"
        _db.cursor().executemany(sql, q)
        _db.commit()
    finally:
        print('end of transactions')
        _db.close()


def make_column_text(_row):
    column = ",".join(_row.keys())
    return column


def make_placeholder_text(row):
    placeholder = ",".join(["%s"] * (len(row.keys())))
    return placeholder

def file_reader(file_name, delimiter, quotechar='|'):
    rows = csv.reader(open('2018_06_29_result/' + file_name, newline='', encoding="utf-8"),
                      delimiter=delimiter, quotechar=quotechar)
    data = []
    for idx, row in enumerate(rows):
        if idx == 10:
            break
        if idx == 0:
            continue

        row_tuple = tuple(row)
        data.append(row_tuple)
    return data

```

계현님과 코드 이야기를 진행한 이 후에 다시 제 코드를 보았을 때, 문제점은 명확했습니다.

1. SRP 원칙이 지켜지지 않았다는 것.
2. 변수명이 해당 함수를 나타내주지 못한다는 점.
3. DB config가 외부로 노출되어 사용자가 쉽게 접근이 가능하다.

해당 부분을 페어프로그래밍을 통해 리팩토링을 진행한 결과 다음과 같은 코드가 만들어졌습니다.

우선 DB_module에 필요한 기능이 무엇인지 명확하게 파악하고 진행되었습니다. 우선시해야될 기능은 다음 `open()`, `close()`, `insert_date_all()`  3개가 되어야 한다는 것입니다. 특히 기존코드의 init 부분의 config 정보는 외부로 노출하지 않아야 했습니다.

```python
# 오직 DB 의 config 정보만을 담당하는 클래스
class DBConfig:
    host: str
    user: str
    password: str
    db_name: str

    def __init__(self, host, user, password, db_name):
        self.host = host
        self.user = user
        self.password = password
        self.db_name = db_name
```

```python
# DBHelper 클래스명/함수명/변수명을 정할 때도 많은 고려가 필요했습니다.
# 해당 클래스의 명명이 과연 적합한 것인가? DBHelper가 아니라 DBModule 등 다양하게 정할 수 있었습니다.
class DBHelper:
    _db: Connection = None
    _db_config: DBConfig = None

    def __init__(self, db_config):
        self._db_config = db_config

    def open(self):
        self.close()
        self._db = pymysql.connect(host=self._db_config.host,
                                   user=self._db_config.user,
                                   password=self._db_config.password,
                                   db=self._db_config.db_name,
                                   charset='utf8')

    def close(self):
        if self._db and self._db.open:
            self._db.close()
        self._db = None

    def insert_many(self, table_name: str, rows: List[Dict[str, str]]):
        if not rows:
            return

        first_row = rows[0]
        sql_template = self._get_sql_template_for_insert(table_name, first_row)
        rows_for_insertion = list(map(lambda row: tuple(row.values()), rows))
        self._db.cursor().executemany(sql_template, rows_for_insertion)
        self._db.commit()
```

위에서 언급한 3가지 문제점을 완벽하게 해결하지는 못했지만 어느 정도 해결할 수 있었던 코드가 되었습니다.

1. 각 클래스가 의미하는 바를 명확하게 표현할 수 있다. (SRP)
2. 함수명/변수명을 변경함으로써 각 함수의 기능을 분명하게 표현합니다.
3. config를 클래스로 따로 생성하여 외부 노출을 피합니다.



어느 정도 DB의 기능을 충실히 하는 클래스를 생성했습니다.

다음 CSV_modulde을 만들어 줄 차례입니다. 이전에는 DB_module에 함께 들어있었지만, 클래스의 기능을 명확하게 다르기 때문에 따로 csv_helpers를 만들어 주는 것 맞습니다.

`csv_helpers.py` DB 클래스의 이름은 db_helper였는데, 왜 csv 파이썬 파일은 왜 복수 일까요?

다음 코드를 살펴보겠습니다.

```python
# -*- coding: utf-8 -*-
import csv
from os import path
from typing import List


class CSVReader:

    @staticmethod
    def read_rows(file_path: str, delimiter: str = ',') -> List[List]:

        if not path.isfile(file_path):
            raise FileNotFoundError()

        result = []
        rows = csv.reader(open(file_path, newline='', encoding="utf-8"), delimiter=delimiter)

        for row in rows:
            result.append(row)

        return result

```



잠시 생각을 가져보겠습니다.



당시 단수, 복수의 경우 표현하는 것에 세심하게 주의했습니다. 변수명이 담긴 의미가 자칫 왜곡되었을 때 전달하고자 하는 의미를 명확히 할 수 없었기 때문입니다.

*정답은 StaticMethod 이기 때문입니다.*

db클래스는 하나의 인스턴스안에서 작업이 이루어지는 반면, CSVReader의 경우에는 인스턴스 단위의 작업이 아니기 때문입니다.

이제 위 `CSVReader` 클래스를 테스트하는 테스트 코드를 작성해보겠습니다.

```python
import unittest

from part_export.csv_helpers import CSVReader


class CSVReaderTests(unittest.TestCase):
    def test_load_rows_successfully(self):
        rows = CSVReader.read_rows('fixtures/bently.csv', '|')
        assert(len(rows) is 6)
        assert(len(rows[0]) is 5)

    def test_load_empty_csv_as_empty_array(self):
        rows = CSVReader.read_rows('fixtures/empty.csv')
        self.assertEqual(rows, [])

    def test_error_on_no_target_csv_file(self):
        self.assertRaises(FileNotFoundError, CSVReader.read_rows, 'invalid path')


if __name__ == '__main__':
    unittest.main()
```

 각각의 일어날 수 있는 방안에 대해 테스트 코드를 위와같이 작성합니다.

` def read_rows` 에 대한 테스트 코드가 3개나 되니까, 함수가 많다면 더 많이 있겠죠?

DB 테스트의 경우에는 리펙토링을 수행할 때 장소에 제약을 받아 수행하지 않았습니다.

이렇게 해서 기초 공사가 끝났습니다. 이렇게 기초작업을 끝내는 것까지만해도 대략 6시간이 걸렸던 것으로 생각됩니다. 이렇게 오래 걸릴 수 있었던 이유는 변수 명명부터, 타입까지 모든 부분에 세세하게 고려하면 코딩했기 때문입니다.

자, 그럼 본격적으로 Audi 브랜드를 예시로 리팩토링을 진행해보겠습니다.

가장 상위에 있던 Audi 코드를 다시 살펴보겠습니다. 일단 DB 적재 부분과 CSV 부분을 제거했습니다.

```python
# -*- coding: utf-8 -*-
# !/usr/bin/env python3
import string_util
import util
import csv
import pymysql

from part_export import config, database_module


data = []
column: str = ""
placeholder: str = ""

for index, file_single_data in enumerate(contents):

    file_single_data = str(file_single_data).rstrip('\n')
    array_datas = str(file_single_data).split('|')

    if len(array_datas) != 8:
        continue

    # NO|모델명|부품그룹|부품번호|부품명(영문)|부품명(국문)|세부부품정보|소비자가격(VAT별도)
    _index = string_util.default_string(array_datas[0])
    model = string_util.default_string(array_datas[1])
    part_group = string_util.default_string(array_datas[2])
    part_id = string_util.default_string(array_datas[3])
    part_name_eng = string_util.default_string(array_datas[4])
    part_name_kor = string_util.default_string(array_datas[5])
    detail = string_util.default_string(array_datas[6])
    price = string_util.extract_number_from_price(string_util.default_string(array_datas[7]))

    row = {"brand": "audi", "no": _index, "model": model, "part_category": part_group, "part_id": part_id,
           "part_name_eng": part_name_eng, "part_name_kor": part_name_kor, "detail": detail, "price": price}

    data.append(row)
    if index == 1:
        column = database_module.make_column_text(row)
        placeholder = database_module.make_placeholder_text(row)
file_read.close()
```

위 코드에서

```python
column = database_module.make_column_text(row)
placeholder = database_module.make_placeholder_text(row)
```

해당 부분이 모든 코드에 중복으로 사용되었습니다. 이 부분을 CSVReader와 결합하여 PartsExport class를 만들어 분리하겠습니다.

```python
class PartsExport:
    def __init__(self, config, brand: CarBrand, csv_path: str):
        self._config = config
        self._brand = brand
        self._csv_path = csv_path

    def export(self):
        rows = CSVReader.read_rows(self._csv_path, '|')
        transformed_rows = self._get_transformed_rows_for_export(rows)
        self._export_rows_to_db(transformed_rows)

    def _get_transformed_rows_for_export(self, rows) -> List[Dict[str, Any]]:
        return [self._get_transformed_part_row(idx, row) for idx, row in enumerate(rows)]

    def _get_transformed_part_row(self, idx: int, row: Dict[str, Any]) -> Dict[str, Any]:
        transformer = PartRowTransformerFactory.create_transformer(self._brand)
        return transformer.transform_row(idx, row)

    def _export_rows_to_db(self, transformed_rows):
        db_config = DBConfig(self._config.host, self._config.user_name, self._config.password, self._config.db_name)
        db_helper = DBHelper(db_config)
        db_helper.open()
        db_helper.insert_many(self._config.table_name, transformed_rows)
        db_helper.close()
```

 이렇게 쪼개는 과정에서 위 코드를 보고 눈치 채신분이 계실 수도 있습니다. 위 클래스의 명은 PartsExport인데, 그와 무관한 함수가 존재하기 때문입니다. 이 부분은 따로 Bulilder 로 분리시키는 작업을 수행함으로써, SRP 원칙에 벗어나지 않도록 해야 될 것입니다.

다시 orignal 코드로 돌아가서

```python
row = {"brand": "audi", "no": _index, "model": model, "part_category": part_group, "part_id": part_id,
           "part_name_eng": part_name_eng, "part_name_kor": part_name_kor, "detail": detail, "price": price}
```

해당 부분이 이번 리펙토링에서 가장 신경을 곤두세웠던 부분입니다.

모든 브랜드마다 서로 다른 Row를 가지고 있어 브랜드 부품 데이터의 특징을 파악하여 수작업으로 작성해야 했습니다.  

해당 부분은 템플릿 패턴을 활용해서 코드의 중복을 최대한 제거하고 최대한 간결해질수 있도록 작성해봤습니다.

아래는 part_row_transformer.py 입니다

```python
# Absract Class
class PartRowTransformer(ABC):
    KEY_BRAND = 'brand'
    KEY_NO = 'no'
    KEY_MODEL = 'model'
    KEY_PART_CATEGORY = 'part_category'
    KEY_PART_ID = 'part_id'
    KEY_PART_NAME_ENG = 'part_name_eng'
    KEY_PART_NAME_KOR = 'part_name_kor'
    KEY_PART_DETAIL = 'detail'
    KEY_PART_PRICE = 'price'

    @abstractmethod
    def transform_row(self, idx: int, row: List[str]):
        pass

```

```python
# 대부분의 브랜드의 데이터가 csv 의 각 row 칼럼들을 특정 key 에 매핑되는 식이라
# child class 로부터 브랜드와 칼럼 매핑 정보를 받아
# dictionary 로 생성하는 template method pattern 기반의 클래스.
class BasicPartRowTransformer(PartRowTransformer):
    @abstractmethod
    def get_brand(self) -> CarBrand:
        pass

    @abstractmethod
    def get_column_mapping(self) -> Dict[str, Any]:
        pass

    def transform_row(self, idx: int, row: List[str]):
        result = {
            self.KEY_BRAND: self.get_brand().value,
            self.KEY_NO: idx,
        }

        column_mapping = self.get_column_mapping()
        for value, key in enumerate(column_mapping):
            if key == self.KEY_PART_PRICE:
                result[key] = self._get_mapped_price_values(row, column_mapping)
                continue

            result[key] = self._get_general_mapped_values(row, key, column_mapping)

        return result

    def _get_general_mapped_values(self, row: List[str], key: str, column_mapping: Dict[str, Any]):
        return string_util.default_string(row[column_mapping[key]])

    def _get_mapped_price_values(self, row: List[str], column_mapping: Dict[str, Any]):
        price_value = row[column_mapping[self.KEY_PART_PRICE]]
        return string_util.default_string(string_util.extract_number_from_price(price_value))
```

여기에서 `BasicPartRowTransformer` 클래스을 상속받는 각각의 브랜드를 생성해주면 처음 코드보다는 객체지향적인 코드를 만들어 내는 결과물을 만들어 줍니다.

```python
class AudiPartRowTransformer(BasicPartRowTransformer):
    def get_brand(self) -> CarBrand:
        return CarBrand.AUDI

    def get_column_mapping(self) -> Dict[str, Any]:
        return {
            self.KEY_MODEL: 1,
            self.KEY_PART_CATEGORY: 2,
            self.KEY_PART_ID: 3,
            self.KEY_PART_NAME_ENG: 4,
            self.KEY_PART_NAME_KOR: 5,
            self.KEY_PART_DETAIL: 6,
            self.KEY_PART_PRICE: 7
        }
```

마지막으로 AudiPartRowTransformer 클래스가 잘 동작되는가에 따른 테스트 코드를 작성했습니다.

```python
import unittest

class PartRowTransFormer(unittest.TestCase):

    def test_successful_export(self):
        t = AudiPartRowTransformer()
        row = t.transform_row(1, ['1', 'A1 1.6 TDI (Hatch Back)', 'Extras', 'G A52195A1', 'ENG.OIL', '엔진 오일', '-',
                                  '25,800'])

        self.assertEqual(row, {
            PartRowTransformer.KEY_BRAND: CarBrand.AUDI.value,
            PartRowTransformer.KEY_NO: 1,
            PartRowTransformer.KEY_MODEL: 'A1 1.6 TDI (Hatch Back)',
            PartRowTransformer.KEY_PART_CATEGORY: 'Extras',
            PartRowTransformer.KEY_PART_ID: 'G A52195A1',
            PartRowTransformer.KEY_PART_NAME_ENG: 'ENG.OIL',
            PartRowTransformer.KEY_PART_NAME_KOR: '엔진 오일',
            PartRowTransformer.KEY_PART_DETAIL: '-',
            PartRowTransformer.KEY_PART_PRICE: '25800'
        })

        
if __name__ == '__main__':
    unittest.main()
```

이렇게 하여 객체지향 설계와 TDD를 활용한 리펙토링을 마무리했습니다.

마지막으로 args를 받아 작업을 처리하도록 설정했습니다.

```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import os

from part_export import config
from part_export.parts_export import PartsExport
from car_brand import CarBrand


def print_usage_and_exit():
    print(f'usage: {sys.argv[0]} brand-name csv-file-path')
    exit(-1)


def validate_args():
    if len(args) != 3:
        print_usage_and_exit()

    brand_name = sys.argv[1]
    if not CarBrand(brand_name):
        print(f'{brand_name} is unsupported brand!')
        exit(-1)

    csv_file_path = args[2]
    if not os.path.isfile(csv_file_path):
        print(f'There is no csv file on {csv_file_path}')
        exit(-1)


args = sys.argv
validate_args()

car_brand = CarBrand(sys.argv[1])
csv_file_path = sys.argv[2]

PartsExport(config, car_brand, csv_file_path).export()
```

TDD를 활용한 개발이 처음이거나와 테스트 코드의 중요성을 알 수 있었던 기회였습니다.  
해당 리펙토링을 같이 진행해주신 계현님 감사합니다.