export default function AdminAbo() {
  return (
    <main style={{ fontFamily: "Segoe UI", padding: "2rem", textAlign: "center" }}>
      <h1>Honey Abo verwalten</h1>
      <p>Gib deine E-Mail-Adresse ein, um dein Abo zu öffnen:</p>
      <form method="POST" action="/api/create-stripe-portal-session">
        <input type="email" name="email" placeholder="dein@email.ch" required />
        <br /><br />
        <button type="submit">Zum Kundenportal</button>
      </form>
    </main>
  );
}
