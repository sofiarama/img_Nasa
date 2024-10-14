document.addEventListener("DOMContentLoaded", function() {
    const boton = document.getElementById("btnBuscar");

    boton.addEventListener("click", function() {
        const input = document.getElementById("inputBuscar");
        const texto = input.value;

        fetch(`https://images-api.nasa.gov/search?q=${texto}`)
        .then(response => response.json())
        .then(data => {
            //mostrar la info devuelta
            mostrarInfo(data.collection.items);
        })
        .catch(error => {
            console.error("Error al cargar las peliculas:", error);
        });

    });
});


function mostrarInfo(info) {
    const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";

    if (info.length === 0) {
        contenedor.innerHTML = "<p>No hay resultados para la búsqueda</p>";
        return;
    }

    info.forEach(item => {

        const { title, date_created, description } = item.data[0];
        const imagen = item.links ? item.links[0].href : 'https://via.placeholder.com/150'; 

        const tarjetaHTML = `
            
            <div class="card" style="width: 18rem;">
                <img src="${imagen}" class="card-img-top" alt="${title}">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${description}</p>
                    <hr>
                    <span>${date_created}</span>
                </div>
            </div>
        `;
        
        contenedor.innerHTML += tarjetaHTML;
    });


}