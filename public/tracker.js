(function () {
  const VISIT_KEY = "visit_recorded_date";
  const today = new Date().toISOString().split("T")[0];
  const lastVisit = localStorage.getItem(VISIT_KEY);

  if (lastVisit !== today) {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: window.location.href,
        referrer: document.referrer || "",
        ua: navigator.userAgent,
        language: navigator.language,
        viewport:
          (window.innerWidth || screen.width) +
          "x" +
          (window.innerHeight || screen.height),
        timestamp: new Date().toISOString(),
      }),
    });

    console.log("Tracked visit on:", today);

    localStorage.setItem(VISIT_KEY, today);
  }
})();
