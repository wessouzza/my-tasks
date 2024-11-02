package com.fatto.todo_list.mapper;

import com.fatto.todo_list.dto.TaskDto;
import com.fatto.todo_list.model.Tasks;

public class EntityMapper {

    public static TaskDto entityToDto(Tasks tasks){
        TaskDto dto = new TaskDto();
        dto.setId(tasks.getId());
        dto.setName(tasks.getName());
        dto.setCost(tasks.getCost());
        dto.setDeadline(tasks.getDeadline());
        return dto;
    }
}
