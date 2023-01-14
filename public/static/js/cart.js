window.onload = function () {
    const username = new URLSearchParams(window.location.search).get('username');
    const sessionId = new URLSearchParams(window.location.search).get('session_id');
    
    let myHeaders = new Headers();
    myHeaders.append('Content-type', 'application/json');
    myHeaders.append('username', username); // user_name
    myHeaders.append('session_id', sessionId); // user_session_id
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

        setAccountIcon()
        addlinkParams()
    })
    .catch(error => {
        //console.log(error);
    })
}