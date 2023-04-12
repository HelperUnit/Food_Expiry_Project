load_state = false

window.onload = () => {
	load_state = true
    get_requests(add_to_page)
}

function data_empty(data)
{
    let count = 0
    for(k in data)
    {
        count++
    }
    return (count == 0)
}

function create_element(type, parent, className, innerHTML)
{
    let element = document.createElement(type);
    element.className = className
    element.innerHTML = innerHTML
    parent.appendChild(element)
    return element
}

function create_element_button(parent, className, innerHTML, callback_func)
{
    let element = document.createElement('button');
    element.className = className
    element.innerHTML = innerHTML
    element.onclick = callback_func
    parent.appendChild(element)
    return element
}

function create_label(innerHTML)
{
    let label = document.createTextNode(innerHTML);
    label.className = "label"
    document.body.appendChild(label)
}

function add_to_page(data)
{
    if(data_empty(data.results))
    {
        create_label("No requests found!")
        return
    }
    let counter = 1
    body = document.body
    main_div = create_element('div', body, "requests", '')
    for(request_key in data)
    {
        request = data[request_key]
        for(key in data[request_key])
        {
            request = data[request_key][key]
            console.log(request)
            let div_parent = ''
            if(request.state == 1)
                div_parent = create_element('div', main_div, "request_rejected", '')
            else
                div_parent = create_element('div', main_div, "request_unverified", '')
            create_element('div', div_parent, "counter", String(counter))
            create_element('div', div_parent, "name", request.product.product_name)
            create_element('div', div_parent, "creator", request.product.creator_name)
            create_element('div', div_parent, "date_creating", request.product.manufacture_date)
            create_element('div', div_parent, "date_expire", request.product.expiry_date)
            create_element('div', div_parent, "date_get_product", request.product.arrival_date)
            create_element_button(div_parent, "button_change", "Change", change())
            counter++
        }
    }
}

function change()
{

}

async function get_requests(callback_func)
{
    let response = await fetch('http://localhost:3000/get_requests', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            
        },
        body: JSON.stringify({state: 0})
    }).catch((err) => {
        create_label("Couldn't get data; Please check internet connection and try again")
    })
    if(response.ok)
    {
        let data = await response.json()
        console.log(data)
        callback_func(data)
    }
    else
    {
        create_label("Couldn't get data; Please check internet connection and try again")
    }
}

function send_request() {
	if(load_state)
	{
		let request_data = {};
		request_data.sender = "LOLOLOL";
		request_data.product = data;
        request_data.status = SEND_TO_VERIFY;
		fetch('http://localhost:3000/send_request', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(request_data)
		})
	}
}