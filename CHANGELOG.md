# Changelog

All notable changes to this project will be documented in this file.

## [2.2.2](https://github.com/bitfocus/companion-module-klang-app/compare/v2.1.0...v2.2.2) (2026-06-07)

### Bug Fixes

- Fix TypeScript build errors caused by `CompanionPresetDefinitions<UiSchema>` constraint mismatch — reverted to `Record<string, any>` which matches library usage
- All `options: object` schema types replaced with `options: Record<string, never>` for correct index signature compatibility

### Refactor

- `tsconfig.build.json` restored to template spec (`rootDir: ./src`, removed `baseUrl`)
- `LICENSE` title corrected to match MIT template (`MIT License`)
- `UpgradeScripts` now exported from `main.ts` as required by Companion module API
- `UiActionSchemas` moved from `actions.ts` to `schema.ts`
- Mix/channel choice arrays moved to locals inside `UpdateActions()`
- Connection status now owned by OSC socket — removed eager `updateStatus(Ok)` from `init()` and `configUpdated()`
- `sendCommand` guarded by ready flag with try/catch; errors surface via `updateStatus`

## [2.1.0](https://github.com/bitfocus/companion-module-klang-app/compare/v2.0.0...v2.1.0) (2026-04-08)

### Features

- Full KLANG processor OSC command set routed via `/Ka/ToProcessor` (mix/channel gain, mute, solo, mode, group assign, snapshots)
- Incremental gain adjustment for mix and channel with rotary encoder preset support (Stream Deck+)
- Additional KLANG:app commands (user navigation, all screen views, snapshot controls, message broadcast, user mode)
- Action button trigger (`/Ka/actionButton`) for buttons 1–8
- Added KLANG:1 / KLANG:1pro as a device option (64ch, 1 mix)
- Presets for all actions grouped by category

### Bug Fixes

- Mute and solo now correctly send OSC boolean type tags (`T`/`F`)
- Connection status now accurately reflects socket state — no longer reports Ok before UDP port is ready
- `sendCommand` guarded by ready flag with try/catch; send failures surface via `updateStatus`
- Mix and channel choices now rebuild correctly when device type is changed in config
- `UpgradeScripts` now exported from `main.ts` as required by Companion module API

### Refactor

- `UiActionSchemas` moved from `actions.ts` to `schema.ts`
- Mix/channel choice arrays moved to locals inside `UpdateActions()`
- `tsconfig.build.json` restored to template spec (`rootDir: ./src`, removed `baseUrl`)
- `LICENSE` title corrected to match MIT template

## [2.0.0](https://github.com/bitfocus/companion-module-klang-app/compare/v1.0.2...v2.0.0) (2026-04-02)

### ⚠ BREAKING CHANGES

- Migrated to Companion Module API 2.0

## [1.0.2](https://github.com/bitfocus/companion-module-klang-app/compare/v1.0.1...v1.0.2) (2025-05-26)

### Chores

- Dependency updates and CI improvements

## [1.0.1](https://github.com/bitfocus/companion-module-klang-app/compare/v1.0.0...v1.0.1) (2024-06-18)

### Bug Fixes

- Update manifest id

## [1.0.0](https://github.com/bitfocus/companion-module-klang-app/releases/tag/v1.0.0) (2024-03-03)

- Initial release with OSC actions for screen navigation, user switching and user-mode control
