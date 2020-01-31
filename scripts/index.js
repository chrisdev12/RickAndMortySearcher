const contenedor = document.querySelector('#contenedor');
let valorBuscar = document.querySelector("#buscador");
let buscar = document.querySelector("#buscar");
let reset = document.querySelector("#reset");
let counter = document.querySelector('.counter');
let pagesButton = document.querySelectorAll('.pages-btn');
const defaultUrl = 'https://rickandmortyapi.com/api/'
var contadorDePagina = 1;

//--------------------EVENTOS-----------------------------------------

defaultView()

buscar.addEventListener('click', function () {
    pageView(1)
});

reset.addEventListener('click', function () {
   contenedor.innerHTML = ''; //Repinto el innerHTML desde ;
   contadorDePagina = 0; //Reinicio el contador:
   defaultView();
});

pagesButton.forEach(element => {
    
    element.addEventListener('click', function () {
        
        //Esta parte maneja de forma entera la paginación, envia como parametro el número de pagina que se le
        //requiere al API.
        
        switch (event.target.value) {
            case 'retroceder':
                contadorDePagina--;
                pageView(contadorDePagina);
                break;
            case 'avanzar':
                contadorDePagina++;
                pageView(contadorDePagina);            
                break;
            default: console.log('Error en la sección de botones de página');
                break;
        }
    });
    
});


//----------------------FUNCIONES---------------------------------------

function defaultView() {
    jQuery.ajax(defaultUrl, {
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
                    <p class="details"> Origin: ${personaje.origin.name}</p></div>`
                })
                counter.innerHTML = `<h2 class="results"> 
                 Rick&Morty characters </h2> `;
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
};

function pageView(pagina) {
    
    let pageRequested = pagina;
    console.log(pageRequested);
    let url = `https://rickandmortyapi.com/api/character?page=${pageRequested}&name=${valorBuscar.value}`          
    jQuery.ajax(url, {
        success: function (response) {
            console.log(response);
            contenedor.innerHTML = '';
            response.results.forEach(function (personaje) {
                contenedor.innerHTML = contenedor.innerHTML + `<div class="personaje">
                <img src="${personaje.image}" alt="" />
                <h3 class="name">${personaje.name}</h3>
                <p class="species"> ${personaje.species}</p>
                <p class="details"> Status: ${personaje.status}</p>
                <p class="details"> Gender: ${personaje.gender}</p>
                <p class="details"> Origin: ${personaje.origin.name}</p></div>`
            })
            counter.innerHTML = `<h2 class="results"> 
            We've founded ${response.info.count} results</h2> `;
        }
    });
};
 
