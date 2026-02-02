// Products Database
const products = {
    sneakers: [
        {
            id: 1,
            name: 'Sneakers Viena en Cuero',
            price: 229990,
            originalPrice: 269990,
            discount: 15,
            image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80',
            image2: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&q=80',
            category: 'sneakers'
        },
        {
            id: 2,
            name: 'Sneakers Tokio en Cuero',
            price: 189990,
            originalPrice: 229000,
            discount: 17,
            image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80',
            image2: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&q=80',
            category: 'sneakers'
        },
        {
            id: 3,
            name: 'Sneakers Stars en Cuero',
            price: 229990,
            originalPrice: 269990,
            discount: 15,
            image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=600&q=80',
            image2: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80',
            category: 'sneakers'
        },
        {
            id: 4,
            name: 'Sneakers Sirena en Cuero',
            price: 209990,
            originalPrice: 259990,
            discount: 19,
            image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80',
            image2: 'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=600&q=80',
            category: 'sneakers'
        }
    ],
    canoas: [
        {
            id: 5,
            name: 'Canoa Grecia en Cuero',
            price: 169990,
            originalPrice: 199990,
            discount: 15,
            image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&q=80',
            image2: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&q=80',
            category: 'canoas'
        },
        {
            id: 6,
            name: 'Canoa Henna Ultraconfort',
            price: 129990,
            originalPrice: 149990,
            discount: 13,
            image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80',
            image2: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80',
            category: 'canoas'
        },
        {
            id: 7,
            name: 'Canoa Athens Premium',
            price: 179990,
            originalPrice: 209990,
            discount: 14,
            image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&q=80',
            image2: 'https://images.unsplash.com/photo-1600181516371-8db4b5e8d5e5?w=600&q=80',
            category: 'canoas'
        },
        {
            id: 8,
            name: 'Canoa Rome Elegance',
            price: 159990,
            originalPrice: 189990,
            discount: 16,
            image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&q=80',
            image2: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=600&q=80',
            category: 'canoas'
        }
    ]
};

// Cart State
let cart = JSON.parse(localStorage.getItem('matizesCart')) || [];

// Stripe Configuration (Replace with your actual publishable key)
const stripePublicKey = 'pk_test_51234567890'; // DEMO KEY - Replace with real one

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    updateCart();
    initScrollAnimations();
    initNavbar();
    initMobileMenu();
    initCartSidebar();
    initNewsletterForm();
});

// Load Products
function loadProducts() {
    const sneakersGrid = document.getElementById('sneakersGrid');
    const canoasGrid = document.getElementById('canoasGrid');

    if (sneakersGrid) {
        sneakersGrid.innerHTML = products.sneakers.map(product => createProductCard(product)).join('');
    }

    if (canoasGrid) {
        canoasGrid.innerHTML = products.canoas.map(product => createProductCard(product)).join('');
    }

    // Add event listeners to all add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        });
    });
}

// Create Product Card
function createProductCard(product) {
    return `
        <div class="product-card bg-white rounded-2xl overflow-hidden shadow-lg scroll-scale group">
            <div class="relative overflow-hidden">
                <img src="${product.image}" 
                     alt="${product.name}" 
                     class="w-full h-80 object-cover group-hover:opacity-0 transition-opacity duration-500">
                <img src="${product.image2}" 
                     alt="${product.name}" 
                     class="absolute inset-0 w-full h-80 object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                ${product.discount ? `
                    <div class="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold discount-badge">
                        -${product.discount}%
                    </div>
                ` : ''}
                <button class="add-to-cart absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-12 group-hover:translate-y-0 bg-accent text-white px-6 py-3 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300" data-id="${product.id}">
                    <i class="fas fa-shopping-bag mr-2"></i>Agregar al Carrito
                </button>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-serif font-bold mb-2">${product.name}</h3>
                <div class="flex items-center justify-between">
                    <div>
                        <span class="text-2xl font-bold text-accent">$${formatPrice(product.price)}</span>
                        ${product.originalPrice ? `
                            <span class="text-sm text-gray-400 line-through ml-2">$${formatPrice(product.originalPrice)}</span>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Format Price
function formatPrice(price) {
    return price.toLocaleString('es-CO');
}

// Add to Cart
function addToCart(productId) {
    const allProducts = [...products.sneakers, ...products.canoas];
    const product = allProducts.find(p => p.id === productId);
    
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem('matizesCart', JSON.stringify(cart));
    updateCart();
    showNotification('Producto agregado al carrito');
    
    // Open cart sidebar
    document.getElementById('cartSidebar').classList.add('active');
    document.getElementById('overlay').classList.remove('hidden');
}

// Update Cart
function updateCart() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const checkoutBtn = document.getElementById('checkoutBtn');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartCount.textContent = totalItems;
    cartSubtotal.textContent = `$${formatPrice(subtotal)}`;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center text-gray-500 py-12">Tu carrito está vacío</p>';
        checkoutBtn.disabled = true;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="flex items-center space-x-4 mb-6 pb-6 border-b">
                <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-lg">
                <div class="flex-1">
                    <h4 class="font-semibold mb-1">${item.name}</h4>
                    <p class="text-accent font-bold">$${formatPrice(item.price)}</p>
                </div>
                <div class="flex items-center space-x-2">
                    <button class="quantity-btn w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">
                        <i class="fas fa-minus text-xs"></i>
                    </button>
                    <span class="w-8 text-center font-semibold">${item.quantity}</span>
                    <button class="quantity-btn w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">
                        <i class="fas fa-plus text-xs"></i>
                    </button>
                </div>
                <button class="text-red-500 hover:text-red-700 transition" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
        checkoutBtn.disabled = false;
    }
}

// Update Quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('matizesCart', JSON.stringify(cart));
        updateCart();
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('matizesCart', JSON.stringify(cart));
    updateCart();
    showNotification('Producto eliminado del carrito');
}

// Checkout with Stripe
document.getElementById('checkoutBtn')?.addEventListener('click', async () => {
    if (cart.length === 0) return;

    const checkoutBtn = document.getElementById('checkoutBtn');
    checkoutBtn.innerHTML = '<div class="spinner mx-auto"></div>';
    checkoutBtn.disabled = true;

    try {
        // In a real implementation, you would:
        // 1. Send cart data to your backend
        // 2. Create a Stripe Checkout Session
        // 3. Redirect to Stripe Checkout

        // For demo purposes, we'll simulate the process
        await simulateCheckout();

        showNotification('Redirigiendo a la pasarela de pago...');
        
        // Demo: Show a mock checkout
        setTimeout(() => {
            alert('DEMO: En producción, aquí se redirigiría a Stripe Checkout.\n\nTotal: $' + formatPrice(cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)));
            checkoutBtn.innerHTML = 'Proceder al Pago';
            checkoutBtn.disabled = false;
        }, 2000);

    } catch (error) {
        console.error('Checkout error:', error);
        showNotification('Error al procesar el pago. Intenta nuevamente.');
        checkoutBtn.innerHTML = 'Proceder al Pago';
        checkoutBtn.disabled = false;
    }
});

// Simulate Checkout (for demo)
function simulateCheckout() {
    return new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal, .scroll-fade, .scroll-scale').forEach(el => {
        observer.observe(el);
    });

    // Trigger animations on load for hero section
    setTimeout(() => {
        document.querySelectorAll('.scroll-reveal').forEach(el => {
            el.classList.add('active');
        });
    }, 300);
}

// Navbar Scroll Effect
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }

        lastScroll = currentScroll;
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

// Mobile Menu
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('overlay');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        overlay.classList.remove('hidden');
    });

    closeMenu.addEventListener('click', closeMobileMenu);
    
    overlay.addEventListener('click', () => {
        closeMobileMenu();
        closeCart();
    });

    // Close menu when clicking on a link
    document.querySelectorAll('#mobileMenu a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('overlay');
    mobileMenu.classList.remove('active');
    if (!document.getElementById('cartSidebar').classList.contains('active')) {
        overlay.classList.add('hidden');
    }
}

// Cart Sidebar
function initCartSidebar() {
    const cartToggle = document.getElementById('cartToggle');
    const closeCart = document.getElementById('closeCart');

    cartToggle.addEventListener('click', () => {
        document.getElementById('cartSidebar').classList.add('active');
        document.getElementById('overlay').classList.remove('hidden');
    });

    closeCart.addEventListener('click', closeCartSidebar);
}

function closeCartSidebar() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    cartSidebar.classList.remove('active');
    if (!document.getElementById('mobileMenu').classList.contains('active')) {
        overlay.classList.add('hidden');
    }
}

function closeCart() {
    closeCartSidebar();
}

// Newsletter Form
function initNewsletterForm() {
    const form = document.querySelector('#contacto form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            showNotification(`¡Gracias por suscribirte con ${email}!`);
            form.reset();
        });
    }
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-24 right-4 bg-accent text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in';
    notification.innerHTML = `
        <i class="fas fa-check-circle mr-2"></i>
        ${message}
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slide-out 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slide-in {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slide-out {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .animate-slide-in {
        animation: slide-in 0.3s ease;
    }
`;
document.head.appendChild(style);
