// This script creates the mobile footer exactly matching the screenshot design 
document.addEventListener('DOMContentLoaded', function() {
  // Only run on mobile devices
  if (window.innerWidth <= 768) {
    // Get the footer element
    const footer = document.querySelector('.scientific-footer');
    
    if (footer) {
      // Get container
      const container = footer.querySelector('.container');
      
      if (container) {
        // Create mobile footer HTML that exactly matches the screenshot
        const mobileFooterHTML = `
          <div class="mobile-footer-content">
            <!-- Logo and site name are handled by CSS pseudo-elements -->
            
            <!-- Social Icons -->
            <div class="social-icons">
              <a href="#" class="social-icon facebook">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="social-icon twitter">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="social-icon instagram">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#" class="social-icon youtube">
                <i class="fab fa-youtube"></i>
              </a>
              <a href="#" class="social-icon discord">
                <i class="fab fa-discord"></i>
              </a>
            </div>
            
            <!-- Navigation -->
            <h4>Navigate</h4>
            <div class="navigate-links">
              <a href="/">Home</a>
              <a href="/wiki/">Wiki</a>
              <a href="/fiesta/">Fiesta</a>
              <a href="/register/">Register</a>
            </div>
            
            <!-- Contact -->
            <div class="contact-section">
              <h4>Contact</h4>
              <p><i class="fas fa-envelope"></i> info@tgbhssciencefiesta.com</p>
              <p><i class="fas fa-phone"></i> (123) 456-7890</p>
              <p><i class="fas fa-map-marker-alt"></i> TGBHS Campus</p>
            </div>
            
            <!-- Sponsors -->
            <div class="sponsors-section">
              <h4>Our Sponsors</h4>
              <div class="sponsor-item">
                <div class="sponsor-circle"></div>
                <span class="gold-sponsor">TechLabs Inc.</span>
              </div>
              <div class="sponsor-item">
                <div class="sponsor-circle"></div>
                <span class="silver-sponsor">ScienceHub</span>
              </div>
              <div class="sponsor-item">
                <div class="sponsor-circle"></div>
                <span class="bronze-sponsor">EduWorld</span>
              </div>
            </div>
            
            <!-- Copyright Text -->
            <p class="copyright-text">&copy; 2025 TGBHS Science Fiesta. All rights reserved.</p>
            <p class="copyright-design">Designed with <i class="fas fa-gear"></i> for science enthusiasts</p>
          </div>
        `;
        
        // Set the container's innerHTML to our mobile footer
        container.innerHTML = mobileFooterHTML;
      }
    }
  }
});