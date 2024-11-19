// three
import * as THREE from 'three';
// webgl
import Viewport from '../../utils/Viewport/Viewport';
import Camera from '../Camera/Camera';
import Renderer from '../Renderer/Renderer';
import MockupWorld from '../MockupWorld/MockupWorld';
import TimeManager from '../TimeManager/TimeManager';

export default class WebGLManager {
  private static _instance: WebGLManager;

  dom!: {
    $parent: HTMLElement;
    $canvas: HTMLCanvasElement;
  };

  webglParts!: {
    viewport: Viewport;
    camera: Camera;
    scene: THREE.Scene;
    renderer: Renderer;
  };

  timeManager!: TimeManager;
  world!: MockupWorld;

  constructor(params: {
    $parent: HTMLElement;
  }) {
    if (WebGLManager._instance) {
      return WebGLManager._instance;
    }

    WebGLManager._instance = this;

    const {
      $parent,
    } = params;

    const $canvas = document.createElement('canvas');
    $canvas.classList.add('webgl');

    $parent.appendChild($canvas);

    this.dom = {
      $parent,
      $canvas,
    };

    this.webglParts = {} as typeof this.webglParts;

    // 1. Viewport
    this.webglParts.viewport = new Viewport({
      $parent,
    });

    // 2. Camera
    this.webglParts.camera = new Camera();

    // 3. Scene
    this.webglParts.scene = new THREE.Scene();

    // 4. Renderer
    this.webglParts.renderer = new Renderer();

    // 5. World
    this.world = new MockupWorld();

    // 6. TimeManager
    this.timeManager = new TimeManager();

    if (import.meta.env.DEV) {
      window.manager = this;
    }

    this.start();
  }

  start() {
    this.webglParts.renderer.update();
  }

  static get instance() {
    return WebGLManager._instance;
  }
}
