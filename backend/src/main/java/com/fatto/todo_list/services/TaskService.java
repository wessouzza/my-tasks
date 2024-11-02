package com.fatto.todo_list.services;

import com.fatto.todo_list.dto.TaskDto;

import java.util.List;

public interface TaskService {
    TaskDto createTask(TaskDto taskDto);

    List<TaskDto> listAllTasks();

    TaskDto updateTask(Long id, TaskDto taskDto);

    void deleteTask(Long id);
}
