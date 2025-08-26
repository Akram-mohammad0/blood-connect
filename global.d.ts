// global.d.ts
interface SpeechRecognition extends EventTarget {
  start(): void;
  stop(): void;
  abort(): void;
  onresult: (event: any) => void;
  onstart?: () => void;
  onend?: () => void;
  onaudioend?: () => void;
}

interface Window {
  webkitSpeechRecognition: typeof SpeechRecognition;
}
