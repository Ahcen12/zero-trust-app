// Auth0 Ayarları
const domain = "dev-p0wymgi3fhwrq7so.us.auth0.com";
const clientId = "7pPxKUHIVYp216k7ztPIz71Ev4C4YZas";

const auth0Client = await createAuth0Client({
  domain: domain,
  client_id: clientId,
  cacheLocation: 'localstorage',
  useRefreshTokens: true
});

async function checkAuth() {
  const isAuthenticated = await auth0Client.isAuthenticated();
  if (isAuthenticated) {
    const user = await auth0Client.getUser();
    document.getElementById("authSection").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
    document.getElementById("welcomeText").innerText = `👋 Hoş geldin, ${user.name || user.email}`;
  }
}

// Giriş
async function login() {
  await auth0Client.loginWithRedirect({
    redirect_uri: window.location.origin
  });
}

// Çıkış
function logout() {
  auth0Client.logout({
    returnTo: window.location.origin
  });
}

// Not kaydet (sadece giriş yapılmışsa)
window.saveNote = function () {
  const note = document.getElementById("note").value;
  alert("Not kaydedildi:\n" + note);
};

// Sayfa yüklendiğinde callback işle
window.onload = async () => {
  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {
    await auth0Client.handleRedirectCallback();
    window.history.replaceState({}, document.title, "/");
  }
  checkAuth();
};
