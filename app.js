// Auth0 istemcisini başlat
const auth0 = new auth0.WebAuth({
  domain: 'dev-p0wymgi3fhwrq7so.us.auth0.com',
  clientID: '7pPxKUHIVYp216k7ztPIz71Ev4C4YZas',
  redirectUri: window.location.href,
  responseType: 'token id_token',
  scope: 'openid profile email'
});

// Giriş fonksiyonu
function login() {
  auth0.authorize();
}

// Çıkış fonksiyonu
function logout() {
  localStorage.clear();
  sessionStorage.clear();
  document.getElementById("mainContent").style.display = "none";
  document.getElementById("authSection").style.display = "block";
}

// Sayfa yüklendiğinde Auth0'dan kullanıcı bilgisini al
window.addEventListener("load", () => {
  auth0.parseHash((err, authResult) => {
    if (authResult && authResult.accessToken && authResult.idToken) {
      auth0.client.userInfo(authResult.accessToken, (err, user) => {
        if (user) {
          document.getElementById("authSection").style.display = "none";
          document.getElementById("mainContent").style.display = "block";
          document.getElementById("welcomeText").innerText = `Hoş geldin, ${user.name}`;
        }
      });
    }
  });
});
