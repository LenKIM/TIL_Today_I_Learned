
# 그래프의 개념과 표현.
![enter image description here](http://cfile3.uf.tistory.com/image/2603DF38591298A52CC792)


그래프의 개념과 그래프를 표현하는 방법.

그래프는 G = (V, E)로 표현되며
V : Vertex, 노드 혹은 정점
E : Edge, 노드쌍을 연결하는 엣지 혹은 링크
위와 같이 V와 E들의 집합으로 나타내어진다.

그래프는 개체들 간의 이진관계로 나타낼 수 있다.

위의 그림은 8개의 Vertex와 11개의 edge를 가지고 있다.

**n은 노드의 개수**
**m은 엣지의 개수**

![enter image description here](http://cfile24.uf.tistory.com/image/266ACE385912998B39E44F)

#### 그래프의 종류
1. **방향을 고려하지 않는 무방향그래프**
2. **방향을 고려한 방향 그래프**
3. **가중치를 가지고 있는 가중치 그래프**

#### 그래프의 표현
![enter image description here](http://cfile6.uf.tistory.com/image/2150A53A59129A073067BA)

1. **인접행렬(adjacency matrix)방법**
인접 행렬은 그래프의 n*n의 행렬을 표현하는 방법
인접 행렬 방법에서, i 번째행 j 번째 열을 Aij 라고 할 때
정점 i와 j 사이에 엣지가 있으면 1, 없으면 0으로 표시한다.  

예를 들어, 1과 2사이에 엣지가 있므로 1행 2열의 값은 1이 된다.  
마찬가지로 3과 4 사이에는 엣지가 없으므로 3행 4열의 값은 0이 된다.  

결과적으로 모든 행렬을 완성 했을 때 대칭 행렬의 구조를 가지는데,
여기서 대칭 행렬이라는 뜻은 대각선을 기준으로 접었을때 대칭 이라는 뜻이다.  

그래프에서 가장 기본적인 연산은, 해당 노드에서 인접한 노드를 찾는 연산이다.  
대부분의 그래프 알고리즘에서 필수적인 연산이다.  
그러한 인접 노드를 찾기위해서, 인접 행렬의 한 행 전체를 끝까지 읽는 방법이 있다.  
해당 행에서 1의 값을 가지고 있는 열이 인접한 노드이므로
인접하는 노드를 찾으려면 O(n)의 시간 복잡도를 가지게 된다.  

두번째로 중요한 연산은, 두 노드 u와 v를 연결하는 엣지가 있는지 확인하는 것으므로,
u행 v열의 값만 보면 되므로 O(1)의 시간 복잡도를 가진다.  
![enter image description here](http://cfile5.uf.tistory.com/image/2333793959129BC51D1102)
2. **인접리스트(adjacency list)**
인접 리스트에서는 배열 하나가 각각의 노드를 표시.
예를 들어 노드 5개가 있으므로 길이가 5개인 배열을 만든다.  
1번에 인접한 노드는 2와 5이므로 이를 리스트로 표현한다.  

노드 개수는 2m개 왜냐하면,  엣지 하나당 2개의 노드가 존재하기 때문에.
또한, 필요한 저장공간은 O(n+m)이 된다.  

그 다음 인접 행렬에서도 살펴본 2개의 기본 연산에 대해서 살펴보자면,
인접한 노드를 찾기위해 인접 리스트에서는 해당 노드에 연결 리스트의 길이 만큼의 시간이 필요하다.  
이 때, 어떤 노드 v에 실제로 인접한 노드의 개수는 degree(v)라고 부른다.  
따라서 O(degree(v))의 시간 복잡도를 가진다.  

둘째로, 어떤 에지 (u, v)가 존재하는지 검사하기 위해 모든 리스트를 찾아봐야하므로
O(degree(u))의 시간 복잡도를 가진다.  

![enter image description here](http://cfile30.uf.tistory.com/image/2718733C59129D98092799)


## 순회 - 그래프에서의 BFS
 그래프에 대한 첫번째 알고리즘으로 순회에 대해 알아보자.
 2가지의 대표적인 방법
 1. **BFS(Breadth-First Search) 너비우선탐색**
 2. **DFS(Depth-First Search) 깊이우선탐색**
![enter image description here](http://cfile27.uf.tistory.com/image/236962465912A477285A72)

BFS알고리즘이란 한마디로 말해서 그래프에서 노드들은 동심원의 형태로 방문하는 것.
BFS 알고리즘이란 한마디로 말해서 그래프에서 노드들을 동심원의 형태로 방문하는 것이라고 할수있다.  
먼저 순회를 위해서 출발점을 지정해야한다.  

위의 그림에서 출발점을 S라고 할 때, S에 인접한 노드들을 먼저 방문한다.  
이때 인접한 노드들이란, 거리가 1인 노드를 뜻한다.  
그리고나서 거리가 2, 3, ... 인 노드들을 차례로 방문한다.  

결과적으로 동심원의 형태로 차례로 퍼져나가는 형태를 보인다.  
이렇게 넓이가 점점 퍼져나가는 방식이 너비 우선 탐색의 기본 컨셉이다.  

![enter image description here](http://cfile8.uf.tistory.com/image/2448EB445912A5353112D7)

BFS는 큐로 구현 할 수 있다.

그전에, 너비 우선탐색에 대해 이미 언급한 바가 있는데, 이진 트리에서 레벨오더탐색이
BFS의 이진트리 버전이라고 할 수 있기 때문이다.
루트에서 출발해서 루트의 자식노드들을 방문하고, 이후에 다음 레벨의 노드들을 방문했다. 그러므로 레벨 오더 탐색과 동일하다고 생각하면 된다.

먼저 출발노드에 이미 방문된 노드라고 체크를 하고, 이 노드를 큐에 넣고 시작한다.

![enter image description here](http://cfile26.uf.tistory.com/image/272507415912A63B1BFDAD)

이 후에 while이 돌면서 큐가 빌때까지 해당 연산을 반복해준다.
큐에서 노드를 하나 뺴주고(1번노드) 뺀 노드의 인접한 노드중에서 체크되지 않은 모든 이웃 노드를 체크하고 그 노드들을 큐에 넣는다.

그 다음에 앞서 언급한 것처럼 똑같은 연산을 반복해 주면 된다.

![enter image description here](http://cfile25.uf.tistory.com/image/22189C385912A6862B2484)

모든 노드를 방문했을 때 큐가 비어있다면 연산을 종료, 그래프에서 모든 노드들이 체크되어 있는 상태이다.
어떤 노드를 시작점으로 잡았는지에 따라 방문 순서가 달라질 수 있다.

```java
BFS(G, s)// 그래프 G와 출발 노드 s
    Q <- ø; // 큐를 하나 생성
    Enqueue(Q,s);
    while Q!=ø do
        u <- Dequeue(Q)
        for each v adjacent to u do                                                                     
            if v is unvisited then
                mark v is visited;
                Enqueue(Q,v);
            end;
        end;
    end;
```

다음은 BFS에 대한 슈도 코드이다.  
큐를 하나 생성한 후 출발 노드를 넣고
해당 큐가 빌때까지 노드를 체크해주고 인접노드를 방문하고 큐에 넣는 연산을 반복한다.

```java
BFS(G, s)// 그래프 G와 출발 노드 s
    Q <- ø;
    d[v]<-0;
    π[v]<-null;
    Enqueue(Q,s);
    while Q!=ø do
        u <- Dequeue(Q)
        for each v adjacent to u do                                                                      
            if v is unvisited then
                mark v is visited;
                d[v]<-d[u]+1;
                π[v]<-u;
                Enqueue(Q,v);
            end;
        end;
    end;
```

BFS는 그래프의 모든 노드를 방문하는 것 이상의 일을 할 수 있는데 바로 **최단경로**이다.
BFS를 하면 각 노드에 대한 최단 경로의 길이를 구할 수 있다. 왜냐하면, s에서 Li에 속한 노드까지의 최단 경로는 i이기 때문이다.

따라서, 다음과 같은 입 출력을 구할 수 있다.  
입력 : 방향 혹은 무방향 그래프 G = (V,E), 그리고 출발 노드 s가 V에 속할 때  
출력 : 모든 노드 v에 대해서  
- d(v) = s로 부터 v까지의 최단 경로의 길이(엣지의 개수)  
- π(v) = s로부터 v까지의 최단 경로상에서 v의 직전 노드(predecssor)  

![enter image description here](http://cfile9.uf.tistory.com/image/273C7B4F5912B00B2DDC15)

위의 그림은 d와 π를 계산한 예이다.

![enter image description here](http://cfile22.uf.tistory.com/image/265777475912B0A405F207)

이처럼 각 노드 v와 π[v]를 연결하는 에지들로 구성된 트리를 BFS트리라고 한다.
위의 그림에서 시작점 s를 루트로 생각했을 때 나머지 노드들이 트리의 모양을 띠고 있다.
```JAVA
PRINT-PATH(G,s,v)
    if v=s then
        print s;
    else if π[v] = null then
        print "no path from s to v exists";                                                       
    else
        PRINT-PATH(G,s,π[v]);
        print v;
    end.
```

위의 슈도 코드는 최단 경로를 출력하는 코드이다.
재귀적으로 자신을 호출하여 최단 경로를 출력하게 된다.

너비 우선 순회는 방향 그래프이거나 disconnected 상태라면 BFS에 의해서 모든 노드가 방문되지 않을 수 있다. 따라서 이를 위해서 남은 노드에 대한 추가 연산을 진행해 주어야 한다.

```
BFS-ALL(G){
    while this exists unvisited node v
    BFS(G, v);
}
```

## 순회 - 그래프에서의 DFS
![enter image description here](http://cfile1.uf.tistory.com/image/244583375912C1CF20520D)


2번째 순회 알고리즘으로 DFS(Depth First Search)에 대해서 알아보도록 하자.  
참고로, 이진 트리의 inorder, preorder, postorder는 모두 DFS라고 할 수있다.  

그래프의 인접한 노드를 방문해서, 다시 그 노드의 인접한 노드로 계속 들어가다가
끝에 도달 했을 때 돌아오는것이 DFS이다.  

즉, BFS와 마찬가지로 시작점 s가 있어야하며
현재 노드를 visited로 체크하고 인접한 노드들 중 unvisited 노드가 존재하면 그 노드로 간다.  
위의 연산을 계속 반복하며 끝이 도달하면 다시 돌아오게 된다.  
그리고 unvisited가 있다면 해당 노드로 들어가며 앞서 했던 연산을 또 반복하게 된다.  

결국 모든 순회를 마칠 경우 시작 노드 s로 돌아오게 되고 더 이상 갈곳이 없으면 종료하게 된다.  

![enter image description here](http://cfile10.uf.tistory.com/image/260B723B5912C2D90434BE)

위의 그림은 이러한 DFS 연산을 그림으로 나타낸 것이다.  
탐색을 진행하는 것은 붉은색, 다시 되돌아오는 것을 초록색으로 표현했다.  

```java
DFS(G, v)
    visited[v] <- yes
    for each node adjacent to x do                                                                        
        if visited[v] = NO then
            DFS(G, u);
    end
end
```
DFS를 슈도코드로 표현했다.
DFS는 앞서 본 이진 트리의 in/pre/post order 탐색 방식과 비슷하므로 재귀로 표현하는 것이 가장 간명하다.  
따라서, 인접 노드의 visited가 NO이면 재귀적으로 자신을 호출해서 탐색을 진행하게 된다.

여기서 상위의 노드로 되돌아가는 것은, 재귀적으로 호출했으므로 visited가 if문을 만족할 경우 그대로 for문을 빠져나오게 된다. 호출이 종료되며 자신을 호출한 함수로 반환되는데, 이 때 반환되는 위치가 상위의 노드와 동일하므로 별도로 명시를 안하더라도 상위 노드로 돌아가게된다.

그래프가 disconnect이거나 방향 그래프라면 DFS가 모든 노드를 방문하지 않을 수 있다. 그럴 때는 DFS를 반복하며 모든 노드를 방문하면 된다.

```java
DFS-ALL(G)
{
   for each v->v
       visited[v] <- no
   for each v->v
       if(visited[v] = NO) then                                                                          
           DFS(G,v);
}
```

시간 복잡도는 O(n+m)
