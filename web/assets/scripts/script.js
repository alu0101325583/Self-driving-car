import World from './modules/world.js';
import Vehicle from './modules/vehicle.js';
import * as f from './modules/functions.js';
import './modules/jquery.js';

// Fichero donde está todo el funcionamiento de la interfaz
// Primero se importan los demas archivos JS y se declaran las variables globales

let alto = 10, ancho = 10;
let world = new World();
let vehicle = new Vehicle(0, alto / 2 - 1, world);
vehicle.setfinal(ancho - 1, alto / 2 - 1, world);
let id1 = setInterval(f.checkclickworld(world, vehicle));
let id2 = setInterval(f.checkmovevehicle(vehicle, world));
let id3 = setInterval(f.checkmovefinal(vehicle, world));
f.borderinterval();

// Declara la creación de la clase World con el cambio de los inputs ancho y alto y comprueba si clickas en él
// Primero limpia world por si hay uno previo, luego obtiene los valores de alto y ancho y crea el mundo
// Por último crea una función asíncrona para checkear si clickas en el mundo y nunca termina

$('#alto, #ancho').on("change", () => {
  world.clear();
  
  alto = f.checkNaN($('#alto').val());
  ancho = f.checkNaN($('#ancho').val());
  
  world = new World(ancho, alto);

  clearInterval(id1)
  id1 = setInterval(f.checkclickworld(world, vehicle));
})

// Controla los cambios del input del % de obstaculos y llama al método del mundo
$('#obstaculos_input').on("change", () => {
  let obstaculos = f.checkNaN($('#obstaculos_input').val());
  world.setRandObs(obstaculos, vehicle);
})

// Controla los cambios del input de la posicion del vehiculo y crea el objeto vehiculo
$('#x_vehiculo, #y_vehiculo').on("change", () => {
  vehicle.clear();

  let x = f.checkNaN($('#x_vehiculo').val());
  let y = f.checkNaN($('#y_vehiculo').val());

  vehicle = new Vehicle(x, y, world);

  clearInterval(id2)
  id2 = setInterval(f.checkmovevehicle(vehicle, world));
})

// Controla los cambios del input del destino final y los introduce en el método de vehiculo
$('#x_final, #y_final').on("change", () => {
  vehicle.clearfinal();

  let x = f.checkNaN($('#x_final').val());
  let y = f.checkNaN($('#y_final').val());

  vehicle.setfinal(x, y, world);
  
  clearInterval(id3)
  id3 = setInterval(f.checkmovefinal(vehicle, world));
})

let check_grid = false;
$('#grid').on("click", () => {
  if (check_grid) {
    $('.col').css('border', '1px solid grey');
    check_grid = false;
  } else {
    $('.col').css('border', '0px solid grey');
    check_grid = true;
  }
});

let table = $('.table');
let table_cont = $('.table-container');
let size = 100;
$('.table-container').on("wheel", (e) => {
  if(e.originalEvent.deltaY !== 0) {
    if(e.originalEvent.deltaY < 0) {
      size += 10;
      table.css("transform", "scale(" + size + "%)");
    } else {
      size -= 10;
      table.css("transform", "scale(" + size + "%)");
    }
  }
})

table_cont.on("mousedown", (e) => {
  if (e.buttons == 2) {
    var relX = e.pageX;
    var relY = e.pageY;

    table_cont.on("mousemove", (e) => {
      var diffX = e.pageX - relX;
      var diffY = e.pageY - relY;

      table.css('top', diffY + 'px');
      table.css('left', diffX + 'px');
    })
  }
})

table_cont.on("mouseup", () => {
  table_cont.off("mousemove");
})