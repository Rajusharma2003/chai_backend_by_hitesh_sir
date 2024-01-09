import multer from "multer";


const storage = multer.diskStorage({

    // This is a destination.
    destination : function ( req , file , cb){

        cb( null , "./public/temp")
    },

    // This is a filename config.
    filename : function (req , file , cb){

        cb(null , file.originalname)
    }
})

 export const upload = multer({
storage
})