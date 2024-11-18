export default class Viewport {
  $parent: HTMLElement;

  width!: number;
  height!: number;
  aspect!: number;
  pixelRatio!: number;

  constructor(params: {
    $parent: HTMLElement;
  }) {
    const {
      $parent,
    } = params;

    this.$parent = $parent;

    this.update();
  }

  update() {
    const {
      $parent,
    } = this;

    const {
      width,
      height,
    } = $parent.getBoundingClientRect();

    this.width = width;
    this.height = height;
    this.aspect = width / height;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
  }
}
