import express from 'express'
import multer from 'multer'
const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
const upload = multer({ storage: storage });


router.post('/', upload.single('myfile'), (req, res,err) => {
    try {
      // res.send(req.file)
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });
export default router