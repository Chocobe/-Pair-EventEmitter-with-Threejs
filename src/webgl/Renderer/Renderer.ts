// three
import * as THREE from 'three';
import WebGLManager from '../WebGLManager/WebGLManager';

export default class Renderer {
  private _instance: THREE.WebGLRenderer;
  private _manager = WebGLManager.instance;
  private _scene = WebGLManager.instance.webglParts.scene;
  private _camera = WebGLManager.instance.webglParts.camera;
  private _viewport = WebGLManager.instance.webglParts.viewport;

  constructor() {
    const {
      dom: {
        $canvas,
      },
    } = this._manager;

    const {
      width,
      height,
      pixelRatio,
    } = this._viewport;

    const renderer = new THREE.WebGLRenderer({
      canvas: $canvas,
      antialias: pixelRatio < 2,
    });

    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height);

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.enabled = true;

    this._instance = renderer;
  }

  update() {
    const {
      _scene: scene,
      _camera: camera,
      instance,
    } = this;

    instance.render(
      scene.instance, 
      camera.instance
    );
  }

  get instance() {
    return this._instance;
  }
}
