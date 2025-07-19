import React, { useState } from 'react';
import { GraduationCap, ArrowRight, Check, CreditCard, Clock } from 'lucide-react';
import Header from '../ui/Header';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface EducationInsuranceProps {
  onNavigate: (screen: string) => void;
}

type Step = 'subscription' | 'formula' | 'duration' | 'verification' | 'payment';

interface FormData {
  personal: {
    nom: string;
    prenom: string;
    telephone: string;
    beneficiaire: string;
  };
  contract: {
    formule: string;
    duree: string;
    paiement: string;
  };
}

const formulas = [
  {
    id: 'cuivre',
    name: 'Cuivre',
    price: '35,000',
    benefits: ['Frais de scolarité', 'Fournitures scolaires', 'Transport scolaire'],
    color: 'from-yellow-600 to-yellow-700',
    popular: false,
  },
  {
    id: 'bronze',
    name: 'Bronze',
    price: '65,000',
    benefits: ['Cuivre +', 'Activités périscolaires', 'Assurance santé étudiant'],
    color: 'from-orange-600 to-orange-700',
    popular: false,
  },
  {
    id: 'argent',
    name: 'Argent',
    price: '120,000',
    benefits: ['Bronze +', 'Cours particuliers', 'Équipement informatique'],
    color: 'from-gray-500 to-gray-600',
    popular: true,
  },
  {
    id: 'or',
    name: 'Or',
    price: '200,000',
    benefits: ['Argent +', 'Études supérieures', 'Séjours linguistiques', 'Bourse d\'excellence'],
    color: 'from-yellow-500 to-yellow-600',
    popular: false,
  },
];

const durations = [
  { id: '5', years: '5 ans', multiplier: 1 },
  { id: '10', years: '10 ans', multiplier: 1.8 },
  { id: '15', years: '15 ans', multiplier: 2.5 },
];

export default function EducationInsurance({ onNavigate }: EducationInsuranceProps) {
  const [currentStep, setCurrentStep] = useState<Step>('subscription');
  const [formData, setFormData] = useState<FormData>({
    personal: { nom: '', prenom: '', telephone: '', beneficiaire: '' },
    contract: { formule: '', duree: '', paiement: '' },
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
    const steps: Step[] = ['subscription', 'formula', 'duration', 'verification', 'payment'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const steps: Step[] = ['subscription', 'formula', 'duration', 'verification', 'payment'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const getSelectedFormula = () => formulas.find(f => f.id === formData.contract.formule);
  const getSelectedDuration = () => durations.find(d => d.id === formData.contract.duree);
  const getTotalPrice = () => {
    const formula = getSelectedFormula();
    const duration = getSelectedDuration();
    if (formula && duration) {
      return Math.round(parseInt(formula.price.replace(',', '')) * duration.multiplier);
    }
    return 0;
  };

  const renderSubscription = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-secondary-800 mb-4">
          Assurance Éducation
        </h2>
        <p className="text-secondary-600 text-lg">
          Investissez dans l'avenir de vos enfants
        </p>
      </div>

      <Card className="p-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <GraduationCap className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-secondary-800 mb-4">
            Commencer votre souscription
          </h3>
          <p className="text-secondary-600 mb-8">
            Remplissez vos informations pour débuter le processus
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              placeholder="Votre nom"
              value={formData.personal.nom}
              onChange={(value) => updateFormData('personal', 'nom', value)}
              label="Nom du souscripteur"
              required
            />
            <Input
              placeholder="Votre prénom"
              value={formData.personal.prenom}
              onChange={(value) => updateFormData('personal', 'prenom', value)}
              label="Prénom du souscripteur"
              required
            />
          </div>

          <Input
            type="tel"
            placeholder="+225 XX XX XX XX XX"
            value={formData.personal.telephone}
            onChange={(value) => updateFormData('personal', 'telephone', value)}
            label="Numéro de téléphone"
            required
          />

          <Input
            placeholder="Nom et prénom de l'enfant"
            value={formData.personal.beneficiaire}
            onChange={(value) => updateFormData('personal', 'beneficiaire', value)}
            label="Bénéficiaire (enfant)"
            required
          />
        </div>

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={() => onNavigate('dashboard')}>
            Annuler
          </Button>
          <Button
            onClick={nextStep}
            disabled={!formData.personal.nom || !formData.personal.prenom || !formData.personal.telephone || !formData.personal.beneficiaire}
          >
            Suivant
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderFormula = () => (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-secondary-800 mb-2">
          Choisissez votre formule
        </h2>
        <p className="text-secondary-600">Sélectionnez la protection adaptée à vos besoins</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {formulas.map((formula) => (
          <Card
            key={formula.id}
            className={`p-6 cursor-pointer transition-all duration-300 relative ${
              formData.contract.formule === formula.id
                ? 'ring-4 ring-primary-200 border-primary-500 scale-105'
                : 'hover:shadow-xl hover:scale-105'
            }`}
            onClick={() => updateFormData('contract', 'formule', formula.id)}
          >
            {formula.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Populaire
                </span>
              </div>
            )}

            <div className={`text-center mb-4 p-4 rounded-xl bg-gradient-to-r ${formula.color}`}>
              <h3 className="text-xl font-bold text-white mb-2">
                {formula.name}
              </h3>
              <div className="text-2xl font-bold text-white">
                {formula.price} <span className="text-sm">FCFA</span>
              </div>
              <p className="text-white/80 text-sm">par an</p>
            </div>

            <div className="space-y-3">
              {formula.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-secondary-700">{benefit}</span>
                </div>
              ))}
            </div>

            {formData.contract.formule === formula.id && (
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

      <div className="flex justify-center mt-8">
        <div className="flex gap-4">
          <Button variant="outline" onClick={prevStep}>
            Retour
          </Button>
          <Button
            onClick={nextStep}
            disabled={!formData.contract.formule}
          >
            Continuer
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderDuration = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-secondary-800 mb-2">
          Durée du contrat
        </h2>
        <p className="text-secondary-600">Plus la durée est longue, plus vous économisez</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {durations.map((duration) => {
          const formula = getSelectedFormula();
          const totalPrice = formula ? Math.round(parseInt(formula.price.replace(',', '')) * duration.multiplier) : 0;
          const savings = duration.multiplier < 2 ? Math.round((2 - duration.multiplier) * 100) : 0;

          return (
            <Card
              key={duration.id}
              className={`p-6 cursor-pointer transition-all duration-300 ${
                formData.contract.duree === duration.id
                  ? 'ring-4 ring-primary-200 border-primary-500 scale-105'
                  : 'hover:shadow-xl hover:scale-105'
              }`}
              onClick={() => updateFormData('contract', 'duree', duration.id)}
            >
              <div className="text-center">
                <div className="mb-4">
                  <Clock className="h-12 w-12 text-primary-600 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-secondary-800 mb-2">
                    {duration.years}
                  </h3>
                </div>

                <div className="mb-4">
                  <div className="text-2xl font-bold text-primary-600">
                    {totalPrice.toLocaleString()} <span className="text-sm text-secondary-600">FCFA</span>
                  </div>
                  <p className="text-secondary-500 text-sm">Total du contrat</p>
                </div>

                {savings > 0 && (
                  <div className="bg-green-50 p-3 rounded-xl mb-4">
                    <p className="text-green-700 font-medium text-sm">
                      Économie de {savings}%
                    </p>
                  </div>
                )}

                <div className="text-sm text-secondary-600">
                  <p>Paiement mensuel:</p>
                  <p className="font-medium text-secondary-800">
                    {Math.round(totalPrice / (parseInt(duration.id) * 12)).toLocaleString()} FCFA
                  </p>
                </div>

                {formData.contract.duree === duration.id && (
                  <div className="mt-4 pt-4 border-t border-secondary-200">
                    <div className="flex items-center justify-center gap-2 text-primary-600">
                      <Check className="h-5 w-5" />
                      <span className="font-medium">Sélectionné</span>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-center mt-8">
        <div className="flex gap-4">
          <Button variant="outline" onClick={prevStep}>
            Retour
          </Button>
          <Button
            onClick={nextStep}
            disabled={!formData.contract.duree}
          >
            Continuer
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderVerification = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-secondary-800 mb-2">
          Vérification des données
        </h2>
        <p className="text-secondary-600">Vérifiez les informations avant de procéder au paiement</p>
      </div>

      <Card className="p-8">
        <div className="space-y-6">
          <div className="bg-primary-50 p-6 rounded-xl">
            <h3 className="text-lg font-bold text-primary-700 mb-4">
              Résumé de votre contrat
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-secondary-600">Formule</p>
                <p className="font-semibold text-secondary-800">{getSelectedFormula()?.name}</p>
              </div>
              <div>
                <p className="text-sm text-secondary-600">Durée</p>
                <p className="font-semibold text-secondary-800">{getSelectedDuration()?.years}</p>
              </div>
              <div>
                <p className="text-sm text-secondary-600">Montant total</p>
                <p className="text-xl font-bold text-primary-600">
                  {getTotalPrice().toLocaleString()} FCFA
                </p>
              </div>
              <div>
                <p className="text-sm text-secondary-600">Paiement mensuel</p>
                <p className="font-semibold text-secondary-800">
                  {Math.round(getTotalPrice() / (parseInt(formData.contract.duree) * 12)).toLocaleString()} FCFA
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-secondary-800 mb-3">Informations personnelles</h4>
            <div className="bg-secondary-50 p-4 rounded-xl">
              <p className="text-secondary-700">
                <strong>Souscripteur:</strong> {formData.personal.prenom} {formData.personal.nom}
              </p>
              <p className="text-secondary-700">
                <strong>Téléphone:</strong> {formData.personal.telephone}
              </p>
              <p className="text-secondary-700">
                <strong>Bénéficiaire:</strong> {formData.personal.beneficiaire}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-secondary-800 mb-3">Mode de paiement</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Paiement immédiat', 'Paiement différé'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => updateFormData('contract', 'paiement', option)}
                  className={`p-4 rounded-xl border-2 transition-all text-center ${
                    formData.contract.paiement === option
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-secondary-200 hover:border-secondary-300'
                  }`}
                >
                  {option}
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
            disabled={!formData.contract.paiement}
          >
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
          Finalisation du contrat
        </h2>
        <p className="text-secondary-600">Procédez au paiement pour activer votre contrat</p>
      </div>

      <Card className="p-8">
        <div className="space-y-6">
          <div className="bg-primary-50 p-6 rounded-xl text-center">
            <p className="text-lg font-medium text-secondary-700 mb-2">
              {formData.contract.paiement === 'Paiement immédiat' ? 'Montant à payer' : 'Premier versement'}
            </p>
            <p className="text-3xl font-bold text-primary-600">
              {formData.contract.paiement === 'Paiement immédiat' 
                ? getTotalPrice().toLocaleString()
                : Math.round(getTotalPrice() / (parseInt(formData.contract.duree) * 12)).toLocaleString()
              } FCFA
            </p>
            {formData.contract.paiement === 'Paiement différé' && (
              <p className="text-sm text-secondary-600 mt-2">
                Puis {Math.round(getTotalPrice() / (parseInt(formData.contract.duree) * 12)).toLocaleString()} FCFA/mois pendant {formData.contract.duree} ans
              </p>
            )}
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
                  className="p-4 rounded-xl border-2 border-secondary-200 hover:border-primary-400 transition-all flex items-center gap-3"
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
              alert('Contrat souscrit avec succès! Vous recevrez vos documents sous 48h.');
              onNavigate('dashboard');
            }}
            className="bg-green-600 hover:bg-green-700"
          >
            Finaliser le contrat
            <Check className="h-5 w-5" />
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'subscription':
        return renderSubscription();
      case 'formula':
        return renderFormula();
      case 'duration':
        return renderDuration();
      case 'verification':
        return renderVerification();
      case 'payment':
        return renderPayment();
      default:
        return renderSubscription();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100">
      <Header
        title="Assurance Éducation"
        onBack={() => currentStep === 'subscription' ? onNavigate('dashboard') : prevStep()}
        showProfile={false}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentStep()}
      </main>
    </div>
  );
}