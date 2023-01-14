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

        ([...new URLSearchParams(link.href)].length === 1) //if only param is link itself
        ? link.href += `?username=${username}&session_id=${session_id}`
        :  link.href += `&username=${username}&session_id=${session_id}`
    }
}
