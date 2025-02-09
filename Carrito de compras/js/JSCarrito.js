const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');
const rowProduct = document.querySelector('.row-product');
const productsList = document.querySelector('.container-items');
const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

let allProducts = [];

btnCart.addEventListener('click', () => containerCartProducts.classList.toggle('hidden-cart'));

productsList.addEventListener('click', e => {
	if (!e.target.classList.contains('btn-add-cart')) return;

	const product = e.target.parentElement;
	const title = product.querySelector('h2').textContent;
	const price = parseFloat(product.querySelector('.price').textContent.slice(1));

	const existingProduct = allProducts.find(p => p.title === title);
	existingProduct ? existingProduct.quantity++ : allProducts.push({ title, price, quantity: 1 });

	updateCart();
});

rowProduct.addEventListener('click', e => {
	if (e.target.id !== 'icon-close') return;

	const title = e.target.previousElementSibling.querySelector('.titulo-producto-carrito').textContent;
	allProducts = allProducts.filter(product => product.title !== title);
	updateCart();
});

const updateCart = () => {
	rowProduct.innerHTML = '';
	let total = 0, totalOfProducts = 0;

	if (allProducts.length === 0) {
		cartEmpty.classList.remove('hidden');
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} else {
		cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');

		allProducts.forEach(({ title, price, quantity }) => {
			rowProduct.innerHTML += `
				<div class="cart-product">
					<div class="info-cart-product">
						<span class="cantidad-producto-carrito">${quantity}</span>
						<p class="titulo-producto-carrito">${title}</p>
						<span class="precio-producto-carrito">$${price}</span>
					</div>
					<i "class="fa-solid fa-xmark" alt="Eliminar"></i>

				</div>
			`;
			total += price * quantity;
			totalOfProducts += quantity;
		});
	}

	valorTotal.innerText = `$${total.toFixed(2)}`;
	countProducts.innerText = totalOfProducts;
	localStorage.setItem("carrito", JSON.stringify(allProducts));
};

