/**
 * `EventEmitter` 상속 필요
 * 
 * * `tick` 이벤트 발생
 */
export default class TimeManager {
  private _startTime: number;
  private _currentTime: number;
  private _elapsedTime: number;
  private _deltaTime: number;

  private animationFrameId: ReturnType<typeof window.requestAnimationFrame> | null = null;

  constructor() {
    this._startTime = new Date().getTime();
    this._currentTime = this._startTime;
    this._elapsedTime = 0;
    this._deltaTime = 0;
  }

  /**
   * 매 Frame 마다 `tick` 이벤트 발생
   * 
   * * `window.requestAnimationFrame()` 재귀 호출부
   */
  private tick() {
    const previousTime = this._currentTime;
    this._currentTime = new Date().getTime();
    this._elapsedTime = this._currentTime - this._startTime;
    this._deltaTime = this._currentTime - previousTime;

    this.animationFrameId = window.requestAnimationFrame(this.tick.bind(this));
  }

  start() {
    this.tick();
  }

  stop() {
    if (this.animationFrameId) {
      window.cancelAnimationFrame(this.animationFrameId);
    }
  }

  get startTime() {
    return this._startTime;
  }
  get currentTime() {
    return this._currentTime;
  }
  get elapsedTime() {
    return this._elapsedTime;
  }
  get deltaTime() {
    return this._deltaTime;
  }
}
