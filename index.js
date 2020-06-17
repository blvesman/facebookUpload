const FB = require('fb');
const fs = require('fs');

const access_token = require('./credentials/keys.json').access_token;
const page_id = require('./credentials/keys.json').page_id;
const imagemDaVez = require('./foto').retornaImagemSelecionada;

FB.options({version: 'v6.0'});
FB.setAccessToken(access_token);

imagemDaVez().then((result) => {
    console.log(`A imagem da vez é: ${result}`);

    const routeFile = `./photos/${result}`;
    const newRouteFile = `./photos/publicados/${result}`;

    let fotoAtual = "";

 
    FB.api(
        `/${page_id}/posts`,
        `GET`,
        function(res) {
            if(!res || res.error) {
                console.log(!res ? 'error occurred' : res.error);
                return;
            }

            const data = res.data.map((item) => {
                return item.message;
            });

            const ultimaFoto = data[0].split(' ');
            fotoAtual = `Foto ${parseInt(ultimaFoto[1]) + 1}`;
            console.log(`${fotoAtual} sendo carregada`);
        }
    )

    setTimeout( function() {
        FB.api(
            `/${page_id}/photos`,
            'POST',
            { source: fs.createReadStream(routeFile), caption: fotoAtual },
            function(res) {
    
                if(!res || res.error) {
                    console.log(!res ? 'error occurred' : res.error);
                    return;
                }
    
                console.log(res);
                fs.rename(routeFile, newRouteFile, function (err) {
                    if (err) throw err
                    console.log(`${result} movido com sucesso!`);
                })
            }
        );
    }, 1000);;

})


