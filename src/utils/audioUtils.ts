/**
 * Utility functions for handling audio processing in the Niche Ai application.
 * Focused on PCM encoding/decoding for Gemini 1.5 Multimodal capabilities.
 */

/**
 * Converts a Float32Array of audio samples to a base64 encoded PCM16 string.
 */
export const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};

/**
 * Encodes Float32 audio samples to PCM16.
 */
export const encodePCM16 = (float32Array: Float32Array): ArrayBuffer => {
    const buffer = new ArrayBuffer(float32Array.length * 2);
    const view = new DataView(buffer);
    for (let i = 0; i < float32Array.length; i++) {
        const s = Math.max(-1, Math.min(1, float32Array[i]));
        view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
    return buffer;
};

/**
 * Decodes PCM16 base64 string back to Float32Array for playback.
 */
export const decodePCM16 = (base64: string): Float32Array => {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const buffer = new ArrayBuffer(len);
    const view = new DataView(buffer);
    for (let i = 0; i < len; i++) {
        view.setUint8(i, binaryString.charCodeAt(i));
    }

    const float32Array = new Float32Array(len / 2);
    for (let i = 0; i < float32Array.length; i++) {
        float32Array[i] = view.getInt16(i * 2, true) / 0x8000;
    }
    return float32Array;
};

/**
 * Formats duration in seconds to MM:SS string.
 */
export const formatAudioTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Creates a Waveform data visualization array from audio buffer.
 */
export const generateWaveformData = (buffer: Float32Array, segments: number = 50): number[] => {
    const blockSize = Math.floor(buffer.length / segments);
    const data = [];
    for (let i = 0; i < segments; i++) {
        let sum = 0;
        for (let j = 0; j < blockSize; j++) {
            sum += Math.abs(buffer[i * blockSize + j]);
        }
        data.push(sum / blockSize);
    }
    return data;
};
