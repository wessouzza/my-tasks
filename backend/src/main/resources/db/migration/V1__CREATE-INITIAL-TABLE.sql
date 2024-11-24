CREATE TABLE tb_task (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cost NUMERIC(15,2),
    deadline DATE NOT NULL,
    sorting_position INT UNIQUE NOT NULL
);