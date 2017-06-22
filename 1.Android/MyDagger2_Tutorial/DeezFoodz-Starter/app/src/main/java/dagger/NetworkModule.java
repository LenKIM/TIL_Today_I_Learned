package dagger;

import com.raywenderlich.android.deezfoodz.app.Constants;
import com.raywenderlich.android.deezfoodz.network.UsdaApi;

import javax.inject.Named;
import javax.inject.Singleton;

import retrofit2.Converter;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 * This is NetworkModule
 * make sure why you need NetworkModule.
 * not to make any indepency between classes
 * Created by len on 2017. 5. 5..
 */

@Module
public class NetworkModule {
    private static final String NAME_BASE_URL = "NAME_BASE_URL";

    /**
     * Named Annotation은  뭘까?
     * String Object를 inject하려는데 이때 Named Annotation이 String 을 주입시킨다.
     * @return
     */

    @Provides
    @Named(NAME_BASE_URL)
    String provideBaseUrlString(){
        return Constants.BASE_URL;
    }

    @Provides
    @Singleton
    Converter.Factory provideGsonConverter(){
        return GsonConverterFactory.create();
    }

    /**
     * 아래 두개의 매소드는 대거에게 의존성 그래프를 만드는걸 허락하게 해준다
     * 그래서 an Object가 UsdaApi를 주입하기를 요청할 때 Dagger는 첫번째로 아래
     * provideUsadaApi(Retrofit retrofit)을 공급합니다.
     * @param converter
     * @param baseUrl
     * @return
     *
     * By using the @Singleton annotations,
     * only one instance of the UsdaApi and Retrofit objects
     * will be created and shared between both activities in the app.
     */
    @Provides
    @Singleton
    Retrofit provideRetrofit(Converter.Factory converter,
                             @Named(NAME_BASE_URL) String baseUrl) {
        return new Retrofit.Builder()
                .baseUrl(baseUrl)
                .addConverterFactory(converter)
                .build();
    }

    @Provides
    @Singleton
    UsdaApi provideUsdaApi(Retrofit retrofit){
        return retrofit.create(UsdaApi.class);
    }

}
