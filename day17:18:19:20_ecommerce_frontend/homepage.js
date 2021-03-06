//LATEST 5 PRODUCTS

/* let latestProducts = fakeProducts.slice(0, 5);

displayProducts(latestProducts); //test

const viewOthers = document.createElement('a');
viewOthers.setAttribute('href', './products.html');
viewOthers.innerHTML = `
<div class="card product-card">
    <button class="product-button">
        <i class="fas fa-arrow-circle-right fa-5x mb-2 accent-color"></i>
        <p>Visualizza altri</p>
    </button>
</div>`

cardsWrapper.append(viewOthers); */

// CIRCLE

//select html items
const colCircle = document.querySelector('.col-circle');
const circle = document.querySelector('.wrapper');
const items = document.querySelectorAll('.child');
const centralIcon = document.querySelector("#centralIcon");
const iconTexts = document.querySelectorAll(".iconText");

let deltaAngle = 360/items.length;

let rotations = []

//set circle and icons 
console.log(circle);
let diameter = (circle.getBoundingClientRect().width);
let colCircleWidth = (colCircle.getBoundingClientRect().width);
colCircle.style.height = `${diameter + 30}px`;
let colCircleHeight = colCircle.style.height;

//set first central icon with item at index 0
setCentralIcon(items[0])
let actualIconIndex = 0;

//put items evenly spaced on the circle

items.forEach((item, i)  =>  {

    let rotation = deltaAngle * i 
    rotations.push(rotation) //save starting rotations in array (used in rotate func)
    item.style.transform = `rotate(${rotation}deg) translate(${diameter/2}px) rotate(-${rotation}deg)`

    //add event listener to move items when one is clicked
    item.addEventListener('click', () => {
        completeCircleRotation(i);
    })
})

//start auto rotating icons every 5 seconds
setInterval(() => {completeCircleRotation(actualIconIndex + 1)}, 5000);

function completeCircleRotation(i) {
    (i >= items.length) ? i = 0 : null;
    actualIconIndex = i;
    setCentralIcon(items[i]);
    rotateItems(rotations[i]);
    visualizeIconText(i);
}

function setCentralIcon (item) {
    //remove old classes
    centralIcon.classList = "";

    //add new classes
    let iconClassList = item.firstElementChild.classList;

    if (diameter < 300) {
        centralIcon.classList.add('central', 'fa-4x');
    } else {
        centralIcon.classList.add('central', 'fa-8x');
    }
    
    iconClassList.forEach((value) => centralIcon.classList.add(`${value}`));
}

function rotateItems(rotation) {
    
    items.forEach((item, i) => {
        let angle = rotations[i] - rotation; //calc new position for every item 
        let orientation = 360-angle; //calc angle to look right

        item.style.transition = '2s';
        item.style.transform = `rotate(${angle}deg)  translate(${diameter/2}px) rotate(${orientation}deg)`;
    })
}    

function visualizeIconText(index) {
    //remove d-none class
    iconTexts[index].classList.remove("d-none");

    //add d-none to others
    iconTexts.forEach((iconText, i) => {
        (i != index) ? (iconText.classList.add("d-none")) : null
    });
}