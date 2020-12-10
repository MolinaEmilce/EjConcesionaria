const fs = require('fs');
const archivo = JSON.parse(fs.readFileSync('./data/concesionarias.json','utf-8'));

module.exports={
    autos:(req,res)=>{
    res.write('>>>>>>>>>> NUESTROS AUTOS <<<<<<<<<<\n\n\n');
    let autos =[]; //se agregan OBJETOS de todos los autos que se filtren segun el parametro pasado por url
    archivo.forEach(element => {
        let sucursal = element.sucursal; //identifica la sucursal de cada elemente posicionado
        element.autos.forEach(cadaAuto => {
            /*Agregamos objetos personalizados, es decir : 
            asigno la propiedad con el nombre que quiera, preferentemente el mismo para no confundirse, incluimos nueva propiedad sucursal asignandole la variable creada en el foreach anterior que nos extrae el valor de la sucursal segun el elmento posicionado 
            en el que estamos y se le asigna a todos los autos*/
            autos.push({sucursal:sucursal,marca:cadaAuto.marca,modelo:cadaAuto.modelo,anio:cadaAuto.anio,color:cadaAuto.color});
        });
    });
    
    autos.forEach(cadaAuto => {
        res.write('---------------------------\n');
        res.write(`Marca : ${cadaAuto.marca}\nModelo: ${cadaAuto.modelo}\nAno: ${cadaAuto.anio}\nColor:${cadaAuto.anio}\nSucursal:${cadaAuto.sucursal}\n`);
        res.write('---------------------------\n');
    });


    
    res.end();

    },
    idMarca:(req,res)=>{
       
        let idMarca = req.params.marca;//
        let idAutos = [];//array vacio que luego se agrega objetos que son filtrados

        //Recorre dentro de otra iteracion:
        archivo.forEach(element => {
            let sucursal = element.sucursal;
           element.autos.filter(cadaAuto=>{
               //filtra con la condicion que cumpla con ella 
                if(cadaAuto.marca == idMarca){
                    //si cumple se agrega el objeto del auto  idAuto!!
                    idAutos.push({marca:cadaAuto.marca,modelo:cadaAuto.modelo,anio:cadaAuto.anio,color:cadaAuto.color,sucursal : sucursal});
                } 
                //de lo contrario no se agrega nada y queda vacio [];
            })
        });
    
        
    let dato = req.params.dato;

    if(dato){
        //Si la variable dato, que es el parametro opcional tiene valor, o la estamos asignando entramos dentro de este bloque... 

        let anioAutos = [];//variable para autos con el año buscado
        let colorAutos = [];//variable para autos con el color buscado

        idAutos.filter(cadaAuto=>{ 
            //De los autos seleccionados segun su marca, filtramos segun su color o anio y lo agregamos al array creado por arriba segun el dato extraido
            if(cadaAuto.color == dato){
                colorAutos.push(cadaAuto);
            }else if(cadaAuto.anio == dato){
                anioAutos.push(cadaAuto);
            }
        });
/*Condiciones: si en la variable anioAutos o colorAutos se encuentran vacias y la cantidad total que es 0(si es vacia) es distinto a 0 (es decir que hay elementos dentro de ella);
nos trae de la variable y su partes */
       if(anioAutos.length != 0){
        res.write(`>>>>>>>>>> MARCA : ${idMarca} - AÑO : ${dato}  <<<<<<<<<<\n\n\n`);
            anioAutos.forEach(cadaAuto=>{
                res.write('---------------------------\n');
                res.write(`Marca : ${cadaAuto.marca}\nModelo: ${cadaAuto.modelo}\nAño: ${cadaAuto.anio}\nColor: ${cadaAuto.color}\nSucursal: ${cadaAuto.sucursal}\n\n`);
                res.write('---------------------------\n');
            });       
       }else if(colorAutos != 0){
        res.write(`>>>>>>>>>> MARCA : ${idMarca} - COLOR: ${dato} <<<<<<<<<<\n\n\n`);
            colorAutos.forEach(cadaAuto=>{
                res.write('---------------------------\n');
                res.write(`Marca : ${cadaAuto.marca}\nModelo: ${cadaAuto.modelo}\nAño: ${cadaAuto.anio}\nColor: ${cadaAuto.color}\nSucursal: ${cadaAuto.sucursal}\n\n`);
                res.write('---------------------------\n');
        });     
       }else{
           res.write('Error, no se ha encontrado nada...');
       }
          
            
       
        
       

    }else{
        //Si no resivimos por url el valor opcional entramos dentro de este bloque y solo muestra  todos los autos de la marca puesta....
        if(idAutos.length == 0){
            res.write('Error');
        }else{
            res.write(`>>>>>>>>>> MARCA : ${idMarca} <<<<<<<<<<\n\n\n`);
            idAutos.forEach(cadaAuto=>{
                res.write('---------------------------\n');
                res.write(`Marca: ${cadaAuto.marca}\nModelo: ${cadaAuto.modelo}\nAño: ${cadaAuto.anio}\nColor: ${cadaAuto.color}\nSucursal: ${cadaAuto.sucursal}\n`);
                res.write('---------------------------\n');
            })
        }
    }



        res.end();


    },
    




}