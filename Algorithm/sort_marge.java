/**
 * Created by len on 2017. 4. 11..
 */
public class sort_marge {

        public static void print_arr (int[] arr) {
            for (int i = 0; i < arr.length; i++) {
                System.out.print(arr[i] + " ");
            }
            System.out.println();
        }

        public static void merge (int[] arrA, int[] arrB, int[] arrC) {
            int iA = 0;
            int iB = 0;
            int iC = 0;

            while (iA < arrA.length) {
                if (iB < arrB.length) {
                    if ( arrA[iA] < arrB[iB]) {
                        arrC[iC] = arrA[iA];
                        iA++;
                    } else {
                        arrC[iC] = arrB[iB];
                        iB++;
                    }
                    iC++;
                } else {
                    while (iA < arrA.length) {
                        arrC[iC] = arrA[iA];
                        iA++;
                        iC++;
                    }
                }
            }

            while (iB < arrB.length) {
                arrC[iC] = arrB[iB];
                iB++;
                iC++;
            }
        }

        public static void merge_sort (int[] arr) {
            int n = arr.length;

            if (n == 1) return;

            int[] arr_temp1 = new int[n/2];
            int[] arr_temp2 = new int[n - n/2];

            for (int i = 0; i< n/2; i++) {
                arr_temp1[i] = arr[i];
            }
            for (int i = 0; i< n - n/2; i++) {
                arr_temp2[i] = arr[i + n/2];
            }
            System.out.print("Array S1: ");
            print_arr(arr_temp1);
            System.out.print("Array S2: ");
            print_arr(arr_temp2);

            merge_sort(arr_temp1);
            merge_sort(arr_temp2);

            merge(arr_temp1, arr_temp2, arr);
            System.out.print("Array S: ");
            print_arr(arr);
        }

        public static void main (String[] args) {
            int[] arr = {85, 24, 63, 45, 17, 31, 96, 50};
            System.out.print("정렬 전 배열: ");
            print_arr(arr);
            merge_sort(arr);
            System.out.print("정렬된 배열: ");
            print_arr(arr);
        }
    }
