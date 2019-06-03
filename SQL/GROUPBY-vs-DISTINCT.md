# GROUP BY vs DISTINCT 차이는?



https://stackoverflow.com/questions/164319/is-there-any-difference-between-group-by-and-distinct

https://sqlperformance.com/2018/03/t-sql-queries/distinct-group-by



```scala
val aacc = spark.sql("SELECT distinct user, date, api FROM abc2")
aacc.createOrReplaceTempView("aacc3")
val abc = spark.sql("SELECT date,count(api) FROM aacc3 GROUP BY api, date ORDER BY date")
    abc.show()

val userUseage = spark.sql("SELECT * FROM abc2 GROUP BY user, date, api")
userUseage.createOrReplaceTempView("orderedUseage")
val orderedUseage = spark.sql("SELECT date, count(api) FROM orderedUseage GROUP BY api, date ORDER BY date")
orderedUseage.show()

```



***위 2가지의 쿼리에 대해서 같은 결과가 나왔다?***



Access log에 유니크한 사용자들의 페이지 사용량을 만들기 위한 쿼리를 만들던 도중 오랜만에 만나 쿼리에 대해 고민하다가 맞닥뜨림.



역시나 스택오버플로우에 올라와 있다.

![](http://ww4.sinaimg.cn/large/006tNc79gy1g3nqi6u29oj30sk08tgnk.jpg)



![image-20190603105922196](http://ww3.sinaimg.cn/large/006tNc79gy1g3nqiz3civj30uf0cxmzz.jpg)

[http://sqlmag.com/database-performance-tuning/distinct-vs-group](http://sqlmag.com/database-performance-tuning/distinct-vs-group)



[http://blog.sqlauthority.com/2007/03/29/sql-server-difference-between-distinct-and-group-by-distinct-vs-group-by/](http://blog.sqlauthority.com/2007/03/29/sql-server-difference-between-distinct-and-group-by-distinct-vs-group-by/)



[http://asktom.oracle.com/pls/asktom/f?p=100:11:0::::P11_QUESTION_ID:32961403234212](http://asktom.oracle.com/pls/asktom/f?p=100:11:0::::P11_QUESTION_ID:32961403234212)



![image-20190603105951186](http://ww4.sinaimg.cn/large/006tNc79gy1g3nqjhpcdwj30sq06tjt0.jpg)



SQL 머신에서의 실행계획은 차이가 없다고 한다. 그러나 만약 서브쿼리를 사용할 경우에는 다르다고 한다.

그리고  DSL언어라는 점에서, 어떤 도메인의 함수를 사용하냐?에 따라 보는 이의 가독성이 달라질 것이라고 판단된다.

