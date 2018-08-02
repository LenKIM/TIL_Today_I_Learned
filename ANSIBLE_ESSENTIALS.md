![](https://ws1.sinaimg.cn/large/006tNc79gy1fqd84g1eecj31kw0vo1ky.jpg)  
![](https://ws4.sinaimg.cn/large/006tNc79gy1fqd846kksrj31kw0vc1ky.jpg)  

![](https://ws4.sinaimg.cn/large/006tNc79gy1fqd852otdvj31kw0umx6p.jpg)

 



## 어떻게 Ansible 동작되는가?



**MODULES**  
MODULES ARE "TOOLS IN THE TOOLKIT"  
Python, Powershell, or any language Extend Ansible simplicity to entire stack  

**INVENTORY**  

Inventory is a collection of hosts(nodes) against which Ansible can work with  

- Hosts
- Inventory-specific data
- Groups sources
- Static or dynamic

![](https://ws1.sinaimg.cn/large/006tNc79gy1fqd8cdbke4j31bk0wok66.jpg)



## AD-HOC COMMANDS ?

```sh
# Check all my inventroy hosts are ready to be 
# managed by Ansible
$ ansible all -m ping

# run the uptime command on all hosts in the web group
$ ansible web -m command -a "uptime"
# collect and display the discovered for the localhost
$ ansible localhost -m setup
```

처음 연결이 되어 있는지 확인하기 위해서 사용한다.



## HANDLER TASKS

Handlers are special tasks that run at the end of a play if notified by another task.

If a configuration file gets changed notify a service restart task it needs to run

## PLAYS & PLAYBOOKS

Plays are ordered sets of tasks to execute against host selections from your inventory.

A playbook is a file containing one or more plays



![](https://ws1.sinaimg.cn/large/006tNc79gy1fqd99r579oj31g60uenh5.jpg)



name 으로 시작한다. 무슨일이 일어나는지 작성하는 것이 중요

하위레벨의 tasks에도 이름을 선언한다.

Hosts 타켓팅하는 그룹을 작성

vars : 

remote_user: root





도커를 하지 않은 이유는 잘 쓰지 않아서.