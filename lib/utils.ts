// Convert dataURL to Blob (optional)
export function dataURLtoBlob(dataUrl: string): Blob {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new Blob([u8arr], { type: mime });
}

// Random weekly prompt generator (optional)
export function randomPrompt() {
  const prompts = [
    "Draw a creature that lives on a cloud.",
    "Draw a robot that is afraid of humans.",
    "Draw a superhero using only geometric shapes.",
    "Draw the future of money.",
    "Draw a meme about AI trying to understand humans.",
    "Draw a monster made of vegetables.",
    "Draw 'time' as a character.",
  ];
  return prompts[Math.floor(Math.random() * prompts.length)];
}
