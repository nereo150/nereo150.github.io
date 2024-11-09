//inizializacion de variables
let targetasdestapadas = 0;
let targeta1 = null;
let targeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timerInicial = 40;
let timer = 40;
let tiempoRegresivo = null;

let ganarAudio = new Audio(`./sonidos/ganar.mp3`);
let perderAudio = new Audio(`./sonidos/perder.mp3`);
let clickAudio = new Audio(`./sonidos/click.mp3`);
let correctoAudio = new Audio(`./sonidos/correcto.mp3`);
let fallarAudio = new Audio(`./sonidos/fallar.mp3`);

//apuntando a documento html
let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("tiempo");

//generacion de numeros aleatorios
let numeros = [1,1,2,2,3,3,,4,4,5,5,6,6,7,7,8,8]
numeros = numeros.sort(()=>{return Math.random()-0.5})
console.log(numeros);

//funciones
function contartiempo(){
tiempoRegresivo = setInterval(()=>{
  timer--;
mostrarTiempo.innerHTML = `tiempo: ${timer} segundos`;
if(timer == 0){
clearInterval(tiempoRegresivo)
bloquearTarjetas(numeros);
perderAudio.play();
}
},1000);

function bloquearTarjetas(){
for (let i = 0; i <=15; i++){
  let tarjetaBloqueada = document.getElementById(i);
  tarjetaBloqueada.innerHTML = `<img src="./imagenes/${numeros[i]}.png" alt="">`
;
  tarjetaBloqueada.disabled = true;
}
}
}

//funcion principal
function destapar(id){

  if(temporizador == false){
    contartiempo();
    temporizador = true;
  }
    targetasdestapadas++;
    console.log(targetasdestapadas);

if(targetasdestapadas == 1){
  //mostrar primer numero
  targeta1 = document.getElementById(id);
  primerResultado = numeros[id]
  targeta1.innerHTML = `<img src="./imagenes/${primerResultado}.png" alt="">`;
  clickAudio.play()
  //desabilitar el primer boton
  targeta1.disabled = true;
}  else if(targetasdestapadas == 2){
 
  //mostrar segundo numero
  targeta2 = document.getElementById(id);
  segundoResultado = numeros[id];
  targeta2.innerHTML = `<img src="./imagenes/${segundoResultado}.png" alt="">`;


  //desabilitar segundo boton
  targeta2.disabled = true;

  //incrementar movimientos
movimientos++;
mostrarMovimientos.innerHTML = `movimientos: ${movimientos}`;

if(primerResultado == segundoResultado){
  //encerar contador tarjetas destapadas
  targetasdestapadas = 0;

  //aumentar aciertos
aciertos++;
mostrarAciertos.innerHTML = `aciertos: ${aciertos}`;
correctoAudio.play()

if(aciertos == 8){
  clearInterval(tiempoRegresivo)
  mostrarAciertos.innerHTML = `aciertos: ${aciertos}👏🤩`;
  mostrarTiempo.innerHTML = `genial🎉solo demoraste ${timerInicial - timer} segundos👏`
  mostrarMovimientos.innerHTML = `movimientos: ${movimientos}😎`
  ganarAudio.play();
}

}else{
  fallarAudio.play()
  //mostrar momentaneamente valores y volver a tapar
  setTimeout(()=>{
   targeta1.innerHTML = ` `;
   targeta2.innerHTML = ` `;
   targeta1.disabled = false;
   targeta2.disabled = false;
   targetasdestapadas = 0;
  },800);
    }
  }
}