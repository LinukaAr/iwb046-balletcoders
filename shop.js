const openShopping = document.querySelector(".shopping");
const shoppingCart = document.querySelector(".closeShopping");
const list = document.querySelector(".list");
const listCard = document.querySelector(".listCard");
const total = document.querySelector(".total");
const body = document.querySelector("body");
const quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", () => {
    body.classList.add("active");
})
CloseEvent.addEventListener("click", () => {
    body.classList.remove("active");
})

let prodcuts = [
    {
        id: 1,
        name: "Tea",
        images: "images\TeaFertilizer.png",
        price: 1000
    },
    {
        id: 2,
        name: "Tea",
        images: "images/TeaFertilizer.png",
        price: 1200
    },
    {
        id: 3,
        name: "Coconut",
        images: "images/CoconutFertilizer.png",
        price: 500
    },
    {
        id: 4,
        name: "Coconut",
        images: "images/CoconutFertilizer.png",
        price: 500
    },
    {
        id: 5,
        name: "Paddy",
        images: "images/PaddyFertilizer.png",
        price: 2500
    },
    {
        id: 6,
        name: "Paddy",
        images: "images/PaddyFertilizer.png",
        price: 3000
    },
    {
        id: 7,
        name: "Cinnamon",
        images: "images/CinnamonFertilizer.png",
        price: 700
    },
    {
        id: 8,
        name: "Vegetable",
        images: "images/VegetableFertilizer.png",
        price: 8000
    },
    {
        id: 9,
        name: "Chilli",
        images: "images/ChilliFertilizer.png",
        price: 300
    }
]

let listCards = [];

const initApp = () => {
    prodcuts.forEach((value, key) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
            <img src = "img/${value.images}">
            <div class = "title">${value.name}</div>
            <div class= "price">${value.price.toLocaleString()}</div>
            <button onclick = "addToCard(${key})"Add to Card
            </button>
        `;
        list.appendChild(newDiv)
    })
}

initApp()     
