package com.fatto.todo_list.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class TaskDto {
    private Long id;
    private String name;
    private BigDecimal cost;
    private LocalDate deadline;

    public TaskDto(){}

    public TaskDto(Long id, String name, BigDecimal cost, LocalDate deadline) {
        this.id = id;
        this.name = name;
        this.cost = cost;
        this.deadline = deadline;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getCost() {
        return cost;
    }

    public void setCost(BigDecimal cost) {
        this.cost = cost;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }
}
