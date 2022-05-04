const { response } = require('express');
const Evento = require('../models/Evento');


const getEventos = async ( req, res = response ) => {

    const eventos = await Evento.find() // hacer las paginaciones aqui y algunos filtros
                                    .populate('user','name'); // rellenar los datos del usuario
    
    return res.status(201).json({
        ok: true,
        eventos
    });

}   



const crearEventos = async ( req, res = response ) => {
    
    // verificar que tengo el evento
    //console.log( req.body );

    const evento = new Evento( req.body );    

    try {

        evento.user = req.uid;

        const eventoGuardado = await evento.save();

        return res.status(201).json({
            ok: true,
            evento: eventoGuardado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}      



const actualizarEventos = async ( req, res = response ) => {
    
    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe con es id'    
            });
        }


        if ( evento.user.toString() !== uid ) { // validacion si es el usuarios que creo el recurso
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para editar ese recurso'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user:uid
        }


        
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } ); // sin el ultimo argumento nos envia el registro anterior ( el que feue editado )

        res.json({
            ok:true,
            evento:eventoActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    
}      




const eliminarEventos = async ( req, res = response ) => {
    
    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe con es id'    
            });
        }


        if ( evento.user.toString() !== uid ) { // validacion si es el usuarios que creo el recurso
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para eliminar ese recurso'
            })
        }

        
        const eventoEliminado = await Evento.findByIdAndDelete( eventoId ); // sin el ultimo argumento nos envia el registro anterior ( el que feue editado )

        res.json({
            ok:true,
            evento:eventoEliminado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}      
        


module.exports = {
    getEventos,
    crearEventos,
    actualizarEventos,
    eliminarEventos
}