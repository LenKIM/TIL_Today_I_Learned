package yyy.xxx.com.rxjavaex;

import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

/**
 * Example local unit test, which will execute on the development machine (host).
 *
 * @see <a href="http://d.android.com/tools/testing">Testing documentation</a>
 */
public class ExampleUnitTest {
    @Test
    public void addition_isCorrect() throws Exception {
        assertEquals(4, 2 + 2);
    }



    @Test
    public void testGuGudan(){
        int dan = 3;

        for (int row = 1; row <=9 ; row++) {
            System.out.println(dan + " * " + row + " = " + (dan*row));

        }

        assertTrue(true);
    }
}