package dagger;

import android.app.Application;
import android.content.Context;

import javax.inject.Singleton;

/**
 * Created by len on 2017. 5. 2..
 */
@Module
public class AppModule {

    private Application mApplication;

    public AppModule(Application application) {
        mApplication = application;
    }


    /**
     *
     The @Provides annotation tells Dagger that the method provides a certain type of dependency,
     in this case, a Context object. When a part of the app requests that Dagger inject a Context,
     the @Provides annotation tells Dagger where to find it.
     @Provides 어노테이션은 데거에게 이 메소드는 어떤 타입의 의존성을 공급한다라는 말입니다
     이 경우에는 Context object를 말합니다 앱의 일부가 Context 를 요청할 때 @Provides 어노테이션은 데거한테 어디서 이것을 찾을 수 있는지 말해줍니다
     * @return
     *
     * The @Singleton annotation tells Dagger that there should only be a singleton instance of
     * that dependency and removes a lot of the boilerplate singleton code for you.
     */
    @Provides
    @Singleton
    public Context provideContext(){
        return mApplication;
    }
}
