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
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.raywenderlich.android.deezfoodz.R;
import com.raywenderlich.android.deezfoodz.app.DeezFoodzApplication;
import com.raywenderlich.android.deezfoodz.app.StringUtils;
import com.raywenderlich.android.deezfoodz.model.Food;
import com.raywenderlich.android.deezfoodz.model.FoodzItem;

import javax.inject.Inject;

import butterknife.BindView;
import butterknife.ButterKnife;

public class FoodActivity extends AppCompatActivity implements FoodView {

  @Inject
  FoodPresenter presenter;

  public static final String EXTRA_FOOD_ID = "EXTRA_FOOD_ID";

  public static void launch(Context context, FoodzItem foodzItem) {
    Intent intent = new Intent(context, FoodActivity.class);
    intent.putExtra(EXTRA_FOOD_ID, foodzItem.getId());
    context.startActivity(intent);
  }

  @BindView(R.id.activity_food_name)
  TextView foodName;

  @BindView(R.id.activity_food_measure)
  TextView foodMeasure;

  @BindView(R.id.activity_food_nutrient)
  TextView foodNutrient;

  @BindView(R.id.activity_food_imageView)
  ImageView imageView;

  @BindView(R.id.activity_food_progressBar)
  ProgressBar progressBar;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_food);

    getSupportActionBar().setDisplayHomeAsUpEnabled(true);
    getSupportActionBar().setDisplayShowHomeEnabled(true);

    ((DeezFoodzApplication)getApplication()).getAppComponent().inject(this);

    ButterKnife.bind(this);

    String foodId = getIntent().getStringExtra(EXTRA_FOOD_ID);

    presenter.setView(this);
    presenter.getFood(foodId);
  }

  @Override
  public boolean onOptionsItemSelected(MenuItem item) {
    switch (item.getItemId()) {
      case android.R.id.home:
        finish();
        return true;
    }
    return super.onOptionsItemSelected(item);
  }

  /*
   * FoodView
   */

  @Override
  public void showLoading() {
    progressBar.setVisibility(View.VISIBLE);
  }

  @Override
  public void hideLoading() {
    progressBar.setVisibility(View.GONE);
  }

  @Override
  public void showFood(Food food) {
    String foodNameString = StringUtils.stripPrefix(food.getName());
    setTitle(foodNameString);
    foodName.setText(foodNameString);
    foodMeasure.setText(String.format(getString(R.string.FoodItemMeasure), food.getMeasure()));
    foodNutrient.setText(food.getNutrients().get(0).toString());
    foodNutrient.setTextColor(ContextCompat.getColor(this, presenter.getFoodColor(food)));
    imageView.setImageDrawable(ContextCompat.getDrawable(this, presenter.getFoodImage(food)));
  }

  @Override
  public void showErrorMessage() {
    Toast.makeText(this, R.string.FoodItemError, Toast.LENGTH_SHORT).show();
  }
}
