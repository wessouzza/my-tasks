package com.fatto.todo_list.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "tb_task")
public class Tasks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private BigDecimal cost;
    private LocalDate deadline;
    private int sortingPosition;

    public Tasks(){}

    public Tasks(Long id, String name, BigDecimal cost, LocalDate deadline, int sortingPosition) {
        this.id = id;
        this.name = name;
        this.cost = cost;
        this.deadline = deadline;
        this.sortingPosition = sortingPosition;
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

    public int getSortingPosition() {
        return sortingPosition;
    }

    public void setSortingPosition(int sortingPosition) {
        this.sortingPosition = sortingPosition;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Tasks tasks = (Tasks) o;
        return Objects.equals(id, tasks.id) && Objects.equals(name, tasks.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}
