if("serviceWorker" in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(registrado => console.log("Se instaló correctamente", registrado))
        .catch(err => console.log("Fallo la instalación ", err))
} else {
    console.log("No se admiten PWA en este navegador");
}