## ConstraintLayout

용도.
Relative Positioning
Margins
Centering Positioning
Visibility Behavior
Dimension Constraint
Virtual Helpers Objects

일단 이를 사용하기 위해서는

![스크린샷 2017-03-03 오후 8.44.19](http://i.imgur.com/yDMKSv0.png)

  위와 같이 디펜더시를 해주어야 한다.

  이 레이아웃의 큰 목적은

  > ## "ConstraintLayout으로 중첩된 뷰를 줄여 성능 향상 기능"

  - RelativeLayout보다 더 유연한 위치 속성
    - RelativeLayout 뷰 위치 속성
      - layout_toRightOf
      - layout_toLeftOf
      - layout_toTopOf
      - layout_toBottomOf
    - ConstraintLayout 뷰 위치 속성
      - layout_constraintTop_toTopOf
      - layout_constraintTop_toBottomOf
      - layout_constraintBottom_toTopOf
      - layout_constraintBottom_toBottomOf
      - layout_constraintLeft_toTopOf
      - layout_constraintLeft_toBottomOf
      - layout_constraintLeft_toLeftOf
      - layout_constraintLeft_toRightOf
      - layout_constraintRight_toTopOf
      - layout_constraintRight_toBottomOf
      - layout_constraintRight_toLeftOf 
      - layout_constraintRight_toRightOf 
      - left, right 정렬에 대해 start, end속성 지원
    - Constraint 조작하기
      - Resize : 코너의 사각형을 잡고 드래그

      ![Resize](http://kunny.github.io/assets/posts/lecture/ui/2016/05/22/constraint_layout_1/resize_handle.gif)
      - Side Constraint Handle : 사각현 변의 동그라미

      ![Side Handler](http://kunny.github.io/assets/posts/lecture/ui/2016/05/22/constraint_layout_1/side_handle.png)
      또는 XML레이아웃에서
      >app:layout_constraintRight_toRightOf="@+id/text_like_count"

      - Baseline Constraint Handle
  ![BaseLine](http://kunny.github.io/assets/posts/lecture/ui/2016/05/22/constraint_layout_1/baseline_handle.gif)

      >app:layout_constraintBaseline_toBaselineOf="@+id/text_title"

      - Vertical Bias
      >app:layout_constraintVertical_bias="0.5"

      - Horizontal Bias

      >app:layout_constraintHorizontal_bias="0.5"


Example

![스크린샷 2017-03-03 오후 8.59.48](http://i.imgur.com/NYMrH7O.png)

```java
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/constraintLayout"
    <!-- Other attributes -->
    >

    <ImageView
        android:id="@+id/image_shot"
        app:layout_constraintBottom_toBottomOf="@+id/constraintLayout"
        app:layout_constraintEnd_toEndOf="@+id/constraintLayout"
        app:layout_constraintStart_toStartOf="@+id/constraintLayout"
        app:layout_constraintTop_toTopOf="@+id/constraintLayout"
        <!-- Other attributes --> />

    <View
        android:layout_width="match_parent"
        android:layout_height="50dp"
        android:background="@color/white"
        app:layout_constraintBottom_toBottomOf="@+id/constraintLayout"
        app:layout_constraintEnd_toEndOf="@+id/constraintLayout"
        app:layout_constraintStart_toStartOf="@+id/constraintLayout"
        <!-- Other attributes --> />

    <TextView
        android:id="@+id/text_title"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        app:layout_constraintBottom_toBottomOf="@+id/constraintLayout"
        app:layout_constraintEnd_toStartOf="@+id/imageView"
        app:layout_constraintStart_toStartOf="@+id/constraintLayout"
        tools:text="Japan"
        <!-- Other attributes --> />

    <TextView
        android:id="@+id/text_like_count"
        app:layout_constraintBottom_toBottomOf="@+id/constraintLayout"
        app:layout_constraintEnd_toEndOf="@+id/constraintLayout"
        tools:text="1,287"
        <!-- Other attributes --> />

    <ImageView
        android:id="@+id/imageView"
        android:src="@drawable/ic_heart_accent_accent_24dp"
        app:layout_constraintBottom_toBottomOf="@+id/text_like_count"
        app:layout_constraintEnd_toStartOf="@+id/text_like_count"
        app:layout_constraintTop_toTopOf="@+id/text_like_count"
        <!-- Other attributes --> />

</android.support.constraint.ConstraintLayout>
```

## 툴바 내 기능
![스크린샷 2017-03-03 오후 9.02.55](http://i.imgur.com/MDDuOME.png)

1. Show Constraint

2. Turn on AutoConnect

  Autoconnect 기능을 사용하면, 레이아웃 내 위젯을 배치할 때 자동으로 이웃한 위젯이나 화면 경계간 관계를 지정해 줍니다.
  다음은 Autoconnect 기능을 켠 상테에서 위젯을 배치하는 모습입니다. 배치하는 위젯 위치에 따라 자동으로 관계를 지정하는 모습을 확인할 수 있습니다.
3. Clear All Constraint

  현재 설정되어 있는 관계들을 모두 제거합니다. 위젯을 선택한 상태에서 누르면 선택한 위젯의 관계만 제거됩니다.
4. Infer Constraint

  레이아웃 내 배치된 위젯의 현재 상태를 기반으로 관계를 지정합니다.
  Autoconnect 기능은 이웃한 위젯들 간의 관계만 지정하지만, 이 기능은 화면에 포함되어 있는 전체 위젯을 대상으로 하여 관계를 지정합니다.
  다음은 Infer constraints 기능을 사용하여 관계를 지정하는 모습입니다.
  ![enter image description here](http://kunny.github.io/assets/posts/lecture/ui/2016/05/22/constraint_layout_1/infer_constraints_action.gif)

5. Default Margins
  말그대로 기본 디폴트 마진을 얼만큼 줄것인가를 정한다.

### 속성창

## 주요/전체 항목 전환

모든 속성 항목이 한 화면에 모두 표시되었던 기존과 달리, 위젯의 주요 속성만 보여주는 기능이 추가되었습니다.
속성 창 우상단의 Show expert properties 버튼을 누르면 전체 전체 속성을 모두 표시하도록 전환할 수 있습니다.
다음은 주요 속성 표시 모드와 전체 속성 표시 모드를 전환하는 모습입니다.

![커니님 블로그 참조함.](http://kunny.github.io/assets/posts/lecture/ui/2016/05/22/constraint_layout_1/properties_show_expert_properties.gif)

## 위젯 크기

![커니님 블로그 참조](http://kunny.github.io/assets/posts/lecture/ui/2016/05/22/constraint_layout_1/inner_dimension.png)

위젯이 공간을 차지하는 방식을 설정합니다. Inspector pane 내 사각형 내부에 있는 각 축을 선택하여 설정할 수 있습니다.

### Fixed![enter image description here](http://kunny.github.io/assets/posts/lecture/ui/2016/05/22/constraint_layout_1/fixed.png)

고정된 값으로 위젯의 크기를 설정합니다. (예: 120dp) layout_width 및 layout_height에 지정하는 크기만큼 영역이 할당됩니다.
### AnySize ![enter image description here](http://kunny.github.io/assets/posts/lecture/ui/2016/05/22/constraint_layout_1/any_size.png)

현재 설정되어 있는 관계 조건을 만족하는 선에서 최대한 공간을 차지합니다.
빈 공간을 채우는 점은 match_parent와 유사하지만, 이에 더불어 관계 조건을 추가로 확인합니다.

### Wrap content ![enter image description here](http://kunny.github.io/assets/posts/lecture/ui/2016/05/22/constraint_layout_1/wrap_content.png)

위젯이 필요한 공간 만큼만 차지합니다. 기존에 사용하던 wrap_content와 동일합니다.

### 여백 조정
![enter image description here](http://kunny.github.io/assets/posts/lecture/ui/2016/05/22/constraint_layout_1/margins.png)

위젯이 다른 위젯이나 화면 경계와 마주했을 때 확보할 여백을 지정합니다. 관계 조건이 지정되어 있는 변에 한해 설정이 가능합니다.
다음과 같이 각 변의 여백을 지정할 수 있으며, 사용자 정의 값을 넣는 것 또한 가능합니다.

참조 : http://kunny.github.io/lecture/ui/2016/05/22/constraint_layout_1/

https://realm.io/kr/news/aw207-android-constraint-layout-auto-value-extensions/

https://dktfrmaster.blogspot.kr/2016/09/constraintlayout.html?showComment=1488540778487#c3374644560232904551
