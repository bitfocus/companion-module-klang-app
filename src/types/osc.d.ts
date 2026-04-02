declare module 'osc' {
	class UDPPort {
		constructor(options: { localAddress: string; localPort: number; metadata?: boolean })
		on(event: string, callback: (...args: any[]) => void): void
		open(): void
		close(): void
		send(message: { address: string; args: any[] }, host: string, port: number): void
	}
}
