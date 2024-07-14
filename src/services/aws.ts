import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { generateTimeStamp } from '@blackfiredev/utils'
import { AWSConfig } from '@config/index'

const S3_BUCKET = AWSConfig.bucket
const REGION = AWSConfig.defaultRegion
const ACCESS_KEY_ID = AWSConfig.accessKeyId
const SECRET_ACCESS_KEY = AWSConfig.secretAccessKey

const client = new S3Client({
	region: REGION,
	credentials: {
		accessKeyId: ACCESS_KEY_ID,
		secretAccessKey: SECRET_ACCESS_KEY,
	},
})

export const uploadFile = async (file: File) => {
	const fileName = `${generateTimeStamp()}-${file.name}`
	const sendFile = new PutObjectCommand({
		Bucket: S3_BUCKET,
		Key: fileName,
		Body: file,
		ACL: 'public-read', // Make the file publicly accessible
	})

	try {
		await client.send(sendFile)
		const url = `${AWSConfig.fileLink}/${fileName}`
		return url
	} catch (error) {
		console.error(error)
		throw error
	}
}
