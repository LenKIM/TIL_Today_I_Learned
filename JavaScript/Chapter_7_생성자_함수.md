# Chapter 7 생성자 함수
생성자 함수는 new키워드로 객체를 생성할 수 있는 함수를 의미합니다.
그전까지는 new 키워드를 사용하지 않았으므로 생성자 함수라 말할수 없었음

## 7.1 생성자 함수 개요
 다음 코드는 Student 생성자 함수를 만드는 코드

    <script>
      function Student() {

      }
    </script>

    이렇게 생성한 생성자 함수는 코드는 new키워드로 객체를 생성

    <script>
      function Student(){

      }

      var student = new Student();
    </script>

헐..이건 자바랑같음!!자바는
Student student = new Student();
이런식으로 선언하는데, 자바스크립트는 좀더 간결한 느낌.

**여기서 변수 규칙이 생성자 함수의 이름의 첫글자는 대문자!!**  

 생성자 함수라... 자바에서는 단축키이용해서 한번에 쓱해서 만들었으나 이번에는 조금더 기억에 남기위해 직접작성

     <script>
        function Student(name, korean, math, english, science) {
          this.이름 = name;
          this.국어 = korean;
          this.수학 = math;
          this.영어 = english;
          this.과학 = science;

          //메소드
          this.getSum = function(){
            return this.국어 + this.수학 + this.영어 + this.과학;
          };

          this.getAverage = function(){
            return this.getSum/4;
          };

          this.toString = function() {
            return this.이름 + '\t' + this.getSum() + '\t' + this.getAverage();
          };
        }

        var student = new Student('윤하린', 96,98,92,98);

        //만약에 배열에 넣는다면
        var students = [];
        students.push(new Students('윤하린', 96,98,92,98));
        students.push(new Students('윤하', 96,98,92,98));
        //요런방법이용하면 될듯?
      </script>

  자바와 객체생성과 비슷한 개념으로
  var student = new Student();
  하면 객체/인스턴스 = new 생성자함수. 요렇게!

***NOTE instanceof 키워드?***
  생성자 함수와 관련된 키워드입니다.
  해당 객체가 어떠한 생성자 함수로 생성됐는지 확인할 때 instanceof 키워드를 사용합니다.

  반환값은 불 자료형 !

## 7.2 프로토타입
생성자 함수는 일반 함수를 사용한 것과 차이가 없습니다. 그럼 도대체 생성자 함수를 사용하면 무엇이 좋을까?

만약 위에같은 생성자함수를 내가 1000번 호출하면 함수메소드
getSum / getAverage / toString 같은 경우도 1000번이 생성되는 일 발생하는 이는 쓸데없이 메모리를 잡아먹는다. 이러한 문제를 해결하기 위해서 자바스크립트는 프로토타입공간을 제공합니다.

**프로토타입은 생성자 함수로 생성된 객체가 공통으로 가지는 공간.**

프로토타입을 활용하여 위의 Student생성자 함수를 만들면.

    <script>
       function Student(name, korean, math, english, science) {
         this.이름 = name;
         this.국어 = korean;
         this.수학 = math;
         this.영어 = english;
         this.과학 = science;
        }
        Student.prototype.getSum = function() {
          return this.국어 + this.수학 + this.영어 + this.과학};
        Student.prototype.getAverage = function() {
          return this.getSum/4 };
        Student.prototype.getString = function() {
          return this.이름 + '\t' + this.getSum() + '\t' + this.getAverage() };
     </script>

 이렇게하면 메소드함수들은 하나의 객체로 생성 될 것이다.

## 7.3 new 키워드

생성자 함수로 생성할 때는 모두 new키워드를 사용해왔다. 왜 new일까?
new키워드를 사용하지 않으면 어떠한 일이 발생할까?

    <script>
      function Constructor(value){
        this.value = value;
      }

      var constructor = new Constructor("Hello");

      alert(constructor.value);
    </script>

이것과

    <script>
      function Constructor(value){
        this.value = value;
      }

      var constructor = Constructor("Hello");

      alert(constructor.value);
    </script>

new가 없는 것은 무슨 차이 일까?
결과는 동일하게 나온다. **그러나!!!!**

**이전에 언급한 것과 같이 this 키워드를 사용하면 window객체를 나타내는데, new키워드를 사용하지 않으면, 함수를 실행하는 동안 window객체에 속성을 추가된것으로 나타납니다. 하지만 new키워드로 함수를 호출하면 객체를 위한 공간을 만들고 this키워드가 해당 공간을 의미합니다.**

## 7.4 캡슐화
 세상에는 정말 다양한 사람이 있습니다. 이러한 모든 다양한 사람들에게 표준화된 정보를 제공하기 위해서는 캡슐화가 필요합니다.

    <script>
      //생성자 함수를 선언합니다.
      function Rectangle(width, height) {
        this.width = width;
        this.height = height;
      }
      Rectangle.prototype.getArea = function(){
        return this.width * this.height;
      };

      //변수 선언
      var rectangle = new Rectangle(5,7);

      //출력
      alert('AREA' + rectangle.getArea());
    </script>

만약에 이렇게 생성자 함수를 만들었다고 가정하면, 만약에

Objects.push(new Rectangle(-5,-19));
이런식으로 한다면 말도안되는 사각형이 배열에 넣어질것이고, 컴퓨터는 마치 아무것도 모른다는 눈빛으로 저장할 것이다.

이렇듯, 곳곳에 위험이 도사린다고 표현하고 싶다. 자, 그렇다면 어떻게 해야될까?

 다음을 확인해보자.

    function Rectangle(w,h){
      //변수 선언
      var width = w;
      var height = h;

      //메소드를 선언
      this.getWidth = function(){return width; };
      this.getHeight = function(){return height; };
      this.setWidth = function(w){
        if(w < 0){
          throw '길이는 음수 일 수 없습니다.';
        }else {
        width = w;
        }
      };
      this.setHeight = function(h){
        if(h < 0){
        height = h;
        } else {
          height = h;
        }
      };
    }
    Rectangle.prototype.getArea = function(){
      return this.getWidth() * this.getHeight();
    };

    //변수선언
    var rectangle = new Rectangle(5,7);
    rectangle.setWidth(-2);

    //이렇게 출력하면 무조건 에러가 발생함!!

이렇듯, 함수를 만들어서 사용자에게 보여주지않고 제약을 걸수 있게 만듭니다.

 **캡슐화는 만일의 상황을 대비해서 특정 속성이나 메소드를 사용자가 사용할 수 없게 숨겨놓는 것임을 기억하자**

## 7.5 상속
 상속은 기존의 생성자 함수나 객체를 기반으로 새로운 생성자 함수나 객체를 쉽게 만드는것을 뜻합니다. 기존의 객체를 기반으로 생성하므로 상속으로 새로 만들어지는 객체에는 기존 객체의 특성이 모두 남아있습니다.

 그럼 코드를 작성해봅시다!


  Square함수의 생성자 함수는 다음과 같습니다.

     <script>
      function Square(length) {
        this.width = length;
        this.height = length;
      }

      Square.prototype.getArea = function () {
        return this.getWidth() * this.getHeight();
      };
      </script>

---------
    <script>
     function Rectangle(w,h){
       //변수 선언
       var width = w;
       var height = h;

       //메소드를 선언
       this.getWidth = function(){return width; };
       this.getHeight = function(){return height; };
       this.setWidth = function(w){
         if(w < 0){
           throw '길이는 음수 일 수 없습니다.';
         }else {
         width = w;
         }
       };
       this.setHeight = function(h){
         if(h < 0){
         height = h;
         } else {
           height = h;
         }
       };
     }

     Rectangle.prototype.getArea = function(){
       return this.getWidth() * this.getHeight();
     };
    </script>

    <script>
      //생성자 함수를 선언
      function Square(length){
        this.base = Rectangle;
        this.base(length, length);
      }

      Square.prototype = Rectangle.prototype;
      Square.prototype.constructor = Square;
    </script>

 여기 우리가 선언한 Rectangle()이 있습니다. 이를 상속받아서 Square 함수를 만들어 봅시다. Sqaure안에 어떻게 구성되어있는지 잘 생각!!

    <script>
      //생성자 함수를 선언
      function Square(length){
        this.base = Rectangle;
        this.base(length, length);
      }

      Square.prototype = Rectangle.prototype;
      Square.prototype.constructor = Square;
    </script>

**이렇게하면 Square에 width와 height의 캡슐화는 상속되었다라고 표현한다. 상속의 확인 방법은 instanceof를 사용하자**

 다시한번, 자식이 부모의 속성과, 메소드를 물려받는 것을 **상속** 이라고한다!

 
