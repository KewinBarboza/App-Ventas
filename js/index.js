const nameClient 			= document.getElementById('namePeople');
const nameProduct 			= document.getElementById('name-product')
const priceProduct 			= document.getElementById('price-product')
const btnSaveClient 		= document.getElementById('btnSavePeople');
const btnSaveProduct 		= document.getElementById('save-product');
const btnModalClientes 		= document.getElementById('modal-clientes');
const btnModalProductos 	= document.getElementById('modal-productos');
const btnModalDeleteClient 	= document.getElementById('btn-delete-client')
const listProducts 			= document.getElementById('listProducts');
const listClient 			= document.getElementById('list-client');
const listProductsNew 		= document.getElementById('list-product');

// agregar producto a clientes
let addProducts = [];

// lista de personas 
let clients = [
	// {
	// 	id: 1,
	// 	name: 'monica',
	// 	products: [
	// 		{ id: 1, name: 'galleta', price: 200, state: true },
	// 		{ id: 2, name: 'pan', price: 200, state: true },
	// 	],
	// },
	// {
	// 	id: 2,
	// 	name: 'erick',
	// 	products: [
	// 		{ id: 1, name: 'pan', price: 200, state: true },
	// 		{ id: 2, name: 'torta', price: 300, state: true },
	// 	],
	// },
];

// lista de productos
let products = [
	// { id: 1, name: 'galleta', price: 200, state: false },
	// { id: 2, name: 'pan', price: 200, state: false },
	// { id: 3, name: 'torta', price: 300, state: false },
];

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
				console.log(addProducts)
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
	selectDeleteClient()
}

// eliminar clientes
function selectDeleteClient(){
	const btnDeleteClient = document.querySelectorAll('#action .btn-delete')
	btnDeleteClient.forEach(btn => {
		btn.addEventListener('click', () =>{
			deleteClient(btn.id)
		})
	})
} 

function deleteClient(id){
	console.log(id)
	btnModalDeleteClient.addEventListener('click', () => {
		const d = clients.filter(client => client.id !== id )
		clients = [...d]
		listClient.innerHTML = '';
		listClients();
	})

	console.log(clients)
}

// guardar productos
function saveProduct(e) {
	e.preventDefault()
	listProductsNew.innerHTML = ''
	const addProduct = {id: parseInt(uniqueId()), name:nameProduct.value, price: parseInt(priceProduct.value), state: false}
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

	for (const client of clients) {
		templete.getElementById('name').textContent = client.name;
		templete.querySelector('.btn-delete').setAttribute('id', client.id)
		const products = templete.getElementById('products')
		const price = templete.getElementById('price')
		
		products.innerHTML = ''
		price.innerHTML = ''
		let total = 0;

		client.products.map((product) => {
			total += product.price
			console.log(total) 
			products.innerHTML += `<span class="badge badge-light mx-1"> ${product.name} - ${product.price} Bs  </span>`;
			templete.getElementById('price').textContent = `${total} Bs`
		});

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
			const product = products.filter(product => product.id != parseInt(btnDelete.id))
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
	-modificar diseño
	-refactorizar
*/





