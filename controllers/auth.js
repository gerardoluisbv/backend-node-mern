 //const express = require('express');
 const { response } = require('express');
 const bcrypt = require('bcryptjs');
 const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');


 
 const crearUsuario = async ( req, res = response ) => {
    
    const { email, password } = req.body;

    
    try {
        let usuario = await Usuario.findOne({ email: email });

        if ( usuario ) {
            return res.status(201).json({
                ok: false,
                msg: 'Un usuario existe con ese email'
            });
        }      
        
        usuario = new Usuario( req.body ); // se sobreescribe con la variable usuario de arriba
        
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync(); // 10 VUELTAS POR DEFECTO, RECICE EL NUMERO POR PARAM
        usuario.password = bcrypt.hashSync( password, salt );



        await usuario.save();

        // Generar JWT

        const token = await generarJWT ( usuario.id, usuario.name );

    
    res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token     //ES6 is same to token:token in common JS
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })

    }

}


const loginUsuario = async ( req, res = response ) => {
    
    const { email, password } = req.body ;
   
    try {

        const usuario = await Usuario.findOne({ email: email });

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese email' // Usuario y contraseña no son correctos
            });
        }

        // Confirmar loas passwords
        const validPassword = bcrypt.compareSync( password, usuario.password ); // return boolean

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }


        // Generar JWT

        const token = await generarJWT ( usuario.id, usuario.name );

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })

    }


}

const revalidarToken = async (req, res = response) => {
  
    const uid = req.uid;
    const name = req.name;

    //generar un nuevo JWT y retirnarlo a esta peticion
  
    const token = await generarJWT ( uid, name );

    res.json({
        ok: true,
        token
    })
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}