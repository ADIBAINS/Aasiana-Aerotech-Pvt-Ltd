document.addEventListener("DOMContentLoaded", function () {
  // Initialize EmailJS
  if (typeof emailjs !== "undefined") {
    emailjs.init("3rAkmIJLtR3Pr03S8");
  } else {
    console.error("EmailJS not loaded.");
  }

  const contactForm = document.getElementById("contactForm");
  
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const templateParams = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        number: document.getElementById("mobile").value,
        message: document.getElementById("message").value
      };

      console.log("Sending data:", templateParams);

      emailjs.send("service_5fctnwf", "template_8ygo8bc", templateParams)
        .then(response => {
          console.log("EmailJS Response:", response);
          alert("Message sent successfully!");
          contactForm.reset(); 

          setTimeout(() => {
            window.location.href = "./thankyou.html";
          }, 2000); // Redirect after 2 sec
        })
        .catch(error => {
          console.error("EmailJS Error:", error);
          alert("Error sending message: " + JSON.stringify(error));
        });
    });

    // Disable submit button on form submission
    contactForm.addEventListener("submit", function () {
      document.getElementById("sub").disabled = true;
    });
  } else {
    console.error("Contact form not found.");
  }

  // Smooth Scrolling for Navigation
  const navLinks = document.querySelectorAll(".navopt a, .nav-components a, .job-btn a");

  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      const targetHref = this.getAttribute("href");

      if (!targetHref.startsWith("#")) return;

      e.preventDefault();

      const targetId = targetHref.substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const offset = 4.5 * 16;
        window.scrollTo({
          top: targetSection.offsetTop - offset,
          behavior: "smooth"
        });
      }
    });
  });

  // Intersection Observer for Animations
  const sections = document.querySelectorAll(".section");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => observer.observe(section));

  // Navbar Scroll Effect
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector("nav");
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  });
});

// Redirect to Contact Page Function
function contact() {
  window.location.href = "./contactform.html";
}
