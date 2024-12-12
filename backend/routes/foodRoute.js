import express from 'express';

import { addFood, list_food ,remove_food} from '../controller/foodController.js';
import multer from 'multer';


const foodRouter = express.Router();


const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`); 
    }
})

const upload = multer({storage:storage})




foodRouter.post('/add',upload.single("image"),addFood);
foodRouter.get('/list',list_food);
foodRouter.post('/remove',remove_food);


export default foodRouter