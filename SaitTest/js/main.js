let page_loaded = false;
let counter = 0;
let counter_text = undefined;
let inc_button = undefined;
let dec_button = undefined;
window.addEventListener('load', function () {
    inc_button = document.getElementsByClassName('add_button')[0];
    dec_button = document.getElementsByClassName("delete_button")[0];
    counter_text = document.getElementsByClassName('counter_text')[0];
    page_loaded = true;
});

function increment_counter()
{
    if(page_loaded)
    {
        counter++;
        counter_text.innerText = counter;
        inc_button.style.color = "red";
        //inc_button.disabled = true;
    }
}

function decrement_counter()
{
    if(page_loaded)
    {
        counter--;
        counter_text.innerText = counter;
        dec_button.style.color = "red";
        //dec_button.disabled = true;
    }

}