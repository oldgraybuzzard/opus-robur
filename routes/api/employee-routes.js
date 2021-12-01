// future development
const express = require('express');
const router = express.Router();
const db = require('../../config/connection');

 //Get all employees
    router.get('/', (req, res) => {
        const sql = `SELECT employee.id, employee.first_name, employee.last_name, employee.email, role.title, department.name
                    AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name)
                    AS manager
                    FROM employee
                    LEFT JOIN role
                    ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;`
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });
  
//Get a single employee
    router.get('/:id', (req, res) => {
        const sql = `SELECT * FROM employee WHERE id = ?`;
        const params = [req.params.id];
        db.query(sql, params, (err, row) => {
          if (err) {
            res.status(400).json({ error: err.message });
            return;
          }
          res.json({
            message: 'success',
            data: row
          });
        });
      });

// Add an employee
    router.post('/', ({ body }, res) => {
      const sql = `INSERT INTO employee (first_name, last_name, email, role_id, manager_id)
        VALUES (?,?,?,?,?,?)`;
      const params = [body.first_name, body.last_name, body.email, body.role_id, body.manager_id];

      db.query(sql, params, (err, result) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.json({
          message: 'success',
          data: body
        });
      });
    }); 

// Update the employee
    router.put('/:id', (req, res) => {
      const sql = `UPDATE employee SET role_id = ?, SET email = ?, SET manager_id = ?, SET department_id = ?
                  WHERE id = ?`
      const params = [req.body.role_id, req.params,id];
      db.query(sql, params, (err, result) => {
        if (err) {
          res.status(400).json({ error: err.message });
          // check if a record was found
        } else if (!result.affectedRows) {
          res.json({
            message: 'Employee not found'
          });
        } else {
          res.json({
            message: 'success',
            data: req.body,
            changes: result.affectedRows
          });
        }
      });
    });

    module.exports = router;