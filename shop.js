const openShopping = document.querySelector(".shopping");
const shoppingCart = document.querySelector(".shopping-cart");
const list = document.querySelector(".list");
const listCard = document.querySelector(".listCard");
const total = document.querySelector(".total");
const body = document.querySelector("body");
const quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", () => {
    body.classList.add("item");
})
CloseEvent.addEventListener("click", () => {
    body.classList.remove("active");
})

let products = [
    {
        id: 1,
        name: "Tea",
        detail1: "Mixture: TU-709",
        detail2: "Weight: 10kg",
        price: 1000,
        image: "images/TeaFertilizer.png"
    },
    {
        id: 2,
        name: "Tea",
        detail1: "Mixture: T-709",
        detail2: "Weight: 10kg",
        price: 1200,
        image: "images/TeaFertilizer.png"
    },
    {
        id: 3,
        name: "Coconut",
        detail1: "Zone: Wet Zone",
        detail2: "Weight: 5kg",
        price: 500,
        image: "images/CoconutFertilizer.png"
    },
    {
        id: 4,
        name: "Coconut",
        detail1: "Zone: Dry Zone",
        detail2: "Weight: 5kg",
        price: 500,
        image: "images/CoconutFertilizer.png"
    },
    {
        id: 5,
        name: "Paddy",
        detail1: "Stage: Basal",
        detail2: "Weight: 15kg",
        price: 2500,
        image: "images/PaddyFertilizer.png"
    },
    {
        id: 6,
        name: "Paddy",
        detail1: "Stage: TDM",
        detail2: "Weight: 15kg",
        price: 3000,
        image: "images/PaddyFertilizer.png"
    },
    {
        id: 7,
        name: "Cinnamon",
        detail1: "Type: Cinnamon-U",
        detail2: "Weight: 5kg",
        price: 700,
        image: "images/CinnamonFertilizer.png"
    },
    {
        id: 8,
        name: "Vegetable",
        detail1: "Stage: Basal",
        detail2: "Weight: 20kg",
        price: 8000,
        image: "images/VegetablesFertilizer.png"
    },
    {
        id: 9,
        name: "Chilli",
        detail1: "Type: Chilli-SP",
        detail2: "Weight: 2kg",
        price: 300,
        image: "images/ChilliFertilizer.png"
    }
]

let listCards = [];

const initApp = () => {
    products.forEach((value, key) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
        <img src = "img/$(value.image)">
        <div class = "title">${value.name}</div>
        <div class= ="price">$(value.price.toLocaleString())</div>
        <button onclick = "addToCard($(key))"Add to Card</button>
        `
        list.appendChild(newDiv)
    })
}
initApp(); void
    initApp()     
