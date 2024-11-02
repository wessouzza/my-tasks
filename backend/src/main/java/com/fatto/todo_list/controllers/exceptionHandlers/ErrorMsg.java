package com.fatto.todo_list.controllers.exceptionHandlers;

import java.time.Instant;

public class ErrorMsg {
    private Instant timestamps;
    private int status;
    private String message;
    private String path;

    public ErrorMsg(Instant timestamps, int status, String message, String path) {
        this.timestamps = timestamps;
        this.status = status;
        this.message = message;
        this.path = path;
    }

    public Instant getTimestamps() {
        return timestamps;
    }

    public void setTimestamps(Instant timestamps) {
        this.timestamps = timestamps;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
