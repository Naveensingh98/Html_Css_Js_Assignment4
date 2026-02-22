/* ================= EMAILJS INIT ================= */

window.onload = function(){

emailjs.init("fBhht2gNbC3DjBRC1");

};



/* ================= CART SYSTEM ================= */

let cart = [];
let total = 0;



// ADD / REMOVE ITEM

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



/* ================= HERO SCROLL ================= */

function scrollToBooking(){

document.getElementById("ser")
.scrollIntoView({ behavior: "smooth" });

}



/* ================= BOOKING VALIDATION + EMAIL ================= */

function sendEmail(){

let name =
document.querySelector('input[placeholder="Full Name"]').value.trim();

let email =
document.querySelector('input[placeholder="Email ID"]').value.trim();

let phone =
document.querySelector('input[placeholder="Phone Number"]').value.trim();


/* ===== VALIDATION ===== */

if(name === ""){
alert("Please enter your full name");
return;
}

if(email === ""){
alert("Please enter your email address");
return;
}

let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

if(!email.match(emailPattern)){
alert("Please enter a valid email address");
return;
}

if(phone === ""){
alert("Please enter your phone number");
return;
}

if(phone.length !== 10 || isNaN(phone)){
alert("Phone number must be 10 digits");
return;
}

if(cart.length === 0){
alert("Please select at least one service");
return;
}


/* ===== PREPARE DATA ===== */

let services =
cart.map(item => item.name).join(", ");

let params = {
name: name,
email: email,
phone: phone,
services: services,
total: total
};


/* ===== SEND EMAIL ===== */

emailjs.send("service_ny5bvpl","template_3yrczp3",params)

.then(function(){

document.getElementById("successMsg").innerText =
"Thank you For Booking the Service We will get back to you soon!";

})

.catch(function(error){

alert("Email failed to send");

});

}