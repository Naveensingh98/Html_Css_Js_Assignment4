emailjs.init("YOUR_PUBLIC_KEY"); // from emailjs

let total = 0;
let cart = [];

function addItem(name, price){
    cart.push(name);
    total += price;

    let li = document.createElement("li");
    li.innerText = name + " - ₹" + price;

    document.getElementById("cartItems").appendChild(li);
    document.getElementById("total").innerText = total;
}

function scrollToBooking(){
    document.getElementById("services").scrollIntoView({behavior:"smooth"});
}

function sendEmail(){

let name = document.getElementById("name").value;
let email = document.getElementById("email").value;
let phone = document.getElementById("phone").value;

let params = {
    name: name,
    email: email,
    phone: phone,
    services: cart.join(", "),
    total: total
};

emailjs.send("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID",params)
.then(()=>{
    document.getElementById("msg").innerText =
    "Thank you For Booking the Service We will get back to you soon!";
});
}
