import type { WalkthroughSteps } from '../constants';
import { urls } from '../constants';
import type { GlCommands } from '../constants.commands';
import { GlCommand } from '../constants.commands';
import type { Source, Sources } from '../constants.telemetry';
import type { Container } from '../container';
import { command, executeCommand } from '../system/-webview/command';
import { openUrl, openWalkthrough as openWalkthroughCore } from '../system/-webview/vscode';
import { GlCommandBase } from './commandBase';

@command()
export class GetStartedCommand extends GlCommandBase {
	constructor(private readonly container: Container) {
		super(GlCommand.GetStarted);
	}

	execute(extensionIdOrsource?: Sources): void {
		// If the extensionIdOrsource is the same as the current extension, then it came from the extension content menu in the extension view, so don't pass the source
		const source = extensionIdOrsource !== this.container.context.extension.id ? undefined : extensionIdOrsource;
		openWalkthrough(this.container, source ? { source: { source: source } } : undefined);
	}
}

export interface OpenWalkthroughCommandArgs {
	step?: WalkthroughSteps | undefined;
	source?: Source;
	detail?: string | undefined;
}

@command()
export class OpenWalkthroughCommand extends GlCommandBase {
	constructor(private readonly container: Container) {
		super('gitlens.openWalkthrough');
	}

	execute(args?: OpenWalkthroughCommandArgs): void {
		openWalkthrough(this.container, args);
	}
}

function openWalkthrough(container: Container, args?: OpenWalkthroughCommandArgs) {
	if (container.telemetry.enabled) {
		container.telemetry.sendEvent('walkthrough', { step: args?.step }, args?.source);
	}

	void openWalkthroughCore(container.context.extension.id, 'welcome', args?.step, false);
}

// gitlens.openWalkthrough
@command()
export class WalkthroughOpenWalkthroughCommand extends GlCommandBase {
	constructor(private readonly container: Container) {
		super(GlCommand.WalkthroughOpenWalkthrough);
	}

	execute(): void {
		const command: GlCommands = 'gitlens.openWalkthrough';
		this.container.telemetry.sendEvent('walkthrough/action', {
			type: 'command',
			name: 'open/walkthrough',
			command: command,
		});
		executeCommand<OpenWalkthroughCommandArgs>(command, { source: { source: 'walkthrough' } });
	}
}

// gitlens.plus.upgrade
@command()
export class WalkthroughPlusUpgradeCommand extends GlCommandBase {
	constructor(private readonly container: Container) {
		super(GlCommand.WalkthroughPlusUpgrade);
	}

	execute(): void {
		const command = GlCommand.PlusUpgrade;
		this.container.telemetry.sendEvent('walkthrough/action', {
			type: 'command',
			name: 'plus/upgrade',
			command: command,
		});
		executeCommand<Source>(command, { source: 'walkthrough' });
	}
}

// https://help.gitkraken.com/gitlens/gitlens-home/
@command()
export class WalkthroughOpenHelpCenterCommand extends GlCommandBase {
	constructor(private readonly container: Container) {
		super(GlCommand.WalkthroughOpenHelpCenter);
	}

	execute(): void {
		const url = urls.helpCenter;
		this.container.telemetry.sendEvent('walkthrough/action', {
			type: 'url',
			name: 'open/help-center',
			url: url,
		});
		void openUrl(url);
	}
}

// gitlens.plus.signUp
@command()
export class WalkthroughPlusSignUpCommand extends GlCommandBase {
	constructor(private readonly container: Container) {
		super(GlCommand.WalkthroughPlusSignUp);
	}

	execute(): void {
		const command = GlCommand.PlusSignUp;
		this.container.telemetry.sendEvent('walkthrough/action', {
			type: 'command',
			name: 'plus/sign-up',
			command: command,
		});
		executeCommand<Source>(command, { source: 'walkthrough' });
	}
}

@command()
export class WalkthroughPlusReactivateCommand extends GlCommandBase {
	constructor(private readonly container: Container) {
		super(GlCommand.WalkthroughPlusReactivate);
	}

	execute(): void {
		const command = GlCommand.PlusReactivateProTrial;
		this.container.telemetry.sendEvent('walkthrough/action', {
			type: 'command',
			name: 'plus/reactivate',
			command: command,
		});
		executeCommand<Source>(command, { source: 'walkthrough' });
	}
}

// https://help.gitkraken.com/gitlens/gitlens-community-vs-gitlens-pro/
@command()
export class WalkthroughOpenCommunityVsProCommand extends GlCommandBase {
	constructor(private readonly container: Container) {
		super(GlCommand.WalkthroughOpenCommunityVsPro);
	}

	execute(): void {
		const url = urls.communityVsPro;
		this.container.telemetry.sendEvent('walkthrough/action', {
			type: 'url',
			name: 'open/help-center/community-vs-pro',
			url: url,
		});
		void openUrl(url);
	}
}

// gitlens.showGraph
@command()
export class WalkthroughShowGraphCommand extends GlCommandBase {
	constructor(private readonly container: Container) {
		super(GlCommand.WalkthroughShowGraph);
	}

	execute(): void {
		const command = GlCommand.ShowGraph;
		this.container.telemetry.sendEvent('walkthrough/action', {
			type: 'command',
			name: 'open/graph',
			command: command,
		});
		executeCommand(command);
	}
}

// workbench.view.extension.gitlensInspect
@command()
export class WalkthroughGitLensInspectCommand extends GlCommandBase {
	constructor(private readonly container: Container) {
		super(GlCommand.WalkthroughGitLensInspect);
	}

	execute(): void {
		const command = GlCommand.ShowCommitDetailsView;
		this.container.telemetry.sendEvent('walkthrough/action', {
			type: 'command',
			name: 'open/inspect',
			command: command,
		});
		executeCommand(command);
	}
}

// https://help.gitkraken.com/gitlens/gitlens-home/#interactive-code-history
@command()
export class WalkthroughOpenInteractiveCodeHistoryCommand extends GlCommandBase {
	constructor(private readonly container: Container) {
		super(GlCommand.WalkthroughOpenInteractiveCodeHistory);
	}

	execute(): void {
		const url = urls.interactiveCodeHistory;
		this.container.telemetry.sendEvent('walkthrough/action', {
			type: 'url',
			name: 'open/help-center/interactive-code-history',
			url: url,
		});
		void openUrl(url);
	}
}

// gitlens.showLaunchpad
@command()
export class WalkthroughShowLaunchpadCommand extends GlCommandBase {
	constructor(private readonly container: Container) {
		super(GlCommand.WalkthroughShowLaunchpad);
	}

	execute(): void {
		const command = GlCommand.ShowLaunchpad;
		this.container.telemetry.sendEvent('walkthrough/action', {
			type: 'command',
			name: 'open/launchpad',
			command: command,
		});
		executeCommand(command);
	}
}

// gitlens.gitCommands.worktree.create
@command()
export class WalkthroughWorktreeCreateCommand extends GlCommandBase {
	constructor(private readonly container: Container) {
		super(GlCommand.WalkthroughWorktreeCreate);
	}

	execute(): void {
		const command = GlCommand.GitCommandsWorktreeCreate;
		this.container.telemetry.sendEvent('walkthrough/action', {
			type: 'command',
			name: 'create/worktree',
			command: command,
		});
		executeCommand(command);
	}
}

@command()
export class WalkthroughOpenDevExPlatformCommand extends GlCommandBase {
	constructor(private readonly container: Container) {
		super(GlCommand.WalkthoughOpenDevExPlatform);
	}

	execute(): void {
		const url = urls.platform;
		this.container.telemetry.sendEvent('walkthrough/action', {
			type: 'url',
			name: 'open/devex-platform',
			url: url,
		});
		void openUrl(url);
	}
}

// https://help.gitkraken.com/gitlens/gitlens-home/#accelerate-pr-reviews
@command()
export class WalkthroughOpenAccelereatePrReviewsCommand extends GlCommandBase {
	constructor(private readonly container: Container) {
		super(GlCommand.WalkthroughOpenAcceleratePrReviews);
	}

	execute(): void {
		const url = urls.acceleratePrReviews;
		this.container.telemetry.sendEvent('walkthrough/action', {
			type: 'url',
			name: 'open/help-center/accelerate-pr-reviews',
			url: url,
		});
		void openUrl(url);
	}
}

// gitlens.views.drafts.focus
@command()
export class WalkthroughShowDraftsViewCommand extends GlCommandBase {
	constructor(private readonly container: Container) {
		super(GlCommand.WalkthroughShowDraftsView);
	}

	execute(): void {
		const command = GlCommand.ShowDraftsView;
		this.container.telemetry.sendEvent('walkthrough/action', {
			type: 'command',
			name: 'open/drafts',
			command: command,
		});
		executeCommand(command);
	}
}

// https://help.gitkraken.com/gitlens/gitlens-home/#streamline-collaboration
@command()
export class WalkthroughOpenStreamlineCollaboration extends GlCommandBase {
	constructor(private readonly container: Container) {
		super(GlCommand.WalkthroughOpenStreamlineCollaboration);
	}

	execute(): void {
		const url = urls.streamlineCollaboration;
		this.container.telemetry.sendEvent('walkthrough/action', {
			type: 'url',
			name: 'open/help-center/streamline-collaboration',
			url: url,
		});
		void openUrl(url);
	}
}

// gitlens.plus.cloudIntegrations.connect
@command()
export class WalkthroughConnectIntegrationsCommand extends GlCommandBase {
	constructor(private readonly container: Container) {
		super(GlCommand.WalkthroughConnectIntegrations);
	}

	execute(): void {
		const command = GlCommand.PlusConnectCloudIntegrations;
		this.container.telemetry.sendEvent('walkthrough/action', {
			type: 'command',
			name: 'connect/integrations',
			command: command,
		});
		executeCommand(command);
	}
}

// gitlens.showSettingsPage!autolinks
@command()
export class WalkthroughShowAutolinksCommand extends GlCommandBase {
	constructor(private readonly container: Container) {
		super(GlCommand.WalkthroughShowAutolinks);
	}

	execute(): void {
		const command = GlCommand.ShowSettingsPageAndJumpToAutolinks;
		this.container.telemetry.sendEvent('walkthrough/action', {
			type: 'command',
			name: 'open/autolinks',
			command: command,
		});
		executeCommand(command);
	}
}

// https://help.gitkraken.com/gitlens/gitlens-start-here/#integrations
@command()
export class WalkthroughOpenStartIntegrations extends GlCommandBase {
	constructor(private readonly container: Container) {
		super(GlCommand.WalkthroughOpenStartIntegrations);
	}

	execute(): void {
		const url = urls.startIntegrations;
		this.container.telemetry.sendEvent('walkthrough/action', {
			type: 'url',
			name: 'open/help-center/start-integrations',
			url: url,
		});
		void openUrl(url);
	}
}
