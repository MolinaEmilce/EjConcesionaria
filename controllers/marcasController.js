const fs = require('fs');
const archivo = JSON.parse(fs.readFileSync('./data/concesionarias.json','utf-8'));

module.exports = {
    marca : (req,res)=>{
        res.write('>>>>>>>>>> MARCAS <<<<<<<<<<\n\n\n');
        let nombreMarca = req.params.marca;
    let marcas = [];//Cree un array de objetos. Cada objeto tiene su sucursal,marca,modelo y anio
    for(let i = 0; i<archivo.length;i++){
        let sucursales = archivo[i].sucursal;
        archivo[i].autos.forEach(element => {
        marcas.push({ sucursal : sucursales, marca : element.marca,modelo:element.modelo,anio:element.anio});
        })
    }
   
   let filtradas = marcas.filter(cadaMarca=>{
        //SOLO RETORNA LO VERDADERO
       //return cadaMarca.marca.includes(nombreMarca); //retorna  de cada componentes que se encuentra en el parametro que se pasa y que son verdaderos
       return cadaMarca.marca == nombreMarca 
    }); //LOS FILTROS: SI CUMPLE CON SU CONDICION DEVUELVE LOS DATOS QUE CUMPLAN CON ESA, DE LO CONTRARIO NOS DEVUELVE VACIA! es decir esta así filtradas = [];

//para poner la condicion : la cantidad que hay en filtradas que es cero si es que el valor ingresado no se encuentra imprimira lo que esta dentro del bloque! 
    if(filtradas.length == 0){
        res.write('Error, verifique lo introducido');
    }else{ 
        filtradas.forEach(element => {
            res.write('---------------------------\n');
            res.write(`Marca: ${element.marca}\nSucursal : ${element.sucursal}\nModelo: ${element.modelo}\nAño: ${element.anio}\n\n`);
            res.write('---------------------------\n');
        });
    }
    res.end();
},
marcas : (req,res)=>{
    res.write('>>>>>>>>>> NUESTRAS MARCAS <<<<<<<<<<\n\n\n');
        let autos = []; //agregamos todas las marcas de los autos 

        /*Recorremos el json en cad aposicion, dentro de ella iteramos otra vez pero solo filtramos lo que hay dentro del bloque */
        archivo.forEach(cadaElemento=>{
            cadaElemento.autos.filter(cadaAuto=>{
                //si en la variable autos se encuentra el nombre de la marca retorna falso o verdadero
                let resultado = autos.includes(cadaAuto.marca);
                if(resultado==false){ //si no existe (es decir si es false) esa marca en la variable AUTOS que la agregue
                    return autos.push(cadaAuto.marca);
                }
            });
        });   
        
        
            res.write(`Marcas con las que nos manejamos : ${autos.join(' - ')}`);
    
    
    

        res.end()



    }








}