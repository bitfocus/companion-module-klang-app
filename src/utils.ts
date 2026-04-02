import { InstanceBase } from '@companion-module/base'
import { OSCResponse } from './osc.js'

export interface InstanceBaseExt<TConfig> extends InstanceBase {
	config: TConfig
	OSC: any

	InitVariables(): void
	UpdateVariablesValues(): void
	ReceiveOSCResponse(data: OSCResponse): void
}
