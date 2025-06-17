import puppeteer from "puppeteer-core";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const { package: pkg, roi, breakeven, model, note } = req.body;

  if (!pkg || !roi || !breakeven || !model || !note) {
    res.status(400).json({ error: "Missing fields" });
    return;
  }

  const html = `
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Honey Signature Klarheits-PDF</title>
        <style>
          body { font-family: system-ui, sans-serif; padding: 2rem; color: #111; }
          h1 { color: #7c3aed; margin-bottom: 2rem; }
          .row { margin-bottom: 1rem; }
          strong { color: #333; }
        </style>
      </head>
      <body>
        <h1>Honey Signature Klarheits-Cockpit 🐝</h1>
        <div class="row"><strong>Paket:</strong> ${pkg}</div>
        <div class="row"><strong>Break-even:</strong> ${breakeven}</div>
        <div class="row"><strong>ROI:</strong> ${roi}</div>
        <div class="row"><strong>Modelle:</strong> ${model.join(" | ")}</div>
        <div class="row"><strong>Hinweis:</strong> ${note}</div>
        <hr style="margin-top:2rem" />
        <div style="font-size:0.8em;color:#888">Generiert durch Honey Signature GPT – Swiss Hosted</div>
      </body>
    </html>
  `;

  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox"],
      executablePath: process.env.CHROME_BIN || "/usr/bin/google-chrome",
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "load" });
    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=honey-signature.pdf");
    res.status(200).send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ error: "PDF generation failed", details: error.message });
  }
}
