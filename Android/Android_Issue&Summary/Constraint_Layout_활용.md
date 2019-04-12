 ### 제약 조건 이해하기.

제약 레이아웃의 가장 큰 특징은 뷰의 크기와 위치를 결정할 때 제약조건을 사용한다는 것.

이 말의 뜻은 뷰가 레이아웃 안의 다른 요소와 어떻게 연결되는지 알려주는 것으로, 뷰의 연결점(Anchor Point)와 대상(Target)을 연결합니다.

예를 들어 ***버튼의 왼쪽을 부모 레이아웃과 연결해 주세요*** 라면?

![스크린샷 2017-11-07 오후 4.30.23](https://i.imgur.com/ZpudRSE.png)

일단 버튼의 위 아래 왼쪽 오른쪽에 각각 연결점을 가지고 있습니다. 이 연결점을 **핸들(Side Constraint Handle)** 이라고 칭합니다. 즉, 잡아서 조절할 수 있는 것이라고는 의미.

자 이제 ***버튼의 왼쪽을 부모 레이아웃과 연결해 주세요*** 를 실현시켜본다면?

버튼의 왼쪽 연결점을 부모 레이아웃의 왼쪽 벽면과 연결! 그러면, 부모 레이아웃이 타깃이 되어 연결됩니다.

제약 조건은 두 개 이상이면 충족합니다.

연결선을 만들 때는 뷰의 연결점과 타킷이 필요하다고 했는데, 다음과 같은 것들이 타킷이 될 수 있습니다.
1. 같은 레이아웃 안에 들어 있는 다른 뷰의 연결점
2. 부모 레이아웃의 연결점
3. 가이드라인(Guideline)

 그리고 대상 뷰와 타깃의 연결점으로는 다음과 같은 것들이 될 수 있습니다.
1. 위쪽(Top), 아래쪽(Bottom), 왼쪽(Left), 오른쪽(Right)
2. 가로축의 가운데(CenterX), 세로축의 가운데(CenterY)
3. 베이스라인(Baseline) -> 텍스트를 보여주는 뷰인 경우에만 적용

----
`android:layout_marginBottom="100dp"`
`android:layout_marginTop="100dp"`

이 친구들은 우리가 알고 있는 마진 값이다.
`app:layout_constraintLeft_toLeftOf="parent"`
`app:layout_constraintBottom_toBottomOf="parent"`
`app:layout_constraintTop_toTopOf="parent"`
`app:layout_constraintEnd_toEndOf="parent"`
 위 코드는 View를 정중앙에 놓는 방법이다.

`app:layout_constraintVertical_bias="0.5"`
`app:layout_constraintHorizontal_bias="0.5"`
가로 세로의 편향값을 설정해 가로 세로의 위치를 조절한다.

```java
<android.support.constraint.Guideline
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:id="@+id/guideline"
            app:layout_constraintGuide_begin="66dp"
            android:orientation="vertical"
            />
```
 가이드라인을 설정하여 뷰의 정렬을 책임진다.
 ```java
 <Button
            android:text="Button"
            android:layout_width="86dp"
            android:layout_height="wrap_content"
            android:id="@+id/button"
            app:layout_constraintStart_toStartOf="@+id/guideline"
            android:layout_marginStart="30dp"
            app:layout_constraintTop_toTopOf="parent"
            android:layout_marginTop="30dp"
            app:layout_constraintBottom_toBottomOf="parent"
            android:layout_marginBottom="30dp"
            app:layout_constraintEnd_toEndOf="parent"
            android:layout_marginEnd="30dp"
            />
 ```
 가이드 라인을 설정하면 다음과 같이 정렬시킬 수 있다.
 `layout_constraintStart_toStartOf`를 활용하여 가이드라인 ID옆에 정렬시킬수 있다.

`layout_constraint[소스 뷰의 연결점]_[타깃 뷰의 연결점]="[타깃 뷰의 id]"`

 가볍게 제약레이아웃에 대한 리뷰를 해보았다.
 활용방법으로 만약에 다양한 SNS인증 로그인을 만들어야 할 때,

 제약레이아웃안에 적당한 크기의 레이아웃을 만들어 중앙으로 배치후, 그 안에 뷰을 넣는다!

 흠... 확 와 닿지 않는거 같다. UI 개발에 좀더 직관적인 가독성을 제공할 수는 있을거 같지만, 이전에 리니어 레이아웃을 활용한 사람으로써는 확 눈에 들어오지는 않을 것 같다!
