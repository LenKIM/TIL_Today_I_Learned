package com.yyy.xxx.mybutterknife;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

/**
 *  버터나이프의 버전이 틀릴 경우에 발생하는 에러에 대해서 꼭 맞쳐야 한다!
 *  핸들러 때문에 버터나이프를 많이 사용한다.
 *
 */
public class MainActivity extends AppCompatActivity {

    @BindView(R.id.btn_2)
    Button mButton2;

    @BindView(R.id.textView2)
    TextView mTextView2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //initalization
        ButterKnife.bind(this);


        Button aa = (Button) findViewById(R.id.btn_1);
        aa.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(getApplicationContext(), "1번 버튼입니다", Toast.LENGTH_SHORT).show();
            }
        });
        mTextView2.setText("1234");
        TextView bb = (TextView) findViewById(R.id.textView1);
    }

        @OnClick(R.id.btn_2)
        void onClickmethod(){
            Toast.makeText(getApplicationContext(), "2번 버튼입니다",Toast.LENGTH_SHORT).show();

        }
    }
