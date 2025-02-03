document.addEventListener("DOMContentLoaded", () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const detalleFactura = document.getElementById("detalle-factura");
    const totalFactura = document.getElementById("total-factura");

    let total = 0;

    carrito.forEach(({ title, price, quantity }) => {
        let subtotal = price * quantity;
        total += subtotal;

        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${title}</td>
            <td>${quantity}</td>
            <td>$${price}</td>
            <td>$${subtotal}</td>
        `;
        detalleFactura.appendChild(fila);
    });

    totalFactura.textContent = `$${total}`;
});
function imprimirBoleta() {
    window.print();
}


window.onload = generarFactura;
