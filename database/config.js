const mongoose = require('mongoose');

const dbConection = async () => {
    try {

       await mongoose.connect( process.env.DB_CN );
       
       console.log('DB Connected');
    
    
    } catch ( error ) {
        console.log(error);
        throw new Error('Error al inicializar la BD');
    }
}

module.exports = {
    dbConection
}