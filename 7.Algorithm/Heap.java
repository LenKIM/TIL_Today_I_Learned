/**
 * Created by len on 2017. 4. 12..
 */
public class Heap {

    public static void main(String[] args)
    {

        int [] m= {1,3,5,2,4,7,6,9,8,10};
        //int [] m = {1,2,3,4,5,6,7,8,9,10};
        heapsort(m);
        System.out.println();
        dispM(m);

    }
    public static void heapsort( int [ ] a )
    {
        //프로그래밍상 배열의 시작은 0이기 때문에 이를 맞쳐주기 위해서
        for( int i = a.length / 2-1; i >= 0; i-- )  /* buildHeap */
            heaptree( a, i, a.length );
//        dispM(a);
        for( int i = a.length - 1; i > 0; i-- )
        {
            swap( a, 0, i );            /* deleteMax */
            heaptree( a, 0, i );
            //dispM(a);
        }
    }

    //부모노드가 i이면 왼쪽자식노드는 2*i +1 오른쪽자식노드는 2*i+2
    private static void heaptree( int [ ] a, int i, int n ) //트리를 만들 배열, 시작할 부모, 힙할 크기
    {
        int child;
        int tmp;
        for( tmp = a[ i ]; 2*i + 1 < n; i = child  )
        {
            child = 2*i+1;
            if( child != n - 1 && a[ child ] < a[ child + 1 ]   )
                child++;
            if( tmp  < a[ child ]   )
                a[ i ] = a[ child ];
            else
                break;
        }
        a[ i ] = tmp;
    }
    public static final void swap( int [ ] a, int n, int m )
    {
        int tmp = a[ n ];
        a[ n ] = a[ m ];
        a[ m ] = tmp;
    }
    public static void dispM(int [] m)
    {
        for(int i=0; i<m.length;i++)
            System.out.printf("%-5d ", m[i]);
        System.out.println();
    }
}