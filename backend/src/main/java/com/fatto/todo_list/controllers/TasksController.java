package com.fatto.todo_list.controllers;

import com.fatto.todo_list.dto.TaskDto;
import com.fatto.todo_list.services.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
//import org.springframework.scheduling.config.Task;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Tarefas")
@RestController
@RequestMapping("api/v1/tasks")
public class TasksController {
    private TaskService taskService;

    public TasksController(TaskService taskService){
        this.taskService = taskService;
    }

    @PostMapping("/newTask")
    @Operation(summary = "Nova tarefa", description = "Adicionar nova tarefa ao banco de dados.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Tarefa criada com sucesso."),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor.")
    })
    public ResponseEntity<TaskDto> createTask(@RequestBody TaskDto taskDto){
        return ResponseEntity.ok().body(taskService.createTask(taskDto));
    }

    @GetMapping
    @Operation(summary = "Listar tarefas", description = "Lista todas as tarefas disponíveis de forma ordenada.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Tarefa encontrada."),
            @ApiResponse(responseCode = "404", description = "Tarefa não encontrada."),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor.")
    })
    public ResponseEntity<List<TaskDto>> listAllTasks(){
        return ResponseEntity.ok().body(taskService.listAllTasks());
    }

    @PutMapping("/updateTask/{id}")
    @Operation(summary = "Atualizar tarefa", description = "Atualiza uma tarefa, busca baseada no id.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Tarefa encontrada."),
            @ApiResponse(responseCode = "404", description = "Tarefa não encontrada."),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor.")
    })
    public ResponseEntity<TaskDto> updateTask(@PathVariable Long id, @RequestBody TaskDto taskDto){
        return ResponseEntity.ok().body(taskService.updateTask(id, taskDto));
    }

    @DeleteMapping("/deleteTask/{id}")
    @Operation(summary = "Deletar tarefa", description = "Deletar uma tarefa, busca baseada no id.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Tarefa deletada com sucesso."),
            @ApiResponse(responseCode = "404", description = "Tarefa não encontrada."),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor.")
    })
    public ResponseEntity<Void> deleteTask(@PathVariable Long id){
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

}
