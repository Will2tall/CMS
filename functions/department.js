const db = require('../db/connection');

class Department {
    constructor(db){
        this.db = db;
    }

    showDepartments() {
        return this.db.query('SELECT * FROM department')
    }

    addDepartment(dep) {
        return this.db.query('INSERT INTO department SET ?', dep)
    }
}

module.exports = new Department(db);