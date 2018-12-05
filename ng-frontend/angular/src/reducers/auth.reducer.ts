import { AuthActions } from "../actions/index";
import { Customer } from "../customer/models/customer";

export interface State {
  customer: Customer | null;
  tracking_guid: string;
  errors: object;
}

export const initialState: State = {
  customer: null,
  tracking_guid: null,
  errors: null
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
        tracking_guid: action.payload,
        customer: {
          tracking_guid: action.payload
        }
      };
    }
    case AuthActions.AuthActionTypes.GetGuidError: {
      return {
        ...state,
        errors: action.payload.error
      };
    }
    case AuthActions.AuthActionTypes.Register: {
      return {
        ...state,
        customer: action.payload
      };
    }
    case AuthActions.AuthActionTypes.RegisterRedirect: {
      return {
        ...state,
        customer: {
          id: action.payload.id
        }
      };
    }
    case AuthActions.AuthActionTypes.RegisterFailure: {
      return {
        ...state,
        errors: action.payload.error
      };
    }
    case AuthActions.AuthActionTypes.GetCustomer: {
      return {
        ...state
      };
    }
    case AuthActions.AuthActionTypes.GetCustomerSuccess: {
      return {
        ...state,
        customer: action.payload.customer
      };
    }
    case AuthActions.AuthActionTypes.GetCustomerError: {
      return {
        ...state,
        error: action.payload
      };
    }
    default:
      return {
        ...state
      };
  }
}

export const getTrackingGuid = (state: State) => state.tracking_guid;
export const getErrors = (state: State) => state.errors;
export const getCustomer = (state: State) => state.customer;
// export const getCustomerId = (state: State) => state.customer.id;
