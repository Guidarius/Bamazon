// pulling in stuff we need
var mysql = require('mysql');
var inquirer = require('inquirer');

// getting mysql to connect
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,

    // Your username
    user: 'root',

    // Your password
    password: 'rootroot',
    database: 'bamazon'
});


//call this to show the inventory and prompt the customer
function initiate()
{

    var queryStr = "SELECT * FROM products";

    connection.query(queryStr, function (err, data){
        if (err) throw err;

        console.log("INVENTORY")
        console.log("------------------------\n")
        for(var i = 0; i < data.length; i++)
        {
            var item = data[i];
            console.log("Item ID: " + item.item_id + " || Name: " + item.product_name + " ||  Category: " + item.category + " ||  Cost: $ " + item.price + ' || Quantity: ' + item.stock + "\n")
        }

        promptCustomer();
    })
}

//this function will begin the prompt for the customer
function promptCustomer() {

    //asks the user for item ID and how many to buy
    inquirer.prompt([
        {
            message: "Enter the Item ID",
            type: "input",
            name: "item_id",
            filter: Number
        },
        {
            message: "Enter how many you want to buy",
            type: "input",
            name: "quantity",
            filter: Number
        }

    //the beginning of a long string to sort out the input of the user
    ]).then(function (input) {
        var item = input.item_id;
        var quantity = input.quantity

        connection.query("SELECT * FROM products WHERE ?", { item_id: item }, function (err, data) {

            if (err) {

            }

            //checks if the ID returns an undefined value
            if (data === undefined || data.length == 0) 
            {
                initiate();
                console.log("That product does not exist! Pick something that we have!")
            }

            else {
                var itemData = data[0];

                //checks if there is enough inventory
                if (quantity <= itemData.stock) 
                {
                    //the query to updatethe stock
                    var queryStr = "UPDATE products SET stock = " + (itemData.stock - quantity) + " WHERE itemID = " + item;

                    connection.query(queryStr, function (err, data) {

                        //stops the program
                        connection.end();

                    })
                }

                //if not enough, shows the inventory again
                else
                {
                    console.log("There's not that much of it!")

                    initiate();
                }

            }

        })
    })


}

//the first initiate to get the program running
initiate();