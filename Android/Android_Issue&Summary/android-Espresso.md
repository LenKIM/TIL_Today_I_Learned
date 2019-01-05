# Android Espresso

- UI 테스트를 위한 라이브러리.
- OnView(Matcher\<View\>)  // ViewMatcher => ViewInteraction
  -> .Perform(ViewAction) //ViewAction
- onView(Matcher\<View>)
  .check(ViewAssertion) // Viewasserstion



### ViewMatcher

뷰에 대한 최소한의 정보만 갖고 View에 접근하기 위한 객체

Text나 이미지 리소스가 어떤것이 바인딩 되어있는지 체크

그러나

- View가 Null이면?
- Test에 NPE 처리를?

**"ViewMatcher는 뷰에 접근하는 과정에서의 오동작을 에러가 아닌 테스트실패로 간주할 수 있도록 도와준다."**

### ViewInteraction

UI 테스트의 시작점

접근한 View 정보를 담고 있음

View의 동작을 제어 - 클릭, 텍스트 입력 등

View의 정보를 검증 기능 제공 : 화면에 보이는지

### ViewAction

뷰에 클릭 또는 텍스트 입력등 다양한 동작을 제어함

동작이 완료될 때까지 대기하도록 함



![](https://ws1.sinaimg.cn/large/006tNc79gy1fyvj7okgctj313z0u0kjl.jpg) 클릭이라는 로직이 다 끝날때까지 유후상태로 됨.

Main Looper는 Idel 상태일까요?

(... 이하 코드 설명)



# 구글의 팁!

ATLS?

뻔하지만 고개를 끄덕이는

1. **복사 붙여넣기 하지마라-**
   : 테스트 코드는 특성상 생명주기가 짫다.

![](https://ws2.sinaimg.cn/large/006tNc79gy1fyvjc9n1s7j315q0qa4iv.jpg)

Robo이라는 개념이 있다-

![](https://ws1.sinaimg.cn/large/006tNc79gy1fyvjdncwsxj31680u01kx.jpg)

로봇을 이용하면 반복적인 작업을 쉽게 풀 수 있음.

2. **가능한 제공되는 Matcher를 사용해라.**

   ViewMatcher가 생각보다 많다.

![](https://ws4.sinaimg.cn/large/006tNc79gy1fyvjga94rjj312m0u07wh.jpg)

3. **CountingIdlingResource 를 사용해라.**
   - increment()
   - decrement() 가 있음.

![](https://ws2.sinaimg.cn/large/006tNc79gy1fyvjir4wbbj316g0puqqh.jpg)

4. **뷰의 정보가 아닌 동작에 집중해라.**
5. **Large Test보단 Small Test를 많이 써라**  
   Large와 Small의 차이점은?  
   Docs안에 있다.  
   LargeTest는 뭔가- 시나리오 테스트 같은 느낌
   SmallTest는 잘게잘게 쪼갠 부분을 말한다.
6. **원하는 화면을 바로 호출해라.**  
   바로 내가 원하는 액티비티를 호출할 수 있는 기능을 제공함. ActivityTest 테스트코드가 동작할 때 함께 동작함.

![](https://ws2.sinaimg.cn/large/006tNc79gy1fyvjtyf706j31a70u0hdt.jpg)

7. **통제된 환경에서만 테스트 해라.**
   Mocking 라이브러리를 잘 쓰자.
8. **외부 앱 실행은 Intent를 획득하라.**

![](https://ws4.sinaimg.cn/large/006tNc79gy1fyvjxu50qsj31ls0nstya.jpg)

7. **애니메이션을 핸들링 하기**  
   이따금 커스텀 애니메이션은 과도하게 Handler를 사용하기 때문에 idle상태를 유지하기 어렵게 만든다.
8. **UI테스트에 실패했을 때...**
   그럴때는 로그를 볼 텐데, 그럼 엄청 복잡하게 나올 것
9. **느린기기 테스트할때는 Accessiblitiy -> Touch and hold delay long으로 전환- Animation 비활성화**
10. **Accessibility Test시 주의사항** -> AccessiblityValidator.enable()



![](https://ws3.sinaimg.cn/large/006tNc79gy1fyvk70t7i7j31eh0u04qp.jpg)

마지막 슬라이드에서 보여지는것은 구글에서 테스트 코드를 이렇게 활용한다는 것을 보여준다.





//TODO QuizApplication에 테스트 코드 도입해보기.

