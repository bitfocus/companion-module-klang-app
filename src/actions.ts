import { CompanionActionDefinition, CompanionActionDefinitions } from '@companion-module/base'
import { KlangConfig } from './config'
import { InstanceBaseExt } from './utils'

let MIX_CHOICES: { label: string; id: number }[] = []

export enum ActionId {
	Actions_ChangeUser = 'Actions_ChangeUser',
	Actions_FaderView = 'Actions_FaderView',
	Actions_GroupView = 'Actions_GroupView',
	Actions_StageViewOrbit = 'Actions_StageViewOrbit',
	Actions_StageViewLandscape = 'Actions_StageViewLandscape',
	Actions_MetersView = 'Actions_MetersView',
	Actions_ConfigView = 'Actions_ConfigView',
	Actions_UserMode = 'Actions_UserMode',
}

export function GetActions(instance: InstanceBaseExt<KlangConfig>): CompanionActionDefinitions {
	if (instance.config.type == 'vokal') {
		MIX_CHOICES = []
		for (let i = 1; i < 13; i++) {
			MIX_CHOICES.push({ label: `Mix ${i}`, id: i })
		}
	} else {
		MIX_CHOICES = []
		for (let i = 1; i < 17; i++) {
			MIX_CHOICES.push({ label: `Mix ${i}`, id: i })
		}
	}

	const actions: { [id in ActionId]: CompanionActionDefinition | undefined } = {
		[ActionId.Actions_ChangeUser]: {
			name: 'Change User (Mix)',
			options: [
				{
					label: 'Mix number',
					type: 'dropdown',
					id: 'mix',
					default: 1,
					choices: MIX_CHOICES,
				},
			],
			callback: (action): void => {
				if (instance.OSC) instance.OSC.sendCommand('/Ka/screen/user', [{ type: 'i', value: action.options.mix }])
			},
		},
		[ActionId.Actions_FaderView]: {
			name: 'Switch to Fader-View',
			options: [],
			callback: (): void => {
				if (instance.OSC) instance.OSC.sendCommand('/Ka/screen/FADERS1')
			},
		},
		[ActionId.Actions_GroupView]: {
			name: 'Switch to Group-View',
			options: [],
			callback: (): void => {
				if (instance.OSC) instance.OSC.sendCommand('/Ka/screen/FADERS2')
			},
		},
		[ActionId.Actions_StageViewOrbit]: {
			name: 'Switch to Stage-View (Orbit)',
			options: [],
			callback: (): void => {
				if (instance.OSC) instance.OSC.sendCommand('/Ka/screen/STAGE1')
			},
		},
		[ActionId.Actions_StageViewLandscape]: {
			name: 'Switch to Stage-View (Landscape)',
			options: [],
			callback: (): void => {
				if (instance.OSC) instance.OSC.sendCommand('/Ka/screen/STAGE2')
			},
		},
		[ActionId.Actions_MetersView]: {
			name: 'Switch to Meters-View',
			options: [],
			callback: (): void => {
				if (instance.OSC) instance.OSC.sendCommand('/Ka/screen/METERS')
			},
		},
		[ActionId.Actions_ConfigView]: {
			name: 'Switch to Config-View',
			options: [],
			callback: (): void => {
				if (instance.OSC) instance.OSC.sendCommand('/Ka/screen/CONFIG')
			},
		},
		[ActionId.Actions_UserMode]: {
			name: 'Change App User-Mode',
			options: [
				{
					label: 'Mode',
					type: 'dropdown',
					id: 'mode',
					default: 40,
					choices: [
						{ label: 'MUSICIAN', id: 10 },
						{ label: 'PMM', id: 20 },
						{ label: 'TECHNICIAN', id: 30 },
						{ label: 'ADMIN', id: 40 },
					],
				},
			],
			callback: (action): void => {
				if (instance.OSC) instance.OSC.sendCommand('/Ka/control/mode', [{ type: 'i', value: action.options.mode }])
			},
		},
	}

	return actions
}