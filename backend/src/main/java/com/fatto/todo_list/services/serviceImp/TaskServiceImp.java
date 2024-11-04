package com.fatto.todo_list.services.serviceImp;

import com.fatto.todo_list.dto.TaskDto;
import com.fatto.todo_list.exceptions.TaskNotFoundException;
import com.fatto.todo_list.exceptions.TaskValidationException;
import com.fatto.todo_list.mapper.EntityMapper;
import com.fatto.todo_list.model.Tasks;
import com.fatto.todo_list.repositories.TasksRepository;
import com.fatto.todo_list.services.TaskService;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskServiceImp implements TaskService {
    private TasksRepository tasksRepository;

    public TaskServiceImp(TasksRepository tasksRepository){
        this.tasksRepository = tasksRepository;
    }

    @Override
    public TaskDto createTask(TaskDto taskDto) {
        Tasks newTask = new Tasks();
        List<Tasks> tasks = tasksRepository.findAll();
        if(tasksRepository.findByName(taskDto.getName()) != null){
            throw new TaskValidationException("There's already a task with this name.");
        }
        newTask.setName(taskDto.getName());
        newTask.setCost(taskDto.getCost());
        newTask.setDeadline(taskDto.getDeadline());
        newTask.setSortingPosition(getLastTaskPosition(tasks) + 1);

        tasksRepository.save(newTask);
        return EntityMapper.entityToDto(newTask);
    }

    private int getLastTaskPosition(List<Tasks> taskList){
        if(taskList.isEmpty()){
            return 0;
        }
        int index = taskList.size() -1;
        return taskList.get(index).getSortingPosition();
    }

    @Override
    public List<TaskDto> listAllTasks() {
        List<TaskDto> foundTasks = tasksRepository.findAll(Sort.by("sortingPosition").ascending())
                .stream().map(EntityMapper::entityToDto).collect(Collectors.toList());
        if(foundTasks.isEmpty()){
            throw new TaskNotFoundException("There's no tasks to show.");
        }
        return foundTasks;
    }

    @Override
    public TaskDto updateTask(Long id, TaskDto taskDto) {
        Tasks taskToUpdate = tasksRepository.findById(id)
                .orElseThrow(()-> new RuntimeException(""));
        taskToUpdate.setName(taskDto.getName());
        taskToUpdate.setCost(taskDto.getCost());
        taskToUpdate.setDeadline(taskDto.getDeadline());

        tasksRepository.save(taskToUpdate);
        return EntityMapper.entityToDto(taskToUpdate);
    }

    @Override
    public void deleteTask(Long id) {
        if(tasksRepository.findById(id).isEmpty()){
            throw new TaskNotFoundException("Task not found.");
        }
        tasksRepository.deleteById(id);
    }
}
