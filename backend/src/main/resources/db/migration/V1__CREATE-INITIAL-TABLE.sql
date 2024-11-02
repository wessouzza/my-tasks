CREATE TABLE tb_task (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cost DOUBLE PRECISION,
    deadline DATE NOT NULL,
    sorting_position INT UNIQUE NOT NULL
);