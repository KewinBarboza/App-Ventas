const nameClient 		= document.getElementById('namePeople');
const nameProduct 		= document.getElementById('name-product')
const priceProduct 		= document.getElementById('price-product')
const btnSaveClient 	= document.getElementById('btnSavePeople');
const btnSaveProduct 	= document.getElementById('save-product');
const btnModalClientes 	= document.getElementById('modal-clientes');
const btnModalProductos = document.getElementById('modal-productos')
const listProducts 		= document.getElementById('listProducts');
const listClient 		= document.getElementById('list-client');
const listProductsNew 	= document.getElementById('list-product');

// agregar producto a clientes
let addProducts = [];

// lista de personas 
let clients = [];

// lista de productos
let products = [];

// crear id unico para productos y clientes
var idCounter = 0;
function uniqueId(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
};

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

// agregar personás
function saveClient(e) {
	e.preventDefault();
	listClient.innerHTML = '';
	const addClient = { id: uniqueId(), name: nameClient.value, products: addProducts };
	clients = [...clients, addClient];
	addProducts = [];
	listClients();
	limpiarModal('addPeople');
	console.log(clients)
}

// guardar productos
function saveProduct(e) {
	e.preventDefault()
	listProductsNew.innerHTML = ''
	const addProduct = {id: uniqueId(), name:nameProduct.value, price: parseInt(priceProduct.value), state: false}
	products.push(addProduct)
	nameProduct.value = ''
	priceProduct.value = ''
	listProductNew();
	deleteProduct();
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

// listar productos nuevos
const listProductNew = () =>{
	const templete = document.getElementById('templete-list-product').content
	const fragment = document.createDocumentFragment()

	products.map(product => {
		templete.querySelector('#item-products p').textContent = product.name
		templete.querySelector('#item-products span').textContent = product.price
		templete.querySelector('button').setAttribute('id', product.id)

		const clone = templete.cloneNode(true)
		fragment.appendChild(clone)
	})

	listProductsNew.appendChild(fragment)
}

// eliminar producto
const deleteProduct = () => {
	const btnDeleteProduct = document.querySelectorAll('#item-products button')
	
	btnDeleteProduct.forEach(btnDelete => {
		btnDelete.addEventListener('click', () =>{
			listProductsNew.innerHTML = ''
			const product = products.filter(product => product.id != btnDelete.id)
			products = [...product]
			listProductNew()
		})
	})
}

// abrir modal de clientes
btnModalClientes.addEventListener('click', () =>{
	// cargar lista de productos 
	listProducts.innerHTML = ''
	listProduct()
	// agregar productos a los clientes
	addProductPeople();
	// acción para agregar personas
	btnSaveClient.addEventListener('click', saveClient);
})

// abrir modal productos
btnModalProductos.addEventListener('click', () =>{
	listProductsNew.innerHTML = ''
	// listar productos
	listProductNew();
	// acción para guardar productos
	btnSaveProduct.addEventListener('click', saveProduct)
})


listClients();




/*
	-eliminar clientes
	-editar clientes
	-buscar clientes
	-guardar en el localStorage
	-acomodar precios
	-modificar diseño
	-refactorizar
*/





