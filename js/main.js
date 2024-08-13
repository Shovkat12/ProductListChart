let desserts = {
    WaffleBerries: {
        name: "Waffle with Berries",
        amount: 0,
        price: 6.50
    },
    CremeBrulee: {
        name: "Vanilla Bean Crème Brûlée",
        amount: 0,
        price: 7.00
    },
    MacaronFive: {
        name: "Macaron Mix of Five",
        amount: 0,
        price: 8.00
    },
    ClassicTiramisu: {
        name: "Classic Tiramisu",
        amount: 0,
        price: 6.50
    },
    PistachoBaklava: {
        name: "Pistacho Baklava",
        amount: 0,
        price: 4.00
    },
    LemonPie: {
        name: "Lemon Meringue Pie",
        amount: 0,
        price: 5.00
    },
    RedCake: {
        name: "Red Velvet Cake",
        amount: 0,
        price: 4.50
    },
    SaltedBrownie: {
        name: "Salted Caramel Brownie",
        amount: 0,
        price: 5.50
    },
    VanillaCotta: {
        name: "Vanilla Panna Cotta",
        amount: 0,
        price: 6.50
    }
}

let elItem = [...document.querySelectorAll(".desserts-item")]
let mainBtn = [...document.querySelectorAll(".desserts-item_btn")]
let itemPicture = [...document.querySelectorAll(".item_picture_img")]
let elBtn = [...document.querySelectorAll(".click")]
let elBtn_2 = [...document.querySelectorAll(".nonactive")]
let elBtnNon = [...document.querySelectorAll(".item-btn-nonactive")]
let elBtnAct = [...document.querySelectorAll(".item-btn-active")]
let elPlus = [...document.querySelectorAll(".plus")]
let elMinus = [...document.querySelectorAll(".minus")]
let elCount = [...document.querySelectorAll(".btn-active-count")]
let elBigList = document.querySelector(".cart-active-list")
let headlineCount = document.querySelector(".headline-count")
let mainNonActive = document.querySelector(".main-cart-nonactive")
let mainActive = document.querySelector(".main-cart-active")
let orderTotal = document.querySelector(".total-price-number") 
let totalSum = 0;

function updateOrderTotal() {
    let total = 0;
    let activeItems = document.querySelectorAll(".active-item");
    
    activeItems.forEach(function(item) {
        let itemId = item.getAttribute("data-id");
        let itemAmount = desserts[itemId].amount;
        let itemPrice = desserts[itemId].price;
        
        total += itemAmount * itemPrice;
    });

    orderTotal.innerHTML = `${total}$`;
    totalSum = total;  
}

function Overflow() {
    let activeItems = document.querySelectorAll(".active-item");
    headlineCount.innerHTML = activeItems.length
    if(activeItems.length>0){
        mainNonActive.style.display = "none"
        mainActive.style.display = "flex"
    }
    else if(activeItems.length==0){
        mainNonActive.style.display = "flex"
        mainActive.style.display = "none"
    }
    if (activeItems.length > 3) {
        elBigList.classList.add("overflow");
    } else {
        elBigList.classList.remove("overflow");
    }
}

document.addEventListener('click', function(event) {
    if (event.target.closest('.active-item_btn')) {
        const button = event.target.closest('.active-item_btn');
        const activeItem = button.closest('.active-item');
        
        if (activeItem) {
            const itemId = activeItem.getAttribute("data-id");

            
            let itemPrice = desserts[itemId].price;
            let itemAmount = desserts[itemId].amount;
            let totalToSubtract = itemPrice * itemAmount;

            
            let itemIndex = elItem.findIndex(item => item.getAttribute("id") === itemId);
            if (itemIndex !== -1) {
                desserts[itemId].amount = 0;  
                elCount[itemIndex].innerHTML = 0;  

                elPlus[itemIndex].disabled = true; 
                elMinus[itemIndex].disabled = true; 

               
                elBtnAct[itemIndex].classList.remove("active");
                elBtnNon[itemIndex].classList.add("active");
                mainBtn[itemIndex].classList.remove("item_btn-border");
                itemPicture[itemIndex].style.border = "0px solid #C73B0F";
                elPlus[itemIndex].style.display = "none";
                elMinus[itemIndex].style.display = "none";
            }

            
            activeItem.remove();
            
            
            totalSum -= totalToSubtract;
            orderTotal.innerHTML = `${totalSum}$`;
            Overflow();
        }
    }
});

let getId
for (let i = 0; i < elBtn.length; i++) {
    elBtn[i].addEventListener("click", function(){
        if(elBtnNon[i].classList.contains("active")){
            elBtnAct[i].classList.add("active")
            elBtnNon[i].classList.remove("active")
            mainBtn[i].classList.add("item_btn-border")
            itemPicture[i].style.border = "2px solid #C73B0F"
            elPlus[i].style.display = "flex"
            elMinus[i].style.display = "flex"
            elPlus[i].removeAttribute("disabled")
            elMinus[i].removeAttribute("disabled")
        }
    })
    elBtn_2[i].addEventListener("click", function(){
        if(elBtnAct[i].classList.contains("active")){   
            elBtnAct[i].classList.remove("active")
            elBtnNon[i].classList.add("active")
            mainBtn[i].classList.remove("item_btn-border")
            itemPicture[i].style.border = "0px solid #C73B0F"
            setTimeout(function(){
                elPlus[i].style.display = "none"
                elMinus[i].style.display = "none"
                elPlus[i].setAttribute("disabled", "true")
                elMinus[i].setAttribute("disabled", "true")  
            },100)
        }
    })
    elPlus[i].addEventListener('click', function(){
        getId = elItem[i].getAttribute("id")
        desserts[getId].amount += 1
        elCount[i].innerHTML = desserts[getId].amount
        let activeItem = document.querySelector(`.active-item[data-id="${getId}"]`);
        if (!activeItem) {
            const newItem = document.createElement("div")
            newItem.classList.add("active-list-item", "active-item")
            newItem.setAttribute("data-id", getId)
            document.querySelector(".cart-active-list").append(newItem)
            const newItemContent = document.createElement("div")
            newItemContent.classList.add("active-item-content")
            newItem.append(newItemContent)
            const newContentP = document.createElement("p")
            newContentP.classList.add("active-item-name")
            newContentP.innerHTML = desserts[getId].name
            newItemContent.append(newContentP)
            const newItemCount = document.createElement("div")
            newItemCount.classList.add("active-item-counter")
            newItemContent.append(newItemCount)
            const counterAmount = document.createElement("p")
            counterAmount.classList.add("item-counter-amount")
            counterAmount.innerHTML = desserts[getId].amount
            newItemCount.append(counterAmount)
            const counterAmountSpan = document.createElement("span")
            counterAmountSpan.innerHTML = "x"
            counterAmount.append(counterAmountSpan)
            const counterPrice = document.createElement("p")
            counterPrice.classList.add("item-counter-price")
            counterPrice.innerHTML = `@ $<span class="price-span">${desserts[getId].price}</span>`
            newItemCount.append(counterPrice)
            const counterTotalPrice = document.createElement("p")
            counterTotalPrice.classList.add("item-counter-totalprice")
            counterTotalPrice.innerHTML = `${desserts[getId].price * desserts[getId].amount}$` 
            newItemCount.append(counterTotalPrice)
            const newItemBtn = document.createElement("button")
            newItemBtn.classList.add("active-item_btn")
            newItem.append(newItemBtn)
            const newItemBtnIcon = document.createElement("i")
            newItemBtnIcon.classList.add("fa-regular", "fa-circle-xmark")
            newItemBtn.append(newItemBtnIcon)
        } else {
            let counterAmount = activeItem.querySelector(".item-counter-amount");
            let counterTotalPrice = activeItem.querySelector(".item-counter-totalprice");
            counterAmount.innerHTML = `${desserts[getId].amount} <span>x</span>`;
            counterTotalPrice.innerHTML = `${desserts[getId].price * desserts[getId].amount}$`;
        }
        updateOrderTotal();
        Overflow();
    });
    elMinus[i].addEventListener('click', function(){
        getId = elItem[i].getAttribute("id")
        if (desserts[getId].amount > 0) {
            desserts[getId].amount -= 1
            elCount[i].innerHTML = desserts[getId].amount

            let activeItem = document.querySelector(`.active-item[data-id="${getId}"]`);
            if (activeItem) {
                let counterAmount = activeItem.querySelector(".item-counter-amount");
                let counterTotalPrice = activeItem.querySelector(".item-counter-totalprice");

                counterAmount.innerHTML = `${desserts[getId].amount} <span>x</span>`;
                counterTotalPrice.innerHTML = `${desserts[getId].price * desserts[getId].amount}$`;
                
                if (desserts[getId].amount === 0) {
                    activeItem.remove();
                }
            }
        }
        updateOrderTotal();
        Overflow();
    });
}

