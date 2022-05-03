

const jwt = require('jsonwebtoken');


const generarJWT = ( uid, name ) => {

   return new Promise( ( resolve, reject ) => {
        
        const payload = { uid, name };

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, ( err, token ) => {   // EN CASO DE QUE NO SE PUDO FIRMAR - CALLBACK

            if ( err ){
                console.log(err);
                reject('No se pudo gererar el token');
            }

            resolve( token );  // SI TODO SE HACE CORRECTAMENTE - RESOLVE

        })


   }) 

}

module.exports = {
    generarJWT
}