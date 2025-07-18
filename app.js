// Auth0 SPA SDK'yı CDN üzerinden yükleyip Auth0 Client oluşturuyoruz
import('https://cdn.jsdelivr.net/npm/@auth0/auth0-spa-js@2.0.3').then(({ default: createAuth0Client }) => {
  createAuth0Client({
    domain: "dev-p0wymgi3fhwrq7so.us.auth0.com",
    clientId: "7pPxKUHIVYp216k7ztPIz71Ev4C4YZas",
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  }).then(auth0 => {

    // Giriş butonuna tıklanınca yönlendirme başlat
    document.getElementById("loginBtn").addEventListener("click", () => {
      auth0.loginWithRedirect();
    });

    // Auth0'dan redirect sonrası gelen token'ı yakala
    auth0.handleRedirectCallback().then(() => {
      // Login başarılıysa kullanıcı bilgilerini al
      auth0.getUser().then(user => {
        document.getElementById("authSection").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
        document.getElementById("welcomeText").innerText = `Hoş geldin, ${user.name || user.email}`;
      });
    }).catch(e => {
      // İlk girişte redirect olmadıysa bu hatayı alırsın, normaldir
      console.log("Redirect yok, normal:", e.message);
    });

    // Logout işlemi
    document.getElementById("logoutBtn").addEventListener("click", () => {
      auth0.logout({
        logoutParams: {
          returnTo: window.location.origin
        }
      });
    });

  });
});
