import { Action } from "@ngrx/store";

export enum InitActionTypes {
  Init = "[Init] App Initialised"
}
export class Init implements Action {
  readonly type = InitActionTypes.Init;
}

export type InitActionUnion = Init;
