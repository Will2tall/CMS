INSERT INTO department (name) VALUES 
("Sales"),
("Engineer"),
("Finance");

INSERT INTO role (title, salary, department_id) VALUES
("Lead Salesperson", 50000, 1),
("Maintanence", 65000, 2),
("Accountant", 55000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
("John", "Doe", 2, null),
("Jane", "Doe", 2, 1),
("Micheal", "Scott", 1, 2),
("Another", "Person", 3, null);