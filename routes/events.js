/*
    Events Routes
    /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const {  validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEventos, actualizarEventos, eliminarEventos } = require('../controllers/events');

const router = Router();

// Todas tiene que pasar por la validacion del JWT 
// router.use( validarJWT ); // Eliminar Middleware repetido y con esto pasa por todas las rutas

// Obtener un evento
router.get('/', validarJWT, getEventos);

// Crear un nuevo evento
router.post('/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ), // validacion personalisada
        check('end','Fecha de finalizacion es obligatoria').custom( isDate ), // validacion personalisada
        validarCampos
    ],
        validarJWT, 
        crearEventos
        );

// Actualizar un evento
router.put('/:id',
        [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ), // validacion personalisada
        check('end','Fecha de finalizacion es obligatoria').custom( isDate ), // validacion personalisada
        validarCampos
        ],
        validarJWT, 
        actualizarEventos
        );

// Borrar evento
router.delete('/:id', validarJWT, eliminarEventos);

module.exports = router;