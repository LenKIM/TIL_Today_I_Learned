/**
 * Created by len on 2017. 4. 11..
 */
public class sort_insert {
    public static void main(String[] args) {

        int [] input = {5,2,6,15,3,4};

        int i, j, key;

        for(i = 1; i < input.length; i++){
            key = input[i];
//            for문 에서 2번째 는 조건문이 들어갔다
            for (j = i-1; (j >= 0) && (key < input[j]); j--){
                input[j + 1] = input[j];
                }
            System.out.print(j);
            input[j+1] = key;
            }

        for (i = 0; i < input.length; i++) {
            System.out.print(input[i] + "/");
            }
        }

    }
