//create connection via mysql
var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');
// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "employee_tracker"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  mainMenu();
});


function mainMenu() {

  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add A Role", "Add An Employee", "Update Employee Role", "Exit"]
    })
    .then(function (answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.action === "View All Departments") {
        viewDepartment()

      }
      else if (answer.action === "View All Roles") {
        viewRole();
      }
      else if (answer.action === "View All Employees") {
        viewEmployee();
      }
      else if (answer.action === "Add a Department") {
        addDepartment();
      }
      else if (answer.action === "Add A Role") {
        addRole();
      }
      else if (answer.action === "Add An Employee") {
        addEmployee();
      }
      else if (answer.action === "Update Employee Role") {
        updateEmployee();
      }
      else {
        console.log("Goodbye!");
        connection.end();
      }
    });
}


function viewDepartment() {
  console.log("Selecting all department...\n");
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    mainMenu();
  });

}

function viewRole() {
  console.log("Selecting all role...\n");
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    mainMenu();
  });
}

function viewEmployee() {
  console.log("Selecting all employee...\n");
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    mainMenu();
  });
}

function addDepartment() {

  inquirer
    .prompt({
      name: "action",
      type: "choice",
      message: "What is your new department name?",
    })
    .then(function (answer) {
      // based on their answer, either call the bid or the post functions
      console.log("Inserting a department...\n");
      var query = connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.action

        },
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " product inserted!\n");
          // Call updateProduct AFTER the INSERT completes
          mainMenu();
        }
      );

      // logs the actual query being run
      console.log(query.sql);




    });


}

function addRole() {
  inquirer
    .prompt([{
      name: "action",
      type: "choice",
      message: "What is your new role name?",
    },
    {
      name: "salary",
      type: "choice",
      message: "What is the employee's salary?",
    },
    {
      name: "department_id",
      type: "choice",
      message: "What is the department id?",
    }
    ])
    .then(function (answer) {
      console.log(answer)
      //based on their answer, either call the bid or the post functions
      console.log("Inserting a role...\n");
      var query = connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.action,
          salary: answer.salary,
          department_id: answer.department_id

        },
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " product inserted!\n");
          // Call updateProduct AFTER the INSERT completes
          mainMenu();
        }
      );

      // logs the actual query being run
      console.log(query.sql);




    });
}

function addEmployee() {
  inquirer
    .prompt([{
      name: "first_name",
      type: "choice",
      message: "What is the employee's first name?",
    },
    {
      name: "last_name",
      type: "choice",
      message: "What is the employee's last name?",
    },
    {
      name: "role_id",
      type: "choice",
      message: "What is the employee's role id?",
    }
    ])
    .then(function (answer) {
      console.log(answer)
      //based on their answer, either call the bid or the post functions
      console.log("Inserting a employee...\n");
      var query = connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id
        },
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " product inserted!\n");
          // Call updateProduct AFTER the INSERT completes
          mainMenu();
        }
      );

      // logs the actual query being run
      console.log(query.sql);




    });
}

function updateEmployee() {
  console.log("Updating Employee role...\n");
  var query = connection.query(
    "SELECT * FROM employee",
    function (err, res) {
      if (err) throw err;
      // console.log(res.affectedRows + " product inserted!\n");
      // // Call updateProduct AFTER the INSERT completes
      // mainMenu();
      inquirer
        .prompt({
          name: "employee_role",
          type: "list",
          message: "Whose role would you like to update?",
          choices: res.map(employee_role => {
            return {
              name: employee_role.first_name, value: employee_role.id
            }
          })
        }).then(function(answer){
          console.log("Function not available.")
          // var query = connection.query(
          //   "DELETE FROM role_id"
          // )
        })
        // var query = connection.query(
        //   "INSERT INTO employee SET ?",
        //   {
        //     employee_role: answer.employee_role,
        //   })
    });
  // logs the actual query being run
  console.log(query.sql);
}