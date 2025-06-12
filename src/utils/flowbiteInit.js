import { initFlowbite } from 'flowbite';

// Initialize Flowbite components
export const initializeFlowbite = () => {
  // Initialize all Flowbite components
  initFlowbite();

  // Add click event listener for mobile menu toggle
  const mobileMenuButton = document.querySelector('[data-collapse-toggle="navbar-user"]');
  const mobileMenu = document.getElementById('navbar-user');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}; 