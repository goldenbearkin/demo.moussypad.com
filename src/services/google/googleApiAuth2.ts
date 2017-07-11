export class GoogleApiAuth2 {
  isInitAuthenticated$(): Promise<boolean> {
    return this.onScriptLoaded$()
      .then(() => {
        return new Promise((resolve, reject) => {
          gapi.load('client:auth2',
                    () => gapi.client.init({
                        apiKey: 'AIzaSyBjvY5R6s796cDFLOGygQ9pmVIclqGkhZw',
                        discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1'],
                        clientId: '172273720339-ojr1afhroua2d9vmg2a75pvd1663lho0.apps.googleusercontent.com',
                        scope: 'profile'
                      })
                      .then(() => {
                        resolve(gapi.auth2.getAuthInstance().isSignedIn.get());
                      })
          );
        });
      });
  }

  private onScriptLoaded$(): Promise<{}> {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return new Promise((resolve, reject) => {
      script.onload = () => resolve();

      script.onerror = () => reject();
    });
  }
}