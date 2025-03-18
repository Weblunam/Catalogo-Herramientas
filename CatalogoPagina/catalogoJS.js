/********NAV BAR ****** */

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle")
    const mobileMenu = document.getElementById("mobile-menu")
  
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")
  
      const svg = menuToggle.querySelector("svg")
      if (mobileMenu.classList.contains("active")) {
        svg.innerHTML =
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />'
      } else {
        svg.innerHTML =
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />'
      }
    })
  })
  
  document.addEventListener("DOMContentLoaded", () => {
    const secondaryNavLinks = document.querySelectorAll(".secondary-nav-link")
  
    secondaryNavLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
  
        secondaryNavLinks.forEach((l) => l.classList.remove("active"))
  
        link.classList.add("active")
  
        console.log(`Clicked on ${link.textContent}`)
      })
    })
  })



  /*----------------HIGH CONTRAST------------*/
  // Esperamos que el documento esté listo
document.addEventListener('DOMContentLoaded', function () {
  // Seleccionamos el switch
  const contrastSwitch = document.getElementById("contrastSwitch");

  // Añadimos un event listener al switch para detectar cambios
  contrastSwitch.addEventListener("change", function () {
      if (contrastSwitch.checked) {
          // Si está activado, se añade la clase high-contrast al body
          document.body.classList.add("high-contrast");
      } else {
          // Si está desactivado, se remueve la clase high-contrast
          document.body.classList.remove("high-contrast");
      }
  });
});

  
  