import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {GithubProvider} from './context/context';
import {Auth0Provider} from '@auth0/auth0-react'
// dev-wj1p7gkc45ttzxdz.us.auth0.com domain
// kUbWZUbnfiaaxky478HoT62qj81aeMRz client
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
    domain={'dev-wj1p7gkc45ttzxdz.us.auth0.com'}
    clientId={'tSR8xVl5mVs9GJpDNSSu8COFTX40VAXh'}
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
    >

    <GithubProvider>
    <App />
    </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>,
)
