// 🌙 MODO OSCURO
const toggleSwitch = document.querySelector(".tema .input"); // Selecciona el checkbox dentro de .tema
const body = document.body;

// Función para alternar el modo oscuro
function toggleDarkMode() {
    body.classList.toggle("dark-mode");

    // Guarda el estado en localStorage
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
        toggleSwitch.checked = true;
    } else {
        localStorage.setItem("darkMode", "disabled");
        toggleSwitch.checked = false;
    }
}

// Verifica si el usuario tenía activado el modo oscuro al cargar la página
if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
    toggleSwitch.checked = true; // Asegura que el interruptor refleje el estado guardado
}

// Evento para activar el modo oscuro al hacer clic en el interruptor
toggleSwitch.addEventListener("change", toggleDarkMode);



//bloques para la listas de sugerencias
const busqueda = document.getElementById("busqueda");
const listasugerencias = document.getElementById("lista-sugerencias"); // replica esta linea con busqueda
const resultado = document.getElementById("resultado");
const palabra = document.getElementById("palabra");
const palabra_no_encontrada = document.getElementById("palabra-no-encontrada");
palabra_no_encontrada.style.display="none";
const pronunciacion = document.getElementById("pronunciacion")
const ejemplo = document.getElementById("ejemplo");
const ejemplo_palabra = document.getElementById("ejemplo-palabra");
const buscar = document.getElementById("buscar");

const palabras_sugeridas= document.getElementById("palabras-sugeridas");
const resultado_palabras  = document.getElementById("resultado-palabras");
palabras_sugeridas.style.display="none"; 
ejemplo.style.display="none"; 




busqueda.addEventListener("input", async () => {
    const inputText = busqueda.value.toLowerCase();
    listasugerencias.innerHTML = ""; // Limpia las sugerencias previas

    if (inputText === "") {
        listasugerencias.style.display = "none"; // Oculta la lista si está vacía
        return;
    }

    const data = await fetch("words.json")


    const words = await data.json()


    const filteredWords = words.words.filter(word => word.startsWith(inputText));

    if (filteredWords.length === 0) {
        listasugerencias.style.display = "none"; // Oculta la lista si no hay coincidencias
        return;
    }

    filteredWords.forEach(word => {
        const li = document.createElement("li");
        li.textContent = word;
        li.addEventListener("click", () => {
            busqueda.value = word; // Rellena el input con la palabra seleccionada
            listasugerencias.innerHTML = ""; // Borra las sugerencias
            listasugerencias.style.display = "none";
        });
        listasugerencias.appendChild(li);
    });

    listasugerencias.style.display = "block"; // Muestra las sugerencias si hay coincidencias
});

const hacerBusqueda = async ()=> {
    listasugerencias.style.display = "none"; // Oculta la lista si está vacía
    const word = busqueda.value;
    palabra.innerHTML=word;
    resultado.innerHTML=""; 
    pronunciacion.innerHTML="";
    const data = await fetch(`https://api.wordnik.com/v4/word.json/${word.toLowerCase()}/definitions?limit=10&includeRelated=false&useCanonical=false&includeTags=false&api_key=jpgdtuj97tr6opncyxqffeg9trsj3thxxwu0jocedxzp6931b`)
const words = await data.json()

debugger 
if(words.find(a=>a.word===undefined)){
    palabra_no_encontrada.style.display="block";
    const data = await fetch("words.json");
 const words = await data.json();
 const sugerencias_de_palabras=[]
 words.words.forEach(w=>{
    debugger
    const cantidad_letras=word.length
    const letras = word.split("")
    let cantidad_encontrada = 0
    letras.forEach(l=>{
        if (w.includes(l)){
            cantidad_encontrada++
        }

    })
    if (cantidad_encontrada>=cantidad_letras){
        sugerencias_de_palabras.push(w)
    }

 })
 resultado_palabras.innerHTML="";
sugerencias_de_palabras.forEach(s=>{
const li = document.createElement("li");
    li.textContent = s;
    resultado_palabras.appendChild(li);


})

palabras_sugeridas.style.display="block"; 
ejemplo.style.display="none"; 





    return
} 
    palabra_no_encontrada.style.display="none";
    palabras_sugeridas.style.display="none"; 

    //https://api.wordnik.com/v4/word.json/bank/audio?useCanonical=false&limit=50&api_key=YOURAPIKEY
    const data_audio = await fetch(`https://api.wordnik.com/v4/word.json/${word.toLowerCase()}/audio?limit=50&useCanonical=false&api_key=jpgdtuj97tr6opncyxqffeg9trsj3thxxwu0jocedxzp6931b`)
    const audios = await data_audio.json()
    var audio = document.createElement("AUDIO");
    audio.setAttribute("src", audios[0].fileUrl);    //  Ruta de la url del audio para la voz atra vez de la API
    audio.setAttribute("controls", "controls");
    audio.setAttribute("autoplay", "autoplay");
    pronunciacion.appendChild(audio);




    //https://api.wordnik.com/v4/word.json/help/topExample?useCanonical=false&api_key=YOURAPIKEY
    const data_ejemplo = await fetch(`https://api.wordnik.com/v4/word.json/${word.toLowerCase()}/topExample?useCanonical=false&api_key=jpgdtuj97tr6opncyxqffeg9trsj3thxxwu0jocedxzp6931b`)
    const ejemplos = await data_ejemplo.json()
    ejemplo_palabra.innerHTML=ejemplos.text
    ejemplo.style.display="block"; 



words.forEach(word=>{
if (word.text){
    const li = document.createElement("li");
    li.textContent = word.text;
    resultado.appendChild(li);
}





})
}

buscar.addEventListener("click", async ()=>{
await hacerBusqueda()
})

busqueda.addEventListener('keypress', async (e) => {
    // 

    if (e.key === "Enter") {
        await hacerBusqueda()
      
    }
});



