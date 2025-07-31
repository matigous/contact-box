import { SocialNetwork, SocialNetworkType } from './social-network-model';

export type DetailsModeType = 'viewing' | 'editing' | 'creating';

export class Contact {
  public id: string;
  public name: string;
  public phone: string;
  public fav: boolean;
  public email?: string;
  public photo?: string;
  public notes?: string;
  public socialNetworks: SocialNetwork[];

  constructor(init: {
    id: string;
    name: string;
    phone: string;
    fav: boolean;
    email?: string;
    photo?: string;
    notes?: string;
    socialNetworks?: Array<{ type: SocialNetworkType; url: string }>;
  }) {
    this.id = init.id;
    this.name = init.name;
    this.phone = init.phone;
    this.fav = init.fav;
    this.email = init.email;
    this.photo = init.photo;
    this.notes = init.notes;
    this.socialNetworks = (init.socialNetworks || [])
      .map(sn => new SocialNetwork(sn.type, sn.url));
  }
}
