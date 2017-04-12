/**
 * Created by len on 2017. 4. 11..
 */
public class sort_select {
    public static void main(String[] args) {

        int [] input = {5,4,3,2,1};
        int i, j, min;
        int temp = 0;

        for (i = 0; i < input.length; i++){
            min = input[i];
            for (j = i; j < input.length-1; j++){
                if (min > input[j+1]){
                    min = input[j+1];
                    temp = j+1;
                }
            }
            if (input[i] != min) {
                input[temp] = input[i];
                input[i] = min;
            }
        }


    }
}
