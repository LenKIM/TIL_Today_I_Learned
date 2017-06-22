package com.yyy.xxx.mynodeapplication.MODEL;

import com.google.gson.annotations.SerializedName;

/**
 * Created by len on 2017. 3. 8..
 */
public class Board {
    private static final String TAG = Board.class.getSimpleName();

    @SerializedName("_id")
    private int id;

    public int getId() {
        return id;
    }


    @SerializedName("title")
    private String title;

    @SerializedName("writer")
    private String writer;

    @SerializedName("contents")
    private String contents;

    private static Board instance = new Board();

    private Board(){
        id = 0;
        title = null;
        writer = null;
        contents = null;
    }

    public static Board getInstance() {
        return instance;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getWriter() {
        return writer;
    }

    public void setWriter(String writer) {
        this.writer = writer;
    }

    public String getContents() {
        return contents;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }

    @Override
    public String toString() {
        return "Board{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", writer='" + writer + '\'' +
                ", contents='" + contents + '\'' +
                '}';
    }
}
