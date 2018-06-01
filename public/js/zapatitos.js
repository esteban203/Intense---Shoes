// carrito - Danielx1000
document.querySelectorAll('.agregar').forEach(function (button) {
    button.addEventListener('click', function () {
        var id = button.parentNode.parentNode.getAttribute('data-id');
        if (arreglo.indexOf(id) >= 0) {
            console.log('paila');
            return;
        }
        console.log(arreglo);
        arreglo.push(id);
        actualizarCarrito();
        localStorage.setItem('arreglo', JSON.stringify(arreglo));
        //localStorage.clear(".arreglo");
    });
});