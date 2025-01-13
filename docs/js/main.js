document.addEventListener('DOMContentLoaded', function() {
    console.log('Script initialized');
    
    const tickerContainer = document.querySelector('.amazon-ticker');
    console.log('Ticker container:', tickerContainer);
    
    if (!tickerContainer) {
        console.log('Ticker container not found');
        return;
    }
 
    let scrollPosition = 0;
    const scrollSpeed = 0.5;
    let isPaused = false;
 
    // Load and parse JSON data
    fetch(window.amazonProductsJsonPath)
        .then(response => {
            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('JSON Data loaded:', data);
            if (!data || !data.products || !Array.isArray(data.products)) {
                throw new Error('Invalid JSON structure');
            }
            
            // Create ticker content
            const content = data.products.map(product => `
                <a href="${product.affiliate_link}" 
                   class="flex items-center space-x-2 px-4 py-2 hover:bg-gray-200 transition-colors">
                    <span class="font-medium">${product.name}</span>
                    <span>$${product.price.toFixed(80)}</span>
                </a>
            `).join('');
 
            if (!content) {
                throw new Error('No content generated from products');
            }
 
            tickerContainer.innerHTML = content + content; // Duplicate for seamless scrolling
            console.log('Ticker content loaded');
 
            // Start animation after content is loaded
            animate();
        })
        .catch(error => {
            console.error('Error loading or processing products:', error);
            console.error('Error details:', error.message);
        });
 
    // Scrolling animation
    function animate() {
        if (!isPaused) {
            scrollPosition += scrollSpeed;
            const firstItemWidth = tickerContainer.firstElementChild?.offsetWidth || 0;
            
            if (scrollPosition >= firstItemWidth) {
                scrollPosition = 0;
            }
 
            tickerContainer.style.transform = `translateX(-${scrollPosition}px)`;
        }
        requestAnimationFrame(animate);
    }
 
    // Pause on hover
    tickerContainer.addEventListener('mouseenter', () => isPaused = true);
    tickerContainer.addEventListener('mouseleave', () => isPaused = false);
});