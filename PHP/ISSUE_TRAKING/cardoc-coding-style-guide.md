## PHP

- model, Service, variable, mehod 모두 camelCase로 작업할 것

- 위에서 언급한 것과 같이 camelCase로 작업해야 하니, api-cli를 통해 generator 할 때도 유의.

- total_segments() / segments() 등의 api parse 등의 메소드  
  [http://www.ciboard.co.kr/user_guide/kr/libraries/uri.html](http://www.ciboard.co.kr/user_guide/kr/libraries/uri.html) 활용

- isset() / empty() / isnull() 메소드 구분

- model의 경우  
  `$this->StatMonitorMemoModel->getByReqid($reqid, DB_MASTER);` 와 같이 코딩하여 모델에서 controller에게 넘겨주기.

- service / model layer에서 controller로 넘겨줄 때는 serviceResult / modelResult 로 넘겨줄 것  

  - service에서 controller로 넘겨받았을 경우.  
    controller에서 response를 해야 될 경우에는 `send_with_service_result_new` 를 활용  
    분명 저 함수에 많은 history가 담겨져 있을 거라 예상됨.  

  - model에서 controller로 넘겨받았을 경우.  
    `send_with_model_result($modelResult)`로 controller에게 보낼 것.

    

