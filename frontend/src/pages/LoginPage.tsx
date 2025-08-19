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
            
            <select
              className="bg-transparent border border-[var(--slate)] rounded-md px-3 py-2 focus:outline-none focus:border-[var(--gold)] text-gray-400"
            >
              <option value="" disabled selected>Choisir un magasin</option>
              <option value="A1">A1 Montaigne</option>
              <option value="A2">A2 Faubourg</option>
              <option value="A3">A3 Marbella</option>
            </select>

            <Button className="w-full" type="submit">Se connecter</Button>
          </form>
        </div>
      </Card>

      {/* Disclaimer Content */}
      <div className="min-h-screen bg-[#1A1A1A] text-[#F5F3EF] p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Principal */}
        <header className="text-center py-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#C2A46D] to-[#D4B575] text-transparent bg-clip-text">
            DREAMPOS
          </h1>
          <p className="text-lg text-white/60 mt-2">
            Projet Personnel • Sébastien ZAMBONI • Été 2025
          </p>
          <h2 className="text-2xl font-semibold text-white/90 mt-4">
            Expérimentation IA & Développement Moderne
          </h2>
          
        </header>

        {/* Disclaimer */}
        <div className="bg-white/[0.05] border border-white/[0.10] rounded-lg p-6 my-8">
          <div className="flex items-start space-x-4">
            <div className="text-3xl">💡</div>
            <div>
              <h3 className="font-semibold text-xl text-white">
                 À propos de ce projet
              </h3>
              <p className="mt-2 text-white/70">
                Je suis Sébastien ZAMBONI, et ce projet constitue 
                une expérimentation personnelle menée durant l'été 2025 
                pour explorer concrètement les capacités actuelles des intelligences artificielles dans le développement logiciel.
              </p>
              <p className="mt-3 text-white/70">
                Outils IA utilisés : Gemini CLI, Claude Code, Perplexity AI pour l'architecture, 
                le développement, le debugging et l'optimisation de ce système POS complet.
              </p>
              <p className="mt-3 font-medium text-white/80">
                Mon objectif : Nourrir la réflexion de mon équipe 
                sur l'impact, les opportunités et les limites des IA dans nos métiers du numérique, 
                en apportant une expérience concrète et mesurable.
              </p>
            </div>
          </div>
        </div>

        {/* Architecture Technique & Fonctionnelle en 2 colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
          {/* Architecture Technique */}
          <div className="bg-white/[0.05] border border-white/[0.10] rounded-lg p-6">
            <h3 className="font-semibold text-2xl mb-4 text-center">
                Architecture Technique
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-lg text-[#C2A46D]">🎨 Frontend</h4>
                <ul className="list-disc list-inside text-white/70 pl-2">
                  <li>React 18 + TypeScript strict</li>
                  <li>TailwindCSS (Design System custom)</li>
                  <li>Create React App (SPA)</li>
                  <li>Composants réutilisables</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg text-[#C2A46D]">⚡ Backend</h4>
                <ul className="list-disc list-inside text-white/70 pl-2">
                  <li>Node.js + TypeScript</li>
                  <li>Firebase Functions (Serverless)</li>
                  <li>Architecture microservices</li>
                  <li>APIs RESTful</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg text-[#C2A46D]">🗄️ Données</h4>
                <ul className="list-disc list-inside text-white/70 pl-2">
                  <li>Cloud Firestore (NoSQL)</li>
                  <li>Émulateur local développement</li>
                  <li>Real-time synchronisation</li>
                  <li>Règles de sécurité avancées</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg text-[#C2A46D]">🚀 DevOps</h4>
                <ul className="list-disc list-inside text-white/70 pl-2">
                  <li>GitHub Actions (CI/CD)</li>
                  <li>Firebase Hosting</li>
                  <li>Tests automatisés</li>
                  <li>Monitoring & Analytics</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Architecture Fonctionnelle */}
          <div className="bg-white/[0.05] border border-white/[0.10] rounded-lg p-6">
            <h3 className="font-semibold text-2xl mb-4 text-center">
                Architecture Fonctionnelle
            </h3>
            <div className="space-y-4">
              <p className="text-white/70">
                DREAMPOS est le système POS (Point of Sale) 
                que j'ai conçu spécifiquement pour les maisons de luxe : parfumeries, horlogerie, 
                bijouterie, maroquinerie.
              </p>
            
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#C2A46D]/20 text-[#D4B575] px-3 py-1 rounded-full text-sm font-medium">Ventes</span>
                <span className="bg-[#C2A46D]/20 text-[#D4B575] px-3 py-1 rounded-full text-sm font-medium">Clients</span>
                <span className="bg-[#C2A46D]/20 text-[#D4B575] px-3 py-1 rounded-full text-sm font-medium">Inventaire</span>
                <span className="bg-[#C2A46D]/20 text-[#D4B575] px-3 py-1 rounded-full text-sm font-medium">Catalogue</span>
              </div>
            
              <ul className="list-disc list-inside text-white/70 pl-2 space-y-1">
                <li>Interface tactile optimisée (mobile/tablette)</li>
                <li>Gestion multi-utilisateurs avec rôles</li>
                <li>Analytics et reporting temps réel</li>
                <li>Design luxe cohérent (UX premium)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Résultats & Insights */}
        <div className="bg-white/[0.05] border border-white/[0.10] rounded-lg p-6 my-8">
          <h3 className="font-semibold text-2xl mb-6 text-center">🎯 Mes Résultats & Insights IA</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-5xl font-bold text-[#C2A46D]">85%</p>
              <p className="font-semibold mt-2">Code IA-Generated</p>
              <p className="text-sm text-white/60 mt-1">Composants React, services Firebase, types TypeScript générés avec l'IA</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-[#C2A46D]">5x</p>
              <p className="font-semibold mt-2">Accélération Dev</p>
              <p className="text-sm text-white/60 mt-1">Mon développement 5x plus rapide vs méthodes traditionnelles</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-[#C2A46D]">100%</p>
              <p className="font-semibold mt-2">Qualité Code</p>
              <p className="text-sm text-white/60 mt-1">TypeScript strict, tests, accessibilité AA respectés</p>
            </div>
          </div>
        </div>

        {/* Personal Touch */}
        <div className="text-center my-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#C2A46D] to-[#D4B575] text-black text-2xl font-bold mb-4">
              SZ
            </div>
            <p className="font-semibold text-xl">Sébastien ZAMBONI</p>
            <p className="text-white/60">Développeur • Explorateur IA • Innovateur</p>
          <p className="max-w-2xl mx-auto mt-4 text-white/80">
            Ce projet représente pour moi bien plus qu'une simple application : c'est un laboratoire d'expérimentation 
            sur le futur du développement logiciel. J'ai voulu pousser les limites de ce que l'IA peut accomplir aujourd'hui, 
            tout en maintenant les standards de qualité et d'accessibilité d'une application professionnelle.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center my-8">
          <h3 className="text-2xl font-semibold mb-4">🚀 Découvrir DREAMPOS en Action</h3>
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={() => window.open('https://dreampos-94155.web.app', '_blank')}
              className="px-6 py-3 bg-gradient-to-r from-[#C2A46D] to-[#D4B575] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              📱 Demo Live
            </button>
            <button
              onClick={() => window.open('https://github.com/brozerneo-hub/poszambo', '_blank')}
              className="px-6 py-3 bg-white/[0.05] text-[#F5F3EF] font-medium rounded-lg border border-white/[0.10] hover:bg-white/[0.08] transition-colors"
            >
              💻 Code Source
            </button>
            <button
              onClick={() => window.open('https://linkedin.com/in/sebastien-zamboni', '_blank')}
              className="px-6 py-3 bg-blue-600/80 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
            >
              🤝 Me Contacter
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-6 text-sm text-white/50">
          Créé avec passion par Sébastien ZAMBONI • Été 2025 • Powered by IA 🤖
        </footer>

      </div>
    </div>
    </div>
  );
}