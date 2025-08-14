import { useNavigate } from "react-router-dom";
import { Button } from "../ui/components/Button";
import { Card } from "../ui/components/Card";

export default function LoginPage() {
  const navigate = useNavigate();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    // plus tard : vérifier identifiants et récupérer token
    navigate("/dashboard");
  }

  return (
    <div className="w-screen h-[100svh] flex items-center justify-center bg-[var(--bg)] px-4">
      <Card>
        <div className="w-80 flex flex-col gap-6">
          <header className="text-center">
            <h1 className="text-3xl font-serif text-[var(--gold)]">DreamPOS</h1>
            <p className="text-sm text-gray-400 mt-1">Connectez-vous à votre espace</p>
          </header>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input type="text" placeholder="Nom d’utilisateur"
              className="bg-transparent border border-[var(--slate)] rounded-md px-3 py-2 focus:outline-none focus:border-[var(--gold)]" />
            <input type="password" placeholder="Mot de passe"
              className="bg-transparent border border-[var(--slate)] rounded-md px-3 py-2 focus:outline-none focus:border-[var(--gold)]" />
            <Button className="w-full" type="submit">Se connecter</Button>
          </form>
        </div>
      </Card>
    </div>
  );
}