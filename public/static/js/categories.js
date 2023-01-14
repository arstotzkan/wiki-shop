const category_id = new URLSearchParams(window.location.search).get('categoryId')
const category_name = new URLSearchParams(window.location.search).get('categoryName');
const user_name = new URLSearchParams(window.location.search).get('userName');
const user_session_id = new URLSearchParams(window.location.search).get('userSessionId');
let cart_size = 0;

// //console.log(category_id, category_name)
function addcart(id) {
    if(false){ // user_name == null || user_session_id == null
        let popup = document.getElementById("logged_in_popup");
        popup.classList.remove("display-none");
        popup.addEventListener("animationend", () => {popup.classList.add("display-none");}, false);
    }
    else{
        let elem = document.getElementById(id);
        let prodTitle = elem.dataset.title.toString()
        let prodCost = elem.dataset.cost.toString()
        let myHeaders = new Headers();
        myHeaders.append('Content-type', 'application/json');
        let init = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({name: "Tasos", sessionId: user_session_id, title: prodTitle, cost: prodCost})
            // user_name
        }
        fetch("addtocart", init)
            .then(response => {
                if (response.status === 201){
                    // //console.log("Product: " + prodTitle + " added to cart.");
                    document.getElementById("cart-size").classList.remove('display-none');
                    cart_size += 1;
                    document.getElementById("cart-size").textContent = cart_size;
                }
                else if(response.status === 401){
                    let popup = document.getElementById("logged_in_popup");
                    popup.classList.remove("display-none");
                    popup.addEventListener("animationend", () => {popup.classList.add("display-none");}, false);
                }
                else if (response.status === 400){
                    //console.log("Something went wrong.");
                }
            })
            .catch(error => {
                //console.log(error);
            })
    }
}

window.onload = function() { //needs a lil bit of refactoring

    getPartials()
    .then( () => fetch("https://wiki-shop.onrender.com/categories/" + category_id + "/products"))
    .then((data) => data.json())
    .then((productData) => {
        let template = document.getElementById("products-content").textContent;
        let compiledTemplate = Handlebars.compile(template);
        let content = compiledTemplate({product: productData, cat_name: category_name});
        document.querySelector("body").innerHTML += content;
        setAccountIcon();
        addlinkParams()
    })
    .then(() => fetch("https://wiki-shop.onrender.com/categories/" + category_id + "/subcategories"))
    .then((data) => data.json())
    .then((subCategoriesData) => {
        let template = document.getElementById("product-filter").textContent;
        let compiledTemplate = Handlebars.compile(template);
        let content = compiledTemplate({subCategory: subCategoriesData});
        document.querySelector("body").innerHTML += content;
    })
    .then(() => {
        // //console.log(document.querySelectorAll("input[name='sub-category']"));
        document.querySelectorAll("input[name='sub-category']").forEach((filter) => {
            filter.addEventListener("click", function(event) {
                let item = event.target.value;
                // //console.log(document.querySelectorAll('li.product'));
                document.querySelectorAll('li.product').forEach((elem) => {
                    // //console.log("item: " + item);
                    // //console.log("elem sub-cat: " + elem.dataset.subcategoryId);
                    if(elem.dataset.subcategoryId === item || item === 'all'){
                        elem.classList.remove("display-none");
                    }
                    else{
                        elem.classList.add("display-none");
                    }
                });
            });
        });
    })
}

