
기존에 가지고 있는 DB를 사용하기 위해서는 다음과 같은 일련의 절차를 지나가야 한다.

1. IDE assets폴더를 생성한다.

![스크린샷 2017-02-11 오후 3.06.24](http://i.imgur.com/XZ5oDiC.png)

 assets 폴더를 생성하는 가장 최적적인 방법은(이거 때문에 삽질...)
JAVA에서 오른쪽 마우스키 다음... 아니 아래 사진을 보자.

![스크린샷 2017-02-11 오후 3.08.12](http://i.imgur.com/0X5DA76.png)

 이런식으로 설정하자.
 잘 보면 어셋 폴더가 보인다.

2. 생성된 assets에 기존 DB를 넣는다.

  ![스크린샷 2017-02-11 오후 3.09.53](http://i.imgur.com/UYGJsPG.png)

4. 복사, 열기 그리고 접근하기.

 그 전에 몃가지 클래스를 알아볼 필요가 있다.

 1. SQLiteOpenHelper Class
 – SQlite DB를 사용하기 위해서 이 클래스를 상속받아야 함.
 – 주로 Database 생성, 버전 업그레이드에 사용됨.

 2. SQliteDatabase Class
 – 기본적인 Database 쿼리를 담당.
 – 이 클래스는 두가지로 사용될 수 있다. 하나는 생성과 헬퍼 클래스로부터 인스턴스를 얻을수 잇다.

 3. Cursor Class
 – Database 쿼리로 부터 반환되며, Cursor를 이용하여 읽기/쓰기를 한다.

 아래 샘플은 아래와 같은 특징을 갖는다.
 – 새로운 디비를 만들고자 할때.
 – 기존에 존재하던 디비를 사용하고자 할때.
 – 런타임 시 디비 파일을 이동하고자 할때.

 자 이제 ‘assets’폴더에 디비 파일이 있다고 가정하자. 당연히 없다면 추가하거나 그냥 있어도 상관없다.

아래의 코드를 사용할 수 있다.

    public class BibleDataBaseHelper extends SQLiteOpenHelper {

    private static final String TAG = BibleDataBaseHelper.class.getName();
    //The Android’s default system path of your application database.
    private static String DB_PATH = "/data/data/com.yyy.xxx.parseapplication2/databases/";


    private static String DB_NAME = "biblesqlite.db";
    private SQLiteDatabase myDataBase;
    private final Context myContext;

    /**
     * Constructor
     * Takes and keeps a reference of the passed context in order to access to the application assets and resources.
     * @param context
     */
    public BibleDataBaseHelper(Context context) {

        super(context, DB_NAME, null, 1);
        this.myContext = context;
    }

    /**
     * Creates a empty database on the system and rewrites it with your own database.
     * */
    public void createDataBase() throws IOException {

        boolean dbExist = checkDataBase();

        if(dbExist){

        //do nothing – database already exist
        Log.d(TAG, "파일 존재함");

        }else{

        //By calling this method and empty database will be created into the default system path
        //of your application so we are gonna be able to overwrite that database with our database.

            this.getReadableDatabase();

            try {

                copyDataBase();

            } catch (IOException e) {

                throw new Error("Error copying database");

            }
        }

    }

    /**
     * Check if the database already exist to avoid re-copying the file each time you open the application.
     * @return true if it exists, false if it doesn’t
     */
    private boolean checkDataBase(){

        SQLiteDatabase checkDB = null;

        try{
            String myPath = DB_PATH + DB_NAME;
            checkDB = SQLiteDatabase.openDatabase(myPath, null, SQLiteDatabase.OPEN_READONLY);

        }catch(SQLiteException e){

        //database does’t exist yet.

        }

        if(checkDB != null){

            checkDB.close();

        }

        return checkDB != null ? true : false;
    }

    /**
     * Copies your database from your local assets-folder to the just created empty database in the
     * system folder, from where it can be accessed and handled.
     * This is done by transfering bytestream.
     * */
    private void copyDataBase() throws IOException{

        //Open your local db as the input stream
        InputStream myInput = myContext.getAssets().open(DB_NAME);

        // Path to the just created empty db
        String outFileName = DB_PATH + DB_NAME;

        //Open the empty db as the output stream
        OutputStream myOutput = new FileOutputStream(outFileName);

        //transfer bytes from the inputfile to the outputfile
        byte[] buffer = new byte[1024];
        int length;
        while ((length = myInput.read(buffer))>0){
            myOutput.write(buffer, 0, length);
        }

        //Close the streams
        myOutput.flush();
        myOutput.close();
        myInput.close();

    }


    public void openDataBase() throws SQLException {

        //Open the database
        String myPath = DB_PATH + DB_NAME;
        myDataBase = SQLiteDatabase.openDatabase(myPath, null, SQLiteDatabase.OPEN_READONLY);

    }

    @Override
    public synchronized void close() {

        if(myDataBase != null)
            myDataBase.close();

        super.close();

    }

    @Override
    public void onCreate(SQLiteDatabase db) {

    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

    }

이렇게 HelpClass를 만들었다면 메인 액티비티에는?

    @Override
       protected void onCreate(Bundle savedInstanceState) {
           super.onCreate(savedInstanceState);
           setContentView(R.layout.activity_main);

           mHelper = new BibleDataBaseHelper(this);

           try {

               mHelper.createDataBase();
               Log.d(TAG, "CREATEDATABASE");
           } catch (IOException ioe) {

               throw new Error("Unable to create database");

           }

           try {

               mHelper.openDataBase();
               Log.d(TAG, "Open DATABASE");

           }catch(SQLException sqle){
               throw sqle;
           }

끝!
