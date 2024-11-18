// webgl
import WebGLManager from './webgl/WebGLManager/WebGLManager';

declare global {
  interface Window {
    manager: WebGLManager;
  }
}
