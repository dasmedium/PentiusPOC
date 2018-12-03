export interface Customer {
  id?: number | null;
  firstName: string;
  lastName: string;
  email: string;
  zipCode: number;
  tracking_guid?: string;
}

export class Customer {
  constructor(public customer: Customer) {}
}

// Some utils that might be needed later - inspired from https://blog.angularindepth.com/rxjs-how-to-use-type-guards-with-observables-11cc4d4f380f
export function typeGuard<T, R extends T>(
  r: (value: T) => value is R,
  message?: string
): (value: T) => R {
  return value => {
    if (r(value)) {
      return value;
    }
    throw new Error(message || "Guard rejection");
  };
}

export function isCustomer(value: any): value is Customer {
  return (
    value &&
    typeof value.id === "number" &&
    typeof value.firstName === "string" &&
    typeof value.lastName === "string" &&
    typeof value.email === "string" &&
    typeof value.ziCode === "number" &&
    typeof value.guid === "string"
  );
}
