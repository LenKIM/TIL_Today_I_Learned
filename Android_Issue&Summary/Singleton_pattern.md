

#Singleton이란?

프로그래밍 세계에 OOP 의 개념이 생기면서 객체 자체에 대한 많은 연구와 패턴(pattern)들이 생겨났다.  
singleton pattern은 인스턴스가 사용될 때에 똑같은 인스턴스를 만들어 내는 것이 아니라, 동일 인스턴스를 사용하게끔 하는 것이 기본 전략이다.  
프로그램상에서 동일한 커넥션 객체를 만든다던지, 하나만 사용되야하는 객체를 만들때 매우 유용하다.  
singleton pattern은 4대 디자인 패턴에 들어갈 정도로 흔히 쓰이는 패턴이다. 물론 core java(java.lang.Runtime, java.awt.Desktop 등등)에서도 singleton pattern이 사용된다.  

 회사에서 쓰인 싱글톤 하나 예제를 빌려오면.

    public class User {  

        //이곳은 필요한 String들 정의한 곳

        public static final String KIND_BANDI = "bandi";
        public static final String KIND_FACEBOOK = "facebook";

        //User instance를 private로 선언.

        private static User instance = new User();

        //static으로 선언했기 때문에 클래스 변수는 상관없이 사용이 가능하나, 앞의 private접근제어라조 인해
        User.instance로의 접근은 불가하다. 이런 상태에서 생성자를 private로 명시한다. 생성자 또한 private를 붙이게 되면
        , New 키워드를 사용할 수 없게된다. 즉 User instance = new User(); 이런 방법을 통한 인스턴스 생성은 불가능해진다.
        결국 외부클래스가 User클래스의 인스턴스를 가질 수 있는 방법은 getInstance() Method를 사용하는 수 밖에 없다.


        //필요한 변수들을 private로 정의.
        private int id;
        private String email;
        private String name;
        private String birth;
        private String gender;
        private String kind;
        private Bitmap profileImage;
        private boolean login;

       //생산자 또한 private로 선언하여 User()의 내용을 감추기!
        private User(){
            this.id = -1;
            this.email = null;
            this.name = null;
            this.birth = null;
            this.gender = null;
            this.kind = null;
            this.profileImage = null;
            login = false;
        }
        //오직 getInstance로 조회 가능하게 !!
        public static User getInstance(){
            return instance;
        }

        public void setID(int input){
            this.id = input;
            login = id >= 0;
        }
        public void setEmail(String input){
            this.email = input;
        }
        public void setName(String input){
            this.name = input;
        }
        public void setBirth(String input){
            this.birth = input;
        }
        public void setGender(String input){
            this.gender = input;
        }
        public void setKind(String input){
            this.kind = input;
        }
        public void setProfileImage(Bitmap input){
            this.profileImage = input;
        }
        public int getID(){
            return this.id;
        }
        public String getEmail(){
            return this.email;
        }
        public String getName(){
            return this.name;
        }
        public String getBirth(){
            return this.birth;
        }
        public String getGender(){
            return this.gender;
        }
        public String getKind(){
            return this.kind;
        }
        public Bitmap getProfileImage(){
            return this.profileImage;
        }
        public boolean isLogin(){
            return login;
        }

        public void clear(){
            this.id = -1;
            this.email = null;
            this.name = null;
            this.birth = null;
            this.gender = null;
            this.kind = null;
            this.profileImage = null;
            this.login = false;
        }
    //여기서 clear에서 각 userinfo에 null을 선언하는 이유는 GC는 null이라는 것을 보고 처리하기 때문
    }
