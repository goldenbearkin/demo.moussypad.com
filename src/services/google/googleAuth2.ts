import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

type ConfigT = {
  apiKey: string;
  discoveryDocs: string[];
  clientId: string;
  scope: string
};

type UserProfileT = {
  username: string;
  imageURL: string;
};

export class GoogleAuth2 {
  constructor(private config: ConfigT) { }

  public init$(): Observable<UserProfileT> {
    return Observable.create((observer: Observer<UserProfileT>) => {
      this.onScriptReady$()
        .switchMap(() => this.onLoaded$())
        .switchMap(() => this.clientInit$(this.config))
        .subscribe({
          next: () => {
            if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
              const profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
              const userProfile: UserProfileT = {
                username: profile.getName(),
                imageURL: profile.getImageUrl()
              };
              observer.next(userProfile);
              observer.complete();
            } else {
              observer.error(new Error('Failed to login user'));
            }
          },
          error: (err) => observer.error(err)
        });
    });
  }

  public signIn$(): Observable<UserProfileT> {
    return Observable.create((observer: Observer<UserProfileT>) => {
      gapi.auth2.getAuthInstance().signIn()
        .then(
        (googleUser: gapi.auth2.GoogleUser) => {
          const profile = googleUser.getBasicProfile();
          const userProfile: UserProfileT = {
            username: profile.getName(),
            imageURL: profile.getImageUrl()
          };
          observer.next(userProfile);
          observer.complete();
        },
        (err: Error) => observer.error(err));
    });
  }

  public signOut$(): Observable<true> {
    return Observable.create((observer: Observer<true>) => {
      gapi.auth2.getAuthInstance().signOut()
        .then(
        () => {
          observer.next(true);
          observer.complete();
        },
        (err: Error) => observer.error(err));
    });
  }

  private onScriptReady$(): Observable<true> {
    return Observable.create((observer: Observer<true>) => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        observer.next(true);
        observer.complete();
      };

      script.onerror = (err) => observer.error(err);
    });
  }

  private onLoaded$(): Observable<true> {
    return Observable.create((observer: Observer<true>) => {
      gapi.load('client:auth2', () => {
        observer.next(true);
        observer.complete();
      });
    });
  }

  private clientInit$(config: ConfigT): Observable<true> {
    return Observable.create((observer: Observer<true>) => {
      gapi.client.init(config)
        .then(() => {
          observer.next(true);
          observer.complete();
        });
    });
  }
}