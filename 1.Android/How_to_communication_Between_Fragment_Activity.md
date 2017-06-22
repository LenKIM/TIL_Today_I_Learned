# 안드로이드 Fragment에서 Activity와 통신하기

Fragment는 여러 Activity에서 사용될 수 있으므로 Activity에 독립적으로 구현 되어야한다.

Fragment는 getActivity()메서드로 Attach되어 있는 Activity를 가져올 수 있습니다.

1. Activity로 이벤트 콜백 메소드 만들기.
Fragment내에서 발생하는 이벤트를 Activity와 공유하기 위해서는 Fragment에서 이벤트 콜백 인터페이스를 정의하고 Activity에서 그 인터페이스를 구현해야 합니다.

2. 직접적인 접근을 통한 전달.
    DetailFragment detailFragment = (DetailFragment)getActivity().getFragmentManager().findFragmentById(..);
    detailFragment.viewArtical(...)

  그러나 이러한 방식은 Fragment를 독립적으로 만들기에 한계가 있으므로 다시 첫번째로 돌아가보자.

 1-1. 일단 콜백 메스드를 정의하고(Fragment 안에다가).

    onTextSendListener mListener;

    public interface onTextSendListener{
        void isDeliverTextEnd(Boolean end);
    }

 1-2. 액티비티내에 콜백메서드를 정의하고.

     public class BibleSelectActivity extends AppCompatActivity
            implements ...
    SelectVerseFragment.onTextSendListener {


    @Override
    public void isDeliverTextEnd(Boolean end) {

        if (end){
            Intent intent = new Intent(BibleSelectActivity.this, MainActivity.class);
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
            startActivity(intent);
            finish();
        }
    }

 1-3. 다음, Fragment에서 Activity에 대한 참조를 얻어와야하 합니다. Fragment는 onAttach lifecycle 콜백함수에서 Activity 에 대한 참조를 얻을 수 있습니다.

     @Override
         public void onAttach(Context context) {
             super.onAttach(context);
             Log.d(TAG, "onAttach 호출");

             try {
                 mListener = (onTextSendListener) context;
             }catch (ClassCastException e){
                 throw new ClassCastException(context.toString() + " must implement onTextSendListener");
             }
         }

 1-4 마지막으로 액티비티내에서도 콜백메서드가 구현되었고, 프래그먼트에는 인터페이스만 구혀되었기 때문에, 직접적으로 사용해야한다.

     mListener.isDeliverTextEnd(true);

끝.

참조 : http://ismydream.tistory.com/135
