declare module 'bluetooth-serial-port' {
    export class BluetoothSerialPort {
        inquire(): void;
        findSerialPortChannel(address: string, callback: (channel: number) => void): void;
        connect(address: string, channel: number, callback: () => void, errorCallback: (error: Error) => void): void;
        close(): void;
        write(buffer: Buffer, callback: (err: Error) => void): void;
        on(event: string, callback: (data: any) => void): void;
    }

    export class BluetoothSerialPortServer {
        listen(channel: number, callback: () => void, errorCallback: (error: Error) => void): void;
        close(): void;
        write(buffer: Buffer, callback: (err: Error) => void): void;
        on(event: string, callback: (data: any) => void): void;
    }
}