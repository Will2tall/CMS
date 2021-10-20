const db = require('../db/connection');

class Role {
    constructor(db){
        this.db = db;
    }

    showRoles() {
        return this.db.query('SELECT title, salary FROM role')
    }

    showAllRoleInfo() {
        return this.db.query('SELECT * FROM role')
    }

    addRole(roleAdd) {
        return this.db.query('INSERT INTO role SET ?', roleAdd)
    }

    removeRole(rem) {
        return this.db.query('DELETE FROM role WHERE id = ?', rem)
    }
}

module.exports = new Role(db);