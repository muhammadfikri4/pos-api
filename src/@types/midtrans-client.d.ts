declare module 'midtrans-client' {
  export interface SnapOptions {
    isProduction: boolean;
    serverKey: string;
    clientKey: string;
  }

  export class Snap {
    constructor(options: SnapOptions);
    createTransaction(parameter: object): Promise<any>;
    createTransactionToken(parameter: object): Promise<string>;
  }

  export interface CoreApiOptions {
    isProduction: boolean;
    serverKey: string;
    clientKey: string;
  }

  export class CoreApi {
    constructor(options: CoreApiOptions);
    charge(parameter: object): Promise<any>;
    capture(parameter: object): Promise<any>;
    transaction: {
      status(orderId: string): Promise<any>;
      approve(orderId: string): Promise<any>;
      deny(orderId: string): Promise<any>;
      cancel(orderId: string): Promise<any>;
      expire(orderId: string): Promise<any>;
      refund(orderId: string, parameter: object): Promise<any>;
    };
  }

  export class Iris {
    // Define methods and properties for Iris class if needed
  }

  export class MidtransError extends Error {
    httpStatusCode: number;
    ApiResponse: object;
  }
}
