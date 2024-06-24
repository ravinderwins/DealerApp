export interface SnackbarMessageGroup {
  titleKey: string;
  messages: string[]
}

export interface SnackbarData {
  traceId?: string;
  title?: string;
  message?: string;
  status?: number;
  messageGroups?: SnackbarMessageGroup[];
}
