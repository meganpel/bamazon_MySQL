var mysql = require("mysql");
var inquirer = require("inquirer");
const {
  table
} = require('table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("=====================================");
  console.log("WELCOME TO MEGAN'S PRODUCT WAREHOUSE!");
  console.log("=====================================");

  showProducts();
});

function showProducts() {
  connection.query('select * from products', function(error, results, fields) {
    if (error) throw error;
    results = JSON.parse(JSON.stringify(results));

    var tableData = [];
    var headers = [];
    headers.push("ID");
    headers.push("Product Name");
    headers.push("Department Name");
    headers.push("Price");
    headers.push("Stock");
    tableData.push(headers);

    for (var i = 0; i < results.length; i++) {
      var tableRow = [];
      tableRow.push(results[i].id);
      tableRow.push(results[i].product_name);
      tableRow.push(results[i].department_name);
      tableRow.push(results[i].price);
      tableRow.push(results[i].stock_quantity);
      tableData.push(tableRow);
    }

    console.log(table(tableData));

    askWhatProduct();
  });
}

function askWhatProduct() {
  var productId = 0;
  var quantity = 0;

  var productPrompt = {
    type: 'input',
    name: 'product',
    message: 'What product id would you like to buy?',
  };

  inquirer.prompt(productPrompt).then(answer => {
    productId = answer.product;

    var quantityPrompt = {
      type: 'input',
      name: 'total',
      message: 'How many do you want to buy?',
    };

    inquirer.prompt(quantityPrompt).then(answer => {
      quantity = answer.total;

      orderItems(productId, quantity);
    });
  });
}

function orderItems(id, quantity) {
  connection.query('select * from products where id = ?', [id], function(error, results, fields) {
    if (error) throw error;
    results = JSON.parse(JSON.stringify(results));

    if (results.length === 0) {
      console.log("==========================");
      console.log("I can't find that product!");
      console.log("==========================");
      return showProducts();
    }

    var product = results[0];

    if (product.stock_quantity < quantity) {
      console.log("=======================================");
      console.log("Insufficient quantity!");
      console.log("I can't do that order, lets start over!");
      console.log("=======================================");
      return showProducts();
    }

    processOrder(quantity, product);
  });
}

function processOrder(quantity, product) {
  connection.query('update products set stock_quantity = stock_quantity - ? where id = ?', [quantity, product.id], function(error, results, fields) {
    if (error) throw error;

    console.log("=======================================");
    console.log("You successfully bought: " + product.product_name);
    console.log("Quantity: " + quantity);
    console.log("Individual price: $" + product.price);
    console.log("Total price: $" + product.price * quantity);
    console.log("=======================================");

    showProducts();
  });
}