package dagger;

import com.raywenderlich.android.deezfoodz.ui.food.FoodActivity;
import com.raywenderlich.android.deezfoodz.ui.food.FoodPresenterImpl;
import com.raywenderlich.android.deezfoodz.ui.foodz.FoodzActivity;
import com.raywenderlich.android.deezfoodz.ui.foodz.FoodzPresenterImpl;

import javax.inject.Singleton;

/**
 * Created by len on 2017. 5. 2..
 */


/**
 * Now that you have a Dagger module that contains a dependency that can be injected, how do you use it?
 That requires the use of another Dagger annotation, @Component.
 Start by creating a new Java file in the dagger package, and name it AppComponent.
 */
@Singleton
@Component(modules = {AppModule.class, PresenterModule.class, NetworkModule.class})
public interface AppComponent {

    void inject(FoodzActivity target);
    void inject(FoodActivity target);

    void inject(FoodzPresenterImpl target);
    void inject(FoodPresenterImpl target);
}
