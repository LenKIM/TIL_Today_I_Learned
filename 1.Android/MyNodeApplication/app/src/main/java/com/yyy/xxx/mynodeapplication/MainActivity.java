package com.yyy.xxx.mynodeapplication;

import android.os.AsyncTask;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.yyy.xxx.mynodeapplication.INTERFACE.MyCustomService;
import com.yyy.xxx.mynodeapplication.MODEL.Board;

import java.io.IOException;
import java.util.List;

import retrofit2.Call;
import retrofit2.Response;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });

        //전송하면 모든 내용이 서버로 전소오딘다
        Button send = (Button) findViewById(R.id.send_all);
        send.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                EditText title_edit = (EditText) findViewById(R.id.edit_send_title);
                Board.getInstance().setTitle(title_edit.getText().toString().trim());

                EditText contents_edit = (EditText) findViewById(R.id.edit_send_contents);
                Board.getInstance().setContents(contents_edit.getText().toString().trim());

                EditText writer_edit = (EditText) findViewById(R.id.edit_send_writer);
                Board.getInstance().setWriter(writer_edit.getText().toString().trim());

                if (Board.getInstance().getTitle().equals("")){
                    Toast.makeText(MainActivity.this, "제목을 입력해주세요.",Toast.LENGTH_SHORT).show();
                } else if (Board.getInstance().getContents().equals("")){
                    Toast.makeText(MainActivity.this, "내용을 입력해주세요.", Toast.LENGTH_SHORT).show();
                } else if (Board.getInstance().getWriter().equals("")){
                    Toast.makeText(MainActivity.this, "작성자 입력해주세요.", Toast.LENGTH_SHORT).show();
                } else{
                    send_to_server();
                }

            }

            private void send_to_server() {
                MyCustomService myCustomService = MyCustomService.RETROFIT.create(MyCustomService.class);
                Call<Board> call = myCustomService.setLine(
                        Board.getInstance().getTitle(),
                        Board.getInstance().getWriter(),
                        Board.getInstance().getContents());
                new NetworkCall2().execute(call);

            }
        });
        findViewById(R.id.getAll).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                MyCustomService myCustomService = MyCustomService.RETROFIT.create(MyCustomService.class);
                Call<List<Board>> call = myCustomService.getList();
                new NetworkCall().execute(call);
                //여기서 서버에 저장된 내용 가져오기
            }
        });

        findViewById(R.id.btn_delete).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                String input_id = ((EditText)findViewById(R.id.delete_id)).getText().toString();

                MyCustomService myCustomService = MyCustomService.RETROFIT.create(MyCustomService.class);
                Call<Board> call = myCustomService.deleteLine(input_id);
                new NetworkCall2().execute(call);
            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    public class NetworkCall extends AsyncTask<Call, Void, String> {


        @Override
        protected String doInBackground(Call... params) {
            try {
                Call<List<Board>> call = params[0];
                Response<List<Board>> response = call.execute();

//                Log.d("TAG", response.body() + "");
//                Log.d("TAG", response.code() + "");
//                Log.d("TAG", response.raw() + "");

                return response.body().toString();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return null;
        }

        @Override
        protected void onPostExecute(String result) {
            final TextView textView = (TextView)findViewById(R.id.getAll_textView);
            textView.setText(result);
        }
    }

    public class NetworkCall2 extends AsyncTask<Call, Void, Boolean> {

        @Override
        protected Boolean doInBackground(Call... params) {
            try{
                Call<Board> call = params[0];
                Response<Board> response = call.execute();
                return response.isSuccessful();
            }catch (IOException e){
                e.printStackTrace();
            }
            return false;
        }

        @Override
        protected void onPostExecute(Boolean result) {
            final TextView textView = (TextView)findViewById(R.id.getAll_textView);
            textView.setText(result.toString());
        }


    }

}
