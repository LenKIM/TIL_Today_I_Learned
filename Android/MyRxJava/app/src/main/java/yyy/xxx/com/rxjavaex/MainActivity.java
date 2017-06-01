package yyy.xxx.com.rxjavaex;

import android.content.Context;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import io.reactivex.Observable;

public class MainActivity extends AppCompatActivity {

    Context mContext;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mContext = this;
//        TextView tv = (TextView) findViewById(R.id.hello_world);
//        Observable.just(tv.getText().toString()) // Input
//                .map(s -> s+ " Rx!")
//                .subscribe(text -> tv.setText(text));
        TextView output = (TextView) findViewById(R.id.resultView);
        EditText input = (EditText) findViewById(R.id.input_guguDan);
        Button print = (Button) findViewById(R.id.printButton);

        print.setOnClickListener(v -> {
            output.setText("");
            Observable
                    .just(input.getText().toString())
//                    .range(1,9)
//                    .map(row -> {
//                        if(dan < 2 || dan >9) throw new NumberFormatException("");
//                        if(row == 1) output.setText("");
//                        return dan + " * " + row + " = " + (dan * row);
//                    })
//                    => 아래와 같이 변경 가능.
                    .map(dan -> Integer.parseInt(dan))
                    .filter(dan -> 1 < dan && dan < 10)
                    .flatMap(dan -> Observable.range(1,9),
                            (dan, row) -> dan + " * " + row + " = " + (dan*row))
                    .map(row -> row + '\n')
                    .subscribe(
                            output::append,
                            e -> Toast.makeText(mContext,
                                    "GuGuDan could be between 2 and 9 dan.",
                                    Toast.LENGTH_SHORT).show());
        });
    }


}
