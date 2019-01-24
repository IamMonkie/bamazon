const inquirer = require("inquirer");
const mysql = require("mysql");
const { table } = require("table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);

  mainLoop();
});

//Prompt user to make selection
function mainLoop() {
  // display table
  // showTable();

  inquirer
    .prompt([
      {
        type: "input",
        name: "product_id",
        message: "What is the ID of the item you would like to purchase? "
        /*
        validate: function(value) {
          if (
            isNaN(value) == false &&
            parseInt(value) <= res.length &&
            parseInt(value) > 0
          ) {
            return true;
          } else {
            return false;
          }
        }
        */
      },
      //Prompt user to enter desired quantity
      {
        type: "input",
        name: "quantity",
        message: "How many would you like to purchase?"
      }
    ])
    .then(function(res) {
      let product = parseInt(res.product_id) - 1;
      let quantity = parseInt(res.stock_quantity);
      let howMany = parseInt(res.quantity);
      var totalPrice = parseFloat(response[howMany].price * quantity);

      console.log("response: " + product + "\n" + "quantity: " + howMany);
      console.log("response quantity: " + quantity);
      //verify available stock

      if (res.stock_quantity >= howMany) {
        //update stock
        connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            { stock_quantity: response[product].stock_quantity - howMany },
            { item_id: res.id }
          ],
          function(err, result) {
            if (err) throw err;
            console.log("Success! Your total is $" + totalPrice);
          }
        );

        // continueShopping();
      }
    });
}
