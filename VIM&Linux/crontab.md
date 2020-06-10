# crontab

### 잠깐! cron, crontab, cronjob의 차이는?

`cron`은 도구의 이름이고 `crontab`은 일반적으로 `cron`이 실행할 작업을 나열하는 파일이며 그 작업은 깜짝 놀랍게도 `cronjob`입니다.



추천해주는 crontab 만들어주는 사이트 - https://crontab.guru/every-1-minute , https://crontab-generator.org/

crontab 유틸 UI - https://www.ostechnix.com/how-to-easily-and-safely-manage-cron-jobs-in-linux/



# crontab은 `특정 시간에 특정 작업을 해야한다.`

*crontab은 어떤 프로세스가 아니라 리눅스에서 제공하는 유틸리티 중 하나이다.*

왜 이런 말을 하는가 하면, 생각컨데, 뭔가 여러개를 띄우려면 여러 파일을 띄우는줄 알았지만 그것이 아니였다-

## 기본

> crontab -e
>
> \# Edit

> crontab -l
>
> \# Display

> crontab -r
>
> \# Remove


## 주기 설정

> \*					\*						\*					\*				\* 
>
> 분(0-59)　　시간(0-23)　　일(1-31)　　월(1-12)　　　요일(0-7)

## 주석
> \#  잘못된 예
> \* \* \* \* \*
>
> /bin/scala> 

> \#  잘된 예
> \* \* \* \* \* /bin/scala



## Cron Logging

> \* \* \* \* \* /home/script/test.sh > /home/script/test.sh.log 2>&1
>
>  2>&1의 의미는 에러도 출력해달라~
>
> \* \* \* \* \* /home/script/test.sh >> /home/script/test.sh.log 2>&1
>
> 이렇게 하면 로그를 계속 누적 되는 것.
>
> \* \* \* \* \* /home/script/test.sh > /dev/null 2>&1
>
> 로그가 필요하지 않을 경우 이렇게!



## crontab backup

> crontab -l > /home/bak/crontab_bak.txt
>
> 이것도 자동화 
>
> 50 23 * * * crontab -l > /home/bak/crontab_bak.txt