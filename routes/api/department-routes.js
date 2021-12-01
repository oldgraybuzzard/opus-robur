// future development
const express = require('express');
const router = express.Router();
const db = require('../../config/connection');

//Get all departments
router.get('/', (req, res) => {
  const sql = `SELECT * FROM department`;
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

  //Get one department
  router.get('/:id', (req, res) => {
    const sql = `SELECT * FROM department WHERE id = ?`;
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

//Delete one department
router.delete('/:id', (req, res) => {
  const sql = `DELETE FROM department WHERE id = ?`;
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

//Add a department
router.post('/', (req, res) => {
  const sql = `INSERT INTO department (name)
    VALUES (?)`;
  const params = [body.name];

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


module.exports = router;