/* JS files that defines modules for basic application entities,
e.g. carts, users etc
*/
const mongoose = require('mongoose');
const DATABASE_URL = require("../connectToDB.js")
const User = require("../user.js");
const LoggedInUser = require("../loggedInUser.js");

const USER_CONTROLLER = {
    addUser: async function(newUsername, newPassword){
        await mongoose.connect(DATABASE_URL);
        let user_id = await User.find()
        user_id = user_id.length
        let newUserObj = new User({user_id: user_id + 1, name: newUsername, password: newPassword, cart:[""]})
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
        console.log("User: ", user)
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
       let user = await this.getUserFromUsername(username);

        for (let i of user.cart){
            if(i.title === title){
                i.quantity += 1;
                return
            }
        }
        user.cart.push(new CartItem(title, cost, 1))
    },

    sizeOfCart: async function(username){
        await mongoose.connect(DATABASE_URL);
        let user = await this.getUserFromUsername(username);
        return {"size": user.cart.length};
    },

    totalCostOfCart: async function (username){
        await mongoose.connect(DATABASE_URL);
        let user = await this.getUserFromUsername(username);

        let total_cost = 0;
        for (let p of user.cart){
            total_cost += p.cost * p.quantity;
        }
        return total_cost
    },

    login: async function(username){
        await mongoose.connect(DATABASE_URL);
        let loggedInUser = await LoggedInUser.find({"name": username})
        if (!loggedInUser.length){
            let user = await this.getUserFromUsername(username);
            let newLoggedInUser = new LoggedInUser({user_id: user.user_id, name: user.name, password: user.password, cart:user.cart});
            newLoggedInUser.save();
        }
    },

    logout: async function(username){
        await mongoose.connect(DATABASE_URL);
        let loggedInUser = await LoggedInUser.find({"name": username})
        if (loggedInUser.length){
            loggedInUser.remove();
        }    
    }
}

function CartItem(title, cost, quantity){
    this.title = title;
    this.cost = cost;
    this.quantity = quantity;
}

module.exports = {USER_CONTROLLER};