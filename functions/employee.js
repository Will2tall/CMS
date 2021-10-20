const db = require('../db/connection')

class Employee {
    constructor(db){
        this.db = db;
    }

    findAllEmployees(){
        return this.db.query("SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id");
    }

    employeeDepartment(a) {
        return this.db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE department.id = ?", a);
    }

    name(employee) {
         return this.db.query("INSERT INTO employee SET ?", employee)
    }

    showEmployee() {
        return this.db.query('SELECT * FROM employee')
    }

    deleteEmployee(emp) {
        return this.db.query('DELETE FROM employee WHERE id = ?', emp)
    }
    
    updateRole(emp, empr) {
        return this.db.query(`UPDATE employee SET role_id = ${emp} WHERE id = ${empr}`)
    }
}

module.exports = new Employee(db);