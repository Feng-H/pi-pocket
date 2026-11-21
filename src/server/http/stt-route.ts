import type { IncomingMessage, ServerResponse } from "node:http";
import { HttpError } from "../errors.ts";
import { json, readBody } from "./io.ts";

/** Groq's own cap for this endpoint; past it the request is refused before it leaves the server. */
const MAX_STT = 25 * 1024 * 1024;

/** The Whisper model to transcribe with: the fast one, at a friendly price. */
const MODEL = "whisper-large-v3-turbo";

/**
 * Speech-to-text: the browser sends the audio it recorded (POST /api/stt, raw bytes), Groq's Whisper sends back the
 * words. Configured with GROQ_API_KEY; without it the route answers 501, and the browser falls back to its own speech
 * recognition where there is one.
 */
export async function sttRoute({
    request,
    response,
}: {
    request: IncomingMessage;
    response: ServerResponse;
}): Promise<void> {
    const key = process.env.GROQ_API_KEY;

    if (key === undefined || key === "") {
        throw new HttpError(501, "Server speech-to-text is not configured on this server");
    }

    const audio = await readBody(request, MAX_STT);

    if (audio.length === 0) {
        throw new HttpError(400, "No audio came with the request");
    }

    const type = String(request.headers["content-type"] ?? "audio/webm");
    const form = new FormData();

    form.append("file", new Blob([audio], { type }), "speech.webm");
    form.append("model", MODEL);
    form.append("response_format", "json");

    let out: Response;

    try {
        out = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
            method: "POST",
            headers: { Authorization: `Bearer ${key}` },
            body: form,
        });
    } catch (error) {
        throw new HttpError(502, `Could not reach the speech-to-text service: ${(error as Error).message}`);
    }

    if (!out.ok) {
        const detail = (await out.text().catch(() => "")).slice(0, 200);
        const code = out.status === 429 ? 429 : 502;

        throw new HttpError(code, `Transcription failed (${out.status})${detail === "" ? "" : `: ${detail}`}`);
    }

    const data = (await out.json().catch(() => ({}))) as { text?: string };

    return json(response, 200, { text: String(data.text ?? "") });
}
