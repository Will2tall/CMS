const inquirer = require('inquirer');
require('console.table');
const Employee = require("./functions/employee");
const Department = require("./functions/department");
const Role = require('./functions/role');

async function mainMenu() {
    const {option} = await inquirer.prompt([
        {
            type: "list",
            name: "option",
            message:"What would you like to do?",
            choices:[
                {
                    name:"View all employees",
                    value:"VIEW_EMPLOYEES"
                },
                {
                    name:"View all employees by department",
                    value:"VIEW_DEPARTMENT"
                },
                {
                    name:"View all employees by manager",
                    value:"VIEW_MANAGER"
                },
                {
                    name:"Add employee",
                    value:"ADD_EMPLOYEE"
                },
                {
                    name:"Remove employee",
                    value:"REMOVE_EMP"
                },
                {
                    name:"Update employee role",
                    value:"UPDATE_EMP"
                },
                {
                    name:"Update Employee Manager",
                    value:"UPDATE_MANAGER"
                },
                {
                    name:"View all departments",
                    value: "ALL_DEPARTMENTS"
                },
                {
                    name: "Add a department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name:"View all roles",
                    value:"VIEW_ROLE"
                },
                {
                    name:"Add role",
                    value:"ADD_ROLE"
                },
                {
                    name:"Delete role",
                    value:"DELETE_ROLE"
                }
            ]
        }
    ]);

    switch (option) {
        case "VIEW_EMPLOYEES":
            return viewEmployees();
        case "VIEW_DEPARTMENT":
            return viewEmployeeDepartment();
        case "VIEW_MANAGER":
            return futureDev();
        case "ADD_EMPLOYEE":
            return addEmployee();
        case "REMOVE_EMP":
            return removeEmployee();
        case "UPDATE_EMP":
            return editEmployee();
        case "UPDATE_MANAGER":
            return futureDev();
        case "ALL_DEPARTMENTS":
            return viewDepartments();
        case "ADD_DEPARTMENT":
            return addDepartment();
        case "VIEW_ROLE":
            return viewRoles();
        case "ADD_ROLE":
            return newRole();
        case "DELETE_ROLE":
            return deleteRole();
        default:
            break;
    }

}
mainMenu();

async function viewEmployees() {
    const employees = await Employee.findAllEmployees();

    console.table(employees);
    mainMenu();
}

async function viewEmployeeDepartment() {
    const departments = await Department.showDepartments();

    const departmentChoices = departments.map(({id,name})=>({
        name: name,
        value: id
    }))
    const {department_id} = await inquirer.prompt([
        {
            type: 'list',
            name: 'department_id',
            message: 'Please choose a department',
            choices: departmentChoices
        }
    ])
    const employee = await Employee.employeeDepartment(department_id);
    console.table(employee);
    mainMenu();
}

async function viewRoles() {
    const role = await Role.showRoles();

    console.table(role);
    mainMenu();
}

async function newRole() {
    const departments = await Department.showDepartments();

    const departmentChoices = departments.map(({id,name})=>({
        name: name,
        value: id
    }))

    const nrole = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Please enter a title for your new role'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Please enter the salary for your new role'
        },
        {
            type: "list",
            name:"department_id",
            message: "Which department this role belongs to?",
            choices: departmentChoices
        }
    ]);

    await Role.addRole(nrole);
    console.log(`Added ${nrole.title} to Role table!`)
    mainMenu();
}

async function deleteRole() {
    const roles = await Role.showAllRoleInfo();

    const roleChoices = roles.map(({ id, title}) =>({
        name: title,
        value: id,    
    }));

    const remRole = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Please select a role to delete',
            choices: roleChoices
        }
    ])

    await Role.removeRole(remRole.id);
    console.log(`${remRole.name} has been deleted from the database`)
    mainMenu();
}

async function addEmployee() {
    const roles = await Role.showAllRoleInfo();

    const roleChoices = roles.map(({ id, title}) =>({
        name: title,
        value: id,    
    }));

    const emp = await Employee.showEmployee();

    const empChoice = emp.map(({ manager_id, first_name, last_name }) => ({
        name: [`${first_name} ${last_name}`],
        value: manager_id
    }))

    empChoice.push({ name: 'none', value: null })

    const addEmp = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Please enter Employees first name'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Please enter Employee last name'
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Please select a role for the new Employee',
            choices: roleChoices
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Please choose a manager(if there is no manager simply select none)',
            choices: empChoice
        }
    ])
   
    await Employee.name(addEmp);
    console.log(`${addEmp.first_name} ${addEmp.last_name} has been added as an employee`)
    mainMenu();
}

async function removeEmployee() {
    const employees = await Employee.showEmployee();

    const empChoice = employees.map(({ id, first_name, last_name }) => ({
        name: [`${first_name} ${last_name}`],
        value: id
    }));

    const delEmp = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Select which employee to remove',
            choices: empChoice
        }
    ])
    
    await Employee.deleteEmployee(delEmp.id)
    mainMenu();
}

async function viewDepartments() {
    const depoView = await Department.showDepartments();

    console.table(depoView)
    mainMenu();
}

async function addDepartment() {
    const addDepo = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your new department?'
        }
    ])

    await Department.addDepartment(addDepo);
    console.log(`${addDepo.name} has been added to the department list.`)
    mainMenu();
}

async function editEmployee() {
    const employees = await Employee.showEmployee();

    const empChoice = employees.map(({ id, first_name, last_name }) => ({
        name: [`${first_name} ${last_name}`],
        value: id
    }));

    const roles = await Role.showAllRoleInfo();

    const roleChoices = roles.map(({ id, title}) =>({
        name: title,
        value: id,    
    }));

    const {employee_id} = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: 'Please select employee you wish to update?',
            choices: empChoice
        }
    ])
    const {role_id} = await inquirer.prompt([
        {
            type: 'list',
            name: 'role_id',
            message: "What is the employee's new role?",
            choices: roleChoices
        }
    ])
    
    await Employee.updateRole(role_id, employee_id)
    console.log('Succesfully updated!')
    mainMenu();
}

function futureDev() {
    console.log('Feature coming soon!');
    mainMenu();
}