
#ConnectivityManager이란?
 간단하게 생각해서 네트워크의 상태를 파악하는것,

##그렇다면 어떻게 쓰이는가?
  //*1. 부분적 네트워크 확인으로*
  ConnectivityManager manager = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
  NetwordInfo networdInfo = manager.getActiveNetworkInfo();

  if(networdInfo == null) {
    Toast.makeText(getApplicationContext(), "인터넷 연결확인", Toast.Length_SHORT).show();
    finish();
  } else if(!locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER)){
    //GPS 연결 확인부분
  } else if(!bluetoothAdapter.isabled)){
    //블루투스 연결 체크 확인부부
  } else {

  }

  /*/2. BroadcastReceiver를 활용한 CallBack메소드*

 public class NetworkReceiver extends BroadcastReceiver {

@override
public void onReceive(Context context, Intent intent) {
  ConnectivityManager connectivityManager =
    (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
    NetworkInfo networkInfo = connectivityManager.getActiveNetworkInfo();

    if(networkInfo == null){
      //null이라면 연결을 해제.
    } else if(networkInfo.getType() == ConnectivityManager.TYPE_WIFI) {
      networkType = ConnectivityManager.TYPE_WIFI;
      onChangeMobileStatusListener.OnChanged(WIFI_NETWORK_STATE_CONNECTED);
      networkIsConnected = true;
    } else if(networkInfo.getType() == ConnectivityManager.TYPE_MOBILE) {
      networkType = ConnectivityManager.TYPE_MOBILE;
      onChangeMobileStatusListener.OnChanged(MOBILE_NETWORK_STATE_CONNECTED);
      networkIsConnected = true;
    }
}
    이러한 방식으로 쓰일수 있다.

    조금더 확장하면 2번째 BroadcastReceiver를 IntentFilter를 활용하여 여러 Action에 대처할 수 있는 클래스를 만들수 있다.
