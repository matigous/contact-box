import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AvailableSocialNetwork, SocialNetworkType } from '../models/social-network-model';

@Injectable({
  providedIn: 'root',
})
export class SocialNetworksService {
  private readonly _apiUrl = environment.apiUrl;
  private readonly _url = this._apiUrl ? `${this._apiUrl}/social-networks` : '';
  private _availableSocialNetworksSubject = new BehaviorSubject<
    AvailableSocialNetwork[]
  >([]);
  private _localSocialNetworks!: AvailableSocialNetwork[];
  public availableSocialNetworks$ = this._availableSocialNetworksSubject.asObservable();

  constructor(private _http: HttpClient) {
    this.loadSocialNetworks();
  }

  loadSocialNetworks(): void {
    if (this._apiUrl) {
      this._http.get<AvailableSocialNetwork[]>(this._url).subscribe({
        next: (socialNetworks) =>
          this._availableSocialNetworksSubject.next(socialNetworks),
        error: (error) =>
          console.error('Erro ao carregar medias sociais da API:', error),
      });
    } else {
      console.warn('API URL não definida. Usando dados locais (mock).');

      if (!this._localSocialNetworks) {
        this._localSocialNetworks = [
          { type: SocialNetworkType.Facebook, iconUrl: 'assets/icons/facebook-50.png' },
          { type: SocialNetworkType.GitHub, iconUrl: 'assets/icons/github-50.png' },
          {
            type: SocialNetworkType.Instagram,
            iconUrl: 'assets/icons/instagram-50.png',
          },
          { type: SocialNetworkType.LinkedIn, iconUrl: 'assets/icons/linkedin-50.png' },
          { type: SocialNetworkType.Reddit, iconUrl: 'assets/icons/reddit-50.png' },
          { type: SocialNetworkType.Telegram, iconUrl: 'assets/icons/telegram-50.png' },
          { type: SocialNetworkType.WhatsApp, iconUrl: 'assets/icons/whatsapp-50.png' },
          { type: SocialNetworkType.YouTube, iconUrl: 'assets/icons/youtube-50.png' },
        ];
      }

      this._availableSocialNetworksSubject.next(this._localSocialNetworks);
    }
  }
}
