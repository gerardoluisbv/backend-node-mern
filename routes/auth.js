/*
    Rutas de Usuarios /Auth
    host + /api/auth
*/

const { Router } = require('express');
const router = Router();
const { validarCampos } = require('../middlewares/validar-campos')
const { check  } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');


router.post(
    '/new',
    [ //Midlewares
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe de ser de 6 caracteres').isLength({ min:6 }),
        validarCampos
    ],
    crearUsuario );

router.post('/',
    [ // Midlewares
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe de ser de 6 caracteres').isLength({ min:6 }),
        validarCampos

    ],
    loginUsuario );


router.get('/renew', validarJWT ,revalidarToken );


module.exports = router;