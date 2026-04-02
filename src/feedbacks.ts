import type ModuleInstance from './main.js'

export type UiFeedbackSchemas = object

export function UpdateFeedbacks(self: ModuleInstance): void {
	self.setFeedbackDefinitions({})
}
