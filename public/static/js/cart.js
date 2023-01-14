window.onload = function () {
    addlinkParams()

    const user_name = new URLSearchParams(window.location.search).get('userName');
    const user_session_id = new URLSearchParams(window.location.search).get('userSessionId');
    let myHeaders = new Headers();
    myHeaders.append('Content-type', 'application/json');
    myHeaders.append('Name', 'Tasos'); // user_name
    myHeaders.append('Session-Id', 'lvckjlvkj'); // user_session_id
    let init = {method: "GET", headers: myHeaders}
    getPartials()
    .then( ()=> fetch("userCart", init))
    .then((response) => {
        if(response.status === 200){
            return response.json()
        }
        else if(response.status === 401){
            //console.log("You have to be logged in to add products in the cart.");
        }
        else if(response.status === 400){
            //console.log("Something went wrong.");
        }
    })
    .then((cart) => {
        // //console.log(cart);
        let template = document.getElementById("cart-content").textContent;
        let compiledTemplate = Handlebars.compile(template);
        let content = compiledTemplate({
            array: cart.cartItems,
            total: cart.totalCost
        });
        document.querySelector("body").innerHTML += content;
    })
    .catch(error => {
        //console.log(error);
    })
}