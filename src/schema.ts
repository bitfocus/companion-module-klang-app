import type { CompanionVariableValues } from '@companion-module/base'
import type { UiConfig } from './config.js'
import type { UiFeedbackSchemas } from './feedbacks.js'

export type UiActionSchemas = {
	// App – Screen & Navigation
	Actions_ChangeUser: { options: { mix: number } }
	Actions_NextUser: { options: Record<string, never> }
	Actions_PreviousUser: { options: Record<string, never> }
	Actions_FaderView: { options: Record<string, never> }
	Actions_GroupView: { options: Record<string, never> }
	Actions_StageViewOrbit: { options: Record<string, never> }
	Actions_StageViewLandscape: { options: Record<string, never> }
	Actions_MetersView: { options: Record<string, never> }
	Actions_ConfigView: { options: Record<string, never> }
	Actions_NoScreen: { options: Record<string, never> }
	Actions_UserMode: { options: { mode: number } }
	// App – Snapshots
	Actions_App_FirstSnapshot: { options: Record<string, never> }
	Actions_App_ReloadSnapshot: { options: Record<string, never> }
	Actions_App_NextSnapshot: { options: Record<string, never> }
	Actions_App_PrevSnapshot: { options: Record<string, never> }
	Actions_App_RecallSnapshotByIndex: { options: { index: number } }
	Actions_App_RecallSnapshotByID: { options: { id: number } }
	Actions_App_UpdateSnapshot: { options: Record<string, never> }
	// App – Display message
	Actions_App_DisplayMessage: { options: { message: string } }
	// App – Action Buttons
	Actions_App_ActionButton: { options: { button: number } }
	// Processor – Mix
	Actions_Proc_MixGainDB: { options: { mix: number; gainDb: number } }
	Actions_Proc_MixIncGainDB: { options: { mix: number; incDb: number } }
	Actions_Proc_MixMode: { options: { mix: number; mode: number } }
	// Processor – Channel
	Actions_Proc_ChGainDB: { options: { mix: number; channel: number; gainDb: number } }
	Actions_Proc_ChIncGainDB: { options: { mix: number; channel: number; incDb: number } }
	Actions_Proc_ChMute: { options: { mix: number; channel: number; enabled: string } }
	Actions_Proc_ChSolo: { options: { mix: number; channel: number; enabled: string } }
	Actions_Proc_ChGroupAssign: { options: { mix: number; channel: number; group: number } }
	Actions_Proc_ChMode: { options: { mix: number; channel: number; mode: number } }
	// Processor – Snapshots
	Actions_Proc_RecallSnapshotByID: { options: { id: number } }
	Actions_Proc_RecallSnapshotByIndex: { options: { index: number } }
	Actions_Proc_RecallFirst: { options: Record<string, never> }
	Actions_Proc_RecallNext: { options: Record<string, never> }
	Actions_Proc_RecallPrev: { options: Record<string, never> }
}

export type UiSchema = {
	config: UiConfig
	actions: UiActionSchemas
	secrets: undefined
	feedbacks: UiFeedbackSchemas
	variables: CompanionVariableValues
}
