
# HashMap

HashMap은 Map인터페이스의 한 종류로, key와 value 한 쌍을 데이터로 가진다.
쉽게 이해하려면 리스트 형태에 값을 키와 벨류로 가지고 있다고 생각하면 된다.

리스트와의 큰 차이점은 위에 처럼 키값을 가진다는것이고, 또 순서를 보장하지 않는다는점이다.
순서대로 입,출력이 되고 순서에 의해 자료를 처리하는 작업에는 알맞지 않다.
입력된 key값을 이용해 value를 구하며(리스트에서 인덱스를 이용해 벨류를 구하는 이치)
key값은 중복되지 않으며 value는 중복 가능하다.

즉, key값으로 1을 5번 입력한다면 맨 처음의 key, value만 입력되고 나머지는 입력되지 않아

이 특성을 잘 이용하면 중복검사를 매우 편하게 할 수 있다.

HashMap의 기본적인 사용법을 알아보겠다.
HashMap<Integer, String> map = new HashMap<Integer, String>();

입력 -
map.put(1, "치킨");
map.put(2, "피자");
map.put(3, "탕수육");

출력 -
Iterator<Integer> iter = map.keySet().iterator();
while(iter.hasNext()) {
int key = iter.next();
String value = map.get(key);
Log.d("fureun", "key : " + key + ", value : " + value);
}
이렇게 하면 모든 키와 벨류 쌍이 다 출력된다.

다른 사용법으로는 map.get(1);을 하면 키 1에 대응하는 value "치킨"이 반환된다.

if(map.containsKey(1)) {

}
이렇게 하면 키값 1이 존재할 경우 true가 반환된다.
