document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                ${item.name} - ₹${item.price.toFixed(2)} x ${item.quantity}
                <button class="decrease-quantity" data-id="${item.id}">-</button>
                <button class="increase-quantity" data-id="${item.id}">+</button>
            `;
            cartItems.appendChild(li);
            total += item.price * item.quantity;
        });
        totalPriceElement.textContent = `Total: ₹${total.toFixed(2)}`;
        addCartButtonsListeners();
    }

    function addCartButtonsListeners() {
        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-id');
                const cartItem = cart.find(item => item.id === productId);
                if (cartItem) {
                    if (cartItem.quantity > 1) {
                        cartItem.quantity--;
                    } else {
                        cart.splice(cart.indexOf(cartItem), 1);
                    }
                }
                updateLocalStorage();
                updateCart();
            });
        });

        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-id');
                const cartItem = cart.find(item => item.id === productId);
                if (cartItem) {
                    cartItem.quantity++;
                }
                updateLocalStorage();
                updateCart();
            });
        });
    }

    function updateLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    document.getElementById('checkout').addEventListener('click', () => {
        window.location.href = 'checkout.html';
    });

    updateCart();
});
