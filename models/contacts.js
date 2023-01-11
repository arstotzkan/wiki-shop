/* JS files that defines modules for basic application entities,
e.g. carts, users etc
*/
const mongoose = require('mongoose');
const DATABASE_URL = require("../connectToDB.js")
const User = require("./user.js");

const USER_CONTROLLER = {
    addUser: async function(newUsername, newPassword){
        await mongoose.connect(DATABASE_URL);
        let user_id = await User.find()
        user_id = user_id.length
        let newUserObj = new User({user_id: user_id + 1, name: newUsername, password: newPassword, cart:[]})
        newUserObj.save()
    },

    usernameTaken: async function (newUsername){
        await mongoose.connect(DATABASE_URL);
        let results = await User.find({name: newUsername});
        return results.length
    },

    getUserFromUsername: async function(username){
        await mongoose.connect(DATABASE_URL);
        let result = await User.find({name: username});
        return result[0];
    },

    checkUserData: async function(username, password){
        let user = await this.getUserFromUsername(username);
        //console.log("User: ", user)
        return (user && userDataIsCorrect(user, username, password))
    },

    userDataIsCorrect: function(userObj, username, password){
        return userObj.name === username && userObj.password === password
    },

    getCart: async function(username){
        await mongoose.connect(DATABASE_URL);
        let user = await this.getUserFromUsername(username);
        return user.cart;
    },

    updateQuantity: async function(username, title, cost){
        await mongoose.connect(DATABASE_URL);
        let user_cart = await this.getCart(username);
        //console.log(user_cart);
        for (let i of user_cart){
            if(i.title === title){
                i.quantity += 1;
                let res = await User.updateOne({ name: username}, {cart: user_cart});
                //console.log(res)
                return
            }
        }
        user_cart.push(new CartItem(title, cost, 1));
        let res = await User.updateOne({ name: username}, {cart: user_cart});
        // //console.log(res);
    },

    sizeOfCart: async function(username){
        await mongoose.connect(DATABASE_URL);
        let user_cart = await this.getCart(username);
        //console.log(user_cart);
        let size = 0;
        for (let i of user_cart){
            size += i.quantity
            //console.log(size)
        }
        return {"size": size};
    },

    totalCostOfCart: async function (username){
        await mongoose.connect(DATABASE_URL);
        let user_cart = await this.getCart(username);

        let total_cost = 0;
        for (let p of user_cart){
            total_cost += p.cost * p.quantity;
        }
        return total_cost
    },

    login: async function(username){
    },

    logout: async function(username){

    }
}

function CartItem(title, cost, quantity){
    this.title = title;
    this.cost = cost;
    this.quantity = quantity;
}

module.exports = {USER_CONTROLLER};