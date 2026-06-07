import { InstanceStatus, OSCSomeArguments } from '@companion-module/base'
import { InstanceBaseExt } from './utils.js'
import { UiConfig } from './config.js'
import osc from 'osc'

export interface OSCResponse {
	address: string
	args: {
		type: string
		value: any
	}[]
}

export class OSC {
	private readonly instance: InstanceBaseExt<UiConfig>
	private oscHost = ''
	private oscTXPort = 5000
	private oscRXPort = 8000
	private udpPort: any
	private isReady = false

	constructor(instance: InstanceBaseExt<UiConfig>) {
		this.instance = instance
		this.Connect()
	}

	public readonly destroy = (): void => {
		this.isReady = false
		if (this.udpPort) this.udpPort.close()
		return
	}

	public readonly Connect = (): void => {
		this.oscHost = this.instance.config.host || '127.0.0.1'
		this.oscTXPort = this.instance.config.tx_port || 9111
		this.isReady = false

		this.instance.updateStatus(InstanceStatus.Connecting)

		this.udpPort = new osc.UDPPort({
			localAddress: '0.0.0.0',
			localPort: this.oscRXPort,
			metadata: true,
		})

		//Listen for incoming OSC messages.
		this.udpPort.on('message', (oscMsg: OSCResponse) => {
			// this.instance.log('info', JSON.stringify(oscMsg))
			// eslint-disable-next-line  @typescript-eslint/no-floating-promises
			this.processData(oscMsg)
		})

		this.udpPort.on('error', (err: { code: string; message: string }) => {
			this.isReady = false
			this.instance.log('error', `OSC socket error: ${err.message}`)
			if (err.code === 'EADDRINUSE') {
				this.instance.updateStatus(InstanceStatus.ConnectionFailure, `Port ${this.oscRXPort} is already in use`)
			} else {
				this.instance.updateStatus(InstanceStatus.UnknownError, err.message)
			}
		})

		// Open the socket.
		this.udpPort.open()

		// When the port is ready
		this.udpPort.on('ready', () => {
			this.isReady = true
			this.instance.log('info', `Listening to Klang App on port: ${this.oscRXPort}`)
			this.instance.updateStatus(InstanceStatus.Ok)
		})

		return
	}

	private processData = async (data: OSCResponse) => {
		this.instance.ReceiveOSCResponse(data)
	}

	public readonly sendCommand = (path: string, args?: OSCSomeArguments): void => {
		if (!this.isReady) {
			this.instance.log('warn', `OSC not ready, dropping command: ${path}`)
			return
		}
		try {
			this.udpPort.send(
				{
					address: path,
					args: args ? args : [],
				},
				this.oscHost,
				this.oscTXPort,
			)
		} catch (err: any) {
			this.instance.log('error', `OSC send failed for ${path}: ${err?.message ?? err}`)
			this.instance.updateStatus(InstanceStatus.UnknownError, err?.message)
		}
	}
}
