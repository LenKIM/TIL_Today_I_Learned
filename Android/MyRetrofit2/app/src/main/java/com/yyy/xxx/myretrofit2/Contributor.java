package com.yyy.xxx.myretrofit2;

/**
 * Created by len on 2017. 2. 28..
 */

public class Contributor {

    String login;
    String html_url;

    int contributions;

    @Override
    public String toString() {
        return login + " (" +contributions + ")";
    }
}
