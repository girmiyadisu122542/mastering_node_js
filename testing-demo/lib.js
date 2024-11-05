
const db  = require('./db');
const mail = require('./mail');


// Testing numbers 
module.exports.absolute = function (number) {
  return ( number >= 0) ? number : -number;
}

//Testing strings

module.exports.greet  = function (name) {
  return 'Wellcome ' + name + '!';
}

// testing arrays

module.exports.getCurrencies = function () {
  return ['USD', 'BIRR', 'EURO'];
}


//testing objects

module.exports.getProduct = function (productId) {
  return {id: productId, price: 10, category: 'beverage' };
}

//testing exceptions

module.exports.registerUser = function(username) {
  if(!username) throw new Error('username is required');
  return {id: new Date().getTime(), username: username };
}

//mock function

module.exports.applyDiscount = function(order) {
  const customer = db.getCustomerSync(order.customerId);
  if(customer.points > 10 )
    order.totalPrice *= 0.9;
}

module.exports.notifyCustomer = function(order) {
  const customer = db.getCustomerSync(order.customerId);

  mail.send(customer.email, 'Your order is sent');
}