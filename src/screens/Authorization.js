import * as AuthSession from 'expo-auth-session';

const scopesArr = ['user-modify-playback-state','user-read-currently-playing','user-read-playback-state','user-library-modify',
                   'user-library-read','playlist-read-private','playlist-read-collaborative','playlist-modify-public',
                   'playlist-modify-private','user-read-recently-played','user-top-read'];
const scopes = scopesArr.join(' ');

const getAuthorizationCode = async () => {
  try {
    const clientId = '883c5df051dd4379ad76ef0bda35ba3c';
    const clientSecret = '363b947271dc476c809134aa06b94fa7';
    const autho = btoa(`${clientId}:${clientSecret}`);
    const redirectUrl = AuthSession.getRedirectUrl(); //this will be something like https://auth.expo.io/@your-username/your-app-slug
    const result = await AuthSession.startAsync({
      authUrl:
        'https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' +
        clientId +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' +
        encodeURIComponent(redirectUrl),
    })
  } catch (err) {
    console.error(err)
  }
  print(result.params.code)
  return result.params.code
}

//import {authorize, refresh} from 'react-native-app-auth';

//class AuthenticationHandler {
//  constructor() {
//    this.spotifyAuthConfig = {
//      clientId: '883c5df051dd4379ad76ef0bda35ba3c',
//      clientSecret: '363b947271dc476c809134aa06b94fa7',
//      redirectUrl: 'exp://10.180.243.93:19000/',
//      scopes: [
//        'playlist-read-private',
//        'playlist-modify-public',
//        'playlist-modify-private',
//        'user-library-read',
//        'user-library-modify',
//        'user-top-read',
//      ],
//      usePKCE: false,
//      serviceConfiguration: {
//        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
//        tokenEndpoint: 'https://accounts.spotify.com/api/token',
//      },
//    };
//  }

//  async onLogin() {
//    try {
//        console.log(this.spotifyAuthConfig)
//      const result = await authorize(this.spotifyAuthConfig);
//      alert(JSON.stringify(result));
//      return result;
//    } catch (error) {
//      console.log(JSON.stringify(error));
//    }
//  }

//  async refreshLogin(refreshToken) {
//    const result = await refresh(this.spotifyAuthConfig, {
//      refreshToken: refreshToken,
//    });
//    return result;
//  }

//}

//const authHandler = new AuthenticationHandler();

//export default authHandler;
