function updateQuantity(id, type){
    let i = document.querySelector('#product' + id);
    if(type === '-'){
        i.stepDown();
    }
    else{
        i.stepUp();
    }
    i.dispatchEvent(new Event('change'));
}

window.onload = function () {
    const username = new URLSearchParams(window.location.search).get('username');
    const user_sessionId = new URLSearchParams(window.location.search).get('session_id');
    
    let myHeaders = new Headers();
    myHeaders.append('Content-type', 'application/json');
    myHeaders.append('username', username); // user_name
    myHeaders.append('session_id', user_sessionId); // user_session_id
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
    .then(() => {
        let titles = document.querySelectorAll('.title');
        document.querySelectorAll("input[name='product_quantity']").forEach((b) => {
            b.addEventListener('change', () => {
                let pos_title = Number(b.id.substring(7, b.id.length+1));
                let myHeaders_cart = new Headers();
                myHeaders_cart.append('Content-type', 'application/json');
                let init_cart = {
                    method: "POST",
                    headers: myHeaders_cart,
                    body: JSON.stringify({username: username, session_id: user_sessionId, title: titles[pos_title].textContent, cost: 0, quantity: Number(b.value)})
                    // user_name
                }
                fetch("/updateCart", init_cart)
                    .then(() => window.location.reload())
            })
        });
    })
    .catch(error => {
        //console.log(error);
    })


}