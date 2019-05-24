1. 특정 사이즈로 파일 분할하기

   ```Vim
    // 100MB 단위로 분할
   [root@tourWeb1 ~]~ split -b 100m test.csv 
   
   // 100Kb 단위로 분할
   [root@tourWeb1 ~]~ split -b 100k test.csv 
   ```

   

2. 라인 단위로 분할

   ```
   // 1000줄 단위로 분할
   [root@tourWeb1 ~]# split -l 1000 test.csv 
   
   // 10만줄 단위로 분할
   [root@tourWeb1 ~]# split -l 100000 test.csv 
   ```



큰 용량의 CSV 파일을 나눌때 편히 쓸수 있는 VIM

알수록 대단하다 ! :rocket:

