import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private playlistURL: string = '';

  constructor() {}

  setPlaylistURL(URL: string) {
    this.playlistURL = URL;
  }

  getPlaylistURL(): string {
    return this.playlistURL;
  }

  getPlaylistID(playlistURL: string): string {
    // on sépare l'URL afin de retourner uniquement l'ID de la playlist
    const urlSansPrefixe = playlistURL.replace(
      'https://open.spotify.com/playlist/',
      ''
    );
    const idQuestionMark = urlSansPrefixe.indexOf('?');

    let playlistID: string;
    if (idQuestionMark !== -1) {
      // si ? est trouvé
      playlistID = urlSansPrefixe.substring(0, idQuestionMark);
    } else {
      // si pas de ? : envoyer tout l'URL sans le prefixe
      playlistID = urlSansPrefixe;
    }
    return playlistID;
  }
}
