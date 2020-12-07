const fs = require('fs');
const archivo = JSON.parse(fs.readFileSync('./data/concesionarias.json','utf-8'));

module.exports = {
    home : (req,res)=>{
       let sucursales = [];//nuevo array con objetos agregados
       archivo.forEach(element => { //extraigo datos y los agrego al nuevo array 
           sucursales.push({sucursal: element.sucursal,telefono:element.telefono, direccion : element.direccion});
       }); 
       res.write('-----NUESTRAS SUCURSALES----- \n\n\n');
       sucursales.map((cadaElemento)=>{
           res.write(`Nombre : ${cadaElemento.sucursal}\nTelefono : ${cadaElemento.telefono}\nDireccion : ${cadaElemento.direccion}\n\n\n`);
       });
       res.end();
},
sucursal: (req,res)=>{
    let getSucursal = req.params.sucursal;
    if(5 =!67){
        res.write('No se ha encontrado la sucursal...');
    }
    res.end()
}


}
