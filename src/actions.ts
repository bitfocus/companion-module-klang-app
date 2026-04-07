import type ModuleInstance from './main.js'

let MIX_CHOICES: { label: string; id: number }[] = []
let CHANNEL_CHOICES: { label: string; id: number }[] = []
const GROUP_CHOICES = Array.from({ length: 8 }, (_, i) => ({ label: `Group ${i + 1}`, id: i }))

function buildMixChoices(type: string): { label: string; id: number }[] {
	const max = type === 'vokal' ? 12 : 16
	return Array.from({ length: max }, (_, i) => ({ label: `Mix ${i + 1}`, id: i + 1 }))
}

function buildChannelChoices(): { label: string; id: number }[] {
	return Array.from({ length: 64 }, (_, i) => ({ label: `Channel ${i + 1}`, id: i + 1 }))
}

export function UpdateActions(self: ModuleInstance): void {
	MIX_CHOICES = buildMixChoices(self.config.type)
	CHANNEL_CHOICES = buildChannelChoices()

	const mixOption = {
		label: 'Mix number',
		type: 'dropdown' as const,
		id: 'mix',
		default: 1,
		choices: MIX_CHOICES,
	}

	const channelOption = {
		label: 'Channel number',
		type: 'dropdown' as const,
		id: 'channel',
		default: 1,
		choices: CHANNEL_CHOICES,
	}

	const boolOption = (id: string, label: string) => ({
		label,
		type: 'dropdown' as const,
		id,
		default: 'T',
		choices: [
			{ label: 'On', id: 'T' },
			{ label: 'Off', id: 'F' },
		],
	})

	const placementModeOption = {
		label: 'Placement Mode',
		type: 'dropdown' as const,
		id: 'mode',
		default: 3,
		choices: [
			{ label: 'Mono', id: 1 },
			{ label: 'Stereo', id: 2 },
			{ label: '3D', id: 3 },
			{ label: 'i3D', id: 4 },
		],
	}

	const channelModeOption = {
		label: 'Channel Mode',
		type: 'dropdown' as const,
		id: 'mode',
		default: 3,
		choices: [
			{ label: 'Mono', id: 1 },
			{ label: 'Stereo', id: 2 },
			{ label: '3D', id: 3 },
			{ label: 'i3D', id: 4 },
		],
	}

	self.setActionDefinitions({
		// ─── KLANG:APP – SCREEN & NAVIGATION ───────────────────────────────────
		Actions_ChangeUser: {
			name: 'App: Change User (Mix)',
			options: [mixOption],
			callback: (action) => {
				self.OSC?.sendCommand('/Ka/screen/user', [{ type: 'i', value: action.options.mix as number }])
			},
		},
		Actions_NextUser: {
			name: 'App: Next User',
			options: [],
			callback: () => {
				self.OSC?.sendCommand('/Ka/screen/nextUser')
			},
		},
		Actions_PreviousUser: {
			name: 'App: Previous User',
			options: [],
			callback: () => {
				self.OSC?.sendCommand('/Ka/screen/previousUser')
			},
		},
		Actions_FaderView: {
			name: 'App: Switch to Fader-View',
			options: [],
			callback: () => {
				self.OSC?.sendCommand('/Ka/screen/FADERS1')
			},
		},
		Actions_GroupView: {
			name: 'App: Switch to Group-View',
			options: [],
			callback: () => {
				self.OSC?.sendCommand('/Ka/screen/FADERS2')
			},
		},
		Actions_StageViewOrbit: {
			name: 'App: Switch to Stage-View (Orbit)',
			options: [],
			callback: () => {
				self.OSC?.sendCommand('/Ka/screen/STAGE1')
			},
		},
		Actions_StageViewLandscape: {
			name: 'App: Switch to Stage-View (Landscape)',
			options: [],
			callback: () => {
				self.OSC?.sendCommand('/Ka/screen/STAGE2')
			},
		},
		Actions_MetersView: {
			name: 'App: Switch to Meters-View',
			options: [],
			callback: () => {
				self.OSC?.sendCommand('/Ka/screen/METERS')
			},
		},
		Actions_ConfigView: {
			name: 'App: Switch to Config-View',
			options: [],
			callback: () => {
				self.OSC?.sendCommand('/Ka/screen/CONFIG')
			},
		},
		Actions_NoScreen: {
			name: 'App: No Screen (Black)',
			options: [],
			callback: () => {
				self.OSC?.sendCommand('/Ka/screen/NONE')
			},
		},
		Actions_UserMode: {
			name: 'App: Change App User-Mode',
			options: [
				{
					label: 'Mode',
					type: 'dropdown',
					id: 'mode',
					default: 40,
					choices: [
						{ label: 'Musician', id: 10 },
						{ label: 'Personal', id: 20 },
						{ label: 'Show', id: 30 },
						{ label: 'Admin', id: 40 },
					],
				},
			],
			callback: (action) => {
				self.OSC?.sendCommand('/Ka/control/mode', [{ type: 'i', value: action.options.mode as number }])
			},
		},

		// ─── KLANG:APP – SNAPSHOTS VIA APP ─────────────────────────────────────
		Actions_App_FirstSnapshot: {
			name: 'App: Fire First Snapshot',
			options: [],
			callback: () => {
				self.OSC?.sendCommand('/Ka/control/FirstSnapshot')
			},
		},
		Actions_App_ReloadSnapshot: {
			name: 'App: Reload Current Snapshot',
			options: [],
			callback: () => {
				self.OSC?.sendCommand('/Ka/control/ReloadSnapshot')
			},
		},
		Actions_App_NextSnapshot: {
			name: 'App: Fire Next Snapshot',
			options: [],
			callback: () => {
				self.OSC?.sendCommand('/Ka/control/NextSnapshot')
			},
		},
		Actions_App_PrevSnapshot: {
			name: 'App: Fire Previous Snapshot',
			options: [],
			callback: () => {
				self.OSC?.sendCommand('/Ka/control/PrevSnapshot')
			},
		},
		Actions_App_RecallSnapshotByIndex: {
			name: 'App: Recall Snapshot by Index',
			options: [{ label: 'Position in list', type: 'number', id: 'index', default: 1, min: 1, max: 999, step: 1 }],
			callback: (action) => {
				self.OSC?.sendCommand('/Ka/control/RecallSnapshotByIndex', [
					{ type: 'i', value: action.options.index as number },
				])
			},
		},
		Actions_App_RecallSnapshotByID: {
			name: 'App: Recall Snapshot by ID',
			options: [{ label: 'Snapshot ID', type: 'number', id: 'id', default: 1, min: 1, max: 9999, step: 1 }],
			callback: (action) => {
				self.OSC?.sendCommand('/Ka/control/RecallSnapshotByID', [{ type: 'i', value: action.options.id as number }])
			},
		},
		Actions_App_UpdateSnapshot: {
			name: 'App: Update Current Snapshot',
			options: [],
			callback: () => {
				self.OSC?.sendCommand('/Ka/control/UpdateSnapshot')
			},
		},

		// ─── KLANG:APP – DISPLAY MESSAGE ───────────────────────────────────────
		Actions_App_DisplayMessage: {
			name: 'App: Send a message to all apps and :kontrollers',
			options: [{ label: 'Message', type: 'textinput', id: 'message', default: 'Hello' }],
			callback: (action) => {
				self.OSC?.sendCommand('/Ka/MsgToOthers', [{ type: 's', value: action.options.message as string }])
			},
		},

		// ─── PROCESSOR – MIX MASTER ────────────────────────────────────────────
		Actions_Proc_MixGainDB: {
			name: 'Processor: Set Mix Master Gain (dB)',
			options: [
				mixOption,
				{ label: 'Gain (dB)', type: 'number', id: 'gainDb', default: 0, min: -120, max: 10, step: 1 },
			],
			callback: (action) => {
				self.OSC?.sendCommand(`/Ka/ToProcessor/Kf/ui/${action.options.mix as number}/gaindB`, [
					{ type: 'f', value: action.options.gainDb as number },
				])
			},
		},
		Actions_Proc_MixIncGainDB: {
			name: 'Processor: Adjust Mix Master Gain (dB)',
			options: [
				mixOption,
				{ label: 'Adjust (dB)', type: 'number', id: 'incDb', default: 1, min: -20, max: 20, step: 0.5 },
			],
			callback: (action) => {
				self.OSC?.sendCommand(`/Ka/ToProcessor/Kf/ui/${action.options.mix as number}/incGaindB`, [
					{ type: 'f', value: action.options.incDb as number },
				])
			},
		},
		Actions_Proc_MixMode: {
			name: 'Processor: Set Mix Placement Mode',
			options: [mixOption, placementModeOption],
			callback: (action) => {
				self.OSC?.sendCommand(`/Ka/ToProcessor/Kf/ui/${action.options.mix as number}/mode`, [
					{ type: 'i', value: action.options.mode as number },
				])
			},
		},
		// ─── PROCESSOR – CHANNEL ───────────────────────────────────────────────
		Actions_Proc_ChGainDB: {
			name: 'Processor: Set Channel Gain (dB)',
			options: [
				mixOption,
				channelOption,
				{ label: 'Gain (dB)', type: 'number', id: 'gainDb', default: 0, min: -120, max: 10, step: 1 },
			],
			callback: (action) => {
				self.OSC?.sendCommand(
					`/Ka/ToProcessor/Kf/ui/${action.options.mix as number}/ch/${action.options.channel as number}/gaindB`,
					[{ type: 'f', value: action.options.gainDb as number }],
				)
			},
		},
		Actions_Proc_ChIncGainDB: {
			name: 'Processor: Adjust Channel Gain (dB)',
			options: [
				mixOption,
				channelOption,
				{ label: 'Adjust (dB)', type: 'number', id: 'incDb', default: 1, min: -20, max: 20, step: 0.5 },
			],
			callback: (action) => {
				self.OSC?.sendCommand(
					`/Ka/ToProcessor/Kf/ui/${action.options.mix as number}/ch/${action.options.channel as number}/incGaindB`,
					[{ type: 'f', value: action.options.incDb as number }],
				)
			},
		},

		Actions_Proc_ChMute: {
			name: 'Processor: Set Channel Mute',
			options: [mixOption, channelOption, boolOption('enabled', 'Muted')],
			callback: (action) => {
				self.OSC?.sendCommand(
					`/Ka/ToProcessor/Kf/ui/${action.options.mix as number}/ch/${action.options.channel as number}/mute`,
					[{ type: action.options.enabled as 'T' | 'F' } as any],
				)
			},
		},
		Actions_Proc_ChSolo: {
			name: 'Processor: Set Channel Solo',
			options: [mixOption, channelOption, boolOption('enabled', 'Solo')],
			callback: (action) => {
				self.OSC?.sendCommand(
					`/Ka/ToProcessor/Kf/ui/${action.options.mix as number}/ch/${action.options.channel as number}/solo`,
					[{ type: action.options.enabled as 'T' | 'F' } as any],
				)
			},
		},
		Actions_Proc_ChGroupAssign: {
			name: 'Processor: Assign Channel to Group',
			options: [
				mixOption,
				channelOption,
				{ label: 'Group', type: 'dropdown', id: 'group', default: 0, choices: GROUP_CHOICES },
			],
			callback: (action) => {
				self.OSC?.sendCommand(
					`/Ka/ToProcessor/Kf/ui/${action.options.mix as number}/ch/${action.options.channel as number}/grp`,
					[{ type: 'i', value: action.options.group as number }],
				)
			},
		},
		Actions_Proc_ChMode: {
			name: 'Processor: Set Channel Mode',
			options: [mixOption, channelOption, channelModeOption],
			callback: (action) => {
				self.OSC?.sendCommand(
					`/Ka/ToProcessor/Kf/ui/${action.options.mix as number}/ch/${action.options.channel as number}/mode`,
					[{ type: 'i', value: action.options.mode as number }],
				)
			},
		},

		// ─── PROCESSOR – SNAPSHOTS ─────────────────────────────────────────────
		Actions_Proc_RecallSnapshotByID: {
			name: 'Processor: Recall Snapshot by ID',
			options: [{ label: 'Snapshot ID', type: 'number', id: 'id', default: 1, min: 1, max: 9999, step: 1 }],
			callback: (action) => {
				self.OSC?.sendCommand('/Ka/ToProcessor/Kf/co/recall', [{ type: 'i', value: action.options.id as number }])
			},
		},
		Actions_Proc_RecallSnapshotByIndex: {
			name: 'Processor: Recall Snapshot by Index',
			options: [
				{
					label: 'Position in list (Starting at 0)',
					type: 'number',
					id: 'index',
					default: 0,
					min: 0,
					max: 999,
					step: 1,
				},
			],
			callback: (action) => {
				self.OSC?.sendCommand('/Ka/ToProcessor/Kf/co/recallInd', [{ type: 'i', value: action.options.index as number }])
			},
		},
		Actions_Proc_RecallFirst: {
			name: 'Processor: Recall First Snapshot',
			options: [],
			callback: () => {
				self.OSC?.sendCommand('/Ka/ToProcessor/Kf/co/recallFirst')
			},
		},
		Actions_Proc_RecallNext: {
			name: 'Processor: Recall Next Snapshot',
			options: [],
			callback: () => {
				self.OSC?.sendCommand('/Ka/ToProcessor/Kf/co/recallNext')
			},
		},
		Actions_Proc_RecallPrev: {
			name: 'Processor: Recall Previous Snapshot',
			options: [],
			callback: () => {
				self.OSC?.sendCommand('/Ka/ToProcessor/Kf/co/recallPrev')
			},
		},
	})
}
