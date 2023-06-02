import { env } from './env'

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: env.CLOUD_NAME,
  api_key: env.API_KEY,
  api_secret: env.API_SECRET,
})

cloudinary.uploader
  .upload('./uploads/15449dba-6c1f-405d-a0ec-88e2933064b6.png', {
    resource_type: 'image',
  })
  .then((result) => console.log(JSON.stringify(result, null, 2)))
  .catch((error) => console.error(JSON.stringify(error), null, 2))
