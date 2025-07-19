import React, { useState } from 'react';
import { MessageSquare, Send, Phone } from 'lucide-react';
import Header from '../ui/Header';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface ComplaintsFormProps {
  onNavigate: (screen: string) => void;
}

interface ComplaintData {
  nom: string;
  prenom: string;
  telephone: string;
  motif: string;
  description: string;
}

export default function ComplaintsForm({ onNavigate }: ComplaintsFormProps) {
  const [formData, setFormData] = useState<ComplaintData>({
    nom: '',
    prenom: '',
    telephone: '',
    motif: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const updateFormData = (field: keyof ComplaintData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoading(false);
    setSuccess(true);
    
    setTimeout(() => {
      onNavigate('dashboard');
    }, 2000);
  };

  const isFormValid = () => {
    return formData.nom && 
           formData.prenom && 
           formData.telephone && 
           formData.motif && 
           formData.description;
  };

  const motifs = [
    'Plainte',
    'Réclamation',
    'Suggestion',
    'Demande d\'information',
    'Problème technique',
    'Service client',
  ];

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100">
        <Header title="Message envoyé" onBack={() => onNavigate('dashboard')} showProfile={false} />
        
        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <MessageSquare className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-secondary-800 mb-4">
              Message envoyé avec succès
            </h2>
            <p className="text-secondary-600 mb-8">
              Votre message a été transmis à notre équipe. Nous vous contacterons dans les plus brefs délais pour traiter votre demande.
            </p>
            <Button onClick={() => onNavigate('dashboard')} className="mx-auto">
              Retour au tableau de bord
            </Button>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100">
      <Header title="Plaintes & Réclamations" onBack={() => onNavigate('dashboard')} showProfile={false} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <MessageSquare className="h-8 w-8 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-secondary-800 mb-4">
            Exprimez vos préoccupations
          </h2>
          <p className="text-secondary-600 text-lg">
            Nous sommes à votre écoute pour améliorer nos services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire principal */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-secondary-800 mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-bold text-sm">1</span>
                    </div>
                    Vos informations
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      placeholder="Votre nom"
                      value={formData.nom}
                      onChange={(value) => updateFormData('nom', value)}
                      label="Nom"
                      required
                    />
                    <Input
                      placeholder="Votre prénom"
                      value={formData.prenom}
                      onChange={(value) => updateFormData('prenom', value)}
                      label="Prénom"
                      required
                    />
                  </div>
                  <div className="mt-6">
                    <Input
                      type="tel"
                      placeholder="+225 XX XX XX XX XX"
                      value={formData.telephone}
                      onChange={(value) => updateFormData('telephone', value)}
                      label="Numéro de téléphone"
                      icon={<Phone className="h-5 w-5" />}
                      required
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-secondary-800 mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-bold text-sm">2</span>
                    </div>
                    Votre demande
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-3">
                        Type de demande *
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {motifs.map((motif) => (
                          <button
                            key={motif}
                            type="button"
                            onClick={() => updateFormData('motif', motif)}
                            className={`p-3 rounded-xl border-2 transition-all text-center text-sm font-medium ${
                              formData.motif === motif
                                ? 'border-primary-500 bg-primary-50 text-primary-700'
                                : 'border-secondary-200 hover:border-secondary-300 text-secondary-700'
                            }`}
                          >
                            {motif}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Description de votre demande *
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => updateFormData('description', e.target.value)}
                        placeholder="Décrivez votre demande en détail. Plus vous serez précis, mieux nous pourrons vous aider..."
                        rows={8}
                        className="w-full px-4 py-3 rounded-xl border-2 border-secondary-200 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-200 transition-all resize-none"
                        required
                      />
                      <p className="text-xs text-secondary-500 mt-2">
                        Minimum 20 caractères - {formData.description.length}/500
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-8 border-t border-secondary-200">
                  <Button 
                    variant="outline" 
                    onClick={() => onNavigate('dashboard')}
                    type="button"
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    disabled={!isFormValid() || formData.description.length < 20}
                    loading={loading}
                    size="lg"
                  >
                    Envoyer le message
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* Sidebar d'information */}
          <div className="space-y-6">
            <Card className="p-6 bg-primary-50 border-primary-200">
              <h3 className="text-lg font-bold text-primary-800 mb-4">
                Temps de réponse
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-primary-700">Plainte:</span>
                  <span className="font-medium text-primary-800">24-48h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-700">Réclamation:</span>
                  <span className="font-medium text-primary-800">24h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-700">Suggestion:</span>
                  <span className="font-medium text-primary-800">3-5 jours</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-green-50 border-green-200">
              <h3 className="text-lg font-bold text-green-800 mb-4">
                Contact direct
              </h3>
              <p className="text-green-700 text-sm mb-4">
                Pour une urgence, contactez-nous directement:
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-green-700">
                  <strong>Téléphone:</strong> +227 XX XX XX XX
                </p>
                <p className="text-green-700">
                  <strong>Email:</strong> support@fractalis.ne
                </p>
                <p className="text-green-700">
                  <strong>Horaires:</strong> Lun-Ven 8h-18h
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-yellow-50 border-yellow-200">
              <h3 className="text-lg font-bold text-yellow-800 mb-3">
                Conseils
              </h3>
              <ul className="text-yellow-700 text-sm space-y-2">
                <li>• Soyez précis dans votre description</li>
                <li>• Mentionnez votre numéro de contrat si applicable</li>
                <li>• Joignez des documents si nécessaire</li>
                <li>• Vérifiez vos coordonnées</li>
              </ul>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}