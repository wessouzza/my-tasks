package com.fatto.todo_list.repositories;

import com.fatto.todo_list.dto.TaskDto;
import com.fatto.todo_list.model.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TasksRepository extends JpaRepository<Tasks, Long> {
    Tasks findByName(String name);
}
