import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --------------------- GET IMAGES ---------------------

export async function GET() {
  try {
    const { resources } = await cloudinary.search
      .expression("resource_type:image")
      .sort_by("created_at", "desc")
      .execute();

    const map = resources.map((item: unknown) => {
      if (
        typeof item === "object" &&
        item !== null &&
        "public_id" in item &&
        "secure_url" in item
      ) {
        const img = item as Record<string, any>; // safe cast

        return {
          id: img.public_id,
          url: img.secure_url,
          created_at: img.created_at,
          bytes: img.bytes,
          format: img.format,
          display_name: img.display_name || img.public_id,
          width: img.width,
          height: img.height,
        };
      }

      return null;
    });

    return NextResponse.json(map.filter(Boolean));
  } catch (error: unknown) {
    console.error("Error fetching images:", error);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}

// --------------------- UPLOAD IMAGE ---------------------

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // upload_stream returns unknown → wrap safely
    const uploadResult = await new Promise<unknown>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          public_id: file.name.split(/\.\w+$/)[0],
          resource_type: "image",
          invalidate: true,
        },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    // Narrow the uploadResult
    if (
      typeof uploadResult === "object" &&
      uploadResult !== null &&
      "public_id" in uploadResult &&
      "secure_url" in uploadResult
    ) {
      const result = uploadResult as Record<string, any>;

      return NextResponse.json({
        id: result.public_id,
        url: result.secure_url,
        created_at: result.created_at,
        bytes: result.bytes,
        format: result.format,
        display_name: result.display_name || result.public_id,
        width: result.width,
        height: result.height,
      });
    }

    return NextResponse.json({ error: "Invalid upload response" }, { status: 500 });
  } catch (error: unknown) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
