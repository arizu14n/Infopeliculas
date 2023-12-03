/* var top3 = document.getElementById("top3");
var top15 = document.getElementById("top15");

const url_pelis_populares = "https://api.themoviedb.org/3/movie/popular";
const url_pelis_mejor_calificadas = "https://api.themoviedb.org/3/movie/top_rated";
const url_pelis_detalles = "https://api.themoviedb.org/3/movie/";
const lenguaje = "es-MX";
const pagina = 1;
const api_key = "bb7e28b3b7498216d239c131b96d75c2";

const spinner = `
                <div class="d-flex justify-content-center align-items-center" style="height: 400px">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Cargando...</span>
                    </div>
                </div>;`

async function CargaPeliculasTop3(type) {
    try {
        let url;
        let contenido_pelis_resp = "";
        if( type === "top_rated") {
            url = url_pelis_mejor_calificadas;
        }
        else if (type === "popular") {
            url = url_pelis_populares;
        }
        top3.innerHTML = spinner;
        const respuesta = await fetch(
            `${url}?api_key=${api_key}&language=${lenguaje}&page=${pagina}`
            );
        if (respuesta.status === 200) {
        const datos = await respuesta.json();
        datos.results.forEach((pelicula) => {
           contenido_pelis_resp += `<div class="carousel-item">
            <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" class="d-block w-75 m-auto rounded-pill" alt="...">
            <div class="carousel-caption d-md-block" id=${pelicula.id}>
              <h4 class="carru">Puesto 2</h4>
              <p class="carru fs-3 fw-bold">${pelicula.title}</p>
              <a class="btn btn-buscar" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">+Info</a>
            </div>
          </div>`;
         
        });
        top3.innerHTML = contenido_pelis_resp;
    } else if (respuesta.status === 401) {
        console.log ("Error de logueo")
    } else {
        console.log(`Error al realizar la consulta. Código de error: ${respuesta.status}`);
    }
    }

    catch (error) {
        console.log(error)
    }
}

CargaPeliculasTop3("top_rated"); */

var top3 = document.getElementById("top3");
var top15 = document.getElementById("top15");
let boton_en_cartelera = document.getElementById("button-cartelera");
let boton_mejor_calificadas = document.getElementById("button-mejor-calificadas");
let boton_populares = document.getElementById("button-populares");
let boton_proximos_estrenos = document.getElementById("button-proximos-estrenos");
let titulo = document.getElementById("titulo-principal");

const url_pelis_populares = "https://api.themoviedb.org/3/movie/popular";
const url_pelis_mejor_calificadas = "https://api.themoviedb.org/3/movie/top_rated";
const url_pelis_en_cartelera = "https://api.themoviedb.org/3/movie/now_playing";
const url_pelis_proximos_estrenos = "https://api.themoviedb.org/3/movie/upcoming";
const url_pelis_detalles = "https://api.themoviedb.org/3/movie/";
const lenguaje = "es-MX";
const pagina = 1;
const api_key = "bb7e28b3b7498216d239c131b96d75c2";

const spinner = `
                <div class="d-flex justify-content-center align-items-center" style="height: 400px">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Cargando...</span>
                    </div>
                </div>;`;

CargaPeliculasTop("now_playing");


if (boton_en_cartelera) {
   
    boton_en_cartelera.addEventListener("click", () => CargaPeliculasTop("now_playing")
    );
    boton_en_cartelera.addEventListener("click", () => titulo.textContent = "En Cartelera"
    );
   } 
if (boton_mejor_calificadas) {
   
    boton_mejor_calificadas.addEventListener("click", () => CargaPeliculasTop("top_rated")
    );
    boton_mejor_calificadas.addEventListener("click", () => titulo.textContent= "Mejor Calificadas"
    );
    
   }
if (boton_populares) {
   
    boton_populares.addEventListener("click", () => CargaPeliculasTop("popular")
    );
    boton_populares.addEventListener("click", () => titulo.textContent = "Más Populares"
    );
   }
if (boton_proximos_estrenos) {
   
    boton_proximos_estrenos.addEventListener("click", () => CargaPeliculasTop("upcoming")
    );
    boton_proximos_estrenos.addEventListener("click", () => titulo.textContent = "Proximos Estrenos"
    );
   }


async function CargaPeliculasTop(type) {
               try {
                        let url;
                        let contenido_pelis_resp = "";
                        if( type === "top_rated") {
                            url = url_pelis_mejor_calificadas;
                        }
                        else if (type === "popular") {
                            url = url_pelis_populares;
                        }
                        else if (type === "now_playing") {
                            url = url_pelis_en_cartelera;
                        }
                        else if (type === "upcoming") {
                            url = url_pelis_proximos_estrenos;
                        }
                        top15.innerHTML = spinner;
                        const respuesta = await fetch(
                            `${url}?api_key=${api_key}&language=${lenguaje}&page=${pagina}`
                            );

                        if (respuesta.status === 200) {
                        const datos = await respuesta.json();
                        //var puesto = 0;
                        datos.results.forEach((pelicula, indice) => {
                          contenido_pelis_resp += `<div class="col-12 col-md-6 col-lg-3 py-2 p-sm-2">
                           <div class="card-lista shadow" id=${pelicula.id}>
                             <h5 class="card-title carru">Puesto ${indice + 1} </h5>  
                             <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" class="img-fluid" alt="...">
                               <div class="card-body">
                                 <a class="btn btn-buscar d-block end" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">+Info</a>
                               </div>
                             </div>
                       </div>`;
                         
                        });
                        top15.innerHTML = contenido_pelis_resp;
                    } else if (respuesta.status === 401) {
                        console.log ("Error de logueo")
                    } else {
                        console.log(`Error al realizar la consulta. Código de error: ${respuesta.status}`);
                    }
                    }
                
                    catch (error) {
                        console.log(error)
                    }
                };

                async function CargaPeliculasPorId(id){
                try {
                    const respuesta = await fetch(
                        `${url_pelis_detalles}/${id}?api_key=${api_key}&language=${lenguaje}`
                        );
                        if (respuesta.status === 200) {
                            const datos = await respuesta.json();

                            
                        } else if (respuesta.status === 401) {
                            console.log ("Error de logueo")
                        } else {
                            console.log(`Error al realizar la consulta. Código de error: ${respuesta.status}`);
                        }
                        

                } catch (error){
                    console.log (error)
                }
                };

                
              