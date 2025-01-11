import React, { useState, useEffect, useRef } from 'react';
import Papa from 'papaparse';
import { ShoppingCart, ExternalLink } from 'lucide-react';

const AmazonTicker = () => {
  const [products, setProducts] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await window.fs.readFile('amazon_products.csv', { encoding: 'utf8' });
        Papa.parse(response, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            if (results.data && results.data.length > 0) {
              setProducts(results.data);
            }
          }
        });
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    loadProducts();
  }, []);

  // Duplicate products for seamless scrolling
  const allProducts = [...products, ...products];

  useEffect(() => {
    if (products.length === 0 || isPaused) return;

    const scrollSpeed = 0.5; // Slower speed for better readability
    const animate = () => {
      setScrollPosition(prev => {
        const newPosition = prev + scrollSpeed;
        if (newPosition >= containerRef.current?.firstElementChild?.offsetWidth) {
          return 0;
        }
        return newPosition;
      });
    };

    const animationFrame = setInterval(animate, 30);
    return () => clearInterval(animationFrame);
  }, [products, isPaused]);

  if (products.length === 0) {
    return <div className="h-16 bg-gray-50 border-b"></div>;
  }

  return (
    <div 
      className="bg-gray-50 border-b overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative h-16">
          <div 
            ref={containerRef}
            className="absolute whitespace-nowrap"
            style={{ transform: `translateX(-${scrollPosition}px)` }}
          >
            <div className="inline-flex items-center h-16 space-x-8">
              {allProducts.map((product, index) => (
                <a
                  key={`${product.name}-${index}`}
                  href={product.affiliate_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 hover:bg-white px-4 py-2 rounded-lg transition-colors group"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{product.name}</span>
                    <span className="text-blue-600 font-bold">${product.price}</span>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ShoppingCart className="h-4 w-4 text-gray-600" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmazonTicker;