window.addEventListener('load', () => {
    const username = new URLSearchParams(window.location.search).get('username');
    const user_session_id = new URLSearchParams(window.location.search).get('session_id');

    if(username != null && user_session_id != null){
        let myHeaders = new Headers();
        myHeaders.append('Content-type', 'application/json');
        myHeaders.append('username', username);
        myHeaders.append('session_id', user_session_id);
        let init = {method: "GET", headers: myHeaders}
        fetch("/sizeOfCart",init)
            .then((data) => {
                if(data.status === 200){
                    return data.json()
                }
                else if(data.status === 401){
                    //console.log("You have to be logged in to add products in the cart.");
                }
                else if(data.status === 400){
                    //console.log("Something went wrong.");
                }
            })
            .then((response) => {
                // //console.log(response);
                let template = document.getElementById("size-of-cart").textContent;
                let compiledTemplate = Handlebars.compile(template);
                cart_size = response.size;
                let content = compiledTemplate({a: cart_size});
                document.querySelector("body").innerHTML += content;
                document.getElementById("cart-size").classList.remove('display-none');
                if(response.size === 0){
                    document.getElementById("cart-size").classList.add('display-none');
                }
            })
            .catch(error => {
                //console.log(error);
            })
    }
})