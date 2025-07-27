export interface Contact {
  id: string;
  name: string;
  phone: string;
  fav: boolean;
  email?: string;
  photo?: string;
  notes?: string;
  socialNetworks?: SocialNetwork[];
}

export interface SocialNetwork {
  type: SocialNetworkType;
  url: string;
}

export enum SocialNetworkType {
  Facebook = 'Facebook',
  Instagram = 'Instagram',
  LinkedIn = 'LinkedIn',
  GitHub = 'GitHub',
  YouTube = 'YouTube',
  WhatsApp = 'WhatsApp',
  Telegram = 'Telegram',
  Reddit = 'Reddit'
}

export type DetailsModeType = 'viewing' | 'editing' | 'creating';
