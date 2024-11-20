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
import java.util.Set;
import java.util.ArrayList;
import java.util.HashSet;
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
            throw new TaskValidationException("Existe uma tarefa com mesmo nome.");
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
        int greaterSortingPosition = taskList.get(0).getSortingPosition();

        for (int i = 1; i < taskList.size(); i++) {
            int currentSortingPosition = taskList.get(i).getSortingPosition();
            if (currentSortingPosition > greaterSortingPosition) {
                greaterSortingPosition = currentSortingPosition;
            }
        }

        return greaterSortingPosition;
    }

    @Override
    public void reorderTasks(List<TaskDto> taskList){
        List<Tasks> tasksToUpdate = new ArrayList<>();
        Set<Integer> existingPositions = new HashSet<>();
        
        for (TaskDto dto : taskList) {
            Tasks task = tasksRepository.findById(dto.getId())
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + dto.getId()));
            existingPositions.add(task.getSortingPosition());
            tasksToUpdate.add(task);
        }

        int newSortingPosition = 1;
        for (Tasks task : tasksToUpdate) {
            while (existingPositions.contains(newSortingPosition)) {
                newSortingPosition++; 
            }
            task.setSortingPosition(newSortingPosition);
            existingPositions.add(newSortingPosition); 
            newSortingPosition++;
        }
        tasksRepository.saveAll(tasksToUpdate);
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
        Tasks existingTask = tasksRepository.findByName(taskDto.getName());
        if(existingTask != null && !existingTask.getId().equals(id)){
            throw new TaskValidationException("Existe uma tarefa com mesmo nome.");
        }
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
