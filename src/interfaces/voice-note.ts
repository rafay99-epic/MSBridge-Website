export interface VoiceNote {
  audioUrl: string;
  createdAt: string | Date;
  description: string;
  duration: number;
  fileSize: number;
  ownerEmail: string;
  ownerUid: string;
  shareId: string;
  shareUrl: string;
  title: string;
  updatedAt: string | Date;
  viewOnly: boolean;
  voiceNoteId: string;
}

export interface VoiceNoteResponse {
  title: string;
  description: string;
  audioUrl: string;
  duration: number;
  fileSize: number;
  createdAt: number;
  updatedAt: number;
  ownerEmail: string;
  viewOnly: boolean;
}
