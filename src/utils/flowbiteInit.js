import { initFlowbite, Dropdown } from 'flowbite';

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
    const dropdown = new Dropdown(userDropdown, userMenuButton, {
      placement: 'bottom',
      offsetSkidding: 0,
      offsetDistance: 10,
      delay: 300,
      onHide: () => {
        userMenuButton.setAttribute('aria-expanded', 'false');
      },
      onShow: () => {
        userMenuButton.setAttribute('aria-expanded', 'true');
      }
    });

    // Add click event listener for mobile
    userMenuButton.addEventListener('click', (e) => {
      e.preventDefault();
      dropdown.toggle();
    });
  }
}; 