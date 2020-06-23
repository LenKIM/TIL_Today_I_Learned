# History command



이전에 내가 무엇을 입력했는지 확인하고 재사용하는 싶을 때 사용



`$HISTSIZE` 가 크기를 결정하는데, Default 가 1000개.



저장되는 위치 파일은 `.bash_history` 



```bas
history
```

최근에 타이핑한 모든 명령어 출력



```bash
history 8
```

최근기준으로 n개의 명령어 출력

```bash
history | grep A
```

`A` 라는 문자열을 가진 최근 명령어 모두 출력



`history`에 날짜 정보 나타내는 방법은



```bash
vim /etc/profile

...

HISTTIMEFORMAT="%F %T -- "

```

```bash
source /etc/profile
```



**"!-n"** : 현재 명령행에서 n 개수를 뺀 행의 명령어를 가리킨다.

**"!?문자열[?]"** : "문자열"을 가리키는 가장최근의 명령어를 가리킨다.

**"^문자열 1^문자열 2"** : 최근 사용명령어 가운데 "문자열 1" 이 들어가는 명령어를 찾아서
"문자열 1"을 "문자열 2"로 치환하여 재실행한다.

