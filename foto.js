const fs = require('fs');
const path = require('path');
const FB = require('fb');
const page_id = require('./credentials/keys.json').page_id;

const directoryPath = path.join(__dirname, 'photos');

async function retornaImagemSelecionada() {

        const resultado = new Promise((resolve, reject) => {

            const data = () => fs.readdirSync(directoryPath, function (err, files) {        
                if (err) {
                    return console.log('Unable to scan directory: ' + err);
                }           
            })

            const arrayData = data();
            let fotoSelecionada;

            fotoSelecionada = arrayData[Math.floor(Math.random() * arrayData.length)]

            if (fotoSelecionada == "dcim" || fotoSelecionada == "publicados") {
                while(fotoSelecionada == "dcim" || fotoSelecionada == "publicados") { 
                fotoSelecionada = arrayData[Math.floor(Math.random() * arrayData.length)]
                }
            }

            resolve(fotoSelecionada);
        })
        
        return resultado;
}

module.exports = {
    retornaImagemSelecionada
}


