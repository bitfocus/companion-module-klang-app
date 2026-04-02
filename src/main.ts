import { InstanceBase, InstanceStatus, type SomeCompanionConfigField } from '@companion-module/base'
import type { OSCResponse } from './osc.js'
import { instanceConfigFields, type UiConfig } from './config.js'
import { UpdateVariableDefinitions } from './variables.js'
import { UpdateActions } from './actions.js'
import { UpdateFeedbacks } from './feedbacks.js'
import { UpdatePresets } from './presets.js'
import { OSC } from './osc.js'

export default class ModuleInstance extends InstanceBase {
	config!: UiConfig // Setup in init()

	public OSC: OSC | null = null

	constructor(internal: unknown) {
		super(internal)
	}

	async init(config: UiConfig): Promise<void> {
		this.config = config
		this.log('info', `Welcome, Klang:App module is being initialized`)
		if (this.OSC) this.OSC.destroy()
		this.OSC = new OSC(this)
		this.updateStatus(InstanceStatus.Ok)

		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updatePresets() // export Presets
		this.updateVariableDefinitions() // export variable definitions
	}
	// When module gets deleted
	async destroy(): Promise<void> {
		this.log('debug', `Instance destroyed: ${this.id}`)
		this.OSC?.destroy()
	}

	async configUpdated(config: UiConfig): Promise<void> {
		this.log('info', 'Starting')
		this.config = config
		this.saveConfig(config)
		this.log('info', 'Updating config!')
		if (this.OSC) this.OSC.destroy()
		this.OSC = new OSC(this)
		this.updateStatus(InstanceStatus.Ok)
	}

	// Return config fields for web config
	getConfigFields(): SomeCompanionConfigField[] {
		return instanceConfigFields
	}

	updateActions(): void {
		UpdateActions(this)
	}

	updateFeedbacks(): void {
		UpdateFeedbacks(this)
	}

	updatePresets(): void {
		UpdatePresets(this)
	}

	updateVariableDefinitions(): void {}

	public InitVariables(): void {
		UpdateVariableDefinitions(this)
	}

	public UpdateVariablesValues(): void {}

	public ReceiveOSCResponse(_data: OSCResponse): void {
		this.updateStatus(InstanceStatus.Ok)
		this.updateVariableDefinitions()
	}
}
