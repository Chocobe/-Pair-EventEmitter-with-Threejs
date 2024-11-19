// three
import * as THREE from 'three';
import { 
  OrbitControls,
} from 'three/examples/jsm/Addons.js';
// webgl
import WebGLManager from '../WebGLManager/WebGLManager';

export default class Camera {
  private _instance: THREE.PerspectiveCamera;
  private _controls: OrbitControls;
  private _manager = WebGLManager.instance;
  private _viewport = WebGLManager.instance.webglParts.viewport;
  private _timeManager = WebGLManager.instance.timeManager;

  constructor() {
    this._instance = new THREE.PerspectiveCamera();
    this._instance.position.set(5, 5, 10);
    this._instance.lookAt(0, 0, 0);

    const {
      $canvas,
    } = this._manager.dom;

    this._controls = new OrbitControls(this._instance, $canvas);
    this._controls.enableDamping = true;

    this.resize();
  }

  resize() {
    const {
      aspect,
    } = this._viewport;

    this._instance.fov = 45;
    this._instance.aspect = aspect;
    this._instance.near = 0.5;
    this._instance.far = 500;

    this._instance.updateProjectionMatrix();
  }

  update() {
    const {
      deltaTime
    } = this._timeManager;

    this._controls.update(deltaTime);
  }

  get instance() {
    return this._instance;
  }
}
