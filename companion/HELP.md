# KLANG:app

This module controls [KLANG:app](https://www.klang.com/product/klangapp/) and connected KLANG immersive in-ear mixing processors via OSC over UDP.

## Configuration

| Field            | Description                                                                                                                 |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **IP Address**   | The IP address of the machine running KLANG:app                                                                             |
| **Sending Port** | The UDP port KLANG:app listens on (default: `9111`)                                                                         |
| **Device Type**  | Select your KLANG processor model (KLANG:vokal, KLANG:konductor, or DMI-KLANG). This affects the number of available mixes. |

## How it works

Commands targeting the **KLANG:app** (screen navigation, user switching, snapshots via app) are sent directly to KLANG:app on port `9111`.

Commands targeting the **KLANG processor** (channel gain, mute, solo, placement, snapshots) are forwarded through KLANG:app using the `/Ka/ToProcessor` prefix. This means KLANG:app must be connected to the processor for these commands to take effect.

## Actions

### App – Screen Navigation

Switch between the Fader, Group, Stage (Orbit/Landscape), Meters, Config, and Channel Details views in KLANG:app.

### App – Users & Mode

Change the active mix/user, navigate to the next or previous user, and set the app user mode (Musician, Personal, Show, Admin).

### App – Snapshots

Fire, reload, recall, and update snapshots via KLANG:app. KLANG:app must be in Admin mode to trigger processor snapshot changes.

### Processor – Mix

Set the master gain (dB) or placement mode (Mono/Stereo/3D/i3D) for a mix.

### Processor – Channel

Set channel gain (dB), mute, solo, mode, and group assignment per mix and channel.

### Processor – Gain Adjust (Rotary)

Incrementally adjust mix or channel gain by a relative dB value. Use the included rotary presets for Stream Deck+ dial control.

### Processor – Snapshots

Recall snapshots by ID or index, navigate first/next/previous, and update snapshots directly on the processor.

## Presets

Ready-made button presets are included for all major actions. Presets marked in **purple** require you to configure the mix, channel, or ID after dragging them onto a button.

Rotary encoder presets for gain control are included and work out of the box on the Stream Deck+.

## Notes

- The KLANG processor listens on port `9110`. This module communicates with KLANG:app on port `9111`, which forwards processor commands internally.
- KLANG:app must be running and connected to the processor for processor commands to work.
- For snapshot commands to affect the processor, KLANG:app must be in **Admin mode**.
