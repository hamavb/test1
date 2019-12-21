import fs from "fs";
import { promisify } from "util";
import path from "path";
import nodeFetch, {
  Request,
  Response,
  RequestInfo,
  RequestInit,
  Headers
} from "node-fetch";
import { readStream } from "./stream";

const statSync = promisify(fs.stat);

async function createResponseFromFile(url: string) {
  try {
    const protocol = url.split(":")[0];
    const filePath = path.normalize(
      url.substring(protocol.length + ":".length)
    );
    const fileStat = await statSync(filePath);
    const bodyBuffer = await readStream(fs.createReadStream(filePath));
    const headers = new Headers();
    headers.set("Content-Length", fileStat.size.toString());

    return new Response(bodyBuffer, {
      url,
      status: 200,
      statusText: "OK",
      headers
    });
  } catch (err) {
    return new Response(null, {
      url,
      status: 404,
      statusText: err.message
    });
  }
}

export function fetch(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> {
  const url = (input instanceof Request ? input.url : input) as string;
  const protocol = url.split(":")[0];
  const isLocalFile = protocol === "file";

  if (!isLocalFile) return nodeFetch(input, init);

  return createResponseFromFile(url)
}
