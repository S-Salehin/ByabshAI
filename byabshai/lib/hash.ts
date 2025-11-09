export async function sha256Hex(data: Blob | ArrayBuffer | string) {
  let buf: ArrayBuffer;
  if (data instanceof Blob) {
    buf = await data.arrayBuffer();
  } else if (typeof data === "string") {
    buf = new TextEncoder().encode(data).buffer;
  } else {
    buf = data;
  }
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
