export interface TrickExample {
  title: string;
  description: string;
  code: string;
  result?: any;
  explanation?: string;
  tags?: string[];
}

export interface TrickSection {
  title: string;
  examples: TrickExample[];
}

export interface CopyToClipboardProps {
  text: string;
  children: React.ReactNode;
  className?: string;
}

export interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  description?: string;
  result?: any;
  explanation?: string;
}
