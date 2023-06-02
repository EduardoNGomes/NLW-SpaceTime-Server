// import { env } from './env'
import { config } from 'dotenv'

import { v2 as cloudinary } from 'cloudinary'

config()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

cloudinary.uploader
  .upload('./uploads/15449dba-6c1f-405d-a0ec-88e2933064b6.png', {
    resource_type: 'image',
  })
  .then((result) => console.log(JSON.stringify(result, null, 2)))
  .catch((error) => console.error(JSON.stringify(error), null, 2))
