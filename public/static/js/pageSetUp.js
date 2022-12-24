for (let url of ["header", "sidebar", "footer"]) {
    fetch(`/site/${url}/`)
    .then((res) => res.text())
    .then((txt) => Handlebars.registerPartial(url, txt))
}