console.log(arreglo);

fetch('http://localhost:5000/productosPorIds?id=' + arreglo)
    .then(function (res) {
        return res.json();
    })
    .then(function (res) {
        console.log(res);

        var lista = document.querySelector('.lista');
        res.forEach(function (elem) {
            lista.innerHTML += '<li class="zapatito"><div class="contp"><div class="contimagenc" style="background-image: url(' + elem.link + ')"></div><div class="continfo"><p class="nombre">' + elem.modelo + '</p><p class="precio"><span>$</span> ' + elem.precio + '</p><p class="codigo">' + elem.codigo + '</p></div></div></li>';
        });
    });