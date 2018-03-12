## StringTokenizer와 String.split() 의 차이는?

출처 : [https://okky.kr/article/32363](https://okky.kr/article/32363)

 최근 알고리즘을 많이 풀면서 StringTokenizer를 많이 활용하게 되는데, 학부생 때 전공 시험을 볼때 말고는 split()를 써본 경험이 없다. 간단히 2개의 자바독스를 살펴봅시다.

두 개의 메소드 모두 하는 역할은 같다. 문자열을 분해할 때 사용하는데, 버전이 다르다.

```java
**
 * The string tokenizer class allows an application to break a
 * string into tokens. The tokenization method is much simpler than
 * the one used by the <code>StreamTokenizer</code> class. The
 * <code>StringTokenizer</code> methods do not distinguish among
 * identifiers, numbers, and quoted strings, nor do they recognize
 * and skip comments.
**
```

자바 문서를 인용하면 StringTokenizer가 있기전에 StreamTokenizer가 있어서 보다.(이 부분은 몰랐다)

StringTokenizer는 identifiers, numbers, and quoted strings, nor do they recognize

and skip comments 사이에 있는 것들을 식별하지 못한다고 한다.

```
/**
     * Splits this string around matches of the given <a
     * href="../util/regex/Pattern.html#sum">regular expression</a>.
     *
     * <p> This method works as if by invoking the two-argument {@link
     * #split(String, int) split} method with the given expression and a limit
     * argument of zero.  Trailing empty strings are therefore not included in
     * the resulting array.
     *
     * <p> The string {@code "boo:and:foo"}, for example, yields the following
     * results with these expressions:
     *
     * <blockquote><table cellpadding=1 cellspacing=0 summary="Split examples showing regex and result">
     * <tr>
     *  <th>Regex</th>
     *  <th>Result</th>
     * </tr>
     * <tr><td align=center>:</td>
     *     <td>{@code { "boo", "and", "foo" }}</td></tr>
     * <tr><td align=center>o</td>
     *     <td>{@code { "b", "", ":and:f" }}</td></tr>
     * </table></blockquote>
     *
     *
     * @param  regex
     *         the delimiting regular expression
     *
     * @return  the array of strings computed by splitting this string
     *          around matches of the given regular expression
     *
     * @throws  PatternSyntaxException
     *          if the regular expression's syntax is invalid
     *
     * @see java.util.regex.Pattern
     *
     * @since 1.4
     * @spec JSR-51
     */
```



온통 영어로 써져있어 한번에 이해가 되지 않을 수도 있다.(제가 그렇습니다...) 그러나 하나씩 곱씹어보면서 읽어보면 차이를 발견할 수 있습니다. 



이들 둘은 "문자열에서 특정 구분자를 기준으로 문자열을 분해 한다"는 기본 기능은 같지만 그 결과는 "분해 할 문자열이 어떻게 구성이 되어 있느냐"에 따라서 서로 다른 결과값을 도출합니다.



예를 살펴보면 다음과 같이 가정을 해봅시다.

- 분해 할 문자열은 "아이디, 이름, 전자우편주소, 휴대전화"로 구성 된다.
- "아이디, 이름"이외의 항목은 있을 수도 있고 그렇지 않을 수도 있다.
- 각 항목을 구분하는 구분자는 ","로 한다.

1. 먼저 각 항목이 모두 존재 하는 경우를 살펴 보면, 이 경우라면 다음과 같은 형태가 될 것입니다.

   - neoburi,inkuk,neoburi@neoburi.com,019-366-5815

     이 경우는 다음 같이 분해를 할 수 있을 것입니다.

     - String str = "neoburi,inkuk, neoburi@neoburi.com,019-366-5815"

     - String[] values = str.split(",");

     - 또는,

     - StringTokenizer values = new StringTokenizer( str, "," );

- 이 때에는 String.split(String regex)이나 StringTokenizer의 결과 값은 같게 나옵니다.



그런데 문제는 이렇게 모든 항목이 존재하지 않을 경우가 있을 때 입니다.

2. 일부 항목만으로 문자열이 구성 된 경우를 살펴보겠습니다.
   ​

    예를 든다면 다음과 같은 값을 가질 때겠지요.

   - "아이디,이름,,전화번호" 일 경우
   - "아이디,이름,전자우편," 일 경우
   - 또는 "아이디,이름,," 일 경우
     ​

1) "아이디,이름,,전화번호" 일 경우를 살펴 보겠습니다.

- 문자열은 다음과 같이 구성이 될 것입니다.

-  

- String str = "neoburi,inkuk,,019-366-5815";

-  

- - String[] values = str.split(",");을 사용 할 경우 해보면 결과는 아래와 같습니다.

    for( int x = 0; x < values.length; x++ ){

    ​    System.out.println( "문자(열) " + (x+1) + " : " + values[x] );

    }

     

    결과 :

    - 문자(열) 1 : neoburi


    - 문자(열) 2 : inkuk


    - 문자(열) 3 : 


    - 문자(열) 4 : 019-366-5815

    -  

  - StringTokenizer tokens = new StringTokenizer( str, "," );를 사용 할 경우


- - for( int x = 1; tokens.hasMoreElements(); x++ ){

  - ​    System.out.println( "문자(열) " + x + " : " + tokens.nextToken() );

  - }

  -  

  - 결과 :

  - - 문자(열) 1 : neoburi


  - - 문자(열) 2 : inkuk


  - - 문자(열) 3 : 019-366-5815

결과와 같이 split(String regex)을 이용한 경우에는 비록 값이 존재하지 않더라도 해당 데이터가 없다는 것을 확실하게 판단을 할 수 있습니다. 즉 구분자를 기준으로 데이터가 없는 부분도 그 결과를 반환해준다는 얘기입니다.

그렇지만 StringTokenizer는 비록 구분자로 문자열간 구분이 되어 있더라도 구분자 사이에 데이터가 존재하지 않으면 (",, 의 경우") 해당 데이터는 무시를하고 실제 값이 존재하는 부분만 값을 반환합니다.

두 결과 사이에는 많은 차이가 나는 것을 볼 수 있습니다.

2) "아이디, 이름, 전자우편" 일 경우  

이 역시 문자열은 다음과 같이 구성이 될 것입니다.  

- String str = "neoburi,inkuk,neoburi@neoburi.com,";

-  

- - String[] values = str.split(",");

    for( int x = 0; x < values.length; x++ ){

    ​    System.out.println( "문자(열) " + (x+1) + " : " + values[x] );

    }

     

    결과 :

    - 문자(열) 1 : neoburi


    - 문자(열) 2 : inkuk


    - 문자(열) 3 : [neoburi@neoburi.com](mailto:neoburi@neoburi.com)

    -  

  - StringTokenizer tokens = new StringTokenizer( str, "," );


- - for( int x = 1; tokens.hasMoreElements(); x++ ){

  - ​    System.out.println( "문자(열) " + x + " : " + tokens.nextToken() );

  - }

  - 결과 :

  - - 문자(열) 1 : neoburi


  - - 문자(열) 2 : inkuk


  - - 문자(열) 3 : [neoburi@neoburi.com](mailto:neoburi@neoburi.com)

    -  


- - - 위에서 보는 바와 같이 분해하고자 하는 문자열의 마지막 요소가 존재하지 않을 경우 String.split(String regex)과 StringTokenizer는 같은 결과를 보여줍니다.



 두 결과사에는 차이가 없음에도 불구하고 읽어 버리는 데이터가 생겼습니다. 개발자는 분명히 사용자의 정보로부터 4개의 항목을 얻어 표현을 하고 싶지만 그렇게 할 수 없습니다.

그러면 String.split(String regex)과 StringTokenizer를 사용하더라도 분해하고자 하는 마지막 항목이 없을 경우는 분해 할 방법이 없을까요? 그렇지 않습니다.

API를 어느정도 보신 분들이라면 찾을 수있을 것이다.

- java.lang.String클래스에는 split()메소드가 2개가 있습니다.

- - 하나는 split( String regex )이고
  - 다른 하나는 split( String regex, int limit )입니다.	

> String.split(String regex, int limit)를 사용해서 분해를 해보겠습니다.	

```java
String[] values = str.split(",", 4);

for( int x = 0; x < values.length; x++ ){

    System.out.println( "문자(열) " + (x+1) + " : " + values[x] );
}
```

결과 :

- 문자(열) 1 : neoburi


- 문자(열) 2 : inkuk


- 문자(열) 3 : [neoburi@neoburi.com](mailto:neoburi@neoburi.com)


- 문자(열) 4 :


- ​

- 비록 마지막 분해 요소의 값이 존재하지 않더라고 split( String regex, int limit )를 이용하면 고스란히 원하는 형태의 데이터를 얻는 것을 볼 수 있습니다.



StringTokenizer의 경우는 구분자 사이에 분해할 요소의 값이 존재하지 않으면 무시하게 되어 있습니다. 완전하게 모든 요소의 값이 존재하는 경우라면 사용을 해도 되겠지만 예에서 본 바와 같이 가변적인 데이터라면 사용하기 불편한 것이 사실이다.

  String.split()의 경우 limit를 저정 하지 않았을 경우에는 제일 마지막에 오는 요소의 값이 없을 경우 그 요소를 무시하도록 되어 있습니다. 이 역시 데이터가 정형화 되어 있는 경우라면 사용해도 무리 없겠지만 가변요소가 존재 한다면 StringTokenizer와 크게 다를 게 없습니다.

대신 limit를 지정 했을 경우 해당 숫자만큼만 분해를 합니다. limit는 분해를 한 후 얻고자 하는 String[]의 요소크기라고 보시면 됩니다.

limit가 분해하고자 하는 요소의 개수와 같거나 클 경우 요소의 개수만큼의 String[]을 되돌려 주지만, 요소의 개수보다 작을 경우 지정한 숫자만큼의 String[]으로 되돌려 줍니다.