DROP DATABASE IF EXISTS department_db;
CREATE DATABASE department_db;
USE department_db;
CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY (id)
);
CREATE TABLE role (
    id INTEGER AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL (10,2),
    department_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
    ON DELETE CASCADE
);
CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT NOT NULL,
    first_name VARCHAR (30) NOT NULL ,
    last_name VARCHAR (30) NOT NULL ,
    role_id INTEGER NOT NULL ,
    manager_id INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role (id)
    ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES employees (id)
    ON DELETE CASCADE
);