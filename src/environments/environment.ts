declare const apiKey: string;
declare const authDomain: string;
declare const projectId: string;
declare const storageBucket: string;
declare const messagingSenderId: string;
declare const appId: string;

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId
  },
};
