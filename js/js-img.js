// Obtener elementos
var modal = document.getElementById("miModal");
var img = document.getElementById("imagenMiniatura");
var modalImg = document.getElementById("imagenAmpliada");
var captionText = document.getElementById("pieCaption");

// Cuando se hace clic en la imagen, abrir el modal
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

// Obtener el elemento <span> que cierra el modal
var span = document.getElementsByClassName("cerrar")[0];

// Cuando se hace clic en <span> (x), cerrar el modal
span.onclick = function() { 
  modal.style.display = "none";
}

// También cerrar el modal si el usuario hace clic fuera de la imagen
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
