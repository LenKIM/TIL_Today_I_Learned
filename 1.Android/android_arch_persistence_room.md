## android.arch.persistence.room

Room 처음 들어보죠?

저는 Node.js 활용하면서 채팅방 만들때 들었던 단어였습니다.

 그러나 어떤 프로젝트를 분석하면서 발견한 Room이라는 안드로이드 컴포넌트입니다.

 흔히 우리가 아는 안드로이드 4대 컴포넌트

 Service, ContentProvider, Activity, BroadcastReceiver

요즘 Node.js 프로젝트를 진행하느라, 4대 컴포넌트를 기억해 내는데 오래 걸렸네요. 여튼 여기서 ContentProvider에 해당 될거 같은데요.

일단 가볍게 먼저 Room에 대한 정의를 내리면.

"Node.js에서 ORM방식의 Sequlize 와같은 직접 맵핑 데이터베이스와 유사한 어플리케이션"

[안드로이드 설명 부분](https://developer.android.com/reference/android/arch/persistence/room/package-summary.html)

직접 들어가서 확인해 볼 수 있지만 좀더 설명드리면.

Room is a Database Object Mapping library that makes it easy to access database on Android applications.
Rather than hiding the detail of SQLite, Room tries to embrace them by providing convenient APIs to query the database and also verify such queries at compile time. This allows you to access the full power of SQLite while having the type safety provided by Java SQL query builders.

 Room은 SQLite를 감추면서 좀더 편리한 API를 제공합니다.
 네, 위에 말을 줄이면 이렇게...?

* Database: This annotation marks a class as a database. It should be an abstract class that extends RoomDatabase. At runtime, you can acquire an instance of it via Room.databaseBuilder or Room.inMemoryDatabaseBuilder.
This class defines the list of entities and data access objects in the database. It is also the main access point for the underlying connection.

어노테이션을 활용해 데이터베이스를 다룹니다.
Database라는 어느테이션을 활용

* Entity: This annotation marks a class as a database row. For each Entity, a database table is created to hold the items. The Entity class must be referenced in the Database#entities array. Each field of the Entity is persisted in the database unless it is annotated with Ignore. Entities must have no-arg constructors.

row를 결정하는 엔티티. 엔티티는 무조건 어떤 매개변수를 갖지않는 생성자구조를 가져야합니다!

* Dao: This annotation marks a class or interface as a Data Access Object. Data access objects are the main component of Room that are responsible for defining the methods that access the database. The class that is annotated with Database must have an abstract method that has 0 arguments and returns the class that is annotated with Dao. While generating the code at compile time, Room will generate an implementation of this class.

자바에서 MVC패턴을 활용해 데이터베이스를 다룰때 DAO라는 디렉토리를 만들었던걸로 기억한다.

그때 DAO와 위에서 설명하는 DAO는 같은 말이다. dao는 꼭 추상메서드로 가져야하며, 클래스를 리턴한다.

자세한건 사용법을 좀 봅시다. 아아! 그전에... 왜 Room에서는 Dao를 활용하는가?

```
Using Dao classes for database access rather than query builders or direct queries allows you
   to keep a separation between different components and easily mock the database access while
   testing your application.
```

 이 말뜻은, DAO의 쿼리빌더나, 직접쿼리를 통한 데이터접근은 서로 다른 컴포넌트르의 다름을 유지하면서도 사용가능하게 만들고, 또한 Mock를 쉽게 만들어 테스팅 가능하게 해줍니다.

아래 심플 코드이다.
 ```java
 // File: User.java
@Entity
public class User {
  @PrimaryKey
  private int uid;
  private String name;
  @ColumnInfo(name = "last_name")
  private String lastName;
  // getters and setters are ignored for brevity but they are required for Room to work.
}
// File: UserDao.java
@Dao
public interface UserDao {
  @Query("SELECT * FROM user")
  List<User> loadAll();
  @Query("SELECT * FROM user WHERE uid IN (:userIds)")
  List<User> loadAllByUserId(int... userIds);
  @Query("SELECT * FROM user where name LIKE :first AND last_name LIKE :last LIMIT 1")
  User loadOneByNameAndLastName(String first, String last);
  @Insert
  void insertAll(User... users);
  @Delete
  void delete(User user);
}
// File: AppDatabase.java
@Database(entities = {User.java})
public abstract class AppDatabase extends RoomDatabase {
  public abstract UserDao userDao();
}
 ```

 그리고 Room은 RxJava2도 지원한다!!
 근데 RxJava를 잘모른다 :)))

Room개념을 이해하기위해서 LiveData라는 것도 알면 좋을듯! 이는 다른 파일 통해 설명해보도록 하겠습니다!

왜 LiveData를 알아야하냐고 묻는다면, 대답해주는 것이 인지상정!

android.arch.lifecycle 오늘 배운 lifecycleFragment나,Room이나 모두가 android.arch 에 해당한다.

LiveData도 그 중에 하나로써 Object를 상속받아 사용한다!
그럼 이게 무슨 의미일까? : ) Object는 최상위객체인데, 이걸 LiveData에 상속했다고?

다음 시간에...

조금더 자세한 설명은 위의 링크를 들어가서 활용하면 된다.
