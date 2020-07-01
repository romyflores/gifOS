// ----------------------------------------------tema por defecto------------------------------------------------------

const apiKey = '4QKYniCsqHiphXhcDVHQTvNtFsqJ78o4';
let carga = default_theme();

function default_theme() {

    if (localStorage.contador){
        localStorage.contador = Number(localStorage.contador)+1;
    }else {
        localStorage.setItem("contador",1);
    }
    let head = document.querySelector('header > h1');
    head.innerHTML = `
    ¡Bienvenidos/as a Guifos.com! ——————Donde los gifs están.////// Número de visitas: ${localStorage.contador}`;
    console.log (head.textContent);
    let theme = localStorage.getItem('theme');
    if (theme != null) {
        document.getElementById("themes").href = theme;
        
    }
    else {
        window.onload = localStorage.setItem('theme', 'style/style_day.css');
    }
    return true;
}

function run_project() {
    return new Promise(function (resolve, reject) {
        if (!carga) {
            reject('Fallo al cargar la pagina')
            return
        }
        resolve(default_theme);
    })
}
run_project()
    .then(() => {
        seccion_tendencias();
    //   console.log ('mostrar seccion tendencias');
    })
    .catch((error) => {
        console.log(`Error system: ${error}`);
    })

//-------------------------------------------Variables--------------------------------------------------------------------------

let tendencia_block_result = document.querySelector('.tendencia-block-result');
let elems = document.createElement("img");

//-------------------------------------------Fn tendencias------------------------------------------------------------

function seccion_tendencias() {

    let url_tendencias = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=24&rating=G`
    
    fetch(url_tendencias)
        .then(response => {
            return response.json()
        })
        .then((data) => {
            data.data.forEach((elem) => {
                let random_gifs = document.createElement("div");
                let elems = document.createElement("img");
                let hover = document.createElement('p');
                random_gifs.appendChild(elems).setAttribute('class', 'img_trending');
                random_gifs.appendChild(hover).setAttribute('class', 'tags_hover');
                tendencia_block_result.appendChild(random_gifs);
               
                let tags = (elem.title).toString().split(' ')
                tags.splice(tags.indexOf('GIF'), 1)
                tags.splice(tags.indexOf('The'), 1)
                tags.splice(tags.indexOf('by'), 1)
   
                let class_div = "random_img" + (data.data.indexOf(elem)).toString()
                random_gifs.className = class_div;
                elems.src = elem.images.fixed_height_downsampled.url;

                let width_img = (document.querySelector(`div.${class_div}`).offsetWidth).toString();

                elems.addEventListener("mouseover", (event) => {

                    if (width_img != 0) hover.style.width = `${elem}`;
                    hover.style.height = '22px';
                    let tag_ok = []
                    tags.forEach((elem, index) => {
                        if (index < 4) {
                            tag_ok.push(elem)
                        }
                    })
                    hover.textContent = `#${tag_ok.join(' #')}`;
                    
                    event.target.addEventListener("mouseout", () => {
                        hover.textContent = '';
                        hover.style.height = '0px';
                    })
                });
            })
        })
        .catch(() => {
            elems.src = 'assets/lupa.svg';
        });

}

// --------------------------------Ev cambio de tema-----------------------------------------------

const menu_themes = document.getElementById('menu_themes');

let button_drop_down = document.querySelector('button.button-dropdown');
let btn_theme_day = document.querySelector('button.btn-theme-day');
let btn_theme_night = document.querySelector('button.btn-theme-night');
let themes_menu = document.querySelector('#menu_themes');



button_drop_down.addEventListener('click', (e) => {
    menu_themes.style.display = 'block';
    themes_menu.addEventListener('click', (e) => {
         menu_themes.style.display = 'none';
    })
});

btn_theme_day.addEventListener('click', () => {
    cambiarTema('day')
});
btn_theme_night.addEventListener('click', () => {
    cambiarTema('night')
});

// ---------------------------------------Fn de cambio de tema-----------------------------------------------

// let logo = document.querySelectorAll('#elements > img.logo');

function cambiarTema(theme) {
    
    // let lupa = document.querySelector('#searching > span img.lupa');
    let tema;
    let logo = document.querySelectorAll('#elements > img.logo');
      
    if(theme == 'day') {
        tema = 'style/style_day.css';
        logo.src = './assets/gifOF_logo.png';
    }
    else { 
        tema = 'style/style_night.css';
        logo.src = './assets/gifOF_logo_dark.png';  
    }

    localStorage.setItem('theme', tema);
    document.getElementById("themes").href = tema;
    menu_themes.style.display = 'none';
}

//-------------------------------------------Variables----------------------------------

let btn_back = document.querySelector('a.back');
let input_search = document.querySelector('#search_input');
let btn_search = document.querySelector('#submit_searching');
let bar_search = document.querySelector('.bar-search');
let div_auto = document.createElement('div');
let div_sugerencias = document.createElement('div');
let div_div_sugerencias = document.createElement('div');
let sugerencias_block = document.querySelector('.sugerencias-block');
let sugerencias_block_text = document.querySelector('.sugerencias_block_text');


bar_search.appendChild(div_auto).setAttribute('class', 'auto_palabra');
bar_search.appendChild(div_sugerencias).setAttribute('class', 'sugerencias_gif');
div_sugerencias.appendChild(div_div_sugerencias).setAttribute('class', 'all-sugerencias');

let div_gifs1 = document.createElement('div');
let div_gifs2 = document.createElement('div');
let div_gifs3 = document.createElement('div');

//------------------------------------------Ev Search---------------------------------------

  btn_search.addEventListener("click", sugg_search_word);

//-----------------------------------Fn sugerencias del buscador----------------------------------------------------------------

function sugg_search_word () {

    let tag_suggest = input_search.value.toLowerCase().trim();
    // let url = `https://api.giphy.com/v1/tags/related/${tag_suggest}?api_key=${apiKey}&limit=3`;
    
    getSearchResults();

    div_sugerencias.style.display = 'flex';
    btn_back.style.display = 'inline-block';
    input_search.value = "";
    btn_search.style.backgroundColor = '#E6BBE2';
}

//----------------------------------Fn boton busqueda---------------------------------------------------------

function getSearchResults() {

    let btns_sugg = document.querySelectorAll('button.btn_sug');
    let tag_search = input_search.value;

    if (btns_sugg.length == 3) {
        btns_sugg.forEach((elem) => {
            div_div_sugerencias.removeChild(elem);
        })
    }

    fetch(`https://api.giphy.com/v1/tags/related/${tag_search}?api_key=${apiKey}&limit=3`)
    .then((response) => {
        return response.json()
    })
    .then ((data) => {
        let words = [];
        words.push(data.data);
        words[0].forEach((elem) => {
            let btn_suggest = document.createElement('button');
            btn_suggest.className = 'btn_sug';
            div_div_sugerencias.appendChild(btn_suggest).textContent = `#${elem.name}`;

            btn_suggest.addEventListener('click', () => {
                tag_search = elem.name;
                    
                sugg_search_word()
            })
        })
    }) 
  
    // let urls = (`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${tag_search}&limit=25&offset=0&rating=G&lang=en`);

    seccionSearch_results();

    btn_back.addEventListener('click', () => {
        window.location.assign ('./index.html');
    });

}

//------------------------------------Fn resultados de Search-----------------------------------------------------

let title2 = document.querySelector('h2.tendencias');
let search_block_result = document.querySelector('#search_block_result');

function seccionSearch_results() {

    let tag_random = input_search.value;
    // let url = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=&rating=G`;
    
    btn_back.style.display = 'inline-block';
    sugerencias_block.style.display = 'none';
    // seccion_cuatro.style.display = 'none';
    seccion_tres.style.display = 'block';
    tendencia_block_result.style.display = 'none';
    // seccion_cinco.style.display ='block';
    title2.innerHTML = ('Ejemplos de búsqueda para:' + ' ' + input_search.value);

    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${tag_random}&limit=24&offset=0&rating=G&lang=en`)
        .then(response => {
            return response.json()
        })
        .then((data) => {
            data.data.forEach((elem) => {
                console.log('llega hasta aca');
                let div_img_result = document.createElement ('div')
                let random_gifs = document.createElement('div');
                let images_result = document.createElement('img');
                let hover = document.createElement('p');
                random_gifs.appendChild(images_result).setAttribute('class', 'img_trending');
                random_gifs.appendChild(hover).setAttribute('class', 'tags_hover');
                search_block_result.appendChild(random_gifs);

                if (images_result.length == 24 ) {
                    images_result.forEach((elem) => {
                        seccion_cuatro.removeChild(elem);
                    })
                }
               
                let class_div = "random_img" + (data.data.indexOf(elem)).toString()
                random_gifs.className = class_div;
                images_result.src = elem.images.fixed_height_downsampled.url; //`https://media.giphy.com/media/${elem.id}/giphy.gif`;

                
            })
        })
        .catch(() => {
            elems.src = 'assets/lupa.svg';
        });

}

//----------------------------------Ev Esconder Autocomplete--------------------------------------------------

div_auto.addEventListener('mouseover', (e) => {
    div_auto.style.display = 'flex';
    e.target.addEventListener('mouseout', () => {
      div_auto.style.display = 'none';
    })
  })


//-----------------------------------Fn Autocomplete-------------------------------------------------------------

input_search.addEventListener('input', (e) => {

    let theme = localStorage.getItem('theme');
    let tag_auto = e.target.value.toString();
    let url = `https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q=${tag_auto}`;
    
  
    input_search.style.color = '#110038'
  
    if (theme == 'style/style_night.css') {
      if (e.target.value == '') {
        btn_search.style.backgroundColor = '#CE36DB';
      }
      else { btn_search.style.backgroundColor = '#CE36DB'; }
    }
    else {
      if (e.target.value == '') {
        btn_search.style.backgroundColor = '#E6E6E6';
      }
      else { btn_search.style.backgroundColor = '#F7C9F3'; }
    }
  
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let word = bar_search.querySelectorAll('.auto_palabra > .btn_auto_word');
        let words = [data.data];
  
        if (word.length >= 3) {
          word.forEach((elem) => {
            div_auto.removeChild(elem)
          })
        }
        else {
          words[0].forEach((elem) => {
            let btn_complete = document.createElement('button');
  
            div_auto.style.display = 'flex';
            btn_complete.textContent = elem.name;
            div_auto.appendChild(btn_complete).setAttribute('class', 'btn_auto_word');
  
            btn_complete.addEventListener('click', (e) => {
            input_search.value = e.target.textContent;
            div_auto.style.display = 'none';
            })
            words.shift();
          })
        }
  
      })
  })

//---------------------------------Variables------------------------------------------------------------

let btn_mygifos = document.querySelector('#my_guifos');

let seccion_total = document.querySelector('main.seccion-total');
let seccion_uno = document.querySelector('#seccion_1');
let seccion_dos = document.querySelector('#seccion_2');
let seccion_tres = document.querySelector('#seccion_3');
let seccion_cuatro = document.querySelector('#seccion_4');

let seccion_cinco = document.querySelector('#seccion_5');
seccion_cinco.style.display = 'none';

let seccion_seis = document.querySelector('#seccion_6');
seccion_seis.style.display = 'none';

let title_my_gifos = document.querySelector('.sugerencias-block-text > h2');
let sugerencias_block_result = document.querySelector('.sugerencias-block-result')

let card_suggest = document.querySelector('div.sugerencias_gif');


//---------------------------------Ev seccion mis gifos------------------------------------------------------------

btn_mygifos.addEventListener('click', (e) => {
    seccion_mygifos();
    btn_mygifos.style.color = '#110038';
    btn_mygifos.style.pointerEvents = 'none';
});

//-------------------------------------Fn seccion mis gifos----------------------------------------------------------

function seccion_mygifos() {

    let create_div = document.createElement('div');
    seccion_tres.appendChild(create_div).setAttribute('class', 'seccion-mygif');
  
    Object.keys(localStorage).forEach((key) => {
      if (key != 'theme') {
        let create_img = document.createElement('img');
        create_div.appendChild(create_img).setAttribute('class', 'img_save');
        create_img.src = `https://media.giphy.com/media/${localStorage.getItem(key)}/giphy.gif`;
      }
    })
  
    btn_back.style.display = 'inline-block';
    seccion_dos.style.display = 'none';
    sugerencias_block_result.style.display = 'none';
    seccion_cuatro.style.display = 'none';
    seccion_cinco.style.display = 'none';
    seccion_tres.style.display = 'block';
    title_my_gifos.innerHTML = 'Mis guifos';
    
    btn_back.addEventListener('click', () => {
        window.location.assign ('./index.html');
    });
}


