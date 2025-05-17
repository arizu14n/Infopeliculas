var top20 = document.getElementById("top20");
let boton_en_cartelera = document.getElementById("button-cartelera");
let boton_mejor_calificadas = document.getElementById("button-mejor-calificadas");
let boton_populares = document.getElementById("button-populares");
let boton_proximos_estrenos = document.getElementById("button-proximos-estrenos");
let titulo = document.getElementById("titulo-principal");
let modal_body = document.getElementById("modal-body")


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

const spinner_modal = 
                `<div class="d-flex justify-content-center align-items-center spinner-modal">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Cargando...</span>
                    </div>
                </div>`;


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


async function CargaPeliculasTop(categoria) {
    try {
        let url;
        let contenido_pelis_resp = "";
            if( categoria === "top_rated") {
                url = url_pelis_mejor_calificadas;
                }
            else if (categoria === "popular") {
                url = url_pelis_populares;
                }
            else if (categoria === "now_playing") {
                url = url_pelis_en_cartelera;
                }
            else if (categoria === "upcoming") {
                url = url_pelis_proximos_estrenos;
                }
        top20.innerHTML = spinner;

        const respuesta = await fetch(
        `${url}?api_key=${api_key}&language=${lenguaje}&page=${pagina}`
        );
        if (respuesta.status === 200) {
        const datos = await respuesta.json();
        datos.results.forEach((pelicula, indice) => {
        contenido_pelis_resp += 
            `<div class="col-12 col-md-6 col-lg-3 py-2 p-sm-2">
                <div class="card-lista shadow" >
                    <h5 class="card-title carru">Puesto ${indice + 1} </h5>  
                    <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" class="img-fluid" alt="...">
                <div class="card-body" >
                    <a class="btn btn-buscar d-block end" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" data-pelicula-id=${pelicula.id}>+Info</a>
                </div>
                </div>
            </div>`;
                         
                        });
                        top20.innerHTML = contenido_pelis_resp;
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
                    modal_body.innerHTML = spinner_modal; 
                    
                    const respuesta = await fetch(
                        `${url_pelis_detalles}${id}?api_key=${api_key}&language=${lenguaje}`
                        );
                        if (respuesta.status === 200) {
                            const data = await respuesta.json();
                            modal_body.innerHTML = `<div class="card mb-3 border border-0" >
                                    <div class="row g-0">
                                        <div class="col-12 col-sm-6 d-flex justify-content-center">
                                            <img src="https://image.tmdb.org/t/p/w400${data.poster_path}" class="img-fluid rounded-start" alt="...">
                                        </div>
                                    <div class="col-12 col-sm-6 card-body">
                                        <div class="card-body">
                                            <h5 class="card-title carru">${data.title}</h5>
                                            <p class="card-text carru">Sinopsis:</p>
                                            <p class="card-text carru">${data.overview}.</p>
                                            <p class="card-text carru">Calificación:</p>
                                            <p class="card-text carru">${data.vote_average}</p>
                                            <p class="card-text carru">Total de votos:</p>
                                            <p class="card-text carru">${data.vote_count}</p>
                                            <p class="card-text carru">Frase favorita:</p>
                                            <p class="card-text carru">${data.tagline}</p>
                                            Lanzamiento: </small>${data.release_date}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>`;

                            
                        } else if (respuesta.status === 401) {
                            console.log ("Error de logueo")
                        } else {
                            console.log(`Error al realizar la consulta. Código de error: ${respuesta.status}`);
                        }
                        

                } catch (error){
                    console.log (error)
                }
                };

                
    document.addEventListener("show.bs.modal", async (event) => {
    let id = event.relatedTarget.dataset.peliculaId;
    CargaPeliculasPorId(id);
});