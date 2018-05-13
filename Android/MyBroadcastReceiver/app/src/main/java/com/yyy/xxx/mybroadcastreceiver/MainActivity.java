package com.yyy.xxx.mybroadcastreceiver;

import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

import butterknife.ButterKnife;
import butterknife.OnClick;

public class MainActivity extends AppCompatActivity {

    IntentFilter mIntentFilter;
    ConnectionReceiver mReceiver;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //초기화
        ButterKnife.inject(this);

        mReceiver = new ConnectionReceiver();
        mIntentFilter = new IntentFilter("SOME_ACTION");
        mIntentFilter.addAction("LEN");
    }

    @Override
    protected void onResume() {
        super.onResume();
        registerReceiver(mReceiver, mIntentFilter);
    }

    @Override
    protected void onDestroy() {

    super.onDestroy();
        unregisterReceiver(mReceiver);
    }

    @OnClick(R.id.btn_broadcast)
    void someMethod(){
        Intent intent = new Intent("SOME_ACTION");
        sendBroadcast(intent);
    }

    @OnClick(R.id.btn_connection)
    void connection(){
//        Toast.makeText(getApplicationContext(), "하하하",Toast.LENGTH_SHORT).show();
        Intent intent2 = new Intent("LEN");
        sendBroadcast(intent2);
    }
}