# MySQL SubQuery 사용법

Node.js에서는 비동기 동작이기 때문에 생각해야되는 문제들이 있다. 그중 DB값들을 계산한다거나, DB의 pool을 열고 닫기를 계속해서 반복할 때 많은 문제들이 발생한다.

 아래 SubQuery를 활용한 이유도 위 이유 중 하나이다. DB 안에 여러개의 계산되어야 될 값들이 존재하는데, 이를 순차적으로 하나하나 계산하려고 하니, Node.js 안에서 해결하려고 하니 비동기적 방식과 DB를 여러번 가져오는 행위에서 많은 문제점을 일으켰다.

아래와 같이 SubQuery를 활용하니, DB안에서 계산을 한 뒤 보여주기 때문에 굉장히 효율성이 높았다!

 아래 코드를 이해시키기 위해 모델링 구조를 첨부합니다.

 ![스크린샷 2017-06-01 오후 7.28.11](http://i.imgur.com/5xOMhHI.png)

필요한 기능이, 얼마만큼의 이율 이득을 보았는가? 대한 benefit알고 싶었다. 그래서 아래와 같이 작성하였다.

`모든 요청id에 대해 대출금액*(제시된 평균금리 - 내가고른최저금리) => benefit 으로 출력하게 만들자.`
```sql
SELECT
      request.loan_amount * (
        (SELECT AVG(es.interest_rate)
      FROM estimate es, request rq
      WHERE es.request_id = rq.request_id
        AND rq.request_id = request.request_id) -
        (SELECT es.interest_rate
        FROM estimate es, request rq
        WHERE es.estimate_id = rq.selected_estimate_id
        AND rq.request_id = request.request_id)) AS benefit,
        estimate.*,
        request.*,
        review.*
   FROM estimate, request, review
    WHERE estimate.estimate_id = request.selected_estimate_id
     AND request.request_id = review.request_i;
```

포인트는 AS 그러니까 앨리어스를 활용하는 것이였다. 이를 활용하는 방법이 키 이다!
