import React from 'react';
import { Phone, ExternalLink, ArrowLeft } from 'lucide-react';
import Header from './ui/Header';
import Card from './ui/Card';
import Button from './ui/Button';

interface ContactRedirectProps {
  type: 'voyage' | 'habitation';
  onNavigate: (screen: string) => void;
}

export default function ContactRedirect({ type, onNavigate }: ContactRedirectProps) {
  const getTitle = () => {
    return type === 'voyage' ? 'Assurance Voyage' : 'Assurance Habitation';
  };

  const getIcon = () => {
    return type === 'voyage' ? '✈️' : '🏠';
  };

  const getDescription = () => {
    return type === 'voyage' 
      ? 'Voyagez en toute sérénité avec notre protection complète'
      : 'Protégez votre domicile et vos biens personnels';
  };

  const phoneNumber = '+225 XX XX XX XX XX';

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Bonjour, je suis intéressé(e) par l'assurance ${type}. Pouvez-vous me donner plus d'informations ?`);
    window.open(`https://wa.me/${phoneNumber.replace(/\s/g, '')}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100">
      <Header 
        title={getTitle()} 
        onBack={() => onNavigate('dashboard')} 
        showProfile={false} 
      />
      
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{getIcon()}</div>
          <h2 className="text-3xl font-bold text-secondary-800 mb-4">
            {getTitle()}
          </h2>
          <p className="text-secondary-600 text-lg">
            {getDescription()}
          </p>
        </div>

        <Card className="p-8 text-center">
          <div className="mb-8">
            <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <Phone className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-2xl font-bold text-secondary-800 mb-4">
              Contactez notre équipe spécialisée
            </h3>
            <p className="text-secondary-600 mb-6">
              Pour souscrire à votre assurance {type}, notre équipe d'experts est disponible 
              pour vous accompagner et vous proposer la meilleure offre adaptée à vos besoins.
            </p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleCall}
              className="w-full flex items-center justify-center gap-3"
              size="lg"
            >
              <Phone className="h-5 w-5" />
              Appeler maintenant
              <span className="font-mono text-sm">{phoneNumber}</span>
            </Button>

            <Button
              onClick={handleWhatsApp}
              variant="secondary"
              className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white"
              size="lg"
            >
              <span className="text-lg">📱</span>
              Contacter via WhatsApp
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t border-secondary-200">
            <h4 className="font-semibold text-secondary-800 mb-4">
              Informations disponibles
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-secondary-600">
              <div className="text-left">
                <p>• Devis personnalisé gratuit</p>
                <p>• Conseils d'experts</p>
                <p>• Souscription simplifiée</p>
              </div>
              <div className="text-left">
                <p>• Tarifs préférentiels</p>
                <p>• Couverture complète</p>
                <p>• Service client dédié</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-xs text-secondary-500">
              Horaires: Lundi - Vendredi | 8h00 - 18h00<br />
              Samedi | 8h00 - 13h00
            </p>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <Button
            variant="outline"
            onClick={() => onNavigate('dashboard')}
            className="inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au tableau de bord
          </Button>
        </div>
      </main>
    </div>
  );
}