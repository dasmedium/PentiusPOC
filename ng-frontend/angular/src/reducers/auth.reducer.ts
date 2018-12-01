import { AuthActions } from "../actions/index";
import { Customer } from "../customer/models/customer";

export interface State {
  customer: Customer | null;
  tracking_guid: string;
  error: object;
}

export const initialState: State = {
  customer: null,
  tracking_guid: null,
  error: null
};

export function reducer(
  state = initialState,
  action: AuthActions.AuthActionsUnion
) {
  switch (action.type) {
    case AuthActions.AuthActionTypes.GetGuid: {
      return {
        ...state
      };
    }
    case AuthActions.AuthActionTypes.GetGuidSuccess: {
      return {
        ...state,
        tracking_guid: action.payload
      };
    }
    case AuthActions.AuthActionTypes.GetGuidError: {
      return {
        ...state,
        error: action.payload
      };
    }
    case AuthActions.AuthActionTypes.RegisterRedirect: {
      return {
        ...state,
        customer: action.payload
      };
    }
    case AuthActions.AuthActionTypes.RegisterFailure: {
      return {
        ...state,
        errors: action.payload
      };
    }
    default:
      return {
        ...state
      };
  }
}

export const getTrackingGuid = (state: State) => state.tracking_guid;
export const getErrors = (state: State) => state.error;
export const getCustomer = (state: State) => state.customer;

// function handleUserInfo(state: State, action:)
