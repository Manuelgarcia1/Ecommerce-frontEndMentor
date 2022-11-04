// Contador de productos del carrito de compra

const minusBtn = document.querySelector('.input__minus');
const plusBtn = document.querySelector('.input__plus');
let userInput = document.querySelector('.input__number');

let userInputNumber = 0;

plusBtn.addEventListener('click', ()=>{
    userInputNumber++;
    userInput.value = userInputNumber;
})

minusBtn.addEventListener('click', ()=>{
    userInputNumber--;
    if (userInputNumber <= 0){
        userInputNumber = 0;
    }
    userInput.value = userInputNumber;
})


// Agregar total de productos al carrito cuando se presiona el boton add to cart

const addToCartBtn = document.querySelector ('.details__button');
let cartNotification = document.querySelector ('.header__cart--notification');
let lastValue =  parseInt(cartNotification.innerText);

addToCartBtn.addEventListener('click',()=>{
    lastValue = lastValue + userInputNumber;  //valor anterior en el index html + el actual para sumar al carrito
    cartNotification.innerText = lastValue;
    cartNotification.style.display = 'block';
    drawProductInModal ();
    
})

// Mostrar el modal con el detalle del carrito

const cartIconBtn = document.querySelector('.header__cart');
const cartModal = document.querySelector('.cart-modal');
//let priceModal = document.querySelector('.cart-modal__price');
const productContainer = document.querySelector('.cart-modal__chekout-container');

cartIconBtn.addEventListener('click', () => {
    cartModal.classList.toggle ('show'); // funcion, se pasan los valores entre parentesis, toggle agrega la funcion show a esa clase y si ya esta, la quita, de esta manera hace que el carro aparezca y desaparezca al clickear
    if (lastValue == 0){
        productContainer.innerHTML = '<p class="cart-empty">Your cart is empty!</p>';
    }
    else{
        drawProductInModal ();
    }
});

//Borrar contenido del carrito
function deleteProduct(){
    const deleteProductBtn = document.querySelector('.cart-modal__delete');

    deleteProductBtn.addEventListener ('click', () => {
        productContainer.innerHTML = '<p class="cart-empty">Your cart is empty!</p>';
        lastValue = 0;
        cartNotification.innerHTML = lastValue;
}); 
}
// cambiar imagenes tipo carousel 
const imageContainer = document.querySelector('.gallery__image-container');
const previusGalleryBtn = document.querySelector('.gallery__previus');
const nextGalleryBtn = document.querySelector('.gallery__next');
let index = 0;

const imagesUrls = new Array ();

    imagesUrls[0] = ['../images/image-product-1.jpg'],
    imagesUrls[1] = ['../images/image-product-2.jpg'],
    imagesUrls[2] = ['../images/image-product-3.jpg'],
    imagesUrls[3] = ['../images/image-product-4.jpg']



nextGalleryBtn.addEventListener ('click', ()=>{
    changeNextImage(imageContainer); //le paso el elemento donde  se  va a hacer el cambio
})

previusGalleryBtn.addEventListener ('click', ()=>{
    changePreviusImage(imageContainer); //le paso el elemento donde  se  va a hacer el cambio
})



// mostral modal de imagenes vista dekstop

const imagesModal = document.querySelector ('.modal-gallery__background');
const closeModalBtn = document.querySelector ('.modal-gallery__close')

imageContainer.addEventListener ('click', ()=>{
    if (window.innerWidth >= 1115){
        imagesModal.style.display = 'grid'; 
    }
})


closeModalBtn.addEventListener ('click', ()=>{
    imagesModal.style.display   = 'none';
})


// cambiar imagenes del modal

let thumbnails = document.querySelectorAll ('.gallery__thumnails');
thumbnails = [...thumbnails]

thumbnails.forEach(thumbnail =>{
    thumbnail.addEventListener ('click', event =>{
        imageContainer.style.backgroundImage =  `url(${imagesUrls[event.target.id-1]})`
    })
})

// cambiar imagenes del modal EN EL MODAL

let modalthumbnails = document.querySelectorAll ('.modal-gallery__thumnails');
const modalImageContainer = document.querySelector ('.modal-gallery__image-container');
modalthumbnails = [...modalthumbnails]

modalthumbnails.forEach(modalthumbnail =>{
    modalthumbnail.addEventListener ('click', event =>{
        console.log (event.target.id)
        modalImageContainer.style.backgroundImage =  `url(${imagesUrls[event.target.id.slice(-1) -1]})`
    })
})

//cambiar las imagenes del modal con las flechas

const previusModalBtn = document.querySelector ('.modal-gallery__previus');
const nextModalBtn = document.querySelector ('.modal-gallery__next');

nextModalBtn.addEventListener ('click', ()=>{
    changeNextImage(modalImageContainer); //le paso el elemento donde  se  va a hacer el cambio
})

previusModalBtn.addEventListener ('click', ()=>{
    changePreviusImage(modalImageContainer); //le paso el elemento donde  se  va a hacer el cambio
})

// mostrar navbar menu de hamburguesa

const hamburgerMenu = document.querySelector('.header__menu');
const modalNavbar = document.querySelector('.modal-navbar__background');
const closeModalNavbar = document.querySelector('.modal-navbar__close-icon');

modalNavbar.style.display = 'none';

hamburgerMenu.addEventListener('click', ()=>{
    console.log('abrir modal');
    modalNavbar.style.display = 'block';
});

closeModalNavbar.addEventListener('click', ()=>{
    modalNavbar.style.display = 'none';
});

//funciones

function drawProductInModal(){
    productContainer.innerHTML = `
    <div class="cart-modal__details-container">
        <img class="cart-modal__image" src="./images/image-product-1-thumbnail.jpg" alt="">
        <div>
            <p class="cart-modal__product">Autumn Limited Edition...</p>
            <p class="cart-modal__price">$125 x3 <span>$375.00</span></p>
        </div>
            <img class="cart-modal__delete" src="./images/icon-delete.svg" alt="delate">
        </div>
    </div>
    <div>
        <button class="cart-modal__chekount">Checkout</button>
    </div>`
    deleteProduct();
    let priceModal = document.querySelector('.cart-modal__price');
    priceModal.innerHTML = `$125 x${lastValue} <span>$${lastValue*125}.00</span>` //actualizacion del precio en el carrito
};



function changeNextImage(imgContainer){
    if (index < 3){
        index++;
        imgContainer.style.backgroundImage = `url(${imagesUrls[index]})`;
       
    }
    
}

function changePreviusImage(imgContainer){
    if (index < 4 & index > 0) {
        index--;
        imgContainer.style.backgroundImage = `url(${imagesUrls[index]})`;	
    }
    
  
}
