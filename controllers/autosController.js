const fs = require('fs');
const archivo = JSON.parse(fs.readFileSync('./data/concesionarias.json','utf-8'));

module.exports={
    autos:(req,res)=>{
    res.write('>>>>>>>>>> NUESTROS AUTOS <<<<<<<<<<\n\n\n');
    let autos =[];
    archivo.forEach(element => {
        let sucursal = element.sucursal;
        element.autos.forEach(cadaAuto => {
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
    
        res.end();


    }




}