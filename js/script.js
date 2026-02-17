// Initialize EmailJS (IMPORTANT)
window.onload = function(){

emailjs.init("fBhht2gNbC3DjBRC1");

}



let cart = [];
let total = 0;


// ADD / REMOVE ITEM FUNCTION

function toggleItem(button, name, price){

if(button.classList.contains("added")){

button.classList.remove("added");
button.innerHTML = "Add Item ⊕";

cart = cart.filter(item => item.name !== name);
total -= price;

}
else{

button.classList.add("added");
button.innerHTML = "Remove Item ⊖";

cart.push({name, price});
total += price;

}

updateCart();

}



// UPDATE CART TABLE

function updateCart(){

let table = document.getElementById("cartTable");

table.innerHTML = "";

cart.forEach((item,index)=>{

table.innerHTML +=
`
<tr>
<td>${index+1}</td>
<td>${item.name}</td>
<td>₹${item.price}</td>
</tr>
`;

});

document.getElementById("total").innerText = total;

}



// EMAIL SEND FUNCTION (MAIN PART)

function sendEmail(){

let name =
document.querySelector('input[placeholder="Full Name"]').value;

let email =
document.querySelector('input[placeholder="Email ID"]').value;

let phone =
document.querySelector('input[placeholder="Phone Number"]').value;


// validation

if(name=="" || email=="" || phone==""){

alert("Please fill all fields");

return;

}


// services list

let services =
cart.map(item => item.name).join(", ");


// params to send

let params = {

name: name,
email: email,
phone: phone,
services: services,
total: total

};


// send email

emailjs.send("service_ny5bvpl","template_3yrczp3",params)

.then(function(response){

document.getElementById("successMsg").innerText =
"Thank you For Booking the Service We will get back to you soon!";

})

.catch(function(error){

alert("Email failed to send");

});

}
