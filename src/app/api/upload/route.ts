import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { UploadApiResponse } from 'cloudinary';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'seraxmi-images',
            format: 'webp',
            quality: 'auto'
          },
          (error: unknown, result: UploadApiResponse | undefined) => {
            if (error) {
              if (error instanceof Error) {
                return reject(error);
              }
              return reject(new Error('Unknown upload error'));
            }
            if (!result) {
              return reject(new Error('No result returned from Cloudinary'));
            }
            resolve(result);
          }
        )
        .end(buffer);
    });

    console.log('Upload result:', result.secure_url);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
