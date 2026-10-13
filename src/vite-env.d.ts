/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface HCaptcha {
  reset(el?: HTMLElement): void;
}

interface Window {
  hcaptcha?: HCaptcha;
}

interface HTMLDivElement {
  onVerify?: (token: string) => void;
  onExpire?: () => void;
  onChalExpired?: () => void;
  onError?: () => void;
}
