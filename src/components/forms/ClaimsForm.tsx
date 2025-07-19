import React, { useState } from 'react';
import { AlertTriangle, Upload, Calendar, MapPin, Send } from 'lucide-react';
import Header from '../ui/Header';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface ClaimsFormProps {
  onNavigate: (screen: string) => void;
}

interface ClaimData {
  nom: string;
  prenom: string;
  telephone: string;
  dateAccident: string;
  lieuAccident: string;
  circonstances: string;
  photoAssurance: File | null;
  photoPermis: File | null;
  photoCarteGrise: File | null;
}

export default function ClaimsForm({ onNavigate }: ClaimsFormProps) {
  const [formData, setFormData] = useState<ClaimData>({
    nom: '',
    prenom: '',
    telephone: '',
    dateAccident: '',
    lieuAccident: '',
    circonstances: '',
    photoAssurance: null,
    photoPermis: null,
    photoCarteGrise: null,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const updateFormData = (field: keyof ClaimData, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: 'photoAssurance' | 'photoPermis' | 'photoCarteGrise', file: File | null) => {
    updateFormData(field, file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
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
           formData.dateAccident && 
           formData.lieuAccident && 
           formData.circonstances &&
           formData.photoAssurance &&
           formData.photoPermis &&
           formData.photoCarteGrise;
  };

  const FileUploadField = ({ 
    label, 
    field, 
    file 
  }: { 
    label: string; 
    field: 'photoAssurance' | 'photoPermis' | 'photoCarteGrise'; 
    file: File | null;
  }) => (
    <div>
      <label className="block text-sm font-medium text-secondary-700 mb-2">
        {label} *
      </label>
      <div className="border-2 border-dashed border-secondary-300 rounded-xl p-6 text-center hover:border-primary-400 transition-colors">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileUpload(field, e.target.files?.[0] || null)}
          className="hidden"
          id={field}
        />
        <label htmlFor={field} className="cursor-pointer">
          <Upload className="h-8 w-8 text-secondary-400 mx-auto mb-2" />
          <div className="text-secondary-600">
            <p className="font-medium mb-1">Cliquez pour télécharger</p>
            <p className="text-sm">JPG, PNG (Max: 5MB)</p>
          </div>
        </label>
        {file && (
          <p className="mt-2 text-primary-600 font-medium text-sm">
            ✓ {file.name}
          </p>
        )}
      </div>
    </div>
  );

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100">
        <Header title="Sinistre déclaré" onBack={() => onNavigate('dashboard')} showProfile={false} />
        
        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <AlertTriangle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-secondary-800 mb-4">
              Sinistre déclaré avec succès
            </h2>
            <p className="text-secondary-600 mb-8">
              Votre déclaration de sinistre a été enregistrée. Notre équipe vous contactera dans les plus brefs délais pour traiter votre dossier.
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
      <Header title="Déclarer un Sinistre" onBack={() => onNavigate('dashboard')} showProfile={false} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-3xl font-bold text-secondary-800 mb-4">
            Déclaration de Sinistre
          </h2>
          <p className="text-secondary-600 text-lg">
            Remplissez ce formulaire pour déclarer votre sinistre automobile
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informations personnelles */}
            <div>
              <h3 className="text-xl font-bold text-secondary-800 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-bold text-sm">1</span>
                </div>
                Informations personnelles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <Input
                  type="tel"
                  placeholder="+225 XX XX XX XX XX"
                  value={formData.telephone}
                  onChange={(value) => updateFormData('telephone', value)}
                  label="Numéro de téléphone"
                  icon={<AlertTriangle className="h-5 w-5" />}
                  required
                />
              </div>
            </div>

            {/* Détails de l'accident */}
            <div>
              <h3 className="text-xl font-bold text-secondary-800 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-bold text-sm">2</span>
                </div>
                Détails de l'accident
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="date"
                  value={formData.dateAccident}
                  onChange={(value) => updateFormData('dateAccident', value)}
                  label="Date de l'accident"
                  icon={<Calendar className="h-5 w-5" />}
                  required
                />
                <Input
                  placeholder="Lieu de l'accident"
                  value={formData.lieuAccident}
                  onChange={(value) => updateFormData('lieuAccident', value)}
                  label="Lieu de l'accident"
                  icon={<MapPin className="h-5 w-5" />}
                  required
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Circonstances de l'accident *
                </label>
                <textarea
                  value={formData.circonstances}
                  onChange={(e) => updateFormData('circonstances', e.target.value)}
                  placeholder="Décrivez les circonstances de l'accident en détail..."
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border-2 border-secondary-200 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-200 transition-all resize-none"
                  required
                />
              </div>
            </div>

            {/* Documents */}
            <div>
              <h3 className="text-xl font-bold text-secondary-800 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-bold text-sm">3</span>
                </div>
                Documents requis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FileUploadField
                  label="Photo de l'assurance"
                  field="photoAssurance"
                  file={formData.photoAssurance}
                />
                <FileUploadField
                  label="Photo du permis de conduire"
                  field="photoPermis"
                  file={formData.photoPermis}
                />
                <FileUploadField
                  label="Photo de la carte grise"
                  field="photoCarteGrise"
                  file={formData.photoCarteGrise}
                />
              </div>
            </div>

            {/* Actions */}
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
                disabled={!isFormValid()}
                loading={loading}
                className="bg-red-600 hover:bg-red-700"
                size="lg"
              >
                Envoyer la déclaration
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </Card>

        {/* Info box */}
        <Card className="p-6 mt-6 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-100 rounded-xl">
              <AlertTriangle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Information importante</h4>
              <p className="text-blue-700 text-sm">
                Votre déclaration sera traitée dans les 24h. Notre équipe vous contactera pour la suite de la procédure. 
                Assurez-vous que toutes les informations sont exactes et que les photos sont lisibles.
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}