# MacOS에서 SSH 포트 포워딩 또는 Alias 설정하기.

`vim .ssh/config`

```shell
Host bigdata
        HostName [ip]
        User root
        Port 4522
        LocalForward 7180 localhost:7180

Host ClouderaNode1
        HostName [ip]
        User root
        Port 4522
        LocalForward 7180 localhost:7180

Host ClouderaNode2
        HostName [ip]
        User root
        Port 4522
        LocalForward 7180 localhost:7180

Host ClouderaNode3
        HostName [ip]
        User root
        Port 4522
        LocalForward 7180 localhost:7180

Host TestMasterNode
        HostName [ip]
        User root
        LocalForward 7180 localhost:7180
        LocalForward 9200 localhost:9200
        LocalForward 8080 localhost:8080
        LocalForward 5601 localhost:5601
        
Host TestMasterNodeLen
        HostName [ip]
        User len

Host TestClouderaNode1
        HostName [ip]
        User root
        LocalForward 7180 localhost:7180
        LocalForward 9200 localhost:9200
        LocalForward 8080 localhost:8080
        LocalForward 5601 localhost:5601
```

