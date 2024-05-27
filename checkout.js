document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkout-form');

    form.addEventListener('submit', event => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const paymentMethod = document.getElementById('payment-method').value;

        const order = {
            name,
            address,
            phone,
            paymentMethod,
            cart: JSON.parse(localStorage.getItem('cart'))
        };

        // Here you would typically send the order data to the server
        console.log('Order submitted:', order);

        // Clear the cart after submitting the order
        localStorage.removeItem('cart');

        // Redirect to a confirmation or thank you page
        window.location.href = 'thankyou.html';
    });
});
