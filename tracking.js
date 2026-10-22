window.VMI_GTM_ID = "GTM-KSZNTP93";

(function () {
  var id = window.VMI_GTM_ID;
  if (!/^GTM-[A-Z0-9]+$/.test(id)) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  var script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtm.js?id=" + id;
  document.head.appendChild(script);
})();
