/* JS files that defines modules for basic application entities,
e.g. carts, users etc
*/

const USER_CONTROLLER = {
    userData : [{name: "Panos", password:"12345", cart: []}, {name:"Tasos", password: "67890", cart: []}],

    currentlyLoggedIn: [],

    usernames : ["Panos", "Tasos"],

    addUser: function(newUsername, newPassword){
        this.usernames.push(newUsername)
        this.userData.push({name: newUsername, password: newPassword, cart: []})
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
    },

    updateQuantity: function(user, title, cost){
        for (let i of user.cart){
            if(i.title === title){
                i.quantity += 1;
                return
            }
        }
        user.cart.push(new CartItem(title, cost, 1))
    },

    sizeOfCart: function(user){
        let size = 0;
        for (let i of user.cart){
            size += i.quantity
        }
        return {"size": size};
    },

    totalCostOfCart: function (user){
        let total_cost = 0;
        for (let p of user.cart){
            total_cost += p.cost * p.quantity;
        }
        return total_cost
    },

    login: function(username){
        let user = getUserFromUsername(username);
        if (!user in this.currentlyLoggedIn)
            this.currentlyLoggedIn.push(user);
    },

    logout: function(username){
        let user = getUserFromUsername(username);
        if (user in this.currentlyLoggedIn)
            this.currentlyLoggedIn = this.currentlyLoggedIn.filter(account => account.name != user.name) //needs a lil bit of testing
    }
}

function CartItem(title, cost, quantity){
    this.title = title;
    this.cost = cost;
    this.quantity = quantity;
}

module.exports = {USER_CONTROLLER};