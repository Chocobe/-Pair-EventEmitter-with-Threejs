// three
import * as THREE from 'three';
import WebGLManager from '../WebGLManager/WebGLManager';

export default class Scene {
  private _instance: THREE.Scene;
  private _manager = WebGLManager.instance;

  constructor() {
    const scene = new THREE.Scene();

    this._instance = scene;
  }

  get instance() {
    return this._instance;
  }
}