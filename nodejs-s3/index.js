import express from 'express'
import fileUpload from 'express-fileupload';
import { downloadFile, getFile, getFiles, uploadFile } from './s3.js';
// cuando no se extrae una funcion o una clase especifica de un archvio
// se puede importar de esta manera para que se ejecute automaticamente

const app = express()

// fileUplod es un middleware - lo que indica es que se va a ejecutar antes de que el servidor se active
app.use(fileUpload({
    // opcion para guardar archivos temporalmente
    useTempFiles: true,
    // la carpeta donde se van a guardar esos archivos temporales
    tempFileDir: './uploads'
}))

// obtener informacion de archivos
app.get('/files', async (req, res) => {
    const { Contents } = await getFiles()
    res.json(Contents)
})

// hacer consulta de un solo archivo apartir de un key
app.get('/files/:fileName', async (req, res) => {
    const result = await getFile(req.params.fileName)
    res.json(result.$metadata)
})

app.get('/download/:fileName', async (req, res) => {
    await downloadFile(req.params.fileName)
    res.json({ message: "archivo descargado" })
})

app.post('/files', async (req, res) => {
    const result = await uploadFile(req.files.file)
    res.json({ message: result })
})

app.listen(3000)
console.log(`server on port ${3000}`);