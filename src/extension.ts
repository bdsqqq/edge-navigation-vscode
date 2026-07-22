import * as vscode from "vscode";

type Direction = "left" | "down" | "up" | "right";

type DirectionCommands = {
  move: string;
  edge?: string;
};

const commands: Record<Direction, DirectionCommands> = {
  left: {
    move: "workbench.action.focusLeftGroupWithoutWrap",
    edge: "workbench.action.focusAuxiliaryBar",
  },
  down: {
    move: "workbench.action.focusBelowGroupWithoutWrap",
    edge: "workbench.action.focusPanel",
  },
  up: {
    move: "workbench.action.focusAboveGroupWithoutWrap",
  },
  right: {
    move: "workbench.action.focusRightGroupWithoutWrap",
    edge: "workbench.action.focusSideBar",
  },
};

export function activate(context: vscode.ExtensionContext): void {
  for (const direction of Object.keys(commands) as Direction[]) {
    context.subscriptions.push(
      vscode.commands.registerCommand(`edgeNavigation.${direction}`, () => navigate(direction)),
    );
  }
}

async function navigate(direction: Direction): Promise<void> {
  const before = vscode.window.tabGroups.activeTabGroup.viewColumn;
  const { move, edge } = commands[direction];

  await vscode.commands.executeCommand(move);
  await new Promise((resolve) => setTimeout(resolve, 0));

  const moved = vscode.window.tabGroups.activeTabGroup.viewColumn !== before;
  if (!moved && edge) await vscode.commands.executeCommand(edge);
}

export function deactivate(): void {}
