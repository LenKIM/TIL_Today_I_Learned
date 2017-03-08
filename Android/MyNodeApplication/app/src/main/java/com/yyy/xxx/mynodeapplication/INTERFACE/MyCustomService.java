package com.yyy.xxx.mynodeapplication.INTERFACE;

import com.yyy.xxx.mynodeapplication.MODEL.Board;

import java.util.List;

import retrofit2.Call;
import retrofit2.GsonConverterFactory;
import retrofit2.Retrofit;
import retrofit2.http.DELETE;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

/**
 * Created by len on 2017. 3. 8..
 */

public interface MyCustomService {

    //모든 리스트를 가져오는 인터페이스
    @GET("api/boards")
    Call<List<Board>> getList();

    //서버에 내가 작성한 내용 저장하기.
    @FormUrlEncoded
    @POST("api/boards")
    Call<Board> setLine(@Field("title") String title,
                        @Field("writer") String writer,
                        @Field("contents") String contents);

//    @PUT("api/boards/{_id}")
//    Call<Board> updateLine(@Path("_id") String objectId,
//                           @Field("title") String title,
//                           @Field("writer") String writer,
//                            @Field("contents") String contents);

    @DELETE("api/boards/{id}")
    Call<Board> deleteLine(@Path("id") String boardId);


    //should change the baseUrl with port
    //match 'your local host address'
    public static final Retrofit RETROFIT = new Retrofit.Builder()
            .baseUrl("http://172.30.82.161:8080/")
            .addConverterFactory(GsonConverterFactory.create())
            .build();
}
