declare module 'escpos' {
    class Bluetooth {
        constructor(address: string, channel: number);
        open(callback: (error: any) => void): void;
        close(): void;
        // Add other methods and properties as necessary
    }

    class Printer {
        constructor(device: any, options?: any);
        font(type: string): this;
        align(type: string): this;
        style(type: string): this;
        size(width: number, height: number): this;
        text(content: string): this;
        cut(): this;
        close(): void;
        // Add other methods and properties as necessary
    }

    class USB {
        // Add constructor and other methods and properties as necessary
    }

    // Add other classes as necessary
}
