## JVM Option

The Java virtual machine (JVM) is a virtual **"execution engine"** instance that executes the bytecodes in Java class files on a microprocessor. How you tune your JVM affects the performance of WebLogic Server and your applications. envelope



### 일반적으로 JVM 튜닝할 때 고려해야 될 점.

- **JVM vendor and version**  
  Use only production JVMs on which WebLogic Server has been certified
- **Tuning heap size and garbage collection**  
  For WebLogic Server heap size tuning details
- **Choosing a GC (garbage collection) scheme**  
  Depending on your application, there are a number of GC schemes available for managing your system memory
- **Mixed client/server JVMs**  
  Deployments using different JVM versions for the client and server are supported in WebLogic Server
- **UNIX threading models**  
  Choices you make about Solaris threading models can have a large impact on the performance of your JVM on Solaris



## Garbage Collection

가비지 콜렉션은 Java 힙에서 사용되지 않는 Java 오브젝트를 비우는 VM의 프로세스.

### VM Heap Size and Garbage Collection

Java Heap는 자바 프로그램의 객체가 살아가는 곳. Live Obejct, Dead Object 및 여유 메모리를 위한 저장소입니다. 실행중인 프로그램의 포인터에서 더 이상 객체에 도달 할 수 없으면 "쓰레기"로 간주되어 수집 준비가 완료됩니다. 가비지 콜렉션을 수행하는 데 소요되는 시간을 실행 시간의 5 % 이내로 조정하는 것이 가장 좋습니다.



 JVM 힙 크기는 VM이 가비지 수집 빈도와 기간을 결정합니다. 가비지 콜렉션의 수용 가능한 비율은 어플리케이션에 따라 다르며 가비지 콜렉션의 실제 시간과 빈도를 분석 한 후에 조정해야합니다. 큰 힙 크기를 설정하면 전체 가비지 수집이 느려지지만 덜 자주 발생합니다. 메모리 요구 사항에 따라 힙 크기를 설정하면 가비지 콜렉션 전체가 빠르지 만 더 자주 발생합니다.



Heap Size를 조정하는 목적은 WebLogic Server가 주어진 시간에 처리 할 수있는 클라이언트의 수를 최대화하면서 JVM이 가비지 콜렉션을 수행하는 데 걸리는 시간을 최소화하는 것입니다. 벤치마킹 중 성능을 최대로 유지하려면 높은 힙 크기 값을 설정하여 벤치 마크 전체 실행 중에 가비지 수집이 발생하지 않도록 할 수 있습니다.



```
java.lang.OutOfMemoryError <<no stack trace available>>
java.lang.OutOfMemoryError <<no stack trace available>>
Exception in thread "main"
```



그럼 힙사이즈는 어떻게 조절하는게 좋을까?

#### Tuning Tips for Heap Sizes

- 힙 크기는 VM에서 사용하는 최대 메모리 양이 사용 가능한 실제 RAM의 양을 초과하지 않도록 값으로 설정해야 합니다. 이 값을 초과하면 OS가 Paging을 시작하여 성능이 크게 저하됩니다. VM은 항상 힙 크기보다 많은 메모리를 사용합니다. 내부 VM 기능, VM 외부의 기본 라이브러리 및 영구 생성 메모리 (Sun VM 전용 : 클래스 및 메소드를 저장하는 데 필요한 메모리)에 필요한 메모리는 힙 크기 설정 이외에 할당됩니다
- generational garbage collection scheme을 사용할 때, the nursery(보육) 크기는 전체 Java 힙 크기의 절반을 초과해서는 안됩니다. 일반적으로 힙 크기의 25 % ~ 40 %가 적당합니다.
- 프로덕션 환경에서는 최대 힙 크기와  최소 힙 크기를 동일한 값으로 설정하여 힙을 지속적으로 늘리거나 줄이는데 사용되는 VM 리소스를 낭비하지 않도록 하십시오. 이는 새롭게 생성된 힙 크기 (Sun) 또는 Nursey(보육) 크기 (Jrockit)에도 적용됩니다.



### JRockit JVM Heap Size Options



Table 5-2 JRockit JVM Heap Size Options

| TASK                                                         | Option                  | Description                                                  |
| :----------------------------------------------------------- | :---------------------- | :----------------------------------------------------------- |
| Setting the Nursery                                          | `-Xns `                 | Optimally, you should try to make the nursery as large as possible while still keeping the garbage collection pause times acceptably low. This is particularly important if your application is creating a lot of temporary objects.The maximum size of a nursery cannot exceed 95% of the maximum heap size. |
| Setting initial and minimum heap size                        | `-Xms `                 | Oracle recommends setting the minimum heap size (`-Xms)` equal to the maximum heap size (`-Xmx)` to minimize garbage collections. |
| Setting maximum heap size                                    | `-Xmx `                 | Setting a low maximum heap value compared to the amount of live data decrease performance by forcing frequent garbage collections. |
| Setting garbage collection                                   | `-Xgc: parallel `       |                                                              |
| Performs adaptive optimizations as early as possible in the Java application run. | `-XXaggressive:memory ` | To do this, the bottleneck detector will run with a higher frequency from the start and then gradually lower its frequency. This options also tells JRockit to use the available memory aggressively. |

### Java HotSpot VM Heap Size Options

Table 5-3 Java Heap Size Options

| Task                                         | Option                             | Comments                                                     |
| :------------------------------------------- | :--------------------------------- | :----------------------------------------------------------- |
| Setting the New generation heap size         | `-XX:NewSize `                     | As a general rule, set `-XX:NewSize` to be one-fourth the size of the heap size. Increase the value of this option for larger numbers of short-lived objects.Be sure to increase the New generation as you increase the number of processors. Memory allocation can be parallel, but garbage collection is not parallel. |
| Setting the maximum New generation heap size | `-XX:MaxNewSize `                  | Set the maximum size of the New Generation heap size.        |
| Setting New heap size ratios                 | `-XX:SurvivorRatio `               | The New generation area is divided into three sub-areas: Eden, and two survivor spaces that are equal in size.Configure the ratio of the Eden/survivor space size. Try setting this value to 8, and then monitor your garbage collection. |
| Setting initial heap size                    | `-Xms `                            | As a general rule, set intial heap size (`-Xms)` equal to the maximum heap size (`-Xmx)` to minimize garbage collections. |
| Setting maximum heap size                    | `-Xmx `                            | Set the maximum size of the heap.                            |
| Setting Big Heaps and Intimate Shared Memory | `-XX:+UseISM -XX:+AggressiveHeap ` | See `http://java.sun.com/docs/hotspot/ism.html![Opens a new window](https://docs.oracle.com/en/dcommon/img/new-window.png)` |