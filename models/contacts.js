/* JS files that defines modules for basic application entities,
e.g. carts, users etc
*/
const mongoose = require('mongoose');
const DATABASE_URL = require("../connectToDB.js")
const User = require("./user.js");
const Session = require("./session.js");

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
        let result = await User.find({name_lower: username.toLowerCase()});
        return result[0];
    },

    checkUserData: async function(username, password){
        let user = await this.getUserFromUsername(username);
        //console.log("User: ", user)
        return (user && userDataIsCorrect(user, username, password))
    },

    userDataIsCorrect: function(userObj, username, password){
        return userObj.name.toLowerCase() === username.toLowerCase() && userObj.password === password
    },

    getCart: async function(username){
        await mongoose.connect(DATABASE_URL);
        let user = await this.getUserFromUsername(username);
        return user.cart;
    },

    updateQuantity: async function(username, title, cost, quan=-1){
        await mongoose.connect(DATABASE_URL);
        let user_cart = await this.getCart(username);
        for (let i of user_cart){
            if(i.title === title){
                if(quan !== -1){
                    if (quan === 0){
                        user_cart = user_cart.filter(function(value){
                            return value !== i;
                        });
                    }
                    else{
                        i.quantity = quan;
                    }
                }
                else{
                    i.quantity += 1;
                }
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

    login: async function(user_name, sessionId){
        let res = await Session.find({username: user_name});
        if(!res.length){
            let newUserObj = new Session({session_id: sessionId, username: user_name});
            newUserObj.save();
        }
        else{
            let up = await Session.updateOne({username: user_name}, {session_id: sessionId});
            // console.log(up);
        }
    },

    logout: async function(username){
        let del = await Session.deleteOne({username: username});
        // console.log(del);
    },

    loggedIn: async function(user_name, sessionId){
        let res = await Session.find({username: user_name});
        return res[0].session_id === sessionId && res[0].username === user_name;
    }
}

function CartItem(title, cost, quantity){
    this.title = title;
    this.cost = cost;
    this.quantity = quantity;
}

module.exports = {USER_CONTROLLER};