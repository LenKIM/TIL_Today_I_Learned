# Chapter 6 객체

 자바스크립트에서는 배열이라는 기본자료형이 없음....
 그저 object만 있을뿐,

 그렇군, 배열이 객체라고 불리는구나.

## 6.1 객체 개요

    <script>
        //변수를 선언합니다.
        var product = {
          제품명: '7D 건조 망고',
          유형: '당절임',
          성분: '망고, 설탕, 메타중,지차',
          원산지: '필리핀'
        };
    </script>

  배열은 객체를 기반으로 만들어져서 굉장히 유사함.
  다른점이 있다면 배열은 요소에 접근할때, 인텍스를 사용하지만,
  객체는 키를 사용합니다.

  ex)
  product['제품병']
  product['유형']
  product['성분']
  product['원산지']

  이런식으로 접근하는 방법과
  product.제품명
  product.유형
  product.성분
  product.원산지

의 방식이 있음. 아래의 방법이 더 많이 사용되된다.

## 6.2 속성과 메서드

 **배열 내부에 있는 값을 요소(element)라고 부름,
 반면 객체 내부에 있는 값을 속성(property)라고 부름.**

객체의 속성이 가질 수 있는 자료형.
     var object = {
       number: 273,
       string: 'RintLanTa',
       boolean: true.
       array: [52, 273, 103, 32],
       method: function(){

       }
       //얘를 메소드라고함.
     };

 메소드 내에서 자기 자신이 가진속성을 출력하고 싶을 때는
 this키워드 사용

    <script>
    //변수를 선언합니다.
    var person = {
      name: '윤인성',
      eat: function (food) {
      alert(this.name + '이' + food + '을/를 먹습니다.');
      }
      };

      //메소드를 호출합니다.
      person.eat('밥');
    </script>

## 6.3 객체와 반복문
  배열은 단순 for반복문과 for in반복문으로 요소에 쉽게 접근할 수 있다.
  하지만 객체는 단순 for반복문으로 객체의 속성을 살펴보는것은 불가능.

    <script>
     //변수를 선언합니다.
     var product = {
       name: 'Microsoft Visual Studio 2012 Ulti',
       price: '15,000,000원',
       language:'한국어',
       supportOS:'Win32',
       subscription:true
     };

     //출력합니다.
     var output = '';
     for(var key in product) {
       output += '*' + key + ': ' + product[key] + '/n';
     }
     alert(output);
     </script>

네가 생각하는 예상 결과는 무엇일까?
바로 그것!!

## 6.4 객체 관련 키워드

in키워드와 with키워드 공부해보면,

    <script>
      //변수를 선언
      var student = {
        이름: '연하진',
        국어: 92, 수학: 98,
        영어: 96, 과학: 98
      };
    </script>

 **6.4.1 in키워드**
 in키워드를 for키워드와 별도로 사용하면 해당 키가 객체 안에 있는지 확인 가능하다.

 위 코드에서 아래를 추가한다.

     output += "'이름' in student " + ('이름' in student) + '\n';
     output += "'성별' in student " + ('이름' in student);

이렇게 하면 나오는 답이

    '이름' in student true
    '성별' in student false

이런식으로 나옴. 이는 위에 말한거 처럼 해당키가 존재하는가 존재하지않는가에 대한 확인.

 **6.4.2 with키워드**
 with키워드는 복잡하게 사용해야 하는 코드를 짫게 줄여주는 키워드
객체의 속성을 출력할 때 식별자 student를 여러번 사용하니 코드가 복잡한데, 이를 해결해줌.

 var output = '';
 output += '이름: ' + student.이름 + '\n';
 output += '국어: ' + student.국어 + '\n';
 output += '수학: ' + student.수학 + '\n';
 output += '영어: ' + student.영어 + '\n';
 output += '과학: ' + student.과학 + '\n';

output += '총점: ' + (student.국어 + student.수학 + student.영어 + student.과학)

이를 만약에 with를 사용하면

    var output = '';
    with(student) {
      output += '이름: ' + 이름 + '\n';
      output += '국어: ' + 국어 + '\n';
      output += '수학: ' + 수학 + '\n';
      output += '영어: ' + 영어 + '\n';
      output += '과학: ' + 과학 + '\n';
    }

이런식으로 사용한다.
***그러나, 여기서 주의사항 with를 사용시, 키워드충돌이 있으니 변수를 키워드로는 사용하지 않아야한다!***

## 6.5 객체의 속성 추가와 제거

 처음 객체를 생성하는 시점 이후에 속성을 추가하거나 제거하는 것을 "동적으로 속성을 추가한다"또는 "동적으로 속성을 제거한다"라고 표현합니다. 여기서 객체의 속성을 동적으로 추가&제거하는 방법을 봅시다!

**6.5.1 속성 추가**

    빈 객체를 생성하면
    <script>
      //변수를 선언
      var student = {};
    </script>

    다음 동적으로 추가.

    <script>
      //변수를 선언
      var student = {};

      //객체에 속성을 추가합니다.
      student.이름 = '윤인성';
      student.취미 = '악기';
      student.특기 = '프로그래밍';
      student.장래희망 = '생명공학자';
    </script>

    다음은 동적으로 메소드 추가

    <script>
      //변수를 선언
      var student = {};

      //객체에 속성을 추가합니다.
      student.이름 = '윤인성';
      student.취미 = '악기';
      student.특기 = '프로그래밍';
      student.장래희망 = '생명공학자';

      //toString()메소드를 만듭니다.
      student.toString = function() {
        var output = '';
        for(var key in this) {
          //toString()메소드는 출력하지 않게 합니다.
          if(key != 'toString') {
            output += key + '\t' + this[key] + '\n';
          }
        }
        return output;
      };

      //출력
      alert(student.toString());
    </script>

**6.5.2속성 제거**
동적으로 객체의 속성을 제거할 때는 delete키워드를 사용한다.
delete키워드 뒤에 삭제하고자 하는 객체의 속성을 입력합니다.
객체의 속성을 입력할떈ㄴ typeof키워드 처럼 괄호를 사용해도 되고 사용하지 않아도 됩니다.

    <script>
      //변수를 선언
      var student = {};

      //객체에 속성을 추가합니다.
      student.이름 = '윤인성';
      student.취미 = '악기';
      student.특기 = '프로그래밍';
      student.장래희망 = '생명공학자';

      //toString()메소드를 만듭니다.
      student.toString = function() {
        var output = '';
        for(var key in this) {
          //toString()메소드는 출력하지 않게 합니다.
          if(key != 'toString') {
            output += key + '\t' + this[key] + '\n';
          }
        }
        return output;
      };

      //출력
      alert(student.toString());

      //속성을 제거할때
    **delete(student.장래희망());**

    </script>

## 6.6 객체와 배열을 사용한 데이터 관리
 우선 학생 데이터부터 열나게 쓰면
현실에 존재하는 객체의 필요한 속성을 추출하는 작업을 '추상화'라고 부름

    <script>
      var student0 = {이름: '윤인성', 국어:87, 수학:98, 영어:88, 과학: 44 };
      var student1 = {이름: '김정규', 국어:21, 수학:12, 영어:22, 과학: 45 };
      var student2 = {이름: '구지연', 국어:24, 수학:55, 영어:55, 과학: 46 };
      var student3 = {이름: '나선주', 국어:22, 수학:90, 영어:90, 과학: 47 };
      var student4 = {이름: '윤아린', 국어:44, 수학:80, 영어:80, 과학: 48 };
      var student5 = {이름: '윤명월', 국어:95, 수학:70, 영어:70, 과학: 49 };
      var student6 = {이름: '김미화', 국어:64, 수학:60, 영어:60, 과학: 50 };
      var student7 = {이름: '김연화', 국어:88, 수학:50, 영어:50, 과학: 55 };
      var student8 = {이름: '박아현', 국어:97, 수학:40, 영어:40, 과학: 60 };
      var student9 = {이름: '서준서', 국어:47, 수학:30, 영어:30, 과학: 30 };
      </script>

이를 배열에 데이터로 추가하려면

    <script>
      //학생 정보 배열로 만듬
      var students = [];
      students.push({이름: '윤인성', 국어:87, 수학:98, 영어:88, 과학: 44 });
      -
      -
      -
      -
    </script>
  이런식으로 배열에 객체를 모두 집어넣으면 배열 students에 10개의 요소가 생김

메소드 추가를 해봅시다.

    <script>
      //학생 정보 배열을 만듭니다.
      /* 생략*/

      //모든 students 배열 내의 객체에 메서드를 추가합니다.
      for(var i in students) {
        //총점을 구하는 메소드를 추가합니다.
        students[i].getSum = function() {
          return this.국어 + this.수학 + this.영어+ this.과학;
        };

        //평균을 구하는 메소드는?
        students[i].getAverage = function() {
          return this.getSum() / 4;
        };
      }


      출력은 아래와 같이!

      var output = '이름\t총점\t평균\n'
      for (var i in students) {
        with(students[i]) {
          output += 이름 + '\t' + getSum() + '\t' + getAverage() + '\n';
        }
      }
      alert(output);

      </script>   

## 6.7 함수를 사용한 객체 생성
  객체를 하나씩 만들어 배열에 넣으면 서로 다른 형태의 객체를 배열 안에 넣을 수 있다는 장점이 있음

  <script>
    //학생 정보 배열로 만듬
    var students = [];
    students.push({이름: '윤인성', 국어:87, 수학:98, 영어:88, 과학: 44 });
    -
    -
    -
    -
  </script>

  개별적으로 만드는 이런 방식.. 이것이 객체의 특성을 정확히 반영할 수 있지만, 어렵고 시간이 오래걸림 객체를 하나하나 만드는 일은 초콜릿을 직접 하나씩 만드는것과 비슷하다.

  쉽게 만들기 위해서는 바로 틀을 이용하는것,

   조금 기나 작성해봅시다.

     function makeStudent(name, korean, math, english, science) {
       var willReturn = {
         //속성
         이름: name,
         국어: korean,
         수학: math,
         영어: english,
         과학: science,

         //메소드
         getSum: function() {
           return this.국어 + this.수학 + this.영어 + this.과학;
           },
         getAverage: function() {
           return this.getSum / 4;
         },

         toString: function() {
           return this.이름 + '\t' + this.getSum() + this.getAverage();
         }
       };
       return willReturn;
     }

이렇게 만들면 미친듯이 찍어 낼수 있다.

students.push(makeStudent('김정규',10,40,20,30));
이런식으로!!
