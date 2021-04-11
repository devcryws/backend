import * as multer from "multer";
import * as express from "express";
import {FileI} from "../config/multer"

const upload = express.Router();
import {multerConfig} from "../config/multer";

interface requestFileI extends express.Request{
    file: FileI
}

upload.post("/upload", multer(multerConfig).single("file"), async (request: requestFileI, response: express.Response) => {
    const { originalname: name, size, key, location: url = "" } = request.file;

    return response.json({url});
});

export default upload;