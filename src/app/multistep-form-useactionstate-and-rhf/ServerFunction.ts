namespace ServerFunction {
  export type ActionState<State, Payload> =
    | ((arg: Payload) => State | Promise<State>)
    | ((state: State, payload: Payload) => State | Promise<State>);
}

export default ServerFunction;
