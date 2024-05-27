document.addEventListener('DOMContentLoaded', () => {
    const sections = {
        home: document.getElementById('home-section'),
        shop: document.getElementById('shop-section'),
        contact: document.getElementById('contact-section')
    };

    document.getElementById('home-link').addEventListener('click', (event) => {
        event.preventDefault();
        showSection('home');
    });

    document.getElementById('shop-link').addEventListener('click', (event) => {
        event.preventDefault();
        showSection('shop');
    });

    document.getElementById('contact-link').addEventListener('click', (event) => {
        event.preventDefault();
        showSection('contact');
    });

    document.getElementById('go-to-cart').addEventListener('click', () => {
        window.location.href = 'cart.html';
    });

    function showSection(section) {
        Object.values(sections).forEach(sec => sec.style.display = 'none');
        sections[section].style.display = 'block';
    }

    // Default to showing the home section
    showSection('home');

    const products = document.querySelectorAll('.product');
    const searchBar = document.getElementById('search-bar');

    searchBar.addEventListener('input', filterProducts);

    function filterProducts() {
        const searchTerm = searchBar.value.toLowerCase();
        products.forEach(product => {
            const name = product.getAttribute('data-name').toLowerCase();
            if (name.includes(searchTerm)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productElement = button.parentElement;
            const product = {
                id: productElement.getAttribute('data-id'),
                name: productElement.getAttribute('data-name'),
                price: parseFloat(productElement.getAttribute('data-price')),
                image: productElement.getAttribute('data-image')
            };

            addToCart(product);
        });
    });

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function addToCart(product) {
        const cartItem = cart.find(item => item.id === product.id);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            product.quantity = 1;
            cart.push(product);
        }
        updateLocalStorage();
        alert('Item added to cart');
    }

    function updateLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
});
