const fs = require('fs');
const archivo = JSON.parse(fs.readFileSync('./data/concesionarias.json','utf-8'));
module.exports = {
    home: (req,res)=>{
        res.write('-----Bienvenidos-----\n\n');
        res.write('Nuestras sucursales :\n')
        archivo.map((cadaelement)=>{
            res.write(` - ${cadaelement.sucursal} \n`);
        })
        res.end();
        
    }
}