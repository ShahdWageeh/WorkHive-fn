import { initFlowbite } from 'flowbite';

// Initialize Flowbite components
export const initializeFlowbite = () => {
  // Initialize all Flowbite components
  initFlowbite();

  // Initialize mobile menu
  const mobileMenuButton = document.querySelector('[data-collapse-toggle="navbar-user"]');
  const mobileMenu = document.getElementById('navbar-user');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Initialize user dropdown
  const userMenuButton = document.getElementById('user-menu-button');
  const userDropdown = document.getElementById('user-dropdown');

  if (userMenuButton && userDropdown) {
    // Add click event listener for mobile
    userMenuButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      userDropdown.classList.toggle('hidden');
      
      // Update aria-expanded
      const isExpanded = userDropdown.classList.contains('hidden') ? 'false' : 'true';
      userMenuButton.setAttribute('aria-expanded', isExpanded);
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!userMenuButton.contains(e.target) && !userDropdown.contains(e.target)) {
        userDropdown.classList.add('hidden');
        userMenuButton.setAttribute('aria-expanded', 'false');
      }
    });
  }
}; 