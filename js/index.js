const nameClient = document.getElementById('namePeople');
const btnSaveClient = document.getElementById('btnSavePeople');
const listProducts = document.getElementById('listProducts');
const listClient = document.getElementById('list-client');

// agregar producto a clientes
let addProducts = [];

// lista de personas
let clients = [
	{
		id: 1,
		name: 'monica',
		products: [
			{ id: 1, name: 'galleta', price: 200, state: true },
			{ id: 2, name: 'pan', price: 200, state: true },
		],
	},
	{
		id: 2,
		name: 'erick',
		products: [
			{ id: 1, name: 'pan', price: 200, state: true },
			{ id: 2, name: 'torta', price: 300, state: true },
		],
	},
];

// lista de productos
const products = [
	{ id: 1, name: 'galleta', price: 200, state: false },
	{ id: 2, name: 'pan', price: 200, state: false },
	{ id: 3, name: 'torta', price: 300, state: false },
];

// agregar producto a los clientes
function addProductPeople() {
	const checkProduct = document.querySelectorAll('#listProducts input');
	checkProduct.forEach((check) => {
		check.addEventListener('click', () => {
			if (check.checked == true) {
				const idCheck = check.id;
				products.filter((product) => {
					if (idCheck == product.id) {
						product.state = true;
						addProducts.push(product);
					}
				});
			} else {
				const a = addProducts.filter((item) => item.id !== parseInt(check.id));
				addProducts = [...a];
			}
		});
	});
}

// accion para agregar personas
btnSaveClient.addEventListener('click', saveClient);

// agregar parsonas
function saveClient(e) {
	e.preventDefault();
	listClient.innerHTML = '';
	const addClient = { id: 3, name: nameClient.value, products: addProducts };
	clients = [...clients, addClient];
	addProducts = [];
	listClients();
	limpiarModal('addPeople');
}

function limpiarModal(nameModal) {
	$(`#${nameModal}`).modal('hide');
	$(`#${nameModal} input`).val('');
	$(`#${nameModal} input[type='checkbox']`).prop('checked', false).change();
}

// listar productos en el modal de agregar personas
const listProduct = () => {
	const templete = document.getElementById('templeteListProducts').content;
	const fragment = document.createDocumentFragment();

	for (const product of products) {
		templete.querySelector('label').textContent = product.name;
		templete.querySelector('span strong').textContent = product.price + ' Bs ';
		templete.querySelector('input').setAttribute('id', product.id);

		const clone = templete.cloneNode(true);
		fragment.appendChild(clone);
	}

	listProducts.appendChild(fragment);
};

// listar clientes
const listClients = () => {
	const templete = document.getElementById('templete-client').content;
	const fragment = document.createDocumentFragment();

	let total = 0;
	for (const client of clients) {
		templete.getElementById('name').textContent = client.name;
		client.products.map((product) => {
			total = product.price + product.price;
			templete.getElementById('products').textContent = product.name;
			console.log(total);
		});
		templete.getElementById('price').textContent = total;
		const clone = templete.cloneNode(true);
		fragment.appendChild(clone);
	}

	listClient.appendChild(fragment);
};

listClients();
listProduct();
addProductPeople();

// console.log($('#productModal').modal());
