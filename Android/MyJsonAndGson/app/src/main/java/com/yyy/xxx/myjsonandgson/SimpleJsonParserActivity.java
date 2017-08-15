package com.yyy.xxx.myjsonandgson;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class SimpleJsonParserActivity extends AppCompatActivity {

    private TextView mTextView;
    private JSONObject mJSONObject;

    String strParseValue = null;

    private String strJSONvalue =  "{\"FirstObject\":{\"attr1\":\"one value\" ,\"attr2\":\"two value\","
            +"\"sub\": { \"sub1\":[ {\"sub1_attr\":\"sub1_attr_value\" },{\"sub1_attr\":\"sub2_attr_value\" }]}}}";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mTextView = (TextView) findViewById(R.id.TextView);

        try {
            parseJSON();
        } catch (JSONException e) {
            e.printStackTrace();
        }

    }

    private void parseJSON() throws JSONException {
        //JSON을 담아옴
        mJSONObject = new JSONObject(strJSONvalue);

        JSONObject object = mJSONObject.getJSONObject("FirstObject");
        String attr1 = object.getString("attr1");
        String attr2 = object.getString("attr2");

        strParseValue="Attribute 1 value => "+attr1;
        strParseValue+="\n Attribute 2 value => "+attr2;

        JSONObject subObject = object.getJSONObject("sub");

        JSONArray subArray  = subObject.getJSONArray("sub1");

        strParseValue+="\n Array Length => "+subArray.length();

        for(int i=0; i<subArray.length(); i++)
        {
            strParseValue+="\n"+ subArray.getJSONObject(i).getString("sub1_attr").toString();
        }

        mTextView.setText(strParseValue);
    }
}

// Actual JSON Value
/*
{"FirstObject": { "attr1":"one value" ,"attr2":"two value",

   "sub": { "sub1":[ {"sub1_attr":"sub1_attr_value" },{"sub1_attr":"sub2_attr_value" }]}
  }
"}; */


// Same JSON value in XML
/*
<FirstObject obj1="Object 1 value" obj2="Object 2 value">
	<sub>
	    <sub1 sub1_attr="sub1_attr_value" />
	    <sub1 sub1_attr="sub2_attr_value" />
	</sub>
</FirstObject> */