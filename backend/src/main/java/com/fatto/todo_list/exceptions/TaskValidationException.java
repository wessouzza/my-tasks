package com.fatto.todo_list.exceptions;

public class TaskValidationException extends RuntimeException{
    public TaskValidationException(String msg){
        super(msg);
    }
}
