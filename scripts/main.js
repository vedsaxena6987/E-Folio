// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  // Navigation & Scroll
  const navbar = document.querySelector(".navbar");
  const menuToggle = document.querySelector("#mobile-menu");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const presentationBtns = document.querySelectorAll(".view-presentation");
  const modal = document.getElementById("presentation-modal");
  const iframe = document.getElementById("presentation-iframe");
  const closeModal = document.querySelector(".close-modal");
  const profileImg = document.getElementById("profile-img");

  // Convert HEIC image to JPG/PNG if browser doesn't support it
  if (profileImg) {
    profileImg.onerror = function() {
      // If the HEIC image fails to load, replace with a fallback
      this.src = "https://via.placeholder.com/500x500?text=Profile+Image";
      
      // You can add a message to the console for debugging
      console.log("HEIC image failed to load. Using placeholder instead.");
    };
  }

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Active navigation link based on scroll position
  window.addEventListener("scroll", () => {
    let current = "";
    
    document.querySelectorAll("section").forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Presentation Viewer Modal
  presentationBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const presentationCard = btn.closest(".presentation-card");
      const pptUrl = presentationCard.getAttribute("data-ppt");
      
      // Check if it's a PPTX file or a Google Slides URL
      if (pptUrl.includes('docs.google.com')) {
        iframe.src = pptUrl;
      } else {
        // For local PPTX files, we can use Google Docs Viewer or Microsoft Office Online
        // The Office Online approach:
        iframe.src = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(window.location.origin + '/' + pptUrl)}`;
      }
      
      modal.style.display = "block";
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    });
  });

  // Close modal
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    iframe.src = "";
    document.body.style.overflow = "auto"; // Enable scrolling again
  });

  // Close modal when clicking outside of it
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      iframe.src = "";
      document.body.style.overflow = "auto";
    }
  });

  // Contact form submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;
      
      // Here you would typically send the data to a server
      // For now, let's just log it to console
      console.log("Form submitted:", { name, email, subject, message });
      
      // Show success message (you can replace this with your own implementation)
      alert("Thank you for your message! I'll get back to you soon.");
      
      // Reset form
      contactForm.reset();
    });
  }

  // Add animation classes when elements come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".skill-category, .project-card, .presentation-card, .document-card");
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (elementPosition < screenPosition) {
        element.classList.add("animated");
      }
    });
  };

  window.addEventListener("scroll", animateOnScroll);
  
  // Call once on load to check for elements already in view
  animateOnScroll();
});

// Cursor effect for hero section (optional)
document.addEventListener("mousemove", function(e) {
  const heroSection = document.querySelector(".hero");
  if (heroSection) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const shapes = document.querySelectorAll(".shape");
    shapes.forEach(shape => {
      const shiftValue = shape.getAttribute("data-shift-value") || 20;
      
      // Create a subtle movement effect
      shape.style.transform = `translate(${mouseX * shiftValue}px, ${mouseY * shiftValue}px)`;
    });
  }
});
