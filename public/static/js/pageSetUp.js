function getPartials(){
    let prom = []
    for (let url of ["header", "sidebar", "footer"]) {
        prom.push(fetch(`/site/${url}/`)
        .then((res) => res.text())
        .then((txt) => Handlebars.registerPartial(url, txt)))
    }

    return Promise.all(prom);
}

function addlinkParams(){            
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    const session_id = urlParams.get('session_id');

    for (let link of document.querySelectorAll("a:not(.outside-link)")){
        if (username && session_id)
            ([...new URLSearchParams(link.href)].length === 1) //if only param is link itself
            ? link.href += `?username=${username}&session_id=${session_id}`
            :  link.href += `&username=${username}&session_id=${session_id}`
    }
}

function setAccountIcon(){
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    document.getElementById("account-icon").textContent = username
    ? "logout"
    : "login"

    document.getElementById("account-icon").title = username
    ? "Log out"
    : "Log in"
}