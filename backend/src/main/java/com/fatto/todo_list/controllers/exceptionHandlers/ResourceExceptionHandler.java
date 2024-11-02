package com.fatto.todo_list.controllers.exceptionHandlers;

import com.fatto.todo_list.exceptions.TaskNotFoundException;
import com.fatto.todo_list.exceptions.TaskValidationException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.Instant;

@ControllerAdvice
public class ResourceExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorMsg> globalException(Exception e, HttpServletRequest request){
        ErrorMsg error = new ErrorMsg(Instant.now(), HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage(), request.getRequestURI());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }

    @ExceptionHandler(TaskNotFoundException.class)
    public ResponseEntity<ErrorMsg> taskNotFound(TaskNotFoundException e, HttpServletRequest request){
        ErrorMsg error = new ErrorMsg(Instant.now(), HttpStatus.NOT_FOUND.value(), e.getMessage(), request.getRequestURI());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(TaskValidationException.class)
    public ResponseEntity<ErrorMsg> taskAlreadyExists(TaskValidationException e, HttpServletRequest request){
        ErrorMsg error = new ErrorMsg(Instant.now(), HttpStatus.NOT_FOUND.value(), e.getMessage(), request.getRequestURI());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
}
