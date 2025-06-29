import { v2 as cloudinary } from 'cloudinary';

// Configure using the full URL
cloudinary.config(process.env.CLOUDINARY_URL!);

export default cloudinary;