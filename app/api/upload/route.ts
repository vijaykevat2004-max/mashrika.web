import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function cloudinaryConfig() {
  return {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    unsignedPreset: process.env.CLOUDINARY_UNSIGNED_PRESET || ''
  };
}

export async function POST(req: Request) {
  const { cloudName, unsignedPreset } = cloudinaryConfig();
  if (!cloudName || !unsignedPreset) {
    return NextResponse.json(
      {
        ok: false,
        message: 'Image upload is not configured. Add CLOUDINARY_CLOUD_NAME and CLOUDINARY_UNSIGNED_PRESET.'
      },
      { status: 500 }
    );
  }

  const form = await req.formData();
  const file = form.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, message: 'Missing file upload.' }, { status: 400 });
  }

  const uploadForm = new FormData();
  uploadForm.append('file', file);
  uploadForm.append('upload_preset', unsignedPreset);

  const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: uploadForm
  });

  if (!uploadRes.ok) {
    return NextResponse.json({ ok: false, message: 'Cloudinary upload failed.' }, { status: 500 });
  }

  const payload = (await uploadRes.json()) as { secure_url?: string };
  if (!payload.secure_url) {
    return NextResponse.json({ ok: false, message: 'No uploaded URL returned.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true, url: payload.secure_url });
}
