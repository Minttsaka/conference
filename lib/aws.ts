import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_S3_REGION_NAME!,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
  },
})


export async function uploadTos3(file: File) {

    console.log("hello")
    try {
      const fileName = `${Date.now()}-${file.name.replace(/ /g, "_")}`;
      const fileType = file.type; 
  
      console.log(fileName, fileType)
  
      if (!fileName || !fileType) {
        console.error("failed since no name or type")
      }
  
      // Create a unique file key
      const key = `uploads/${Date.now()}-${fileName}`
  
      // Create the command to put an object in the S3 bucket
      const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        Key: key,
        ContentType: fileType,
      })
  
      // Generate a pre-signed URL for the upload
      const presignedUrl = await getSignedUrl(s3Client, putObjectCommand, { expiresIn: 3600 })
  
      return {
        presignedUrl,
        key,
        fileName,
        url: `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_S3_REGION_NAME}.amazonaws.com/${key}`,
      }
    } catch (error) {
      console.error("Error generating presigned URL:", error)
    }
  }