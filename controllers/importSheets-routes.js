const router = require('express').Router();
const sequelize = require('../config/connection');
const { Employee, Role } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for dashboard
router.get('/', (req, res) => {
  console.log('======================');
  Employee.findAll({
    attributes: [
      'id',
      'first_name',
      'last_name',
      'email',
      'manager_id',
      'role_id'
    ],
    include: [
      {
        model: Role,
        attributes: ['id', 'title', 'salary', 'department_id'],
      },
    ]
  })
    .then(dbEmployeeData => {
      const employees = dbEmployeeData.map(employees => employees.get({ plain: true }));

      res.render('sheets-import', {
        employees,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Add an employee
router.post('/', (req,res) => {
  Employee.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    manager_id: req.body.manager_id,
    role_id: req.body.role_id
  })
  .then(dbEmployeeData => {
    req.session.save(() => {
      req.session.employee_id = dbEmployeeData.id;
      req.session.first_name = dbEmployeeData.first_name;
      req.session.last_name = dbEmployeeData.last_name;
      req.session.email = dbEmployeeData.email;
      req.session.manager_id = dbEmployeeData.manager_id;
      req.session.role_id = dbEmployeeData.role_id;

      res.json(dbEmployeeData);
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;