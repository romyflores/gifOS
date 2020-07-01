
// ----------------------------------------------Variables------------------------------------------------------

const apiKey = '4QKYniCsqHiphXhcDVHQTvNtFsqJ78o4';
let seccion_tres = document.querySelector('.seccion-3');
let carga = default_theme();
let btn_back = document.querySelector('a.back2');
let mis_guifos_block = document.querySelector('.sugerencias-block-result');
let logo_day = document.querySelector('#elements > img.logo');
let logo_dark = document.querySelector('#elements > img.logo-dark');
let btn_begin = document.querySelector('#btn_begin')
let title = document.querySelector('.title');
let title1 = document.querySelector('p.title1');
let instrucciones_total = document.querySelector('.instrucciones-total');
let cont_video = document.querySelector('.cont-video')
let video = document.querySelector('.video');
let textos_cont = document.querySelector('div.textos-cont');
let text_up_gif = document.querySelector('.text-up-gif');
let gif_creado = document.querySelector('#gif_creado');
let btns_cont_record = document.querySelector('.btns-cont-record');
let btn_cont_capturar = document.querySelector('.btn-cont-capturar');
let btn_camara = document.querySelector('.btn-camara');
let btn_capturar = document.querySelector('.btn-capturar');
let seccion_dos = document.querySelector('#seccion_dos')
let cont_ready = document.querySelector('.cont-ready');
let img_up = document.querySelector('#img_up');
let btn_canceled = document.querySelector('.btn-canceled');
let captur_gif = document.querySelector('.captur-gif');
let gif_up = document.querySelector('.gif-up');
let btn_copy = document.querySelector('.btn-copy');
let btn_download = document.querySelector('.btn-download');
let btn_listo2 = document.querySelector('.btn-listo2');


let btn_cerrar = document.createElement('img');
title1.appendChild(btn_cerrar).setAttribute('class','btn-cerrar');
btn_cerrar.src = "./assets/close.svg";
btn_cerrar.style.display ='none';

const gif_name = 'gif_' + (Math.random().toString(36).slice(2));
const URL_Upload = 'https://upload.giphy.com/v1/gifs';
const post_body = new FormData();
post_body.append('api_key', apiKey);

let stream = () => { 
    return navigator.mediaDevices.getUserMedia({
    video:{
        width: 850,
        height: 480},
    audio: false
    });
};

let recorder;
let url_gif;
let copy_url_gif;
// ----------------------------------------------tema por defecto------------------------------------------------------

// let carga = default_theme();

function default_theme() {

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
        seccion_mygifos(); 
        
        //   console.log ('mostrar seccion tendencias');
    })
    .catch((error) => {
        console.log(`Error system: ${error}`);
    })

// ---------------------------------------Ev back-----------------------------------------------

btn_back.addEventListener('click', () => {
    window.location.assign ('./index.html');
});

//---------------------------------------Ev btn-comenzar-----------------------------------------------

btn_begin.addEventListener('click', () => {
   
    btn_cerrar.style.display = 'flex';
    // logo_day.style.display = 'none';
    // logo_dark.style.display = 'inline-block'
    seccion_dos.style.height = '548px';
    seccion_dos.style.width = '860px';
    title1.innerHTML = 'Un Chequeo Antes de Empezar';
    instrucciones_total.style.display = 'none';
    cont_video.style.display = 'flex';
    video.style.display = 'block'
    btn_cont_capturar.style.display = 'flex';
    seccion_tres.style.display = 'none';

    camaraOn();

});

//----------------------------------------------Fn camara-encendida----------------------------------------------------------------

function camaraOn() {
    stream().then((camara) => {
    video.srcObject = camara;
    video.play();
    return video;
  });
};

//--------------------------------------------Ev Btn Captur------------------------------------------------------

btn_capturar.addEventListener('click', () => {
   
    btn_capturar.style.display = 'none'
    title1.innerHTML = 'Capturando Tu Guifo';
    let time_cap = document.createElement('figure');
        time_cap.id = 'time';
        cont_ready.appendChild(time_cap);  
    let span_cap = document.createElement('span');
        span_cap.id = 'span_cap';
        time_cap.appendChild(span_cap);
        
        h = 0;
        m = 0;
        s = 0;
        document.querySelector("#span_cap").innerHTML = '00:00:00';
        reloj();
        id = setInterval(reloj,1000);
    
    btn_camara.innerHTML = `
        <button class="img-recording"><img class="img-recording" src="./assets/recording.svg" alt="" /></button>`;
    btn_camara.style.background = '#FF6161';
    btn_camara.style.boxshadow = 'inset -1px -1px 0 0 #997D97, inset 1px 1px 0 0 #FFFFFF';
    let img_recording = document.querySelector('.img-recording');
    img_recording.style.background = '#FF6161';    

    recGo();     

});

//------------------------------------------------Fn Iniciar Grabacion----------------------------------------------------------------

function recGo() {

    post_body.delete('file');
    video.play();
    
    navigator.mediaDevices.getUserMedia({
        audio:false, 
        video: { width: 850, height: 480 },
      }).then( (stream) => {
        recorder = RecordRTC( stream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 720,
            height: 480,
            onGifRecordingStarted: function() {
                console.log('grabando')
            }
        })
        
        recorder.startRecording();
        recorder.stream = stream;
      });

      btn_listo.style.display = 'block';

}

//----------------------------------------------Ev btn Listo----------------------------------------------------------------

let btn_listo = document.createElement('button');
btn_cont_capturar.appendChild(btn_listo).setAttribute('class','btn-listo');
btn_listo.textContent = 'Listo'

btn_listo.addEventListener('click', () => {

    recStop();

        clearInterval(id);
        cont_video.style.display = 'none';
        textos_cont.style.display = 'flex';
        btn_cont_capturar.style.display = 'none';
        title1.innerHTML = 'Vista Previa';
        let barra_carga = document.createElement('div');
        let forward = document.createElement('div');
        let img_forward = document.createElement('img');
        let barra_barra = document.createElement('div');
        let btn_repetir = document.createElement('button');
        let ahref = document.createElement('a');
        let btn_subir = document.createElement('button');

        cont_ready.appendChild(barra_carga).setAttribute('class', 'barra-carga');
        barra_carga.appendChild(forward).setAttribute('Class', 'forward');
        forward.appendChild(img_forward).setAttribute('class', 'img-forward');
        img_forward.src = "./assets/forward.svg";
        barra_carga.appendChild(barra_barra).setAttribute('class', 'barra-barra');
        barra_carga.appendChild(btn_repetir).setAttribute('class', 'btn-repetir');
        btn_repetir.id = 'btn_prewiev';
        btn_repetir.appendChild(ahref)
        ahref.textContent = 'Repetir Captura';
        ahref.href = 'upload.html';
        barra_carga.appendChild(btn_subir).setAttribute('class', 'btn-subir');
        btn_subir.id = 'btn_prewiev';
        btn_subir.textContent = 'Subir Guifo';

        barra_barra.innerHTML =`<div id="progress_bar1" class="progress-bar1"></div>`
        
        let progress = document.querySelector('.progress-bar1');
        
        setTimeout(() =>{
            progress.style.width = "100%";
        }, 1);
 
        //--------------------------Ev subir gif-------------------------------------------------------------------
        
        btn_subir.addEventListener('click', () =>{

            btn_canceled.style.display = 'flex';
            textos_cont.style.display = 'none';
            btns_cont_record.style.display = 'none';
            video.style.display = 'none';
            title1.innerHTML = 'Subiendo Guifo'
            text_up_gif.style.display = 'block';

            upload_gif();
            
            let progress2 = document.querySelector('.progress-bar2');
          
            setTimeout(() =>{
                progress2.style.width = "100%";
            }, 1);
        })
});

//--------------------------------------------Fn stop grabacion------------------------------------------------------------------

function recStop() {

    recorder.stopRecording(() => {
        post_body.append('file', recorder.getBlob(), 'myGif.gif');
        console.log(post_body.get('file'))
      });
    
      recorder.stream.stop();
      url_gif = URL.createObjectURL(post_body.get('file'));

      gif_creado.src = url_gif;
      gif_creado.style.display = 'flex';
      gif_creado.style.width = '838px';
      gif_creado.style.height = '429px';
      
}

//-------------------------------------------------Subir Gif-------------------------------------------------------------------

function upload_gif() {

    seccion_tres.style.display = 'block';

    fetch(URL_Upload, 
       {method: "post",
        body: post_body,
      }).then(response => { return response.json(); })
      .then((data) => {
      
        if (data['meta'].status == 200) {
          localStorage.setItem(gif_name, data['data'].id);
          
          const img_save = document.querySelector('.seccion-mygif');
          img_save.src = URL.createObjectURL(post_body.get('file'));
          copy_url_gif = `https://media.giphy.com/media/${data['data'].id}/giphy.gif`;
        }
       
        setTimeout(() => {
            title1.innerHTML = 'Guifo Subido Con Éxito'
            captur_gif.style.display = 'flex';
            gif_up.style.display = 'block'
            img_up.setAttribute('src', URL.createObjectURL(recorder.getBlob()));
            text_up_gif.style.display = 'none';
            gif_creado.style.display = 'none';
            seccion_dos.style.height = '391px';
            seccion_dos.style.width = '721px';
            
        }, 1000);

      })
      .catch((error) => {
        alert(error + 'Hubo un ERROR en la Carga, por favor vuelve a intentarlo!');
      });
}

//-------------------------------------------------Eventos----------------------------------------------------------

btn_copy.addEventListener('click', () => {
    copy_link();
    alert('El link fue copiado correctamente')
  });
  
  btn_download.addEventListener('click', () => {
    btn_download.href = url_gif;
    btn_download.setAttribute('download', 'gif');
  });
 
  btn_listo2.addEventListener('click', () => {
    // window.location.assign('./');
    seccion_tres.style.display = 'block';
    seccion_dos.style.display = 'none';
  });


//----------------------------------------------------Fn traer mi guifos-------------------------------------------------------

function seccion_mygifos() {

    let create_div = document.createElement('div');
    mis_guifos_block.appendChild(create_div).setAttribute('class', 'seccion-mygif');

    Object.keys(localStorage).forEach((key) => {
        if (key != 'theme') {
            let create_img = document.createElement('img');
            create_div.appendChild(create_img).setAttribute('class', 'img_save');
            create_img.src = `https://media.giphy.com/media/${localStorage.getItem(key)}/giphy.gif`;
            // `https://media.giphy.com/media/${localStorage.getItem(key)}/giphy.gif`;
    }
  })
}
//-----------------------------------------Fn CopyLink-----------------------------------------------------------

function copy_link() {
    let link = document.createElement("input");
    link.setAttribute("value", copy_url_gif);
    document.body.appendChild(link);
    link.select();
    document.execCommand("copy");
    document.body.removeChild(link);
  }



//----------------------------------------Fn mostrar reloj------------------------------------------------------------

function reloj() {
    var hAux, mAux, sAux;
    s++;
    if (s > 59) {m++; s = 0;}
    if (m > 59) {h++; m = 0;}
    if (h > 24) {h = 0;}

    if (s < 10) {sAux = "0" + s;}else{sAux = s;}
    if (m < 10) {mAux = "0" + m;}else{mAux = m;}
    if (h < 10) {hAux = "0" + h;}else{hAux = h;}

    document.getElementById('span_cap').innerHTML = hAux + ":" + mAux + ":" + sAux; 
};

