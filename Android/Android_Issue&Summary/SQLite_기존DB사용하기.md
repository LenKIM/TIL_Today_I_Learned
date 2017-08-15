
 ### SQLlite를 활용해서 기존의 DB가져와서 단말기에 저장하는 방법.

    import android.content.Context;
    import android.database.Cursor;
    import android.database.sqlite.SQLiteDatabase;
    import android.util.Log;

    import java.io.BufferedInputStream;
    import java.io.BufferedOutputStream;
    import java.io.File;
    import java.io.FileInputStream;
    import java.io.FileNotFoundException;
    import java.io.FileOutputStream;
    import java.io.IOException;
    import java.util.HashMap;
    import java.util.Map;

    /**
     * Created by len on 2017. 2. 10..
     *
     * DB 연동을 위한 클래스.
     */

    public class BibleBD {

        private static final String TAG = BibleBD.class.getName();
        SQLiteDatabase db;
        Context mContext;
        DatebaseHelper mHelper;

        public BibleBD(Context context) {
            mContext = context;
            mHelper = new DatebaseHelper(context);
        }


        /**
         *  DB 조회
         *  @return 결과를 리턴 MAP
         */

        public Map SelectBibleName(String abbreviation, String bibleVersion){

            Map map = new HashMap();

            db = mHelper.getReadableDatabase();
            Cursor cursor;

            cursor = db.rawQuery("SELECT abbreviation, version FROM bible_version_key" +
                        "WHERE abbreviation='KJV'",null);

            if (cursor.moveToFirst()){
                map.put("abbreviation", cursor.getString(cursor.getColumnIndex("abbreviation")));
                map.put("version", cursor.getString(cursor.getColumnIndex("version")));
            } else {
                map = null;
            }

            cursor.close();
            mHelper.close();

            return map;
        }

        /**
         * DB파일을 복사 // 내장되어 있는 DB를 외장메모리로 복사
         *
         */

        private void TransferFile(String toPath, String toFilename, String srcName){

            String destinationName = toPath + "/" + toFilename;

            try {
                File targetPath = new File(toPath);

                Log.d(TAG, "Transfer Src = " + srcName);
                Log.d(TAG, "Transfer Dest = " + destinationName);

                targetPath.mkdirs();

                File fi = new File(srcName);
                File fo = new File(destinationName);

                FileInputStream fis = new FileInputStream(fi);
                BufferedInputStream bis = new BufferedInputStream(fis);

                FileOutputStream fos = null;
                BufferedOutputStream bos = null;

                if (fo.exists()){
                    fo.delete();
                    fo.createNewFile();
                }

                fos = new FileOutputStream(fo);
                bos = new BufferedOutputStream(fos);

                int read = -1;
                byte[] buffer = new byte[1024];

                while ((read = bis.read(buffer,0,1024)) != -1){
                    bos.write(buffer, 0, read);
                }

                bos.flush();
                fos.close();
                bos.close();
                fis.close();

            } catch (FileNotFoundException e) {
                Log.w(TAG, "FILE not fount(" + srcName + " or " + destinationName+ ")");
            } catch (IOException e) {
                Log.w(TAG, "io exception("+ srcName + "to" + destinationName + ")");
            }
        }
    }



메인 액티비티에서 만약 DB가 없다면, DB를 복사하고,

isCheckDB(mContext);
   : DB가 있는지 여부를 판단하는 메서드

copyDB(mContext);
   : DB를 복사함.

    public class MainActivity extends AppCompatActivity {

        public static String PACKAGE_NAME;
        public static String DB_NAME = "biblesqlite.db";

        private Button mButton;
        private TextView mTextView;
        private XmlResourceParser xrp;
        private static final String TAG = MainActivity.class.getName();
        private Document doc;
        BibleBD mBibleBD;
        Context mContext;
        String[] Size;


        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_main);

            mContext = this;
            mBibleBD = new BibleBD(mContext);

            mButton = (Button) findViewById(R.id.start_parse);
            mTextView = (TextView) findViewById(R.id.contents);

            PACKAGE_NAME = getApplicationContext().getPackageName();

            try {
                boolean bResult = isCheckDB(mContext);

                Log.d("BibleApp", "DB Check = " + bResult);

                if (!bResult) {
                    // DB가 없으면 복사
                    copyDB(mContext);
                } else {
                    Log.d(TAG, "이미 복사 완료");
                }

            } catch (Exception e) {

            }
        }

        //DB가 있느냐 없느냐 확인하자
        private boolean isCheckDB(Context context) {
            String filePath = "/data/data/" + MainActivity.PACKAGE_NAME + "/databases/" + MainActivity.DB_NAME;
            File file = new File(filePath);

            if (file.exists()) {
                return true;
            }
            return false;
        }

        // DB를 복사하기
        // assets의 /db/xxxx.db 파일을 설치된 프로그램의 내부 DB공간으로 복사하기
        public void copyDB(Context mContext) {

            Log.d(TAG, "copyDB");
            AssetManager manager = mContext.getAssets();

            String folderPath = "/data/data/" + MainActivity.PACKAGE_NAME + "/databases";

            String filePath = "/data/data/" + MainActivity.PACKAGE_NAME + "/databases/" + MainActivity.DB_NAME;

            File folder = new File(folderPath);
            File file = new File(filePath);

            FileOutputStream fos = null;
            BufferedOutputStream bos = null;


            try {

                InputStream is = manager.open(MainActivity.DB_NAME);
                BufferedInputStream bis = new BufferedInputStream(is);

                if (!folder.exists()) {
                    folder.mkdirs();
                }

                if (file.exists()) {
                    file.delete();
                    file.createNewFile();
                }

                fos = new FileOutputStream(file);
                bos = new BufferedOutputStream(fos);

                int read = -1;

                byte[] buffer = new byte[1024];

                while ((read = bis.read(buffer, 0, 1024)) != -1) {
                    bos.write(buffer, 0, read);
                }

                bos.flush();
                bos.close();
                fos.close();
                bis.close();
                is.close();

            } catch (IOException e) {
                Log.e("ErrorMessage : ", e.getMessage());
            }
