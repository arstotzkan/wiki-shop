/* JS files that defines modules for basic application entities,
e.g. carts, users etc
*/

const USER_CONTROLLER = {
    userData : [],
    usernames : [],

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

module.exports = {USER_CONTROLLER};