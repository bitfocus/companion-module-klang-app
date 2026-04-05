import type { CompanionVariableValues } from '@companion-module/base'
import type { UiConfig } from './config.js'
import type { UiFeedbackSchemas } from './feedbacks.js'

export type UiActionSchemas = {
	// App – Screen & Navigation
	Actions_ChangeUser: { options: { mix: number } }
	Actions_NextUser: { options: object }
	Actions_PreviousUser: { options: object }
	Actions_FaderView: { options: object }
	Actions_GroupView: { options: object }
	Actions_StageViewOrbit: { options: object }
	Actions_StageViewLandscape: { options: object }
	Actions_MetersView: { options: object }
	Actions_ConfigView: { options: object }
	Actions_NoScreen: { options: object }
	Actions_UserMode: { options: { mode: number } }
	// App – Snapshots
	Actions_App_FirstSnapshot: { options: object }
	Actions_App_ReloadSnapshot: { options: object }
	Actions_App_NextSnapshot: { options: object }
	Actions_App_PrevSnapshot: { options: object }
	Actions_App_RecallSnapshotByIndex: { options: { index: number } }
	Actions_App_RecallSnapshotByID: { options: { id: number } }
	Actions_App_UpdateSnapshot: { options: object }
	// App – Display message
	Actions_App_DisplayMessage: { options: { message: string } }
	// Processor – Mix
	Actions_Proc_MixGainDB: { options: { mix: number; gainDb: number } }
	Actions_Proc_MixMode: { options: { mix: number; mode: number } }
	// Processor – Channel
	Actions_Proc_ChGainDB: { options: { mix: number; channel: number; gainDb: number } }
	Actions_Proc_ChMute: { options: { mix: number; channel: number; enabled: string } }
	Actions_Proc_ChSolo: { options: { mix: number; channel: number; enabled: string } }
	Actions_Proc_ChGroupAssign: { options: { mix: number; channel: number; group: number } }
	Actions_Proc_ChMode: { options: { mix: number; channel: number; mode: number } }
	// Processor – Snapshots
	Actions_Proc_RecallSnapshotByID: { options: { id: number } }
	Actions_Proc_RecallSnapshotByIndex: { options: { index: number } }
	Actions_Proc_RecallFirst: { options: object }
	Actions_Proc_RecallNext: { options: object }
	Actions_Proc_RecallPrev: { options: object }
}

export type UiSchema = {
	config: UiConfig
	actions: UiActionSchemas
	secrets: undefined
	feedbacks: UiFeedbackSchemas
	variables: CompanionVariableValues
}
