# hosts 파일 수정하기

hosts 파일는 DNS보다 먼저 호스트명을 IP로 변경해주는 파일이다. 주로 개발을 하거나, 특별한 이유로 호스트명으로 통신을 해야 하는 경우에 변경하여 사용할 있다.

```shell
$ sudo vi /etc/hosts
```

### 내용 편집해주기

```shell
  1 ##
  2 # Host Database
  3 #
  4 # localhost is used to configure the loopback interface
  5 # when the system is booting.  Do not change this entry.
  6 ##
  7 127.0.0.1   localhost
  8 255.255.255.255 broadcasthost
  9 ::1             localhost
 10 fe80::1%lo0 localhost
```

### 아이피 주소를 넣고 구분은 탭(tab)으로 해야 한다.

```shell
127.0.0.1    localhost
```

### DNS cache 를 갱신한다.

이제 hosts 파일이 수정하면 재부팅하거나, `dscacheutil -flushcache` 를 입력하면 바로 적용 하실 수 있다.

```shell
$ dscacheutil -flushcache
```

