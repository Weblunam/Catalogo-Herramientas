document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".secondary-nav-link");
    const cardsContainer = document.querySelector(".cards-container");
    const bannerTitleElement = document.querySelector(".banner h1");
  
    // Función auxiliar para mapear el texto del enlace a la clave de categoría en el JSON
    function mapCategoryLabel(label) {
      switch (label) {
        case "Pruebas de Accesibilidad":
          return "accesibilidadWeb";
        case "Diseño de interfaces":
          return "disenoDeInterfaces";
        case "Desarrollo web":
          return "desarrolloWeb";
        case "Capacitación y recursos":
          return "capacitacion";
        default:
          return null;
      }
    }
  
    // Procesa cada enlace en la barra secundaria
    navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
  
        // Actualizar visualmente el enlace activo
        navLinks.forEach(lnk => lnk.classList.remove("active"));
        link.classList.add("active");
  
        // Extraer el label y la categoría correspondiente
        const categoryLabel = link.textContent.trim();
        const categoria = mapCategoryLabel(categoryLabel);
  
        // Actualizar el título del banner con el nombre de la categoría seleccionada
        bannerTitleElement.textContent = categoryLabel;
        
        // Limpiar el contenedor para preparar la nueva información
        cardsContainer.innerHTML = "";
  
        // Primero, buscamos en el endpoint raíz la lista de endpoints.
        fetch("http://localhost:3000/")
          .then((res) => res.json())
          .then((data) => {
            // data.endpoints es el arreglo de herramientas con su información básica
            const endpointsFiltrados = data.endpoints.filter(item => item.categoria === categoria);
  
            // Por cada herramienta filtrada, hacemos una petición a su endpoint para obtener detalles completos
            endpointsFiltrados.forEach(item => {
              fetch(item.endpoint)
                .then(res => res.json())
                .then(details => {
                  // Creamos el elemento tarjeta y armamos su contenido
                  const card = document.createElement("div");
                  card.className = "card";
  
                  // Generamos la lista de características a partir del arreglo
                  let caracteristicasHTML = "";
                  details.caracteristicas.forEach(caracteristica => {
                    caracteristicasHTML += `<li>${caracteristica}</li>`;
                  });
  
                  // Si la herramienta tiene un switch (identificado por switch_id), se lo incluye
                  let switchHTML = "";
                  if (details.switch_id) {
                    switchHTML = `
                      <label class="switch">
                        <input id="${details.switch_id}" type="checkbox">
                        <div class="slider">
                          <div class="circle">
                            <!-- Aquí podrías incluir tus iconos SVG -->
                          </div>
                        </div>
                      </label>
                    `;
                  }
  
                  // Armamos el contenido interno de la tarjeta.
                  card.innerHTML = `
                    <h2>${details.titulo}</h2>
                    <h3>${details.subtitulo}</h3>
                    <p>${details.descripcion}</p>
                    <p>Características destacadas:</p>
                    <ul>${caracteristicasHTML}</ul>
                    ${switchHTML}
                  `;
  
                  // Añadimos la tarjeta al contenedor de tarjetas
                  cardsContainer.appendChild(card);
                })
                .catch(err => console.error("Error al obtener los detalles de la herramienta:", err));
            });
          })
          .catch(err => console.error("Error al obtener los endpoints:", err));
      });
    });
  
    // Cargar por defecto la categoría "Pruebas de Accesibilidad" al inicio.
    const defaultLink = document.querySelector(".secondary-nav-link.active");
    if (defaultLink) {
      defaultLink.click();
    }
  });
  