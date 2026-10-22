window.VMI_GTM_ID = "GTM-KSZNTP93";

(function () {
  var id = window.VMI_GTM_ID;
  if (!/^GTM-[A-Z0-9]+$/.test(id)) return;
  window.dataLayer = window.dataLayer || [];
  var started = false;
  function load() {
    if (started) return;
    started = true;
    window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtm.js?id=" + id;
    document.head.appendChild(script);
  }
  var events = ["pointerdown", "keydown", "scroll", "touchstart"];
  events.forEach(function (name) {
    window.addEventListener(name, load, { once: true, passive: true });
  });
  window.addEventListener("load", function () {
    window.setTimeout(load, 8000);
  });
})();
