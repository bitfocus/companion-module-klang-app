import type ModuleInstance from './main.js'

export function UpdatePresets(self: ModuleInstance): void {
	const presets: Record<string, any> = {}
	const structure = [
		{
			id: 'section-main',
			name: 'Main',
			definitions: [],
		},
	]
	self.setPresetDefinitions(structure, presets)
}
