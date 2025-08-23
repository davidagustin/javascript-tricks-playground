export interface CodeBlockProps {
  title: string;
  description?: string;
  code: string;
  language?: string;
  result?: any;
  explanation?: string;
  category?: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export interface TrickExample {
  title: string;
  description: string;
  code: string;
  language?: string;
  result?: any;
  explanation?: string;
  category: string;
  id: string;
}

export interface FavoriteTrick {
  id: string;
  title: string;
  category: string;
  code: string;
  addedAt: number;
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
