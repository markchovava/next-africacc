import JSZip from "jszip";


export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const images = JSON.parse(searchParams.get('images') || '');

    const downloads = await Promise.all(images.map(async (image) => {
        const response = await fetch(image.url);
        const contentType = response.headers.get('Content-Type')
        const data = await response.arrayBuffer();
        return {
          ...image,
          data,
          type: contentType?.replace('image/', '')
        }
      })
    );

    const zip = new JSZip();

    downloads.forEach((download) => {
        zip.file(`${download.code}.${download.type}`, download.data);
    })

    const archive = await zip.generateAsync({type: "blob"});

    return new Response(
        archive, {
        status: 200, 
        headers: { 
            'Content-Type': 'application/zip',
        }
    });
}