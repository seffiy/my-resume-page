/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface HCaptchaRenderOptions {
  sitekey: string;
  theme?: 'light' | 'dark';
  callback?: (token: string) => void;
  'expired-callback'?: () => void;
  'chalexpired-callback'?: () => void;
  'error-callback'?: () => void;
}

interface HCaptcha {
  render(el: HTMLElement, options: HCaptchaRenderOptions): string;
  reset(el?: HTMLElement): void;
}

interface Window {
  hcaptcha?: HCaptcha;
}
