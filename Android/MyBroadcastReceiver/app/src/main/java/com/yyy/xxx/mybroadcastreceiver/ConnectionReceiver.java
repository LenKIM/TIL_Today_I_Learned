package com.yyy.xxx.mybroadcastreceiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.util.Log;
import android.widget.Toast;

/**
 * Created by len on 2017. 2. 22..
 */

public class ConnectionReceiver extends BroadcastReceiver {


    @Override
    public void onReceive(Context context, Intent intent) {

        String action = intent.getAction();
        Log.d("Action : ",  "" + intent.getAction());

        if (action.equals("SOME_ACTION")) {
            Toast.makeText(context, "Get Action from Main Activity", Toast.LENGTH_SHORT).show();
        }
        else if (action.equals("LEN")) {
            {
                ConnectivityManager cm =
                        (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);

                NetworkInfo activeNetwork = cm.getActiveNetworkInfo();
                boolean isConnected = activeNetwork != null &&
                        activeNetwork.isConnectedOrConnecting();

                if (isConnected) {
                    try {
                        Toast.makeText(context, "Network is connected", Toast.LENGTH_SHORT).show();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                } else {
                    Toast.makeText(context, "Network is changed or reconnected", Toast.LENGTH_LONG).show();

                }
            }
        }
    }
}
