// three
import * as THREE from 'three';
import WebGLManager from '../WebGLManager/WebGLManager';

export default class Camera {
  private _instance: THREE.PerspectiveCamera;
  private _manager = WebGLManager.instance;
  private _viewport = this._manager.webglParts.viewport;

  constructor() {
    this._instance = new THREE.PerspectiveCamera();
    this._instance.position.set(5, 5, 10);
    this._instance.lookAt(0, 0, 0);

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

  get instance() {
    return this._instance;
  }
}
