const inquirer = require("inquirer");
const mysql = require("mysql");
const Table = require("cli-table");

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
  console.log("");
  showTable();
  mainLoop();
});

//Prompt user to make selection
function mainLoop() {
  // display table

  inquirer
    .prompt([
      {
        type: "input",
        name: "product_id",
        message: "What is the ID of the item you would like to purchase? ",

        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      //Prompt user to enter desired quantity
      {
        type: "input",
        name: "quantity",
        message: "How many would you like to purchase?"
      }
    ])
    .then(function(response) {
      let product = parseInt(response.product_id) - 1;

      let howMany = parseInt(response.quantity);
      var totalPrice = parseFloat(response[howMany].price * howMany);

      console.log("response: " + product + "\n" + "quantity: " + howMany);
      console.log("response quantity: " + quantity);
      //verify available stock

      if (response.stock_quantity >= howMany) {
        //update stock
        connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: response[product].stock_quantity - howMany
            },
            {
              item_id: response.id
            }
          ],
          function(err, result) {
            if (err) throw err;
            console.log("Success! Your purchase total is $" + totalPrice);
          }
        );

        // continueShopping();
      }
    });
}

function showTable() {
  let table = new Table({
    chars: {
      top: "═",
      "top-mid": "╤",
      "top-left": "╔",
      "top-right": "╗",
      bottom: "═",
      "bottom-mid": "╧",
      "bottom-left": "╚",
      "bottom-right": "╝",
      left: "║",
      "left-mid": "╟",
      mid: "─",
      "mid-mid": "┼",
      right: "║",
      "right-mid": "╢",
      middle: "│",
      head: [
        "Item Id",
        "Product Name",
        "Department Name",
        "Price",
        "Stock Quantity"
      ]
    }
  });

  connection.query("SELECT * FROM products", function(err, tableRes) {
    for (let i = 0; i < tableRes.length; i++) {
      let itemId = tableRes[i].item_id;
      let product_name = tableRes[i].product_name;
      let department_name = tableRes[i].department_name;
      let price = tableRes[i].price;
      let stock_quantity = tableRes[i].stock_quantity;

      table.push([
        itemId,
        product_name,
        department_name,
        price,
        stock_quantity
      ]);
    }
    console.log(table.toString());
  });
}
