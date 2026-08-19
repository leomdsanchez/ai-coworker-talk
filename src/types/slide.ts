export type Pillar = {
  title: string
}

export type CopyLinkAction = {
  label: string
  hash: string
}

export type CopyTextAction = {
  label: string
  content: string
  successLabel?: string
}

export type ExternalLinkAction = {
  label: string
  url?: string
  unavailableLabel?: string
}

export type ComparisonColumn = {
  label: string
  title: string
  items: readonly string[]
  footer: string
  tone?: 'accent' | 'neutral'
}

export type ReferenceLink = {
  name: string
  url: string
  focus: string
  description: string
}

export type SlideIcon =
  | 'message'
  | 'task'
  | 'agent'
  | 'network'
  | 'brain'
  | 'machine'
  | 'target'
  | 'instructions'
  | 'skill'
  | 'tool'
  | 'plug'
  | 'package'
  | 'trigger'
  | 'approval'
  | 'inbox'
  | 'search'
  | 'mail'
  | 'download'
  | 'draft'
  | 'tag'
  | 'script'

export type ConceptCard = {
  label?: string
  title: string
  description?: string
  prompt?: string
  icon: SlideIcon
}

export type CycleStep = {
  title: string
  description: string
}

export type ConnectorMessage = {
  role: 'agent' | 'connector'
  label: string
  mention?: string
  text: string
  items?: readonly string[]
  details?: readonly {
    label: string
    value: string
  }[]
}

export type Slide = {
  id: string
  eyebrow: string
  title: string
  subtitle?: string
  time: string
  density?: 'compact'
  kind: 'cover' | 'statement' | 'bullets' | 'pillars' | 'case' | 'practice' | 'briefing' | 'comparison' | 'resources' | 'concept-grid' | 'agent-comparison' | 'agent-cycle' | 'agent-environment' | 'connector-map' | 'connector-chat' | 'tool-grid' | 'skill-process' | 'plugin-bundle' | 'machine-overview' | 'machine-roadmap' | 'prompt-library'
  bullets?: readonly string[]
  highlight?: string
  icon?: SlideIcon
  diagram?: readonly string[]
  chat?: readonly ConnectorMessage[]
  pillars?: readonly Pillar[]
  comparison?: readonly [ComparisonColumn, ComparisonColumn]
  references?: readonly ReferenceLink[]
  cards?: readonly ConceptCard[]
  steps?: readonly CycleStep[]
  copyLink?: CopyLinkAction
  copyText?: CopyTextAction
  externalLink?: ExternalLinkAction
}

export type SlideDeck = readonly [Slide, ...Slide[]]
