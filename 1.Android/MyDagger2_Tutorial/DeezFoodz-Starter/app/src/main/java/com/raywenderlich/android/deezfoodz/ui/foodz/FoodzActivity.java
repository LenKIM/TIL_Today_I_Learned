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

package com.raywenderlich.android.deezfoodz.ui.foodz;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.raywenderlich.android.deezfoodz.R;
import com.raywenderlich.android.deezfoodz.app.DeezFoodzApplication;
import com.raywenderlich.android.deezfoodz.app.StringUtils;
import com.raywenderlich.android.deezfoodz.model.FoodzItem;
import com.raywenderlich.android.deezfoodz.ui.food.FoodActivity;

import java.util.List;

import javax.inject.Inject;

import butterknife.BindView;
import butterknife.ButterKnife;

public class FoodzActivity extends AppCompatActivity implements FoodzView {

  @Inject
  FoodzPresenter presenter;
  //Inject Annotation은 Dagger에게 '너는 presenter field에게 의존성 주입을 원한다.'를 말합니다

  @BindView(R.id.activity_foodz_recyclerView)
  RecyclerView foodzRecyclerView;


  @BindView(R.id.activity_foodz_progressBar)
  ProgressBar progressBar;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_foodz);

    ((DeezFoodzApplication)getApplication()).getAppComponent().inject(this);

    ButterKnife.bind(this);

    foodzRecyclerView.setLayoutManager(new LinearLayoutManager(this));
// 위에 Inject를 써주면서 아래 객체 생성 new FoodzPresenterImpl을 지움.
//    presenter = new FoodzPresenterImpl();

    presenter.setView(this);
    presenter.getFoodz();
  }

  /*
   * FoodzView
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
  public void showFoodz(List<FoodzItem> foodzItemList) {
    foodzRecyclerView.setAdapter(new FoodzAdapter(foodzItemList));
    foodzRecyclerView.getAdapter().notifyDataSetChanged();
  }

  @Override
  public void showErrorMessage() {
    Toast.makeText(this, R.string.FoodzListError, Toast.LENGTH_SHORT).show();
  }

  @Override
  public void launchFoodDetail(FoodzItem foodzItem) {
    FoodActivity.launch(this, foodzItem);
  }

  /*
   * Inner Classes
   */

  class FoodzAdapter extends RecyclerView.Adapter<FoodzViewHolder> {

    private List<FoodzItem> foodzItemList;

    FoodzAdapter(List<FoodzItem> foodzItemList) {
      this.foodzItemList = foodzItemList;
    }

    @Override
    public FoodzViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
      LayoutInflater inflater = LayoutInflater.from(FoodzActivity.this);
      return new FoodzViewHolder(inflater.inflate(R.layout.list_item_food, parent, false));
    }

    @Override
    public void onBindViewHolder(FoodzViewHolder holder, int position) {
      FoodzItem foodzItem = foodzItemList.get(position);
      holder.getFoodName().setText(StringUtils.stripPrefix(foodzItem.getName()));
      holder.getContainer().setOnClickListener(v -> launchFoodDetail(foodzItem));
    }

    @Override
    public int getItemCount() {
      return foodzItemList.size();
    }
  }
}
