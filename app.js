document.addEventListener("DOMContentLoaded", function () {
  const auth0Client = new auth0.WebAuth({
    domain: 'dev-p0wymgi3fhwrq7so.us.auth0.com',
    clientID: '7pPxKUHIVYp216k7ztPIz71Ev4C4YZas',
    redirectUri: window.location.href,
    responseType: 'token id_token',
    scope: 'openid profile email'
  });

  window.login = function () {
    auth0Client.authorize();
  };

  window.logout = function () {
    localStorage.clear();
    sessionStorage.clear();
    document.getElementById("mainContent").style.display = "none";
    document.getElementById("authSection").style.display = "block";
  };

  auth0Client.parseHash((err, authResult) => {
    if (authResult && authResult.accessToken && authResult.idToken) {
      auth0Client.client.userInfo(authResult.accessToken, (err, user) => {
        if (user) {
          document.getElementById("authSection").style.display = "none";
          document.getElementById("mainContent").style.display = "block";
          document.getElementById("welcomeText").innerText = `Hoş geldin, ${user.name}`;
        }
      });
    }
  });
});
