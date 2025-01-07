-- view employees by manager --
SELECT m.last_name AS man_last_name,
m.first_name AS man_first_name,
e.last_name AS emp_last_name,
e.first_name AS emp_first_name
FROM employee AS e
INNER JOIN employee AS m
ON e.manager_id = m.id
ORDER BY man_last_name

-- view employees by department --
SELECT department.name AS department, e.last_name, e.first_name
FROM employee AS e
LEFT JOIN role ON (e.role_id = role.id)
LEFT JOIN department ON (role.department_id = department.id)
ORDER BY department.name

-- view department budget --
SELECT department.name AS department, 
COALESCE(SUM(salary),0) AS budget
FROM department
FULL JOIN role ON (role.department_id = department.id)
FULL JOIN employee ON (employee.role_id = role.id)
GROUP BY department
ORDER BY budget DESC