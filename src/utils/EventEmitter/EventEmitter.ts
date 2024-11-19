// type
import { 
  TEventEmitterOnOffParams,
  TEventEmitterNamespace,
  TEventEmitterNamespaceEventMapper
} from './EventEmitter.type';

interface IEventEmitter<T extends TEventEmitterNamespace<any>> {
  on<N extends string, EN extends string>(
    params: TEventEmitterOnOffParams<N, EN>
  ): IEventEmitter<T & TEventEmitterNamespace<N>>
  on<N extends keyof T, EN extends keyof T[N]>(
    params: TEventEmitterOnOffParams<N, EN>
  ): IEventEmitter<T>
}

export default class EventEmitter<T extends TEventEmitterNamespace<any> = TEventEmitterNamespace<'default'>> implements IEventEmitter<T> {
  private _eventNamespaceMapper: T

  constructor() {
    this._eventNamespaceMapper = {
      default: {
        // 
      },
    } as unknown as T;
  }

  /** 이벤트 등록 */
  on<N extends string, EN extends string>(params: TEventEmitterOnOffParams<N, EN>): IEventEmitter<T & TEventEmitterNamespace<N>>;
  on<N extends keyof T, EN extends keyof T[N]>(params: TEventEmitterOnOffParams<N, EN>): IEventEmitter<T>;
  on<N extends string, EN extends string>(params: TEventEmitterOnOffParams<N, EN>): N extends keyof T
  ? IEventEmitter<T>
  : IEventEmitter<T & TEventEmitterNamespace<N>> {
    const {
      namespace = 'default',
      eventName,
      handler,
    } = params;

    if (!this._eventNamespaceMapper[namespace]) {
      (this._eventNamespaceMapper[namespace] as any) = {}
    }

    if (!this._eventNamespaceMapper[namespace][eventName]) {
      (this._eventNamespaceMapper[namespace][eventName] as any) = [];
    }

    this._eventNamespaceMapper[namespace][eventName].push(handler);

    return this as any
  }

  /** 이벤트 해제 */
  // off<N extends keyof T, EN extends keyof T[N]>(
  //   params: TEventEmitterOnOffParams<N, EN>
  // ) {
  //   const {
  //     namespace = 'default',
  //     eventName,
  //     handler,
  //   } = params;

  //   const eventNamespace = this._eventNamespaceMapper[namespace]

  //   if (!eventNamespace) {
  //     console.warn("해당하는 namespace 가 존재하지 않음");
  //     return
  //   }

  //   const eventHandlers = eventNamespace[eventName]

  //   if (!eventHandlers) {
  //     console.warn("해당하는 이벤트가 존재하지 않음");
  //     return
  //   }

  //   eventNamespace[eventName] = []
  // }

  // /** 이벤트 발생 */
  // trigger<N extends keyof T, EN extends keyof T[N]>(
  //   params: Omit<TEventEmitterOnOffParams<N, EN>, 'handler'> & { payload: any }
  // ) {
  //   const {
  //     namespace = 'default',
  //     eventName,
  //     payload,
  //   } = params;

  //   const eventNamespace = this._eventNamespaceMapper[namespace]

  //   if (!eventNamespace) {
  //     console.warn("해당하는 namespace 가 존재하지 않음");
  //     return
  //   }

  //   const eventHandlers = eventNamespace[eventName]

  //   if (!eventHandlers) {
  //     console.warn("해당하는 이벤트가 존재하지 않음");
  //     return
  //   }

  //   eventHandlers.forEach(handler => handler(payload))
  // }
}

const emitter = new EventEmitter();

emitter
  .on({
    namespace: 'default',
    eventName: 'test',
    handler: () => {}
  })
  .on({
    namespace: 'ns1',
    eventName: 'test',
    handler: () => {}
  })
