const inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require('./config/connection');

//initial connection to mysql used to initialize app
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    init();
  });

  // main menu inquierer 
const init = () => {
    inquirer
      .prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'Add Department',
          'Add Role',
          'Add Employee',
          'View Departments',
          'View Roles',
          'View Employees',
          'Update Employee Roles'
        ],
      })
      .then((answer) => {
        switch (answer.action) {
  
          case 'Add Department':
            addDepartment();
            break;
  
          case 'Add Role':
            addRole();
            break;
  
          case 'Add Employee':
            addEmployee();
            break;
  
          case 'View Departments':
            viewDepartments();
            break;
  
          case 'View Roles':
            viewRoles();
            break;
  
          case 'View Employees':
            viewEmployees();
            break;
  
          case 'Update Employee Roles':
            updateEmployees();
            break;
  
          default:
            console.log(`Invalid action: ${answer.action}`);
            break;
        }
      });
  };
  
  // shows all departments
function viewDepartments() {
    const query = `SELECT * FROM departments ORDER BY id`
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.log('DEPARTMENTS');
      console.log('\n');
      console.table(res);
      init();
    });
  }

  // shows all roles
function viewRoles() {
    const query = `SELECT * FROM role ORDER BY id`
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.log('ROLES');
      console.log('\n');
      console.table(res);
      init();
    });
  
  }
  // shows all employees
  function viewEmployees() {
    const query = 
    `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employees e
    LEFT JOIN role r
      ON e.role_id = r.id
    LEFT JOIN departments d
    ON d.id = r.department_id
    LEFT JOIN employees m
      ON m.id = e.manager_id`
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.log('EMPLOYEES');
      console.log('\n');
      console.table(res);
      init();
    });
  
  }
// add departments to DB
function addDepartment() {
  const query = `SELECT name, id as value FROM departments`
  connection.query(query, (err, departments) => {
    if (err) throw err;
    inquirer
      .prompt([{
        type: 'input',
        message: 'Name of new department?',
        name: 'department'
      }]).then((answer) => {

        console.log(answer)
        let query = `INSERT INTO departments (name)
            VALUES ('${answer.department}');`
        connection.query(query, (err, res) => {
          if (err) throw err;
          console.log('NEW DEPARTMENT ADDED');
          console.log('\n');
          init();
        });
      });
  });
};
// adds role to DB
function addRole() {
  const query = `SELECT name, id as value FROM departments ORDER BY id`
  connection.query(query, (err, departments) => {
    if (err) throw err;
    inquirer
      .prompt([{
        type: 'input',
        message: 'Name of new role?',
        name: 'title'
      },
      {
        type: 'input',
        message: 'What salary does this role have?',
        name: 'salary'
        
      },
      {
        type: 'list',
        message: 'What Department does thie new Role belong to?',
        choices: [...departments],
        name: 'department'
      }
      ]).then((answer) => {

        console.log(answer)
        let query = `INSERT INTO 
                  role (title, salary, department_id )
  VALUES 
    ('${answer.title}','${answer.salary}','${answer.department}');`
        connection.query(query, (err, res) => {
          if (err) throw err;
          console.log('NEW ROLE ADDED');
          console.log('\n');
          init();
        });
      });
  });
};
  