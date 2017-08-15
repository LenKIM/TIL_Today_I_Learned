JSX란?

React.js는 일반 javascript문법이 아닌 JSX문법을 사용하여 UI를 템플릿화

JSX를 사용하는 것이 필수는 아니지만 이를 사용하면 다음과 같은 장점이 있다.
  -  JSX는 컴파일링 되면서 최적화 되므로, 빠르다.
  - Type-safe(어떠한 연산도 정의되지 않은 결과를 내놓지 않는 것, 즉 예측 불가능한 결과를 나타내지 않는 것)하여 컴파일링 과정에서 에러를 감지
  - HTML에 익숙하다면, JSX를 사용하여 더 쉽고 빠르게 템플릿을 작성 할 수 있다,

1. JSX 사용.
HTML과 유사하게 생김
작업 환경을 설정 할 떄도 App.js에서 JSX가 사용되었다.

사용 할 때
![스크린샷 2017-06-22 오후 2.08.18](http://i.imgur.com/y2CLrOG.png)

사용 안할 때
![스크린샷 2017-06-22 오후 2.08.25](http://i.imgur.com/V24aRMR.png)

2. Nested Elements

컴포넌트에서 여러 Element 를 렌더링 해야 할 때, 그 element들을 필수적으로 container element 안에 포함시켜줘야됩니다.

그러므로, 꼭 <div>로 만들어서 동작시켜야 한다.

3. Javascript Expression

```Javascript
import React from 'react';
//
class App extends React.Component {
    //* 파일 및 컴포넌트의 첫 문자를 대문자로 하는건 React의 naming convention 입니다.
    render() {
        let text = "Welcome to the buxi world"
        return (
            <div>
                <h1>Hello Len World</h1>
                <h2>Hello Len {text}    </h2>
            </div>
        );
    }
}

export default App;
//module.export = App 과 동일
```

`{this.sayHey}` 를 통해 버튼이 클릭되면 해당 메소드가 실행되게 할 수 있습니다.  () 가 뒤에 안붙어있다는점을 주의해주세요. 만약에 () 가 붙으면 페이지가 로드 될때도 실행되고, 클릭할때도 실행됩니다.

If-Else문 사용 불가
JSX안에서 사용되는 Javascript표현에는 If-Elser가 불가함.

대안으로 ternary `(condition ? true : false)` 표현을 사용함.

4. Inline Style
React의 Inline Style에서는, String 형식이 사용되지 않고 Key가 camelCase인 Object가 사용됩니다.

```Javascript
import React from 'react';
//
class App extends React.Component {

    //* 파일 및 컴포넌트의 첫 문자를 대문자로 하는건 React의 naming convention 입니다.
    render() {
        let text = "Welcome to the buxi world";

        let pStyle = {
            color: 'apua',
            backgroundColor: 'black'
        }
        return (
            <div>
                <h1>Hello Len World</h1>
                <h2>Hello Len {text}    </h2>
                <button onClick={this.sayHey}>Click me</button>
                <p style={pStyle}>{1 == 1 ? 'True' : 'False'}</p>
            </div>
        );
    }

    sayHey() {
        alert("hey");
    }


}


export default App;
//module.export = App 과 동일
```
5. Naming Convention

모든 React Component 은 첫 문자가 대문자인 CamelCase 로 작성됩니다.
