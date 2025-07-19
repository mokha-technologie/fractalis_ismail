import React from 'react';
import { Car, Plane, Home, GraduationCap, AlertTriangle, MessageSquare } from 'lucide-react';
import Header from '../ui/Header';
import Card from '../ui/Card';

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

interface InsuranceModule {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  screen: string;
}

const modules: InsuranceModule[] = [
  {
    id: 'auto',
    title: 'Assurance Automobile',
    description: 'Protection complète pour votre véhicule',
    icon: <Car className="h-8 w-8" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    screen: 'car-insurance',
  },
  {
    id: 'travel',
    title: 'Assurance Voyage',
    description: 'Voyagez en toute sérénité',
    icon: <Plane className="h-8 w-8" />,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    screen: 'travel-insurance',
  },
  {
    id: 'home',
    title: 'Assurance Habitation',
    description: 'Protégez votre domicile',
    icon: <Home className="h-8 w-8" />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    screen: 'home-insurance',
  },
  {
    id: 'education',
    title: 'Assurance Éducation',
    description: 'Investissez dans l\'avenir',
    icon: <GraduationCap className="h-8 w-8" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    screen: 'education-insurance',
  },
  {
    id: 'claims',
    title: 'Sinistres',
    description: 'Déclarez un sinistre',
    icon: <AlertTriangle className="h-8 w-8" />,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    screen: 'claims',
  },
  {
    id: 'complaints',
    title: 'Plaintes',
    description: 'Exprimez vos préoccupations',
    icon: <MessageSquare className="h-8 w-8" />,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    screen: 'complaints',
  },
];

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100">
      <Header title="Tableau de Bord" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-secondary-800 mb-2">
            Bienvenue sur FRACTALIS
          </h2>
          <p className="text-secondary-600 text-lg">
            Choisissez le service qui vous intéresse
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <Card
              key={module.id}
              hover
              onClick={() => onNavigate(module.screen)}
              className="p-6 group animate-fade-in"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl ${module.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  <div className={module.color}>
                    {module.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-secondary-800 mb-2 group-hover:text-primary-600 transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-secondary-600 text-sm leading-relaxed">
                    {module.description}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-secondary-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-secondary-500">
                    Cliquez pour accéder
                  </span>
                  <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce-subtle"></div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-secondary-800 mb-6">Actions Rapides</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h4 className="text-lg font-semibold text-secondary-800 mb-2">Mes Contrats</h4>
              <p className="text-secondary-600 text-sm mb-4">
                Consultez l'historique de vos souscriptions
              </p>
              <button className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors">
                Voir mes contrats →
              </button>
            </Card>
            
            <Card className="p-6">
              <h4 className="text-lg font-semibold text-secondary-800 mb-2">Support Client</h4>
              <p className="text-secondary-600 text-sm mb-4">
                Besoin d'aide ? Contactez notre équipe
              </p>
              <button className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors">
                Nous contacter →
              </button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}