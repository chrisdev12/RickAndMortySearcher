const contenedor = document.querySelector('#contenedor');
let valorBuscar = document.querySelector("#buscador");
let buscar = document.querySelector("#buscar");
let reset = document.querySelector("#reset");
let counter = document.querySelector('.counter')
const url = 'https://rickandmortyapi.com/api/'

buscar.addEventListener('click', function () {

    console.log(valorBuscar.value);
    jQuery.ajax(`${url}/character/?name=${valorBuscar.value}`, {
        success: function (response) {
            contenedor.innerHTML = '';
            response.results.forEach(function (personaje) {
                contenedor.innerHTML = contenedor.innerHTML + `<div class="personaje">
            <img src="${personaje.image}" alt="" />
            <h3 class="name">${personaje.name}</h3>
            <p class="species"> ${personaje.species}</p>
            <p class="details"> Status: ${personaje.status}</p>
            <p class="details"> Gender: ${personaje.gender}</p>
            <p class="details"> Origin: ${personaje.origin.name}</p>
          </div>`
            })
            counter.innerHTML = `<h2 class="results"> We've founded ${response.info.count} results</h2> `
        }
    })
});

reset.addEventListener('click', function () {
    jQuery.ajax(url, {
    success: function (response) {
        // obteniendo personajes
        jQuery.ajax(response.characters, {
            success: function (response) {
                contenedor.innerHTML = '';
                response.results.forEach(function (personaje) {
                    contenedor.innerHTML = contenedor.innerHTML + `<div class="personaje">
            <img src="${personaje.image}" alt="" />
            <h3 class="name">${personaje.name}</h3>
            <p class="species"> ${personaje.species}</p>
            <p class="details"> Status: ${personaje.status}</p>
            <p class="details"> Gender: ${personaje.gender}</p>
            <p class="details"> Origin: ${personaje.origin.name}</p>
          </div>`
                })
                
                 counter.innerHTML = `<h2 class="results"> Search your favorite Rick&Morty character by their name </h2> `
            },
            error: function (error) {
                console.error('Error trayendo personajes ', error)
            }
        })
    },
    error: function (error) {
        console.error('Error en el request', error)
    }
});
});


//---------------------------------------------------------------------

jQuery.ajax(url, {
    success: function (response) {
        // obteniendo personajes
        jQuery.ajax(response.characters, {
            success: function (response) {
                response.results.forEach(function (personaje) {
                    contenedor.innerHTML = contenedor.innerHTML + `<div class="personaje">
            <img src="${personaje.image}" alt="" />
            <h3 class="name">${personaje.name}</h3>
            <p class="species"> ${personaje.species}</p>
            <p class="details"> Status: ${personaje.status}</p>
            <p class="details"> Gender: ${personaje.gender}</p>
            <p class="details"> Origin: ${personaje.origin.name}</p>
          </div>`
                })
            },
            error: function (error) {
                console.error('Error trayendo personajes ', error)
            }
        })
    },
    error: function (error) {
        console.error('Error en el request', error)
    }
});



 

    




// console.log($.get(`https://rickandmortyapi.com/api/character/?name=rick`,
//     function (data, status) {
//     console.log(data);
// }))
