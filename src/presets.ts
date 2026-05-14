import { combineRgb } from '@companion-module/base'
import type ModuleInstance from './main.js'

const COLOR_WHITE = combineRgb(255, 255, 255)
const COLOR_BLACK = combineRgb(0, 0, 0)
const COLOR_GREEN = combineRgb(0, 255, 0)
const COLOR_RED = combineRgb(255, 0, 0)
const COLOR_YELLOW = combineRgb(255, 255, 0)
const COLOR_BLUE = combineRgb(0, 0, 255)
const COLOR_PURPLE = combineRgb(255, 0, 255)
const COLOR_DARK = combineRgb(40, 40, 40)

export function UpdatePresets(self: ModuleInstance): void {
	const presets: Record<string, any> = {}

	// ─── APP – SCREEN NAVIGATION ───────────────────────────────────────────────
	presets['app_fader_view'] = {
		type: 'simple',
		name: 'Switch to Fader-View',
		style: { text: 'FADERS', size: '14', color: COLOR_WHITE, bgcolor: COLOR_DARK },
		steps: [{ down: [{ actionId: 'Actions_FaderView', options: {} }], up: [] }],
		feedbacks: [],
	}
	presets['app_group_view'] = {
		type: 'simple',
		name: 'Switch to Group-View',
		style: { text: 'GROUPS', size: '14', color: COLOR_WHITE, bgcolor: COLOR_DARK },
		steps: [{ down: [{ actionId: 'Actions_GroupView', options: {} }], up: [] }],
		feedbacks: [],
	}
	presets['app_stage_orbit'] = {
		type: 'simple',
		name: 'Switch to Stage-View (Orbit)',
		style: { text: 'STAGE\nORBIT', size: '14', color: COLOR_WHITE, bgcolor: COLOR_DARK },
		steps: [{ down: [{ actionId: 'Actions_StageViewOrbit', options: {} }], up: [] }],
		feedbacks: [],
	}
	presets['app_stage_landscape'] = {
		type: 'simple',
		name: 'Switch to Stage-View (Landscape)',
		style: { text: 'STAGE\nLAND', size: '14', color: COLOR_WHITE, bgcolor: COLOR_DARK },
		steps: [{ down: [{ actionId: 'Actions_StageViewLandscape', options: {} }], up: [] }],
		feedbacks: [],
	}
	presets['app_meters_view'] = {
		type: 'simple',
		name: 'Switch to Meters-View',
		style: { text: 'METERS', size: '14', color: COLOR_WHITE, bgcolor: COLOR_DARK },
		steps: [{ down: [{ actionId: 'Actions_MetersView', options: {} }], up: [] }],
		feedbacks: [],
	}
	presets['app_config_view'] = {
		type: 'simple',
		name: 'Switch to Config-View',
		style: { text: 'CONFIG', size: '14', color: COLOR_WHITE, bgcolor: COLOR_DARK },
		steps: [{ down: [{ actionId: 'Actions_ConfigView', options: {} }], up: [] }],
		feedbacks: [],
	}
	presets['app_no_screen'] = {
		type: 'simple',
		name: 'No Screen (Black)',
		style: { text: 'BLANK', size: '14', color: COLOR_WHITE, bgcolor: COLOR_BLACK },
		steps: [{ down: [{ actionId: 'Actions_NoScreen', options: {} }], up: [] }],
		feedbacks: [],
	}

	// ─── APP – USER NAVIGATION ─────────────────────────────────────────────────
	presets['app_next_user'] = {
		type: 'simple',
		name: 'Next User',
		style: { text: 'USER\n▶', size: 'auto', color: COLOR_WHITE, bgcolor: COLOR_DARK },
		steps: [{ down: [{ actionId: 'Actions_NextUser', options: {} }], up: [] }],
		feedbacks: [],
	}
	presets['app_prev_user'] = {
		type: 'simple',
		name: 'Previous User',
		style: { text: 'USER\n◀', size: 'auto', color: COLOR_WHITE, bgcolor: COLOR_DARK },
		steps: [{ down: [{ actionId: 'Actions_PreviousUser', options: {} }], up: [] }],
		feedbacks: [],
	}

	// ─── APP – USER MODE ───────────────────────────────────────────────────────
	for (const [label, id, color] of [
		['MUSICIAN', 10, COLOR_DARK],
		['PERSONAL', 20, COLOR_DARK],
		['SHOW', 30, COLOR_DARK],
		['ADMIN', 40, COLOR_BLUE],
	] as [string, number, number][]) {
		presets[`app_mode_${id}`] = {
			type: 'simple',
			name: `Set Mode: ${label}`,
			style: { text: `MODE\n${label}`, size: 'auto', color: COLOR_WHITE, bgcolor: color },
			steps: [{ down: [{ actionId: 'Actions_UserMode', options: { mode: id } }], up: [] }],
			feedbacks: [],
		}
	}

	// ─── APP – SNAPSHOTS ───────────────────────────────────────────────────────
	presets['app_snapshot_first'] = {
		type: 'simple',
		name: 'Fire First Snapshot',
		style: { text: 'SNAP\n⏮', size: 'auto', color: COLOR_WHITE, bgcolor: COLOR_DARK },
		steps: [{ down: [{ actionId: 'Actions_App_FirstSnapshot', options: {} }], up: [] }],
		feedbacks: [],
	}
	presets['app_snapshot_prev'] = {
		type: 'simple',
		name: 'Previous Snapshot',
		style: { text: 'SNAP\n⏪', size: 'auto', color: COLOR_WHITE, bgcolor: COLOR_DARK },
		steps: [{ down: [{ actionId: 'Actions_App_PrevSnapshot', options: {} }], up: [] }],
		feedbacks: [],
	}
	presets['app_snapshot_next'] = {
		type: 'simple',
		name: 'Next Snapshot',
		style: { text: 'SNAP\n⏩', size: 'auto', color: COLOR_WHITE, bgcolor: COLOR_DARK },
		steps: [{ down: [{ actionId: 'Actions_App_NextSnapshot', options: {} }], up: [] }],
		feedbacks: [],
	}
	presets['app_snapshot_reload'] = {
		type: 'simple',
		name: 'Reload Current Snapshot',
		style: { text: 'SNAP\n🔁', size: 'auto', color: COLOR_YELLOW, bgcolor: COLOR_DARK },
		steps: [{ down: [{ actionId: 'Actions_App_ReloadSnapshot', options: {} }], up: [] }],
		feedbacks: [],
	}
	presets['app_snapshot_update'] = {
		type: 'simple',
		name: 'Update Current Snapshot',
		style: { text: 'SNAP\n⏺', size: 'auto', color: COLOR_YELLOW, bgcolor: COLOR_DARK },
		steps: [{ down: [{ actionId: 'Actions_App_UpdateSnapshot', options: {} }], up: [] }],
		feedbacks: [],
	}
	presets['app_snapshot_by_id'] = {
		type: 'simple',
		name: 'Recall Snapshot by ID',
		style: { text: 'SNAP\nID', size: 'auto', color: COLOR_WHITE, bgcolor: COLOR_PURPLE },
		steps: [{ down: [{ actionId: 'Actions_App_RecallSnapshotByID', options: { id: 1 } }], up: [] }],
		feedbacks: [],
	}
	presets['app_snapshot_by_index'] = {
		type: 'simple',
		name: 'Recall Snapshot by Index',
		style: { text: 'SNAP\n#', size: 'auto', color: COLOR_WHITE, bgcolor: COLOR_PURPLE },
		steps: [{ down: [{ actionId: 'Actions_App_RecallSnapshotByIndex', options: { index: 1 } }], up: [] }],
		feedbacks: [],
	}

	// ─── PROCESSOR – SNAPSHOTS ─────────────────────────────────────────────────
	presets['proc_snapshot_first'] = {
		type: 'simple',
		name: 'Processor: Recall First Snapshot',
		style: { text: 'SNAP PROC\n⏮', size: 'auto', color: COLOR_WHITE, bgcolor: COLOR_DARK },
		steps: [{ down: [{ actionId: 'Actions_Proc_RecallFirst', options: {} }], up: [] }],
		feedbacks: [],
	}
	presets['proc_snapshot_prev'] = {
		type: 'simple',
		name: 'Processor: Recall Previous Snapshot',
		style: { text: 'SNAP PROC\n⏪', size: 'auto', color: COLOR_WHITE, bgcolor: COLOR_DARK },
		steps: [{ down: [{ actionId: 'Actions_Proc_RecallPrev', options: {} }], up: [] }],
		feedbacks: [],
	}
	presets['proc_snapshot_next'] = {
		type: 'simple',
		name: 'Processor: Recall Next Snapshot',
		style: { text: 'SNAP PROC\n⏩', size: 'auto', color: COLOR_WHITE, bgcolor: COLOR_DARK },
		steps: [{ down: [{ actionId: 'Actions_Proc_RecallNext', options: {} }], up: [] }],
		feedbacks: [],
	}
	presets['proc_snapshot_by_id'] = {
		type: 'simple',
		name: 'Processor: Recall Snapshot by ID',
		style: { text: 'SNAP PROC\nID', size: 'auto', color: COLOR_WHITE, bgcolor: COLOR_PURPLE },
		steps: [{ down: [{ actionId: 'Actions_Proc_RecallSnapshotByID', options: { id: 1 } }], up: [] }],
		feedbacks: [],
	}
	presets['proc_snapshot_by_index'] = {
		type: 'simple',
		name: 'Processor: Recall Snapshot by Index',
		style: { text: 'SNAP PROC\n#', size: 'auto', color: COLOR_WHITE, bgcolor: COLOR_PURPLE },
		steps: [{ down: [{ actionId: 'Actions_Proc_RecallSnapshotByIndex', options: { index: 0 } }], up: [] }],
		feedbacks: [],
	}

	// ─── PROCESSOR – CHANNEL MUTE / SOLO ──────────────────────────────────────
	presets['proc_ch_mute_on'] = {
		type: 'simple',
		name: 'Mute Channel',
		style: { text: '🔇\nMUTE', size: 'auto', color: COLOR_BLACK, bgcolor: COLOR_RED },
		steps: [{ down: [{ actionId: 'Actions_Proc_ChMute', options: { mix: 1, channel: 1, enabled: 'T' } }], up: [] }],
		feedbacks: [],
	}
	presets['proc_ch_mute_off'] = {
		type: 'simple',
		name: 'Unmute Channel',
		style: { text: '🔈\nUNMUTE', size: '14', color: COLOR_BLACK, bgcolor: COLOR_GREEN },
		steps: [{ down: [{ actionId: 'Actions_Proc_ChMute', options: { mix: 1, channel: 1, enabled: 'F' } }], up: [] }],
		feedbacks: [],
	}
	presets['proc_ch_solo_on'] = {
		type: 'simple',
		name: 'Solo Channel On',
		style: { text: 'SOLO\nON', size: 'auto', color: COLOR_BLACK, bgcolor: COLOR_YELLOW },
		steps: [{ down: [{ actionId: 'Actions_Proc_ChSolo', options: { mix: 1, channel: 1, enabled: 'T' } }], up: [] }],
		feedbacks: [],
	}
	presets['proc_ch_solo_off'] = {
		type: 'simple',
		name: 'Solo Channel Off',
		style: { text: 'SOLO\nOFF', size: 'auto', color: COLOR_WHITE, bgcolor: COLOR_DARK },
		steps: [{ down: [{ actionId: 'Actions_Proc_ChSolo', options: { mix: 1, channel: 1, enabled: 'F' } }], up: [] }],
		feedbacks: [],
	}

	// ─── PROCESSOR – GAIN ──────────────────────────────────────────────────────
	presets['proc_mix_gain'] = {
		type: 'simple',
		name: 'Set Mix Master Gain',
		style: { text: 'MIX\nGAIN', size: 'auto', color: COLOR_WHITE, bgcolor: COLOR_PURPLE },
		steps: [{ down: [{ actionId: 'Actions_Proc_MixGainDB', options: { mix: 1, gainDb: -6 } }], up: [] }],
		feedbacks: [],
	}
	presets['proc_ch_gain'] = {
		type: 'simple',
		name: 'Set Channel Gain',
		style: { text: 'CH\nGAIN', size: 'auto', color: COLOR_WHITE, bgcolor: COLOR_PURPLE },
		steps: [{ down: [{ actionId: 'Actions_Proc_ChGainDB', options: { mix: 1, channel: 1, gainDb: -6 } }], up: [] }],
		feedbacks: [],
	}
	presets['proc_mix_inc_gain'] = {
		type: 'simple',
		name: 'Adjust Mix Master Gain (Rotary)',
		style: { text: 'MIX\nVOL', size: 'auto', color: COLOR_WHITE, bgcolor: COLOR_DARK },
		steps: [
			{
				down: [],
				up: [],
				rotate_left: [{ actionId: 'Actions_Proc_MixIncGainDB', options: { mix: 1, incDb: -1 } }],
				rotate_right: [{ actionId: 'Actions_Proc_MixIncGainDB', options: { mix: 1, incDb: 1 } }],
			},
		],
		feedbacks: [],
	}
	presets['proc_ch_inc_gain'] = {
		type: 'simple',
		name: 'Adjust Channel Gain (Rotary)',
		style: { text: 'CH\nVOL', size: 'auto', color: COLOR_WHITE, bgcolor: COLOR_DARK },
		steps: [
			{
				down: [],
				up: [],
				rotate_left: [{ actionId: 'Actions_Proc_ChIncGainDB', options: { mix: 1, channel: 1, incDb: -1 } }],
				rotate_right: [{ actionId: 'Actions_Proc_ChIncGainDB', options: { mix: 1, channel: 1, incDb: 1 } }],
			},
		],
		feedbacks: [],
	}

	// ─── PROCESSOR – PLACEMENT MODE ────────────────────────────────────────────
	for (const [label, id] of [
		['Mono', 1],
		['Stereo', 2],
		['3D', 3],
		['i3D', 4],
	] as [string, number][]) {
		presets[`proc_mix_mode_${id}`] = {
			type: 'simple',
			name: `Set Mix Mode: ${label}`,
			style: { text: `MIX\n${label}`, size: 'auto', color: COLOR_WHITE, bgcolor: COLOR_DARK },
			steps: [{ down: [{ actionId: 'Actions_Proc_MixMode', options: { mix: 1, mode: id } }], up: [] }],
			feedbacks: [],
		}
		presets[`proc_ch_mode_${id}`] = {
			type: 'simple',
			name: `Set Channel Mode: ${label}`,
			style: { text: `CH\n${label}`, size: 'auto', color: COLOR_WHITE, bgcolor: COLOR_DARK },
			steps: [{ down: [{ actionId: 'Actions_Proc_ChMode', options: { mix: 1, channel: 1, mode: id } }], up: [] }],
			feedbacks: [],
		}
	}

	// ─── APP – DISPLAY MESSAGE ─────────────────────────────────────────────────
	presets['app_message'] = {
		type: 'simple',
		name: 'Send Message to All Apps',
		style: { text: 'MSG\nALL', size: 'auto', color: COLOR_WHITE, bgcolor: COLOR_PURPLE },
		steps: [{ down: [{ actionId: 'Actions_App_DisplayMessage', options: { message: 'Hello' } }], up: [] }],
		feedbacks: [],
	}

	// ─── APP – ACTION BUTTONS ──────────────────────────────────────────────────
	for (let i = 1; i <= 8; i++) {
		presets[`app_action_button_${i}`] = {
			type: 'simple',
			name: `Trigger Action Button ${i}`,
			style: { text: `ACT\n${i}`, size: 'auto', color: COLOR_WHITE, bgcolor: COLOR_DARK },
			steps: [{ down: [{ actionId: 'Actions_App_ActionButton', options: { button: i } }], up: [] }],
			feedbacks: [],
		}
	}

	const structure = [
		{
			id: 'section-app-navigation',
			name: 'App: Screen Navigation',
			definitions: [
				'app_fader_view',
				'app_group_view',
				'app_stage_orbit',
				'app_stage_landscape',
				'app_meters_view',
				'app_config_view',
				'app_no_screen',
			],
		},
		{
			id: 'section-app-users',
			name: 'App: Users & Mode',
			definitions: ['app_prev_user', 'app_next_user', 'app_mode_10', 'app_mode_20', 'app_mode_30', 'app_mode_40'],
		},
		{
			id: 'section-app-snapshots',
			name: 'App: Snapshots',
			definitions: [
				'app_snapshot_first',
				'app_snapshot_prev',
				'app_snapshot_next',
				'app_snapshot_reload',
				'app_snapshot_update',
				'app_snapshot_by_id',
				'app_snapshot_by_index',
			],
		},
		{
			id: 'section-proc-snapshots',
			name: 'Processor: Snapshots',
			definitions: [
				'proc_snapshot_first',
				'proc_snapshot_prev',
				'proc_snapshot_next',
				'proc_snapshot_by_id',
				'proc_snapshot_by_index',
			],
		},
		{
			id: 'section-proc-channel',
			name: 'Processor: Channel Control',
			definitions: [
				'proc_ch_mute_on',
				'proc_ch_mute_off',
				'proc_ch_solo_on',
				'proc_ch_solo_off',
				'proc_ch_gain',
				'proc_ch_inc_gain',
				'proc_ch_mode_1',
				'proc_ch_mode_2',
				'proc_ch_mode_3',
				'proc_ch_mode_4',
			],
		},
		{
			id: 'section-proc-mix',
			name: 'Processor: Mix Control',
			definitions: [
				'proc_mix_gain',
				'proc_mix_inc_gain',
				'proc_mix_mode_1',
				'proc_mix_mode_2',
				'proc_mix_mode_3',
				'proc_mix_mode_4',
			],
		},
		{
			id: 'section-app-misc',
			name: 'App: Misc',
			definitions: ['app_message'],
		},
	]

	self.setPresetDefinitions(structure, presets)
}
