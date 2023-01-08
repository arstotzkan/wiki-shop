function getPartials(){
    let prom = []
    for (let url of ["header", "sidebar", "footer"]) {
        prom.push(fetch(`/site/${url}/`)
        .then((res) => res.text())
        .then((txt) => Handlebars.registerPartial(url, txt)))
    }

    return Promise.all(prom);
}