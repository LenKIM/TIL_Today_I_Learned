참고 - http://webframeworks.kr/getstarted/backbonejs/

Backbone.js는 Model-Collection-View 3가지 요소를 구성하여 웹애플리케이션을 구현하며, Model과 View는 Built-in 이벤트 또는 Custom 이벤트 기반으로 핸들링되어 상태변화에 따라 능동적으로 작동하도록 구현할 수 있습니다. 그리고 Backbone.js는 View에 대해 어떠한 컴포넌트나 스타일도 강요하지 않습니다. 

# 구성

*Model, View, Router, Collections에 대한 개념 정리*



**모델이란**

객체 단위의 Data 객체가 되며, 어떻게 활용하느냐에 따라 Collection 없이 단독으로 불러와서 사용할 수도 있습니다. 설령 어떠한 개인의 정보를 Model화 한다면 다음처럼 정리할 수 있습니다.



```
{
    name: "Cavin Jo",
    age: 32,
    job: "S/W engineer",
    color: "yellow",
    height: 175
}
```



**뷰란**

View는 Backbone.js 애플리케이션의 시작이자 끝이라고 볼 수 있습니다. 애플리케이션을 시작할 때 new 생성자를 통해 Backbone.View 객체 인스턴스를 만들어내며, 데이터 변화에 대한 표현도 Backbone.View 객체를 통해 드러냅니다. 그리고 View는 어떻게 구성하느냐에 따라 정말 다양하게 표현할 수 있는데, N개의 아이템을 지니고 있는 List단위의 View를 만들고 그 안의 각 아이템에 대해 Child 단위의 새로운 View를 만들 수 있으며, 원하면 하나의 Element에 대해 여러개의 View로 만들어 관리할 수도 있습니다.



이렇게 DOM Element를 Backbone.View 인스턴스로 감싸는 이점은 분명합니다. 그 중에서도 가장 큰 것은 Backbone.Model과 연동을 통해 Model의 변화에 대해 View의 변화를 자동적으로 적용시킬 있다는 점입니다. 하지만 Model을 연동시키지 않더라도 Backbone.View가 주는 편리한 Event, Method 관리 방식을 적용시킬 수 있는 것도 큰 장점입니다.







**라우터란**



**컬렉션이란**



**이벤트란**

Backbone.js에서는 Model과 Collection에 다양한 Built-in 이벤트를 제공하고 있습니다. 많이 쓰이는 것들을 정리해 보면 다음과 같습니다.

- *add* : Model이 새로 생성되었을 때 발생합니다. Model 자신과 부모 Collection에 전달됩니다.
- *remove* : Model이 부모 Collection에서 제외되었을 때 발생합니다.
- *reset* : Collection의 전체데이터가 리셋되었을 때 발생합니다.
- *change* : Model의 속성 일부가 바뀌었을 때 발생합니다.
- *change:attribute* : 특정 속성이 바뀌었을 때 발생하는 이벤트입니다. 설령 `model.on("change:title", callback)` 이라고 바인드 시켜놓았을 경우에는, 해당 Model의 `title` 속성이 바뀌었을 때만 callback이 실행될 것입니다.
- *destroy* : Model이 `destroy` 되어 DELETE 되었을 때 발생합니다.
- *all* : Model 또는 Collection에 발생하는 모든 종류의 이벤트에 대응합니다.

Backbone.Event는 사용하기가 매우 간단합니다. 위의 `change:attribute`에서 보았던 것처럼, Model이나 Collection에 `on` 메소드를 이용해서 손쉽게 바인딩할 수 있으며 원하는 경우 `off`로 unbind할 수도 있습니다. 그리고 Built-in 이벤트가 아닌 자신만의 이벤트를 만들어 사용하기도 쉽습니다. 특별한 사전작업 없이 다음과 같이 직접 만든 이벤트명을 바인드를 시켜두고

```text
model.on("customEvent", callback)
```

필요할 때마다 해당 Model에 다음처럼 이벤트를 호출하면 끝입니다.

```text
model.trigger("customEvent")
```

