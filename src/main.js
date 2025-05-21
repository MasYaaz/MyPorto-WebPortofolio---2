import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

const app = mount(App, {
  target: document.getElementById('app'),
})

export default app

function updateFavicon() {
  const favicon = document.getElementById("favicon");
  if (favicon instanceof HTMLLinkElement) {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    if (darkModeMediaQuery.matches) {
      favicon.href = "./dark-theme.svg";
    } else {
      favicon.href = "./light-theme.svg";
    }
  }
}
// Panggil fungsi saat halaman dimuat
updateFavicon();
// Tambahkan event listener untuk mendeteksi perubahan tema
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", updateFavicon);