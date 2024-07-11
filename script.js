const menu = document.getElementById('menu')
const cartBtn = document.getElementById('cart-btn')
const cartModal = document.getElementById('cart-modal')
const cartItemsContainers = document.getElementById('cart-items')
const cartTotal = document.getElementById('cart-total')
const checkoutBtn = document.getElementById('checkout-btn')
const closeModalBtn = document.getElementById('close-modal-btn')
const cartCounter = document.getElementById('cart-count')
const addressInput = document.getElementById('address')
const addressWarm = document.getElementById('address-warm')

let cart = []

// ABRI MODAL CARRINHO
cartBtn.addEventListener('click', function () {
    updateCartModal()
    cartModal.style.display  = 'flex'
})

// FECHAR O MODAL AO CLICAR FORA
cartModal.addEventListener('click', function (event) {
    if (event.target === cartModal) {
        cartModal.style.display = 'none'
    }
})

// FECHAR O MODAL AO CLICAR FECHAR
closeModalBtn.addEventListener('click', function () {
        cartModal.style.display = 'none'
})

menu.addEventListener('click', function (event) {
    let parentButton = event.target.closest('.add-to-cart-btn')

    if (parentButton) {
        const name = parentButton.getAttribute('data-name')
        const price = parseFloat(parentButton.getAttribute('data-price'))
        addToCart(name, price)
    }

})

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name)

    if (existingItem) {
        existingItem.quantity += 1;

    } else {

        cart.push({
            name,
            price,
            quantity: 1,
        })
    }

    updateCartModal()

}

// ATUALIZA CARRINHO
function updateCartModal() {
    cartItemsContainers.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('flex', 'justify-between', 'mb-4', 'flex-col')

        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <p class="font-medium">${item.name}<p/>
                <p> Qtd: ${item.quantity}<p/>
                <p class="font-medium mt-2 ">${item.price.toFixed(2)}<p/>
            </div>

            <button class="remove-from-cart-btn" data-name="${item.name}">
                Remover
            </button>
        
        </div>
        `
        total += item.price * item.quantity;

        cartItemsContainers.appendChild(cartItemElement)

    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = cart.length

}

// REMOVER QUANTIDADE DO CARRINHO

cartItemsContainers.addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-from-cart-btn')) {
        const name = event.target.getAttribute('data-name')

        removerItemCart(name)
    }
})

function removerItemCart(name) {
    const index = cart.findIndex(item => item.name === name);

    if (index !== -1) {
        const item = cart[index];

        if (item.quantity > 1) {
            item.quantity -= 1;
            updateCartModal()
            return
        }

        cart.splice(index, 1);
        updateCartModal()
    }
}

addressInput.addEventListener('input', function (event) {
    let inputValue = event.target.value;
    if (inputValue !== "") {
        addressInput.classList.remove('border-red-500')
        addressWarm.classList.add('hidden')
    }

})


// FINALIZAR PEDIDO
checkoutBtn.addEventListener('click', function () {

    const isOpen = checkRestaurantOpen();
    if (!isOpen) {
        Toastify({
            text: "Ops, estamos fechados no momento",
            duration: 3000,
            close: true,
            gravity: "top", 
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#ef4444",
            },
          }).showToast();

        return;
    }

    if (cart.length === 0) return;
        if (addressInput.value === "") {
            addressWarm.classList.remove('hidden')
            addressInput.classList.add('border-red-500')
            return;
        }

    // ENVIAR PEDIDO PARA WHATSAPP
    const cartItems = cart.map((item) => {
        return (
            `${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price} | `
        )
    }).join("")

    const message = encodeURIComponent(cartItems)
    const phone = "35999057566"

    window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank")

    cart = []
    cart.length = 0
    addressInput.value =""
    cartModal.style.display = 'none'

    updateCartModal()

    
})

function checkRestaurantOpen() {
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 22;
    
}

const spanItem = document.getElementById('date-span')
const isOpen = checkRestaurantOpen();

if (isOpen) {
    spanItem.classList.remove('bg-red-500');
    spanItem.classList.add('bg-green-600');
    
}else{

    spanItem.classList.remove('bg-green-600');
    spanItem.classList.add('bg-red-500');
}