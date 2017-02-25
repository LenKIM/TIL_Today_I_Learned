## JSON Parser와 GSON 사용하기.

일단 첫번째로 JSON을 파싱하는 부분에 대해서 이야기해봅시다.

Json은 하드코딩으로 작성하고 이렇게 보인다.

![example](http://i.imgur.com/6fjevsB.png)

자 이제 소스코드를 잘 살펴보면...

```java
public class SimpleJsonParserActivity extends AppCompatActivity {

//[지면상 생략]

    private void parseJSON() throws JSONException {
        //JSON을 담아옴
        mJSONObject = new JSONObject(strJSONvalue);

        JSONObject object = mJSONObject.getJSONObject("FirstObject");
        String attr1 = object.getString("attr1");
        String attr2 = object.getString("attr2");

        strParseValue="Attribute 1 value => "+attr1;
        strParseValue+="\n Attribute 2 value => "+attr2;

        JSONObject subObject = object.getJSONObject("sub");

        JSONArray subArray  = subObject.getJSONArray("sub1");

        strParseValue+="\n Array Length => "+subArray.length();

        for(int i=0; i<subArray.length(); i++)
        {
            strParseValue+="\n"+ subArray.getJSONObject(i).getString("sub1_attr").toString();
        }

        mTextView.setText(strParseValue);
    }
}
```

 일단 변수로 빈 JSONObject를 이니셜라이징해줍니다.[JSONObject mJSONObject] 물론 빈 String 로 만들어줍니다.(String strJSONvalue)

다음에 내가 원하는 노드의 내용을 가져옵니다.

**JSONObject object = mJSONObject.getJSONObject("FirstObject");**

이런식으로 말이죠.

FirstObject가 위에서 보면 Level 1에 해당하는 노드의 헤드인데, 위의같은 코드를 통해서 FirstObject의 자식노드들의 헤드를 가져옵니다.(죄송합니다만.. JSON의 각 부분의 이름을 몰라 노드라 칭하겠습니다.)

**String attr1 = object.getString("attr1");
String attr2 = object.getString("attr2");**

이렇게 하면 String attr1과 attr2에는 one value, two value가 들어가게 됩니다.

이런식으로 원하는 값을 파싱하면 됩니다. 그렇다면 배열은 어떻게 할까요?

**JSONObject subObject = object.getJSONObject("sub");

JSONArray subArray  = subObject.getJSONArray("sub1");**

 이런 식으로 일단 JSONObject로 부모노드를 가져온뒤, 배열에 해달하는 자식노드에 getJSONArray를 통해 배열을 가져옵니다.

**for(int i=0; i<subArray.length(); i++)
{
  strParseValue+="\n"+ subArray.getJSONObject(i).getString("sub1_attr").toString();
}**

이런식으로 해서 배열의 하나하나를 가져올 수 있습니다!

JSON parse 끝!


이번에는 조금 난이도 있는 JSON parser 법이다.

```
 [
      {
          "name":"Laundry",
          "created":1270527168012,
          "priority":5,
          "owner":"Erik",
          "status":1
      },
      {
          "name":"Groceries",
          "created":1370476882046,
          "priority":3,
          "owner":"Linda",
          "status":2
      },
      {
          "name":"Buy new sofa",
          "created":1370326907735,
          "priority":2,
          "owner":"Linda",
          "status":1
      }
 ]
```

```java
public class JsonSample {

    public JSONArray readTasksFromInputStream(InputStream stream) {
        InputStreamReader reader = new InputStreamReader(stream);
        JsonReader jsonReader = new JsonReader(reader);
        JSONArray jsonArray = new JSONArray();
        try {
            jsonReader.beginArray();
            while (jsonReader.hasNext()) {
                JSONObject jsonObject
                        = readSingleTask(jsonReader);
                jsonArray.put(jsonObject);
            }
            jsonReader.endArray();
        } catch (IOException e) {
            // Ignore for brevity
        } catch (JSONException e) {
            // Ignore for brevity
        }

        return jsonArray;
    }

    private JSONObject readSingleTask(JsonReader jsonReader)
            throws IOException, JSONException {
        JSONObject jsonObject = new JSONObject();
        jsonReader.beginObject();
        JsonToken token;
        do {
            String name = jsonReader.nextName();
            if ("name".equals(name)) {
                jsonObject.put("name", jsonReader.nextString());
            } else if ("created".equals(name)) {
                jsonObject.put("created", jsonReader.nextLong());
            } else if ("owner".equals(name)) {
                jsonObject.put("owner", jsonReader.nextString());
            } else if ("priority".equals(name)) {
                jsonObject.put("priority", jsonReader.nextInt());
            } else if ("status".equals(name)) {
                jsonObject.put("status", jsonReader.nextInt());
            }

            token = jsonReader.peek();
        } while (token != null && !token.equals(JsonToken.END_OBJECT));
        jsonReader.endObject();
        return jsonObject;
    }

    public void writeJsonToStream(JSONArray array, OutputStream stream)
            throws JSONException, IOException {
        OutputStreamWriter writer = new OutputStreamWriter(stream);
        JsonWriter jsonWriter = new JsonWriter(writer);

        int arrayLength = array.length();
        jsonWriter.beginArray();
        for(int i = 0; i < arrayLength; i++) {
            JSONObject object = array.getJSONObject(i);
            jsonWriter.beginObject();
            jsonWriter.name("name").
                    value(object.getString("name"));
            jsonWriter.name("created").
                    value(object.getLong("created"));
            jsonWriter.name("priority").
                    value(object.getInt("priority"));
            jsonWriter.name("status").
            value(object.getInt("status"));
            jsonWriter.name("owner").
                    value(object.getString("owner"));
            jsonWriter.endObject();
        }
        jsonWriter.endArray();
        jsonWriter.close();
    }

}
```

이번에는 GSON을 사용한 JSON조작법을 살펴보자.
일단 Gson이란 무엇인가?

![GSON](http://hmkcode.com/wp-content/uploads/2013/07/gson-java-json.png)


https://github.com/google/gson

Gson is a Java library that can be used to convert Java Objects into their JSON representation. It can also be used to convert a JSON string to an equivalent Java object. Gson can work with arbitrary Java objects including pre-existing objects that you do not have source-code of.

 요약하면, Gson이란 자바 라이브러리로써, 자바 Object를 JSON 으로 변환해줄수 있게 만드는 라이브러리이다.

Gson의 사용예를 먼저 보자.

Task Model

```java

/**
 * Created by len on 2017. 2. 25..
 */

public class Task {

    private final long id;
    private String summary;
    private String description;
    private Status status;
    private int prioirty;

    public enum Status{
        CREATED, ASSIGNED, CANCELED, COMPLETED
    }

    public Task(long id, String summary, String description, Status status, int prioirty) {
        this.id = id;
        this.summary = summary;
        this.description = description;
        this.status = status;
        this.prioirty = prioirty;
    }

    public long getId() {
        return id;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public int getPrioirty() {
        return prioirty;
    }

    public void setPrioirty(int prioirty) {
        this.prioirty = prioirty;
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", summary='" + summary + '\'' +
                ", description='" + description + '\'' +
                ", status=" + status +
                ", prioirty=" + prioirty +
                '}';
    }
}
```
>MainActivity에서
```java
List<Task> list = new ArrayList<Task>();
  for (int i = 0; i < 20; i++) {
          list.add(new Task(i, "Test1", "Test2", Task.Status.ASSIGNED, 10));
  }
  Gson gson = new Gson();
  Type type = new TypeToken<List<Task>>() {}.getType();
  String json = gson.toJson(list, type);
  Log.d(TAG, json);
  List<Task> fromJson = gson.fromJson(json, type);

  for (Task task : fromJson) {
          Log.d(TAG, task + "");
  }
```

> RESULT

```java
D/com.yyy.xxx.myjsonandgson.MainActivity: Task{id=0, summary='Test1', description='Test2', status=ASSIGNED, prioirty=10}
D/com.yyy.xxx.myjsonandgson.MainActivity: Task{id=1, summary='Test1', description='Test2', status=ASSIGNED, prioirty=10}
D/com.yyy.xxx.myjsonandgson.MainActivity: Task{id=2, summary='Test1', description='Test2', status=ASSIGNED, prioirty=10}
D/com.yyy.xxx.myjsonandgson.MainActivity: Task{id=3, summary='Test1', description='Test2', status=ASSIGNED, prioirty=10}
D/com.yyy.xxx.myjsonandgson.MainActivity: Task{id=4, summary='Test1', description='Test2', status=ASSIGNED, prioirty=10}
D/com.yyy.xxx.myjsonandgson.MainActivity: Task{id=5, summary='Test1', description='Test2', status=ASSIGNED, prioirty=10}
D/com.yyy.xxx.myjsonandgson.MainActivity: Task{id=6, summary='Test1', description='Test2', status=ASSIGNED, prioirty=10}
D/com.yyy.xxx.myjsonandgson.MainActivity: Task{id=7, summary='Test1', description='Test2', status=ASSIGNED, prioirty=10}
D/com.yyy.xxx.myjsonandgson.MainActivity: Task{id=8, summary='Test1', description='Test2', status=ASSIGNED, prioirty=10}
D/com.yyy.xxx.myjsonandgson.MainActivity: Task{id=9, summary='Test1', description='Test2', status=ASSIGNED, prioirty=10}
D/com.yyy.xxx.myjsonandgson.MainActivity: Task{id=10, summary='Test1', description='Test2', status=ASSIGNED, prioirty=10}
D/com.yyy.xxx.myjsonandgson.MainActivity: Task{id=11, summary='Test1', description='Test2', status=ASSIGNED, prioirty=10}
D/com.yyy.xxx.myjsonandgson.MainActivity: Task{id=12, summary='Test1', description='Test2', status=ASSIGNED, prioirty=10}
D/com.yyy.xxx.myjsonandgson.MainActivity: Task{id=13, summary='Test1', description='Test2', status=ASSIGNED, prioirty=10}
D/com.yyy.xxx.myjsonandgson.MainActivity: Task{id=14, summary='Test1', description='Test2', status=ASSIGNED, prioirty=10}
D/com.yyy.xxx.myjsonandgson.MainActivity: Task{id=15, summary='Test1', description='Test2', status=ASSIGNED, prioirty=10}
D/com.yyy.xxx.myjsonandgson.MainActivity: Task{id=16, summary='Test1', description='Test2', status=ASSIGNED, prioirty=10}
D/com.yyy.xxx.myjsonandgson.MainActivity: Task{id=17, summary='Test1', description='Test2', status=ASSIGNED, prioirty=10}
D/com.yyy.xxx.myjsonandgson.MainActivity: Task{id=18, summary='Test1', description='Test2', status=ASSIGNED, prioirty=10}
D/com.yyy.xxx.myjsonandgson.MainActivity: Task{id=19, summary='Test1', description='Test2', status=ASSIGNED, prioirty=10}

```

JSON으로 변환하는 코드를 살펴보자.

List<Task> list = new ArrayList<Task>();
  for (int i = 0; i < 20; i++) {
      list.add(new Task(i, "Test1", "Test2", Task.Status.ASSIGNED, 10));
  }

list를 사용하여 Task모델의 객채를 만든뒤, add하였다.

>  Gson gson = new Gson();

Gson을 선언하고.

>  Type type = new TypeToken<List<Task>>() {}.getType();

List에서 쓰인 type를 선언한뒤,

>  String json = gson.toJson(lit, type);

JSON으로 변환!!

 이번에는 반대로.

 > List<Task> fromJson = gson.fromJson(json, type);

여기서  json는 위에서 json으로 변환한 String 그리고 타입또한 위에서 선언하였음

 for (Task task : fromJson) {
         Log.d(TAG, task + "");
 }

GSON을 활용한 JSON변환 정리 끝!
