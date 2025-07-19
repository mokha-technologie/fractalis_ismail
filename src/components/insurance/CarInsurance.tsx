import React, { useState } from 'react';
import { Car, ArrowRight, Check, CreditCard } from 'lucide-react';
import Header from '../ui/Header';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface CarInsuranceProps {
  onNavigate: (screen: string) => void;
}

type Step = 'comparison' | 'personal' | 'vehicle' | 'insurance' | 'summary' | 'payment';

interface FormData {
  personal: {
    nom: string;
    prenom: string;
    usage: string;
  };
  vehicle: {
    marque: string;
    modele: string;
    puissance: string;
    plaque: string;
    energie: string;
    places: string;
  };
  insurance: {
    securite: string;
    duree: string;
    dateEffet: string;
    carteGrise: File | null;
  };
  payment: {
    method: string;
  };
}

const companies = [
  {
    name: 'NSIA Assurances',
    price: '45,000',
    advantages: ['Assistance 24h/7j', 'Réparation express', 'Véhicule de remplacement'],
  },
  {
    name: 'SUNU Assurances',
    price: '42,000',
    advantages: ['Bonus fidélité', 'Extension famille', 'Service digital'],
  },
  {
    name: 'SAHAM Assurance',
    price: '48,000',
    advantages: ['Couverture étendue', 'Expert dédié', 'Indemnisation rapide'],
  },
];

export default function CarInsurance({ onNavigate }: CarInsuranceProps) {
  const [currentStep, setCurrentStep] = useState<Step>('comparison');
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    personal: { nom: '', prenom: '', usage: '' },
    vehicle: { marque: '', modele: '', puissance: '', plaque: '', energie: '', places: '' },
    insurance: { securite: '', duree: '', dateEffet: '', carteGrise: null },
    payment: { method: '' },
  });

  const updateFormData = (section: keyof FormData, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const nextStep = () => {
    const steps: Step[] = ['comparison', 'personal', 'vehicle', 'insurance', 'summary', 'payment'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const steps: Step[] = ['comparison', 'personal', 'vehicle', 'insurance', 'summary', 'payment'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const renderComparison = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-secondary-800 mb-4">
          Comparez nos offres d'assurance automobile
        </h2>
        <p className="text-secondary-600 text-lg">
          Choisissez la protection qui vous convient le mieux
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {companies.map((company) => (
          <Card
            key={company.name}
            className={`p-6 cursor-pointer transition-all duration-300 ${
              selectedCompany === company.name
                ? 'ring-4 ring-primary-200 border-primary-500'
                : 'hover:shadow-xl'
            }`}
            onClick={() => setSelectedCompany(company.name)}
          >
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-secondary-800 mb-2">
                {company.name}
              </h3>
              <div className="text-3xl font-bold text-primary-600">
                {company.price} <span className="text-lg text-secondary-600">FCFA</span>
              </div>
              <p className="text-secondary-500 text-sm">par an</p>
            </div>

            <div className="space-y-3">
              {company.advantages.map((advantage, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-secondary-700">{advantage}</span>
                </div>
              ))}
            </div>

            {selectedCompany === company.name && (
              <div className="mt-4 pt-4 border-t border-secondary-200">
                <div className="flex items-center justify-center gap-2 text-primary-600">
                  <Check className="h-5 w-5" />
                  <span className="font-medium">Sélectionné</span>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          onClick={nextStep}
          disabled={!selectedCompany}
          className="px-8"
          size="lg"
        >
          Continuer avec {selectedCompany}
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-secondary-800 mb-2">
          Informations personnelles
        </h2>
        <p className="text-secondary-600">Étape 1 sur 4</p>
      </div>

      <Card className="p-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              placeholder="Votre nom"
              value={formData.personal.nom}
              onChange={(value) => updateFormData('personal', 'nom', value)}
              label="Nom"
              required
            />
            <Input
              placeholder="Votre prénom"
              value={formData.personal.prenom}
              onChange={(value) => updateFormData('personal', 'prenom', value)}
              label="Prénom"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Usage du véhicule *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Moto', 'Voiture', 'Utilitaire'].map((usage) => (
                <button
                  key={usage}
                  type="button"
                  onClick={() => updateFormData('personal', 'usage', usage)}
                  className={`p-4 rounded-xl border-2 transition-all text-center ${
                    formData.personal.usage === usage
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-secondary-200 hover:border-secondary-300'
                  }`}
                >
                  {usage}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={prevStep}>
            Retour
          </Button>
          <Button
            onClick={nextStep}
            disabled={!formData.personal.nom || !formData.personal.prenom || !formData.personal.usage}
          >
            Suivant
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderVehicleInfo = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-secondary-800 mb-2">
          Informations du véhicule
        </h2>
        <p className="text-secondary-600">Étape 2 sur 4</p>
      </div>

      <Card className="p-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              placeholder="Toyota, Peugeot..."
              value={formData.vehicle.marque}
              onChange={(value) => updateFormData('vehicle', 'marque', value)}
              label="Marque"
              required
            />
            <Input
              placeholder="Corolla, 208..."
              value={formData.vehicle.modele}
              onChange={(value) => updateFormData('vehicle', 'modele', value)}
              label="Modèle"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              placeholder="1.6L, 2.0L..."
              value={formData.vehicle.puissance}
              onChange={(value) => updateFormData('vehicle', 'puissance', value)}
              label="Puissance"
              required
            />
            <Input
              placeholder="AA-1234-BB"
              value={formData.vehicle.plaque}
              onChange={(value) => updateFormData('vehicle', 'plaque', value)}
              label="Plaque d'immatriculation"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Type d'énergie *
              </label>
              <select
                value={formData.vehicle.energie}
                onChange={(e) => updateFormData('vehicle', 'energie', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-secondary-200 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-200"
                required
              >
                <option value="">Sélectionner</option>
                <option value="essence">Essence</option>
                <option value="diesel">Diesel</option>
                <option value="hybride">Hybride</option>
                <option value="electrique">Électrique</option>
              </select>
            </div>
            <Input
              type="number"
              placeholder="5"
              value={formData.vehicle.places}
              onChange={(value) => updateFormData('vehicle', 'places', value)}
              label="Nombre de places"
              required
            />
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={prevStep}>
            Retour
          </Button>
          <Button
            onClick={nextStep}
            disabled={!formData.vehicle.marque || !formData.vehicle.modele || !formData.vehicle.puissance || !formData.vehicle.plaque || !formData.vehicle.energie || !formData.vehicle.places}
          >
            Suivant
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderInsuranceDetails = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-secondary-800 mb-2">
          Détails de l'assurance
        </h2>
        <p className="text-secondary-600">Étape 3 sur 4</p>
      </div>

      <Card className="p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Sécurité conducteur *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Conducteur principal', 'Conducteur secondaire'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => updateFormData('insurance', 'securite', option)}
                  className={`p-4 rounded-xl border-2 transition-all text-center ${
                    formData.insurance.securite === option
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-secondary-200 hover:border-secondary-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Durée du contrat *
              </label>
              <select
                value={formData.insurance.duree}
                onChange={(e) => updateFormData('insurance', 'duree', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-secondary-200 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-200"
                required
              >
                <option value="">Sélectionner</option>
                <option value="6-mois">6 mois</option>
                <option value="1-an">1 an</option>
                <option value="2-ans">2 ans</option>
              </select>
            </div>
            <Input
              type="date"
              value={formData.insurance.dateEffet}
              onChange={(value) => updateFormData('insurance', 'dateEffet', value)}
              label="Date d'effet"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Photo de la carte grise *
            </label>
            <div className="border-2 border-dashed border-secondary-300 rounded-xl p-8 text-center hover:border-primary-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setFormData(prev => ({
                    ...prev,
                    insurance: { ...prev.insurance, carteGrise: file },
                  }));
                }}
                className="hidden"
                id="carte-grise"
              />
              <label htmlFor="carte-grise" className="cursor-pointer">
                <div className="text-secondary-600">
                  <p className="text-lg font-medium mb-2">
                    Cliquez pour télécharger
                  </p>
                  <p className="text-sm">
                    Formats acceptés: JPG, PNG (Max: 5MB)
                  </p>
                </div>
              </label>
              {formData.insurance.carteGrise && (
                <p className="mt-2 text-primary-600 font-medium">
                  ✓ {formData.insurance.carteGrise.name}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={prevStep}>
            Retour
          </Button>
          <Button
            onClick={nextStep}
            disabled={!formData.insurance.securite || !formData.insurance.duree || !formData.insurance.dateEffet || !formData.insurance.carteGrise}
          >
            Suivant
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderSummary = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-secondary-800 mb-2">
          Récapitulatif de votre souscription
        </h2>
        <p className="text-secondary-600">Étape 4 sur 4</p>
      </div>

      <Card className="p-8">
        <div className="space-y-6">
          <div className="bg-primary-50 p-6 rounded-xl">
            <h3 className="text-lg font-bold text-primary-700 mb-4">
              Compagnie sélectionnée: {selectedCompany}
            </h3>
            <p className="text-2xl font-bold text-primary-600">
              {companies.find(c => c.name === selectedCompany)?.price} FCFA
              <span className="text-sm text-secondary-600 ml-2">par an</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-secondary-800 mb-2">Informations personnelles</h4>
              <p className="text-sm text-secondary-600">
                {formData.personal.prenom} {formData.personal.nom}
              </p>
              <p className="text-sm text-secondary-600">Usage: {formData.personal.usage}</p>
            </div>
            <div>
              <h4 className="font-semibold text-secondary-800 mb-2">Véhicule</h4>
              <p className="text-sm text-secondary-600">
                {formData.vehicle.marque} {formData.vehicle.modele}
              </p>
              <p className="text-sm text-secondary-600">
                {formData.vehicle.plaque} - {formData.vehicle.energie}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-secondary-800 mb-2">Contrat</h4>
            <p className="text-sm text-secondary-600">
              Durée: {formData.insurance.duree} | Date d'effet: {formData.insurance.dateEffet}
            </p>
            <p className="text-sm text-secondary-600">
              Sécurité: {formData.insurance.securite}
            </p>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={prevStep}>
            Retour
          </Button>
          <Button onClick={nextStep}>
            Procéder au paiement
            <CreditCard className="h-5 w-5" />
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderPayment = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-secondary-800 mb-2">
          Choisissez votre mode de paiement
        </h2>
        <p className="text-secondary-600">Finalisation de votre souscription</p>
      </div>

      <Card className="p-8">
        <div className="space-y-6">
          <div className="bg-primary-50 p-6 rounded-xl text-center">
            <p className="text-lg font-medium text-secondary-700 mb-2">Montant à payer</p>
            <p className="text-3xl font-bold text-primary-600">
              {companies.find(c => c.name === selectedCompany)?.price} FCFA
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-secondary-800 mb-4">
              Modes de paiement disponibles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'airtel', name: 'Airtel Money', logo: '📱' },
                { id: 'orange', name: 'Orange Money', logo: '🟠' },
                { id: 'flooz', name: 'Flooz', logo: '💰' },
                { id: 'mynita', name: 'Mynita Amanata', logo: '💳' },
              ].map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => updateFormData('payment', 'method', method.id)}
                  className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                    formData.payment.method === method.id
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-secondary-200 hover:border-secondary-300'
                  }`}
                >
                  <span className="text-2xl">{method.logo}</span>
                  <span className="font-medium">{method.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={prevStep}>
            Retour
          </Button>
          <Button
            onClick={() => {
              // Simulate payment success
              alert('Paiement effectué avec succès! Votre contrat sera traité sous 24h.');
              onNavigate('dashboard');
            }}
            disabled={!formData.payment.method}
            className="bg-green-600 hover:bg-green-700"
          >
            Payer maintenant
            <Check className="h-5 w-5" />
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'comparison':
        return renderComparison();
      case 'personal':
        return renderPersonalInfo();
      case 'vehicle':
        return renderVehicleInfo();
      case 'insurance':
        return renderInsuranceDetails();
      case 'summary':
        return renderSummary();
      case 'payment':
        return renderPayment();
      default:
        return renderComparison();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100">
      <Header
        title="Assurance Automobile"
        onBack={() => currentStep === 'comparison' ? onNavigate('dashboard') : prevStep()}
        showProfile={false}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentStep()}
      </main>
    </div>
  );
}