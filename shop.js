const openShopping = document.querySelector(".shopping"),
    closeShopping = document.querySelector(".closeShopping"),
    list = document.querySelector(".list"),
    listCard = document.querySelector(".listCard"),
    total = document.querySelector(".total"),
    body = document.querySelector("body"),
    quantity = document.querySelector(".quantity")

openShopping.addEventListener("click", () => {
    body.classList.add("active")
})
closeShopping.addEventListener("click", () => {
    body.classList.remove("active")
})

let products = [
    {
        "id": 1,
        "name": "Tea",
        "image": "images/Shop/1.png",
        "price": 1000
    },
    {
        "id": 2,
        "name": "Tea",
        "image": "images/Shop/1.png",
        "price": 1200
    },
    {
        "id": 3,
        "name": "Coconut",
        "image": "images/Shop/3.png",
        "price": 500
    },
    {
        "id": 4,
        "name": "Coconut",
        "image": "images/Shop/3.png",
        "price": 500
    },
    {
        "id": 5,
        "name": "Paddy",
        "image": "images/Shop/5.png",
        "price": 2500
    },
    {
        "id": 6,
        "name": "Paddy",
        "image": "images/Shop/5.png",
        "price": 3000
    },
    {
        "id": 7,
        "name": "Cinnamon",
        "image": "images/Shop/7.png",
        "price": 700
    },
    {
        "id": 8,
        "name": "Vegetable",
        "image": "images/Shop/8.png",
        "price": 8000
    },
    {
        "id": 9,
        "name": "Chilli",
        "image": "images/Shop/9.png",
        "price": 300
    }
]

let listCards = [];

const initApp = () => {
    products.forEach((value, key) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
            <img src = "${value.image}">
            <div class = "title">${value.name}</div>
            <div class= "price">${value.price.toLocaleString()}</div>
            <button onclick = "addToCard(${key})">Add to Card
            </button>
        `;
        list.appendChild(newDiv)
    })
}

initApp()

const addToCard = key => {
    if (listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        // console.log(listCards);
        listCards[key].quantity = 1;
        // console.log(listCards[key].quantity);
    }

    reloadCard()
}

const reloadCard = () => {
    listCard.innerHTML = "";
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price
        count = count + value.quantity;

        if (value != null) {
            let newDiv = document.createElement("li");
            newDiv.innerHTML = `
                <div><img src = "img/${value.image}"></div>
                <div class = "cardTitle">${value.name}</div>
                <div class = "cardPrice">${value.price.toLocaleString()}</div>

                <div>
                    <button style = "background-color:#560bad;" class = "cardButton" onclick = "changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class = "count">${value.quantity}</div>
                    <button style = "background-color:#560bad;" class = "cardButton" onclick = "changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>
            `
            listCard.appendChild(newDiv)
        }

        total.innerText = totalPrice.toLocaleString();
        quantity.innerText = count;
    })
}


const changeQuantity = (key, quantity) => {
    if (quantity == 0) {
        delete listCards[key]
    }
    else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price
    }
    reloadCard()
}