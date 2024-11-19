// three
import * as THREE from 'three';
import WebGLManager from '../WebGLManager/WebGLManager';

export default class MockupWorld {
  private _manager = WebGLManager.instance;

  private _floor: THREE.Mesh;
  private _box: THREE.Mesh;

  constructor() {
    const {
      scene,
    } = this._manager.webglParts;

    // 1. floor
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshBasicMaterial({
        color: '#777',
      })
    );
    floor.quaternion.setFromAxisAngle(
      new THREE.Vector3(-1, 0, 0),
      Math.PI * 0.5
    );

    this._floor = floor;

    // 2. box
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(3, 3, 3),
      new THREE.MeshBasicMaterial({
        color: '#03a9f4',
      })
    );
    box.position.y = 1.5;

    this._box = box;

    scene.instance.add(floor);
    scene.instance.add(box);
  }
}
