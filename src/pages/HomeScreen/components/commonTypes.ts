export interface ChatMessageProps {
  id: string;
  prompt: string;
  response: string | React.ReactNode;
  showSuggestions: boolean;
  isCommentary: boolean;
}
