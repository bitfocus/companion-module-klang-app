import type { CompanionVariableValues } from '@companion-module/base'
import type { UiConfig } from './config.js'
import type { UiActionSchemas } from './actions.js'
import type { UiFeedbackSchemas } from './feedbacks.js'

export type UiSchema = {
	config: UiConfig
	actions: UiActionSchemas
	secrets: undefined
	feedbacks: UiFeedbackSchemas
	variables: CompanionVariableValues
}
