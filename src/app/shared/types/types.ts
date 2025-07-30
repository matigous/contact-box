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

export enum SocialNetworkIcon {
  Facebook = '/assets/icons/facebook-50.png',
  Instagram = '/assets/icons/instagram-50.png',
  LinkedIn = '/assets/icons/linkedin-50.png',
  GitHub = '/assets/icons/github-50.png',
  YouTube = '/assets/icons/youtube-50.png',
  WhatsApp = '/assets/icons/whatsapp-50.png',
  Telegram = '/assets/icons/telegram-50.png',
  Reddit = '/assets/icons/reddit-50.png',
}

export enum SocialNetworkType {
  Facebook = 'Facebook',
  Instagram = 'Instagram',
  LinkedIn = 'LinkedIn',
  GitHub = 'GitHub',
  YouTube = 'YouTube',
  WhatsApp = 'WhatsApp',
  Telegram = 'Telegram',
  Reddit = 'Reddit',
}

export type DetailsModeType = 'viewing' | 'editing' | 'creating';
