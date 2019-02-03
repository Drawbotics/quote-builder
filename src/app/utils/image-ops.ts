import PNG from '@react-pdf/png-js/dist/png-js.browser.es.js';


export function isPNGValid(data: string) {
  try {
    const buffer = Buffer.from(data.split(',')[1], 'base64');
    const png = new PNG(buffer);
    return png.interlaceMethod === 0;
  } catch (e) {
    console.error(e);
    return false;
  }
}


export async function roundImage(image: string) {
  return new Promise<any>((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 200;
      const ctx = canvas.getContext('2d');
      if (! ctx) {
        console.warn('Canvas not supported, returning original image');
        resolve(image);
        return;
      }
      const img = new Image();
      img.src = image;
      img.onload = () => {
        ctx.save();
        ctx.scale(1,1);
        ctx.beginPath();
        ctx.arc(100, 100, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        if (img.height > img.width) {
          ctx.drawImage(img, 0, (img.height - img.width) / 2, img.width, img.width, 0, 0, canvas.width, canvas.height);
        }
        else {
          ctx.drawImage(img, (img.width - img.height) / 2, 0, img.height, img.height, 0, 0, canvas.width, canvas.height);
        }
        ctx.restore();
        const dataUrl = canvas.toDataURL();
        resolve(dataUrl);
      }
    }
    catch (err) {
      reject(err);
    }
  });
}
