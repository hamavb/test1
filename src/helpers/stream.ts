import { Readable, PassThrough } from "stream";

export function readStream(stream: Readable): Promise<Buffer> {
  const data: Buffer[] = [];

  return new Promise((resolve, reject) => {
    const passThrough = stream.pipe(new PassThrough());
    passThrough.on("data", (chunk: Buffer) => data.push(chunk));
    passThrough.once("end", () => resolve(Buffer.concat(data)));
    passThrough.once("aborted", () => reject(Error("remote stream aborted")));
    passThrough.once("error", reject);
  });
}
