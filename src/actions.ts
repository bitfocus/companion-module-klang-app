import type ModuleInstance from './main.js'

let MIX_CHOICES: { label: string; id: number }[] = []

export type UiActionSchemas = {
	Actions_ChangeUser: {
		options: {
			mix: number
		}
	}
	Actions_FaderView: { options: object }
	Actions_GroupView: { options: object }
	Actions_StageViewOrbit: { options: object }
	Actions_StageViewLandscape: { options: object }
	Actions_MetersView: { options: object }
	Actions_ConfigView: { options: object }
	Actions_UserMode: {
		options: {
			mode: number
		}
	}
}

export function UpdateActions(self: ModuleInstance): void {
	if (self.config.type == 'vokal') {
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

	self.setActionDefinitions({
		Actions_ChangeUser: {
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
			callback: (action) => {
				if (self.OSC) self.OSC.sendCommand('/Ka/screen/user', [{ type: 'i', value: action.options.mix as number }])
			},
		},
		Actions_FaderView: {
			name: 'Switch to Fader-View',
			options: [],
			callback: (): void => {
				if (self.OSC) self.OSC.sendCommand('/Ka/screen/FADERS1')
			},
		},
		Actions_GroupView: {
			name: 'Switch to Group-View',
			options: [],
			callback: (): void => {
				if (self.OSC) self.OSC.sendCommand('/Ka/screen/FADERS2')
			},
		},
		Actions_StageViewOrbit: {
			name: 'Switch to Stage-View (Orbit)',
			options: [],
			callback: (): void => {
				if (self.OSC) self.OSC.sendCommand('/Ka/screen/STAGE1')
			},
		},
		Actions_StageViewLandscape: {
			name: 'Switch to Stage-View (Landscape)',
			options: [],
			callback: (): void => {
				if (self.OSC) self.OSC.sendCommand('/Ka/screen/STAGE2')
			},
		},
		Actions_MetersView: {
			name: 'Switch to Meters-View',
			options: [],
			callback: (): void => {
				if (self.OSC) self.OSC.sendCommand('/Ka/screen/METERS')
			},
		},
		Actions_ConfigView: {
			name: 'Switch to Config-View',
			options: [],
			callback: (): void => {
				if (self.OSC) self.OSC.sendCommand('/Ka/screen/CONFIG')
			},
		},
		Actions_UserMode: {
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
			callback: (action) => {
				if (self.OSC) self.OSC.sendCommand('/Ka/control/mode', [{ type: 'i', value: action.options.mode as number }])
			},
		},
	})
}
