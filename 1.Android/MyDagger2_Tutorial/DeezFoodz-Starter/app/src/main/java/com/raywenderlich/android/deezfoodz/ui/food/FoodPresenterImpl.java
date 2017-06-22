/*
 * Copyright (c) 2016 Razeware LLC
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

package com.raywenderlich.android.deezfoodz.ui.food;

import android.content.Context;
import android.support.annotation.ColorRes;
import android.support.annotation.DrawableRes;
import android.util.Log;

import com.raywenderlich.android.deezfoodz.R;
import com.raywenderlich.android.deezfoodz.app.Constants;
import com.raywenderlich.android.deezfoodz.app.DeezFoodzApplication;
import com.raywenderlich.android.deezfoodz.model.Food;
import com.raywenderlich.android.deezfoodz.model.FoodNutrient;
import com.raywenderlich.android.deezfoodz.model.FoodResponse;
import com.raywenderlich.android.deezfoodz.network.UsdaApi;

import java.util.List;

import javax.inject.Inject;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class FoodPresenterImpl implements FoodPresenter {

  private FoodView view;

  @Inject
  UsdaApi usdaApi;

  public FoodPresenterImpl(Context context) {
    ((DeezFoodzApplication)context).getAppComponent().inject(this);
  }

  @Override
  public void setView(FoodView view) {
    this.view = view;
  }

  @Override
  public void getFood(String foodId) {
    view.showLoading();

    usdaApi.getFoodItem(foodId).enqueue(new Callback<FoodResponse>() {
      @Override
      public void onResponse(Call<FoodResponse> call, Response<FoodResponse> response) {
        List<Food> foodList = response.body().getReport().getFoods();
        if (foodList != null && foodList.size() > 0) {
          view.showFood(response.body().getReport().getFoods().get(0));
        } else {
          showError();
        }
        view.hideLoading();
      }

      @Override
      public void onFailure(Call<FoodResponse> call, Throwable t) {
        showError();
        view.hideLoading();
      }
    });
  }

  @Override
  public
  @ColorRes
  int getFoodColor(Food food) {
    int colorRes = R.color.foodUnknown;

    List<FoodNutrient> nutrients = food.getNutrients();
    if (nutrients != null && nutrients.size() > 0) {
      FoodNutrient nutrient = nutrients.get(0);
      try {
        double nutrientValue = Double.parseDouble(nutrient.getValue());
        if (nutrientValue < 0) {
          colorRes = R.color.foodUnknown;
        } else if (nutrientValue < Constants.YELLOW_LEVEL) {
          colorRes = R.color.foodGreen;
        } else if (nutrientValue < Constants.RED_LEVEL) {
          colorRes = R.color.foodYellow;
        } else {
          colorRes = R.color.foodRed;
        }
      } catch (NumberFormatException e) {
        Log.e(FoodPresenterImpl.class.getSimpleName(), "Error parsing nutrient value");
      }
    }

    return colorRes;
  }

  @Override
  public
  @DrawableRes
  int getFoodImage(Food food) {
    int drawableRes = R.drawable.yellow;

    List<FoodNutrient> nutrients = food.getNutrients();
    if (nutrients != null && nutrients.size() > 0) {
      FoodNutrient nutrient = nutrients.get(0);
      try {
        double nutrientValue = Double.parseDouble(nutrient.getValue());
        if (nutrientValue < 0) {
          drawableRes = R.drawable.yellow;
        } else if (nutrientValue < Constants.YELLOW_LEVEL) {
          drawableRes = R.drawable.green;
        } else if (nutrientValue < Constants.RED_LEVEL) {
          drawableRes = R.drawable.yellow;
        } else {
          drawableRes = R.drawable.red;
        }
      } catch (NumberFormatException e) {
        Log.e(FoodPresenterImpl.class.getSimpleName(), "Error parsing nutrient value");
      }
    }

    return drawableRes;
  }

  /*
   * Private
   */

  private void showError() {
    view.showErrorMessage();
  }
}
