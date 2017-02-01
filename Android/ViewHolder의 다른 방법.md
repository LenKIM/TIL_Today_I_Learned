
SetTag, getTag 사용.

 흔히 우리가 ViewHolder를 ListView에서 사용하는데, 이를 좀더 쉽게 하는 방법이 있다.

public class CustomView extends View {

    private int mId;
    private String mName;
    private String mAddr;

    public CustomView(Context context) {
        super(context);
    }
    public CustomView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public int getId() { return mId; }
    public void setId(int id) { mId = id; }

    public String getName() { return mName; }
    public void setName(String name) { mName = name; }

    public String getAddress() { return mAddr; }
    public void setAddress(String addr) { mAddr = addr; }

}

 이것은 우리가 데이터를 넣고 뺄때, 사용한다.

CustomView customView = new CustomView(this);
customView.setId(1);
customView.setName("vizpei");
customView.setAddress("somewhere");

간단한 구조이다. 그러나 별로 없는 자료에서 위와같은 방법을 쓰는것은 조금 비효율적일수있다. 그래서 나온 방법이다.

[Tag in View]

android.view.View, 즉 모든 View들의 상위에 있는 View 클래스에는
getTag() / setTag() 를 사용하여 View에 Tag를 붙일 수 있습니다.
Tag는 Object 타입이라 아무거나 다 들어 갈 수 있지요.
그냥 시시한 값 하나 넣을 수도 있지만 복잡한 클래스 인스턴스도 가볍게 넣을 수 있습니다.

아까 넣고 싶었던 데이터들을 일단 하나의 클래스로 만들어 봤습니다.
필드를 private로 만들고 get / set 메소드 만들어도 되지만 그냥 public으로 해버렸습니다.
어차피 그냥 데이터 저장용이니까요.


private class PersonInfo {
    public int id;
    public String name;
    public String addr;
}


이제 PersonInfo 인스턴스를 만들고 View.setTag()로 집어 넣어주면 땡입니다.


PersonInfo pi = new PersonInfo();
pi.id = 1;
pi.name = "vizpei";
pi.addr = "somewhere";

View view = new View(this);
view.setTag(pi);


사용할때는 View.getTag() 로 가져오면 역시 땡이지요.


PersonInfo pi = (PersonInfo) view.getTag();


알면 유용하게 쓸 수 있지만, 모르면 맨날 extends만 하고 있을지는 모르는 일입니다.

  참고 :http://dlucky.tistory.com/112
