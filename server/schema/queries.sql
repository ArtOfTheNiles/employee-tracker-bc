


INSERT INTO role (title, salary, department_id)
VALUES (${title}, ${salary}, ${department_id})


INSERT INTO employee

-- Employee view --
SELECT first_name last_name role_id manager_id
FROM employee
LEFT JOIN role ON employee.role_id = role.role_id
LEFT JOIN employee ON employee.manager_id = employee.manager_id

-- Role view --
SELECT title department_id
FROM role
LEFT JOIN department ON role.department_id = department.

-- Emps by Dept --
SELECT name FROM department
LEFT JOIN employee ON 