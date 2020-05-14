"use strict";
const AWS = require("aws-sdk")
const uuid = require("uuid")

// get reference to S3 client
var s3 = new AWS.S3()
var dynamo = new AWS.DynamoDB()

module.exports.upload = async (event) => {
  
  // Create our unique identifier for now (this will be supplied eventually)
  const guid = uuid()

  // Decode our base64 image from the body
  const encodedImage = JSON.parse(event.body).rdt_image
  const decodedImage = Buffer.from(encodedImage, "base64")
  const filePath = `rdt-images/${guid}` + ".jpg"

  // Prepare the S3 Insert
  const s3Params = {
    Body: decodedImage,
    Bucket: process.env.UPLOAD_BUCKET,
    Key: filePath,
  }

  try {
    // Send to S3
    const s3Upload = await s3.upload(s3Params).promise()
    const { Location: image_url } = s3Upload
    console.log(`Image uploaded to ${image_url}`)
    let dynamoPut
    // Once we have the items full url, prepare our put into dynamo
    try {
      const dynamoParams = {
        TableName: process.env.DYNAMO_TABLE,
        Item: {
          guid: { S: guid },
          image_url: { S: image_url }
        }
      }
      
      dynamoPut = await dynamo.putItem(dynamoParams).promise()
      console.log("Dynamo record inserted:", dynamoPut)
    } catch (error) {
      //Dynamo insert has failed, undo our S3 insert as this will be detached data
      await s3.deleteObject(params).promise()
      return error
    }
    
    // Return our s3 response and dynamo inserted item to the user
    return {
      statusCode: 200,
      body: JSON.stringify({
        s3: s3Upload,
        dynamo: dynamoParams.Item
      })
    }
  } catch (error) { {
      return error
    }
  }
}
