// webgl
import WebGLManager from './webgl/WebGLManager/WebGLManager';
// style
import './style.css';

(function init() {
  const $app = document.querySelector('#app') as HTMLDivElement;

  if (!$app) {
    throw new Error('Cannot access $app element');
  }

  new WebGLManager({
    $parent: $app,
  });
}());
