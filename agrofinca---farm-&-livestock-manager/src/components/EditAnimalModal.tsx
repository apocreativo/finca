import React, { useState } from 'react';
import {
  X,
  Camera,
  Upload,
  Check,
  Save,
  Image as ImageIcon,
  Sparkles
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { Animal, AnimalCategory } from '../types/farm';

// Curated high quality presets for farm livestock
const PRESET_PHOTOS: Record<AnimalCategory, { label: string; url: string }[]> = {
  dairy: [
    {
      label: 'Holstein Clásica',
      url: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80'
    },
    {
      label: 'Jersey Pradera',
      url: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80'
    },
    {
      label: 'Pardo Suizo Ordeño',
      url: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=800&q=80'
    },
    {
      label: 'Vaca Negra y Blanca',
      url: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80'
    }
  ],
  beef: [
    {
      label: 'Brahman Blanco',
      url: 'https://images.unsplash.com/photo-1545468800-856f6620f779?auto=format&fit=crop&w=800&q=80'
    },
    {
      label: 'Angus Negro',
      url: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80'
    },
    {
      label: 'Cebú Pastoreo',
      url: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=800&q=80'
    }
  ],
  horse: [
    {
      label: 'Pura Sangre Alazán',
      url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80'
    },
    {
      label: 'Caballo Blanco Criollo',
      url: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=800&q=80'
    },
    {
      label: 'Potro Castaño Finca',
      url: 'https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=800&q=80'
    }
  ],
  laying_hen: [
    {
      label: 'Gallinas Isa Brown Nido',
      url: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80'
    },
    {
      label: 'Gallina Ponedora Roja',
      url: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80'
    },
    {
      label: 'Gallinero Campero',
      url: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80'
    }
  ],
  broiler: [
    {
      label: 'Pollos de Engorde Galpón',
      url: 'https://images.unsplash.com/photo-1563281577-a7be47e20db9?auto=format&fit=crop&w=800&q=80'
    },
    {
      label: 'Lote Cobb 500',
      url: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80'
    }
  ],
  goat: [
    {
      label: 'Cabra Saanen Blanca',
      url: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=800&q=80'
    },
    {
      label: 'Chivo Boer Pradera',
      url: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=800&q=80'
    },
    {
      label: 'Cabra Alpina Lechera',
      url: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=800&q=80'
    }
  ],
  pig: [
    {
      label: 'Cerda Madre Landrace',
      url: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80'
    },
    {
      label: 'Lechones Farrowing',
      url: 'https://images.unsplash.com/photo-1604848698030-c434ba08ece1?auto=format&fit=crop&w=800&q=80'
    },
    {
      label: 'Cerdo Duroc Engorde',
      url: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=800&q=80'
    }
  ]
};

interface EditAnimalModalProps {
  animal: Animal | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EditAnimalModal: React.FC<EditAnimalModalProps> = ({
  animal,
  isOpen,
  onClose
}) => {
  const { updateAnimal, lots } = useFarm();

  const [name, setName] = useState('');
  const [tagNumber, setTagNumber] = useState('');
  const [category, setCategory] = useState<AnimalCategory>('dairy');
  const [breed, setBreed] = useState('');
  const [sex, setSex] = useState<'male' | 'female'>('female');
  const [weightKg, setWeightKg] = useState('');
  const [lotId, setLotId] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [reproductiveStatus, setReproductiveStatus] = useState('');
  const [photo, setPhoto] = useState('');
  const [sire, setSire] = useState('');
  const [dam, setDam] = useState('');
  const [notes, setNotes] = useState('');

  const [activePhotoTab, setActivePhotoTab] = useState<'presets' | 'upload' | 'url'>('presets');
  const [urlInput, setUrlInput] = useState('');

  // Sync state when animal changes
  React.useEffect(() => {
    if (animal) {
      setName(animal.name);
      setTagNumber(animal.tagNumber);
      setCategory(animal.category);
      setBreed(animal.breed);
      setSex(animal.sex);
      setWeightKg(animal.weightKg ? String(animal.weightKg) : '');
      setLotId(animal.lotId);
      setBirthDate(animal.birthDate);
      setReproductiveStatus(animal.reproductiveStatus || '');
      setPhoto(animal.photo);
      setUrlInput(animal.photo);
      setSire(animal.sire || '');
      setDam(animal.dam || '');
      setNotes(animal.notes || '');
    }
  }, [animal]);

  if (!isOpen || !animal) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPhoto(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      setPhoto(urlInput.trim());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedLot = lots.find(l => l.id === lotId);

    updateAnimal(animal.id, {
      name,
      tagNumber,
      category,
      breed,
      sex,
      weightKg: Number(weightKg) || animal.weightKg,
      lotId,
      lotName: selectedLot ? selectedLot.name : animal.lotName,
      birthDate,
      reproductiveStatus,
      photo: photo || animal.photo,
      sire,
      dam,
      notes
    });

    onClose();
  };

  const availablePresets = PRESET_PHOTOS[category] || PRESET_PHOTOS.dairy;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-stone-200 text-stone-800">
        {/* Header */}
        <div className="bg-[#143d26] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              <Camera className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-[11px] text-[#86efac] uppercase font-bold tracking-wider">
                Edición de Registro
              </span>
              <h2 className="text-xl font-bold font-display leading-tight">
                Editar Datos y Foto de {animal.name}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs flex-1">
          {/* PHOTO SELECTION SECTION */}
          <div className="bg-[#faf8f4] p-4 rounded-2xl border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-bold text-stone-800 flex items-center gap-2 text-xs">
                <ImageIcon className="w-4 h-4 text-[#25633e]" />
                <span>Foto del Animal</span>
              </label>
              <div className="flex items-center gap-1 bg-stone-200/80 p-0.5 rounded-lg text-[11px]">
                <button
                  type="button"
                  onClick={() => setActivePhotoTab('presets')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                    activePhotoTab === 'presets'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Galería Finca
                </button>
                <button
                  type="button"
                  onClick={() => setActivePhotoTab('upload')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                    activePhotoTab === 'upload'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Subir Foto
                </button>
                <button
                  type="button"
                  onClick={() => setActivePhotoTab('url')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                    activePhotoTab === 'url'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Enlace URL
                </button>
              </div>
            </div>

            {/* Current preview + selection widget */}
            <div className="flex gap-4 items-center">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-[#25633e] shrink-0 shadow-md relative group bg-stone-900">
                <img
                  src={photo || animal.photo}
                  alt={name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-[10px] font-bold">
                  Vista Previa
                </div>
              </div>

              {/* Subtab contents */}
              <div className="flex-1">
                {activePhotoTab === 'presets' && (
                  <div>
                    <span className="text-[11px] text-stone-500 mb-2 block font-medium">
                      Selecciona una foto de alta calidad para esta especie:
                    </span>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {availablePresets.map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setPhoto(p.url)}
                          className={`relative rounded-xl overflow-hidden h-14 border-2 transition-all ${
                            photo === p.url
                              ? 'border-[#25633e] ring-2 ring-[#25633e]/30 scale-105'
                              : 'border-transparent opacity-80 hover:opacity-100'
                          }`}
                        >
                          <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                          {photo === p.url && (
                            <div className="absolute inset-0 bg-[#25633e]/40 flex items-center justify-center text-white">
                              <Check className="w-4 h-4 stroke-[3]" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activePhotoTab === 'upload' && (
                  <div className="space-y-2">
                    <span className="text-[11px] text-stone-500 block font-medium">
                      Sube una fotografía desde tu computadora, celular o cámara:
                    </span>
                    <label className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-dashed border-stone-400 hover:border-[#25633e] hover:bg-emerald-50/50 cursor-pointer transition-colors bg-white">
                      <Upload className="w-4 h-4 text-[#25633e]" />
                      <span className="font-semibold text-stone-700">Seleccionar archivo de imagen</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>
                )}

                {activePhotoTab === 'url' && (
                  <div className="space-y-2">
                    <span className="text-[11px] text-stone-500 block font-medium">
                      Pega la URL de una imagen web:
                    </span>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={urlInput}
                        onChange={e => setUrlInput(e.target.value)}
                        placeholder="https://..."
                        className="flex-1 bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleApplyUrl}
                        className="px-3 py-2 bg-stone-800 hover:bg-stone-900 text-white font-semibold rounded-xl"
                      >
                        Aplicar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* GENERAL INFO FIELDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                Nombre / Identificación
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2.5 text-xs text-stone-900 font-semibold outline-none focus:border-[#25633e]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                Número de Arete / Tag ID
              </label>
              <input
                type="text"
                required
                value={tagNumber}
                onChange={e => setTagNumber(e.target.value)}
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2.5 text-xs text-stone-900 font-mono font-bold outline-none focus:border-[#25633e]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                Categoría
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as AnimalCategory)}
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2.5 text-xs text-stone-900 outline-none focus:border-[#25633e]"
              >
                <option value="dairy">Vaca Lechera</option>
                <option value="beef">Ganado de Carne</option>
                <option value="horse">Caballo / Equino</option>
                <option value="laying_hen">Gallina Ponedora</option>
                <option value="broiler">Pollo de Engorde</option>
                <option value="goat">Chivo / Cabra</option>
                <option value="pig">Cochino / Cerdo</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                Raza
              </label>
              <input
                type="text"
                required
                value={breed}
                onChange={e => setBreed(e.target.value)}
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2.5 text-xs text-stone-900 outline-none focus:border-[#25633e]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                Sexo
              </label>
              <select
                value={sex}
                onChange={e => setSex(e.target.value as 'male' | 'female')}
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2.5 text-xs text-stone-900 outline-none focus:border-[#25633e]"
              >
                <option value="female">Hembra</option>
                <option value="male">Macho</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                Peso Actual (kg)
              </label>
              <input
                type="number"
                step="0.5"
                required
                value={weightKg}
                onChange={e => setWeightKg(e.target.value)}
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2.5 text-xs text-stone-900 font-mono font-bold outline-none focus:border-[#25633e]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                Lote / Ubicación
              </label>
              <select
                value={lotId}
                onChange={e => setLotId(e.target.value)}
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2.5 text-xs text-stone-900 outline-none focus:border-[#25633e]"
              >
                {lots.map(l => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                Fecha Nacimiento
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={e => setBirthDate(e.target.value)}
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2.5 text-xs text-stone-900 outline-none focus:border-[#25633e]"
              />
            </div>
          </div>

          {/* Genealogía & Linaje */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                Padre (Sire / Linaje)
              </label>
              <input
                type="text"
                value={sire}
                onChange={e => setSire(e.target.value)}
                placeholder="Nombre o código del toro/semental"
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2.5 text-xs text-stone-900 outline-none focus:border-[#25633e]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                Madre (Dam)
              </label>
              <input
                type="text"
                value={dam}
                onChange={e => setDam(e.target.value)}
                placeholder="Nombre o arete de la madre"
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2.5 text-xs text-stone-900 outline-none focus:border-[#25633e]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-700 mb-1">
              Observaciones &amp; Manejo
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Anotaciones médicas, temperamento, plan nutricional..."
              className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl p-3 text-xs text-stone-900 outline-none focus:border-[#25633e] resize-none"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-semibold text-xs hover:bg-stone-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#25633e] hover:bg-[#1a4a2e] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Cambios</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
