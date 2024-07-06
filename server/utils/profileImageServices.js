import { v2 as cloudinary } from 'cloudinary';

export const imageUpload = async (file, folder) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: folder,
    });
    console.log(result);
    return { secure_url: result.secure_url, public_id: result.public_id };
  } catch (error) {
    console.log('Cloudinary uploading error: ', error);
  }
};

export const removeImageFromCloudinray = async (publicID) => {
  try {
    if (publicID) {
      await cloudinary.uploader.destroy(publicID, function (result) {
        console.log('Successfully removed avatar from clodinary: ', result);
      });
    }
  } catch (error) {
    console.log('Removing avatar from cloudinary error: ', error);
  }
};
