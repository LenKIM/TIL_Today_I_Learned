package com.yyy.xxx.myjsonandgson;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;

import com.yyy.xxx.myjsonandgson.model.Task;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

public class SimpleGsonActivity extends AppCompatActivity {

    private final static String TAG = SimpleGsonActivity.class.getName();

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        List<Task> list = new ArrayList<Task>();
        for (int i = 0; i < 20; i++) {
            list.add(new Task(i, "Test1", "Test2", Task.Status.ASSIGNED, 10));
        }
        Gson gson = new Gson();
        Type type = new TypeToken<List<Task>>() {}.getType();
        String json = gson.toJson(list, type);
        Log.d("json",json);
        List<Task> fromJson = gson.fromJson(json, type);

        for (Task task : fromJson) {
            Log.d(TAG, task + "");
        }
    }
}
