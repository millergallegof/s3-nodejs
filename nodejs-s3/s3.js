import { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { NAME_BUCKET, REGION_BUCKET, ACCESKEY_USER_BUCKET, SECRET_ACCESKEY_USER_BUCKET } from './config.js'
import fs from 'node:fs'

const client = new S3Client({
    region: REGION_BUCKET,
    credentials: {
        accessKeyId: ACCESKEY_USER_BUCKET,
        secretAccessKey: SECRET_ACCESKEY_USER_BUCKET
    }
})

export async function uploadFile(file) {
    const stream = fs.createReadStream(file.tempFilePath)
    const uploadParams = {
        Bucket: NAME_BUCKET,
        Key: file.name,
        Body: stream
    }
    const command = new PutObjectCommand(uploadParams)
    return await client.send(command)
}

export async function getFiles() {
    const command = new ListObjectsCommand({
        Bucket: NAME_BUCKET
    })
    return await client.send(command)
}

export async function getFile(fileName) {
    const command = new GetObjectCommand({
        Bucket: NAME_BUCKET,
        Key: fileName
    })
    return await client.send(command)
}

export async function downloadFile(fileName) {
    const command = new GetObjectCommand({
        Bucket: NAME_BUCKET,
        Key: fileName
    })
    const result = await client.send(command)
    result.Body.pipe(fs.createWriteStream(`./images/${fileName}`))
}