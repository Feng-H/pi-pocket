import type { IncomingMessage, ServerResponse } from "node:http";
import { json, readBody } from "./io.ts";
import { HttpError } from "../errors.ts";
import { MAX_STT, transcribeAudio } from "../stt.ts";

/**
 * Speech-to-text: the browser sends the audio it recorded (POST /api/stt, raw bytes), the server's Whisper sends back
 * the words. Configured with GROQ_API_KEY; without it the route answers 501, and the browser falls back to its own
 * speech recognition where there is one. `?lang=` hears the audio as that language, instead of the model's own guess.
 */
export async function sttRoute({
    request,
    response,
    url,
}: {
    request: IncomingMessage;
    response: ServerResponse;
    url: URL;
}): Promise<void> {
    const audio = await readBody(request, MAX_STT);

    if (audio.length === 0) {
        throw new HttpError(400, "No audio came with the request");
    }

    const type = String(request.headers["content-type"] ?? "audio/webm");
    const text = await transcribeAudio(audio, type, url.searchParams.get("lang") ?? "");

    return json(response, 200, { text });
}
