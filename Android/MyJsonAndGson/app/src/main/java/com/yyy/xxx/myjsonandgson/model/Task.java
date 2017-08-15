package com.yyy.xxx.myjsonandgson.model;

/**
 * Created by len on 2017. 2. 25..
 */

public class Task {

    private final long id;
    private String summary;
    private String description;
    private Status status;
    private int prioirty;

    public enum Status{
        CREATED, ASSIGNED, CANCELED, COMPLETED
    }

    public Task(long id, String summary, String description, Status status, int prioirty) {
        this.id = id;
        this.summary = summary;
        this.description = description;
        this.status = status;
        this.prioirty = prioirty;
    }

    public long getId() {
        return id;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public int getPrioirty() {
        return prioirty;
    }

    public void setPrioirty(int prioirty) {
        this.prioirty = prioirty;
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", summary='" + summary + '\'' +
                ", description='" + description + '\'' +
                ", status=" + status +
                ", prioirty=" + prioirty +
                '}';
    }
}
