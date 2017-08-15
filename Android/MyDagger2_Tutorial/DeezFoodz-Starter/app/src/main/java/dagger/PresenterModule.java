package dagger;

import android.content.Context;

import com.raywenderlich.android.deezfoodz.ui.food.FoodPresenter;
import com.raywenderlich.android.deezfoodz.ui.food.FoodPresenterImpl;
import com.raywenderlich.android.deezfoodz.ui.foodz.FoodzPresenter;
import com.raywenderlich.android.deezfoodz.ui.foodz.FoodzPresenterImpl;

import javax.inject.Singleton;

/**
 * Created by len on 2017. 5. 5..
 */

@Module
public class PresenterModule {

    @Provides
    @Singleton
    FoodzPresenter provideFoodzPresenter(Context context){
        return new FoodzPresenterImpl(context);
    }

    @Provides
    @Singleton
    FoodPresenter provideFoodPresenter(Context context){
        return new FoodPresenterImpl(context);
    }


}
