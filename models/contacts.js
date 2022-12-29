/* JS files that defines modules for basic application entities,
e.g. carts, users etc
*/

const USER_CONTROLLER = {
    userData : [{name: "Panos", password:"12345"}, {name:"Tasos", password: "67890"}],
    usernames : ["Panos", "Tasos"],

    addUser: function(newUsername, newPassword){
        this.usernames.push(newUsername)
        this.userData.push({name: newUsername, password: newPassword})
    },

    usernameTaken: function (newUsername){
        return (newUsername in this.usernames)
    },

    getUserFromUsername: function(username){
        for (let user of this.userData)
            if (user.name === username)
                return user;
    },

    checkUserData: function(username, password){
        let user = this.getUserFromUsername(username);
        return (user && userDataIsCorrect(user, username, password))
    },

    userDataIsCorrect: function(userObj, username, password){
        return userObj.name === username && userObj.password === password
    }
}

const users = [{
    username: "test",
    password: "password",
    sessionId: "12345qwerty",
    cart: []
}];


function CartItem(title, cost, quantity){
    this.title = title;
    this.cost = cost;
    this.quantity = quantity;
}

function updateQuantity(pos, title, cost){
    for (let i of users[pos].cart){
        if(i.title === title){
            i.quantity += 1;
            return
        }
    }
    users[pos].cart.push(new CartItem(title, cost, 1))
    return
}

module.exports = {USER_CONTROLLER, users, updateQuantity};