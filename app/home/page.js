// app/embedded/page.js
"use client";

import { useEffect, useState } from "react";

export default function EmbeddedPage() {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    // Fetch the HTML file from the public folder
    fetch("/homepage/index.html")
      .then((response) => response.text())
      .then((html) => setHtmlContent(html));

    // Load the external JavaScript file
    const script = document.createElement("script");
    script.src = "/homepage/script.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* Link the CSS file */}
      <style>{`@import url('/homepage/style.css');`}</style>
      {/* Render the HTML content */}
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}
