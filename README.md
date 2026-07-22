# Edge Navigation

A small VSCodium extension for directional workbench focus without editor-group wraparound.

Each command first invokes VSCodium's corresponding `focus*GroupWithoutWrap` command. If no editor group exists in that direction, it reveals and focuses the adjacent workbench surface:

- left → Secondary Side Bar
- right → Primary Side Bar
- down → Panel
- up → no edge surface

Reverse movement out of those surfaces is configured with ordinary context-aware user keybindings. The extension intentionally contributes no default shortcuts.

## Compatibility

The public extension API does not expose editor-grid geometry. This extension therefore relies on VSCodium's built-in `workbench.action.focus*GroupWithoutWrap` command IDs, verified against VSCodium 1.100. These commands are implementation-level workbench commands and may require adjustment after an editor upgrade.
