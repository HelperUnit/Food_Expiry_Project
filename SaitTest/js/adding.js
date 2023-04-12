//import { request } from "http"



load_state = false
let button, product_name, creator_name, creating_date, expiration_date, storage_date
function update_data()
{
	button = document.getElementById("request_button")
	product_name = document.getElementById("product_name")
	creator_name = document.getElementById("creator_name")
	creating_date = document.getElementById("creating_date")
	expiration_date = document.getElementById("expiration_date")
	storage_date = document.getElementById("storage_date")
}

window.onload = () => {
	update_data()
	load_state = true
}

function all_data_defined(data)
{
	console.log(data)
	state = true
	for(prop in data)
	{
		for(inprop in data[prop])
			state = state && (data[prop][inprop] != '')
	}
	return state
}

function send_request() {
	if(load_state)
	{
		update_data()
		let request_data = {product: {}}
		request_data.request_date = new Date()
		request_data.status = 0					//STATE_TO_VERIFY
		request_data.sender = "Worker"
		request_data.product.product_name = product_name.value
		request_data.product.creator_name = creator_name.value
		request_data.product.manufacture_date = creating_date.value
		request_data.product.expiry_date = expiration_date.value
		request_data.product.arrival_date = storage_date.value

		request_data.product.count = 60; //!!!
		request_data.product.article = "ADFASFSWEWE" //!!!

		if(all_data_defined(request_data))
		{
			fetch('http://localhost:3000/send_request', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify(request_data)
			})
		}
		else
		{
			console.log("Anything doesn't defined...")
		}
	}
}