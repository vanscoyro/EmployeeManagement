const inquirer = require('inquirer');
const connection = require('./config/connection');
const figlet = require('figlet');
const { printTable } = require('console-table-printer');


//initial connection to mysql used to initialize app
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    welcomeMessage();
    init();
  });

const welcomeMessage = () =>{
  console.log(
    figlet.textSync("Employee Manager", {
      horizontalLayout:"default",
      verticalLayout:"default"
    })
  )
  
};

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
      console.log( figlet.textSync("Departments", {
        horizontalLayout:"default",
        verticalLayout:"default"
      }));
      printTable(res);
      init();
    });
  }

  // shows all roles
function viewRoles() {
    const query = `SELECT * FROM role ORDER BY id`
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.log( figlet.textSync("Roles", {
        horizontalLayout:"default",
        verticalLayout:"default"
      }));
      printTable(res);
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
      console.log(
        figlet.textSync("Employees", {
          horizontalLayout:"default",
          verticalLayout:"default"
        })
      );
      printTable(res);
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
//adds employee to DB
function addEmployee() {
  const query = `SELECT name, id as value FROM departments ORDER BY id`
  connection.query(query, (err, departments) => {
    if (err) throw err;

    const query = `SELECT title as name, id as value FROM role ORDER BY id`
    connection.query(query, (err, roles) => {
      if (err) throw err;

      const query = `SELECT first_name as name, id as value FROM employees WHERE role_id IS NULL`
      connection.query(query, (err, employees) => {
        if (err) throw err;
        
        const query = `SELECT first_name as name, id as value FROM employees WHERE manager_id IS NULL`
          connection.query(query, (err, employees) => {
        if (err) throw err;

        inquirer
          .prompt([{
            type: 'input',
            message: 'Employee first name?',
            name: 'first_name'
          },
          {
            type: 'input',
            message: 'Employee last name?',
            name: 'last_name'
          },
          {
            type: 'list',
            name: 'role_id',
            message: 'What Role does this Employee have?',
            choices: [...roles ]
          },
          {
              type: 'list',
              name: 'manager_id',
              messages: "Who is this Employee's Manager?",
              choices: [...employees, { name: 'none', value: null }]

          }]).then((answer) => {
            console.log(answer)

            let query = `INSERT INTO 
                        employees (first_name, last_name, role_id , manager_id)
        VALUES 
          ('${answer.first_name}','${answer.last_name}','${answer.role_id}',${answer.manager_id});`
            connection.query(query, (err, res) => {
              if (err) throw err;
              console.log('NEW EMPLOYEE ADDED');
              console.log('\n');
              init();
            });
          });
      });
    });
  });
``});
}

//updates selected employee role in DB
function updateEmployees() {

  const query = `SELECT title as name, id as value FROM role ORDER BY id`
  connection.query(query, (err, roles) => {
    if (err) throw err;

    const query = `SELECT first_name as name, id as value FROM employees`
    connection.query(query, (err, employees) => {

      if (err) throw err;
      printTable(employees);

      inquirer
        .prompt([{
          type: 'list',
          message: 'Update what employee?',
          choices: [...employees],
          name: 'employee'
        },
        {
          type: 'list',
          message: 'Update employee to what role?',
          choices: [...roles],
          name: 'role'
        }
        ]).then((answer) => {

          let query = `UPDATE employees SET role_id = ${answer.role} WHERE id = ${answer.employee}`
          connection.query(query, (err, res) => {
            if (err) throw err;
            console.log('EMPLOYEE UPDATED');
            console.log('\n');
            init();
          });
        });
    });
  });
}