-- Reset --
DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;
-- Connect --
\c company_db;

CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL,
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    FOREIGN KEY department_id
    REFERENCES department(id)
    INTEGER NOT NULL,
);

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    FOREIGN KEY role_id
    REFERENCES rold(id)
    INTEGER NOT NULL,
    FOREIGN KEY manager_id
    REFERENCES employee(id),
);