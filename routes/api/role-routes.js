// future development
const express = require('express');
const router = express.Router();
const db = require('../../config/connection');

//Get all roles
router.get('/', (req, res) => {
  const sql = `SELECT * FROM role`;
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

  //Get one role
  router.get('/:id', (req, res) => {
    const sql = `SELECT * FROM role WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
    res.join({
      message: 'success',
      data: row
    });  
  });
});

//Delete one role
router.delete('/:id', (req, res) => {
  const sql = `DELETE FROM role WHERE id = ?`;
  const params = [req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
      //check to ensure deletion occured
    } else {
      res.json({
        message: 'deleted',
        changes: results.affectedRows,
        id: req.params.id
      });
    }
  });
});

//Add a role
router.post('/', (req, res) => {
  const sql = `INSERT INTO role (title, salary, department_id)
    VALUES (?,?,?)`;
  const params = [body.title, body.salary, body.department_id];

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

//update a role
router.put('/:id', (req, res) => {
  const sql = `UPDATE role
              SET salary = ?, SET department_id = ?
              WHERE id = ?`;
  const params = [req.body.salary, req.body.department_id, req.body.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Role not found'
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