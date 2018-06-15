


그럼 다음과같은 상황을 예시로 들어보자.

```php
log_monitor_sms 라는 테이블을 생성했다. (데브서버에만 배포되엉 ㅣㅆ는데 마스터에도?)
(물론 스키마도 같이 생성을 했겠죠?)

나는 해당 데이터베이스의 테이블에 맞쳐 모델을 만들어야만 할텐데, 수작업으로 만들 것인가? 여기서 개발자적인 면모가 들어있다.

자동적으로 생성시켜주는 것, 다시말해 데이터베이스의 테이블에 맞게 모델을 만들어주는 것이 API_CLI이다.

해당 디렉토리로 이동하여
./api_cli.py
./api_cli.py create model Log_monitor_sms_to_user log_monitor_sms_to_user 같이 작성한다.
그럼 아래와 같은 코드가 생성된다.

<?php

/**
 * Created by Cardoc CI_Model Generator
 * User: lenkim
 * Date: 2018-05-30 18:19:42.372343
 */

class Log_monitor_smsModel extends MY_Model
{
    const TABLE_NAME = 'log_monitor_sms';
    ...
    const KEY_FIELD = self::FIELD_ID;

    function __construct()
    {
        parent::__construct();

        $this->set_table_specs([
            self::TABLE_SPECS_TABLE_NAME => self::TABLE_NAME,
            self::TABLE_SPECS_KEY_FIELD => self::KEY_FIELD,
            self::TABLE_SPECS_IS_PK_AI => true
        ]);
    }
}
```

사실 자동으로 생성하는것 만으로도 좋은 기능이지만, 더 나아가 아키텍처를 설계할 수 있는 기능을 제공한다.

```php
$this->set_table_specs([
            self::TABLE_SPECS_TABLE_NAME => self::TABLE_NAME,
            self::TABLE_SPECS_KEY_FIELD => self::KEY_FIELD,
            self::TABLE_SPECS_IS_PK_AI => true
        ]);
```

해당 부분을 주의깊게 살펴보자.

`set_table_spaces` 는 `/application/core/Basic_DAO_Func.php` 안에 선언되어 있는데, 공통의 메소드를 Func을 활용할수 있게 해줌으로써 모델에서 불필요한 `Func` 을 만들 필요가 없어진다!



아직 체감이 안된다면(무슨말인지 모른다면) 다음 코드를 살펴보자.

```php
$this->load->model('v2/Log_monitor_sms');
            $this->Log_monitor_pushModel->create([
                Log_monitor_pushModel::FIELD_REGDTTM => $this->date_utils->now(),
                ....
                Log_monitor_pushModel::FIELD_PAYLOAD => $payload
            ]);
```

`create`는 `/application/core/Basic_DAO_Func.php` 선언되어 있다. 즉, 모델.php에 create를 선언할 필요가 없어진다는 이야기다.

반대로 `model.php`에 선언되지 않고도 활용될 수 있다.

`$estid = $this->db->where(['reqid' => $reqid, 'shopid' => $shop['shopid']])->get('dt_estimation')->row()->estid;`

를

`$this->load->model('v2/Estimation_model');`

`$estid = $this->Estimation_model->get_estid_by($reqid, $shop['shopid']);`

와 같이 변경이 가능해진다.



끝!
