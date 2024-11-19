export type TEventEmitterOnOffParams<N extends string | symbol | number, EN extends string | symbol | number> = {
  namespace?: N;
  eventName: EN;
  handler: GeneralFunction;
};

export type TEventEmitterNamespaceEventMapper<EN extends string> = {
  [eventName in EN]: GeneralFunction[];
}

export type TEventEmitterNamespace<N extends string> = {
  [namespace in N]: TEventEmitterNamespaceEventMapper<any>
}
