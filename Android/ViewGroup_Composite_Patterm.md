# ViewGroup과 View의 관계는?

관계를 알기전 우리는 Composite 패턴을 알 필요가 있다.

1. 컴포짓 패턴이란?
간단하게 말해 단일 객체(Single Instance)든 객체들의 집합(Group of Instance)이든 같은 방법으로 취급하는 것이다. 다시 말해, 개별적인 객체들과 객체들의 집합간의 처리 방법의 차이가 없을 경우 사용하면 됩니다. 여기서 컴포지트의 의미는 일부 또는 그룹을 표현하는 객체들의 트리 구조로 구성한다는 것.


![enter image description here](https://ko.wikipedia.org/wiki/%ED%8C%8C%EC%9D%BC:Composite_UML_class_diagram_(fixed).svg)

2. 활용?
예를 들어 파일 시스템을 간단하게 구현한다면?
먼저 필요한 것은 파일일겁니다. 그래서 파일 클래스를 만듭니다.

```java
class File{
  private  String name;
  //..
}
```
 디렉토리도
```java
class Directory {
  private String name;
  private List<File> children;
  // ...
  public void add(File file){
    //...
  }
}
```

디렉토리 클래스는 자신의 이름과 파일들을 가질 수 있습니다. add()메소드를 이용해 파일을 추가할 수 있다.

***근데 이 구조로는 디렉토리안에 디렉토리가 있는 것을 어떻게 표현할 수 있는가?***

interface를 활용하는 것!

```java
/**
Node 클래스는 기본적인 파일 및 디렉토리의 근간이라고 가정합니다.
모든 파일과 디렉토리는 이름을 가지고 있을테니 이름을 반환할 getName() 메소드를 가집니다.
*/
interface Node {
    public String getName();
}

/**
File 클래스는 Node 인터페이스를 구현하면 끝입니다. 자신은 자식 요소를 가질 필요가 없기 때문이죠.
*/
class File implements Node {
    private String name;
    // ...
    @Override
    public String getName(){ return name; }
}

/**
Directory 클래스는 Node 인터페이스를 구현하는 것 외에도 자식 요소를 담아둘 List가 필요합니다.
*/
class Directory implements Node {
    private String name;
    private List<Node> children;
    // ...
    @Override
    public String getName(){ return name; }
    public void add(Node node) {
        children.add(node);
    }
}
```

```java
Directory dir = new Directory();
dir.add(new File()); // 디렉토리에 파일 하나를 삽입!
dir.add(new Directory()); // 디렉토리에 디렉토리를 삽입!
Directory secondDir = new Directory();
secondDir.add(dir); // 기존 루트 디렉토리를 새로 만든 디렉토리에 삽입!

참고 http://jdm.kr/blog/228
```

View와 ViewGroup도 컴포짓 관계에 있다가 말할 수 있다.

ViewGroup 클래스에는 ViewManager interface를 상속받았다.
```java
@UiThread
public abstract class ViewGroup extends View implements ViewParent, ViewManager {
    private static final String TAG = "ViewGroup";

    private static final boolean DBG = false;

    /**
     * Views which have been hidden or removed which need to be animated on
     * their way out.
     * This field should be made private, so it is hidden from the SDK.
     * {@hide}
     */
    protected ArrayList<View> mDisappearingChildren;

    /**
     * Listener used to propagate events indicating when children are added

     ..../
     */
   }
```

ViewManager는 다음과 같은 구조를 가진다.
```java
/** Interface to let you add and remove child views to an Activity. To get an instance
  * of this class, call {@link android.content.Context#getSystemService(java.lang.String) Context.getSystemService()}.
  */
public interface ViewManager
{
    /**
     * Assign the passed LayoutParams to the passed View and add the view to the window.
     * <p>Throws {@link android.view.WindowManager.BadTokenException} for certain programming
     * errors, such as adding a second view to a window without removing the first view.
     * <p>Throws {@link android.view.WindowManager.InvalidDisplayException} if the window is on a
     * secondary {@link Display} and the specified display can't be found
     * (see {@link android.app.Presentation}).
     * @param view The view to be added to this window.
     * @param params The LayoutParams to assign to view.
     */
    public void addView(View view, ViewGroup.LayoutParams params);
    public void updateViewLayout(View view, ViewGroup.LayoutParams params);
    public void removeView(View view);
}
```

ViewManager가 Composite역할을 함으로써 ViewGroup이 동작한다.


cf)ViewGroup안에 View를 어떻게 찾을까?

```java
/**
    * {@hide}
    */

    // Child views of this ViewGroup
    private View[] mChildren;
    // Number of valid children in the mChildren array, the rest should be null or not
    // considered as children
    private int mChildrenCount;


   @Override
   protected <T extends View> T findViewTraversal(@IdRes int id) {
       if (id == mID) {
           return (T) this;
       }

       final View[] where = mChildren;
       final int len = mChildrenCount;

       for (int i = 0; i < len; i++) {
           View v = where[i];

           if ((v.mPrivateFlags & PFLAG_IS_ROOT_NAMESPACE) == 0) {
               v = v.findViewById(id);

               if (v != null) {
                   return (T) v;
               }
           }
       }

       return null;
   }
```

비트 연산자와 바이트를 적절히 활용해 최소의리소스로 동작하도록 활용했다.
배울 점인 듯...
