import React, { useState } from 'react';
import { X, Upload, Camera, Check } from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { AnimalCategory, AnimalSpecies } from '../types/farm';

const PRESET_PHOTOS = [
  {
    label: 'Vaca Holstein Lechera',
    url: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=800&q=80',
    type: 'dairy'
  },
  {
    label: 'Toro / Novillo Brahman Carne',
    url: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=800&q=80',
    type: 'beef'
  },
  {
    label: 'Caballo Paso Fino / Azabache',
    url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    type: 'horse'
  },
  {
    label: 'Gallinas Ponedoras Galpón',
    url: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
    type: 'laying_hen'
  },
  {
    label: 'Pollos de Engorde Ceba',
    url: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
    type: 'broiler'
  },
  {
    label: 'Cabra / Chivo Aprisco',
    url: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=800&q=80',
    type: 'goat'
  },
  {
    label: 'Cerdos / Cochinera',
    url: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
    type: 'pig'
  }
];

export const AddAnimalModal: React.FC = () => {
  const { isAddAnimalOpen, setIsAddAnimalOpen, addAnimal, lots } = useFarm();

  const [name, setName] = useState('');
  const [tagNumber, setTagNumber] = useState('');
  const [category, setCategory] = useState<AnimalCategory>('dairy');
  const [breed, setBreed] = useState('Holstein Puro');
  const [sex, setSex] = useState<'female' | 'male'>('female');
  const [birthDate, setBirthDate] = useState('2024-01-15');
  const [weightKg, setWeightKg] = useState('480');
  const [dailyMilk, setDailyMilk] = useState('22.0');
  const [flockCount, setFlockCount] = useState('400');
  const [goatPurpose, setGoatPurpose] = useState<'milk' | 'meat'>('milk');
  const [pigStage, setPigStage] = useState<'gestation' | 'farrowing' | 'fattening'>('fattening');
  const [lotId, setLotId] = useState(lots[0]?.id || 'lot-1');
  const [photo, setPhoto] = useState(PRESET_PHOTOS[0].url);
  const [sire, setSire] = useState('');
  const [dam, setDam] = useState('');
  const [notes, setNotes] = useState('');

  if (!isAddAnimalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedLot = lots.find(l => l.id === lotId);
    let species: AnimalSpecies = 'cattle';
    if (category === 'horse') species = 'horse';
    else if (category === 'laying_hen' || category === 'broiler') species = 'poultry';
    else if (category === 'goat') species = 'goat';
    else if (category === 'pig') species = 'pig';

    addAnimal({
      tagNumber: tagNumber.trim().toUpperCase(),
      name: name.trim(),
      species,
      category,
      breed,
      sex,
      birthDate,
      weightKg: Number(weightKg),
      weightHistory: [
        {
          date: new Date().toISOString().split('T')[0],
          weightKg: Number(weightKg)
        }
      ],
      dailyMilkLiters: category === 'dairy' || (category === 'goat' && goatPurpose === 'milk') ? Number(dailyMilk) : undefined,
      totalFlockCount: category === 'laying_hen' ? Number(flockCount) : undefined,
      broilerBatchSize: category === 'broiler' ? Number(flockCount) : undefined,
      batchAgeDays: category === 'broiler' ? 14 : undefined,
      feedConversionRatio: category === 'broiler' ? 1.62 : undefined,
      goatPurpose: category === 'goat' ? goatPurpose : undefined,
      pigStage: category === 'pig' ? pigStage : undefined,
      lotId,
      lotName: selectedLot ? selectedLot.name : 'Lote Principal',
      healthStatus: 'healthy',
      photo: photo || PRESET_PHOTOS[0].url,
      sire: sire || undefined,
      dam: dam || undefined,
      notes: notes || undefined,
      vaccinesApplied: [
        {
          vaccineName: 'Registro de Ingreso Sanitario',
          date: new Date().toISOString().split('T')[0]
        }
      ]
    });

    setIsAddAnimalOpen(false);
  };

  // Handle local image upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-stone-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-[#fbf9f4]">
          <div>
            <h3 className="text-lg font-bold text-[#182a1d] font-display">
              Registrar Nuevo Animal
            </h3>
            <p className="text-xs text-[#718276]">
              Añade ganado de leche, carne o caballos a tu inventario pecuario
            </p>
          </div>
          <button
            onClick={() => setIsAddAnimalOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-5 text-xs">
          {/* Category Selector */}
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-2">
              Tipo de Animal / Producción
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => {
                  setCategory('dairy');
                  setSex('female');
                  setBreed('Holstein Puro');
                  setPhoto(PRESET_PHOTOS[0].url);
                }}
                className={`py-2 px-2.5 rounded-xl border text-center transition-all ${
                  category === 'dairy'
                    ? 'bg-[#e2f0fc] border-[#246bb4] text-[#0e3763] font-bold shadow-xs'
                    : 'bg-[#faf8f4] border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                🥛 Vaca Lechera
              </button>
              <button
                type="button"
                onClick={() => {
                  setCategory('beef');
                  setBreed('Brahman Blanco');
                  setPhoto(PRESET_PHOTOS[1].url);
                }}
                className={`py-2 px-2.5 rounded-xl border text-center transition-all ${
                  category === 'beef'
                    ? 'bg-[#fdf1e2] border-[#b06f2e] text-[#4d290c] font-bold shadow-xs'
                    : 'bg-[#faf8f4] border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                🥩 Ganado Carne
              </button>
              <button
                type="button"
                onClick={() => {
                  setCategory('horse');
                  setBreed('Paso Fino');
                  setPhoto(PRESET_PHOTOS[2].url);
                }}
                className={`py-2 px-2.5 rounded-xl border text-center transition-all ${
                  category === 'horse'
                    ? 'bg-[#ece6fa] border-[#6948ad] text-[#2c1757] font-bold shadow-xs'
                    : 'bg-[#faf8f4] border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                ⭐ Caballo
              </button>
              <button
                type="button"
                onClick={() => {
                  setCategory('laying_hen');
                  setSex('female');
                  setBreed('Hy-Line Brown');
                  setWeightKg('1.95');
                  setPhoto(PRESET_PHOTOS[3].url);
                }}
                className={`py-2 px-2.5 rounded-xl border text-center transition-all ${
                  category === 'laying_hen'
                    ? 'bg-[#fbf2d8] border-[#8e6e16] text-[#42330a] font-bold shadow-xs'
                    : 'bg-[#faf8f4] border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                🥚 Gallina Ponedora
              </button>
              <button
                type="button"
                onClick={() => {
                  setCategory('broiler');
                  setSex('male');
                  setBreed('Cobb 500');
                  setWeightKg('2.2');
                  setPhoto(PRESET_PHOTOS[4].url);
                }}
                className={`py-2 px-2.5 rounded-xl border text-center transition-all ${
                  category === 'broiler'
                    ? 'bg-[#def7ed] border-[#1e7e59] text-[#0e3b29] font-bold shadow-xs'
                    : 'bg-[#faf8f4] border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                🍗 Pollo de Engorde
              </button>
              <button
                type="button"
                onClick={() => {
                  setCategory('goat');
                  setBreed('Saanen Lechera');
                  setWeightKg('60');
                  setPhoto(PRESET_PHOTOS[5].url);
                }}
                className={`py-2 px-2.5 rounded-xl border text-center transition-all ${
                  category === 'goat'
                    ? 'bg-[#e3f0fc] border-[#246bb4] text-[#0e3763] font-bold shadow-xs'
                    : 'bg-[#faf8f4] border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                🐐 Chivo / Cabra
              </button>
              <button
                type="button"
                onClick={() => {
                  setCategory('pig');
                  setBreed('Landrace x Duroc');
                  setWeightKg('90');
                  setPhoto(PRESET_PHOTOS[6].url);
                }}
                className={`py-2 px-2.5 rounded-xl border text-center transition-all ${
                  category === 'pig'
                    ? 'bg-[#fdf1e2] border-[#b06f2e] text-[#995924] font-bold shadow-xs'
                    : 'bg-[#faf8f4] border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                🐷 Cochino / Cerdo
              </button>
            </div>
          </div>

          {/* Dynamic specific selectors */}
          {category === 'laying_hen' && (
            <div className="p-3 bg-[#fbf2d8] rounded-2xl border border-[#f5e4b3] grid grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Cantidad de Aves en el Galpón
                </label>
                <input
                  type="number"
                  value={flockCount}
                  onChange={e => setFlockCount(e.target.value)}
                  className="w-full bg-white border border-[#f5e4b3] rounded-xl px-3 py-1.5 font-bold font-mono outline-none"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Objetivo de Postura Esperado (%)
                </label>
                <input
                  type="number"
                  defaultValue="90"
                  className="w-full bg-white border border-[#f5e4b3] rounded-xl px-3 py-1.5 font-bold font-mono outline-none"
                />
              </div>
            </div>
          )}

          {category === 'broiler' && (
            <div className="p-3 bg-[#def7ed] rounded-2xl border border-[#c3edd9] grid grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Tamaño del Lote de Engorde (Aves)
                </label>
                <input
                  type="number"
                  value={flockCount}
                  onChange={e => setFlockCount(e.target.value)}
                  className="w-full bg-white border border-[#c3edd9] rounded-xl px-3 py-1.5 font-bold font-mono outline-none"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Peso Meta de Beneficio (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  defaultValue="2.6"
                  className="w-full bg-white border border-[#c3edd9] rounded-xl px-3 py-1.5 font-bold font-mono outline-none"
                />
              </div>
            </div>
          )}

          {category === 'goat' && (
            <div className="p-3 bg-[#e3f0fc] rounded-2xl border border-[#cbe1f8] grid grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Aptitud Caprina
                </label>
                <select
                  value={goatPurpose}
                  onChange={e => setGoatPurpose(e.target.value as any)}
                  className="w-full bg-white border border-[#cbe1f8] rounded-xl px-3 py-1.5 font-semibold outline-none"
                >
                  <option value="milk">🥛 Leche Caprina</option>
                  <option value="meat">🥩 Carne (Boer)</option>
                </select>
              </div>
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Litros Leche/Día (si aplica)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={dailyMilk}
                  onChange={e => setDailyMilk(e.target.value)}
                  className="w-full bg-white border border-[#cbe1f8] rounded-xl px-3 py-1.5 font-bold font-mono outline-none"
                />
              </div>
            </div>
          )}

          {category === 'pig' && (
            <div className="p-3 bg-[#fdf1e2] rounded-2xl border border-[#fae2c6] grid grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Fase de Producción
                </label>
                <select
                  value={pigStage}
                  onChange={e => setPigStage(e.target.value as any)}
                  className="w-full bg-white border border-[#fae2c6] rounded-xl px-3 py-1.5 font-semibold outline-none"
                >
                  <option value="fattening">🥩 Ceba / Engorde a Camal</option>
                  <option value="farrowing">🤱 Maternidad / Lactancia</option>
                  <option value="gestation">🤰 Gestación</option>
                </select>
              </div>
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Consumo Ración Diaria (kg/día)
                </label>
                <input
                  type="number"
                  step="0.1"
                  defaultValue="3.0"
                  className="w-full bg-white border border-[#fae2c6] rounded-xl px-3 py-1.5 font-bold font-mono outline-none"
                />
              </div>
            </div>
          )}

          {/* Basic Identifiers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Número de Arete / Caravana (ID) *
              </label>
              <input
                type="text"
                required
                value={tagNumber}
                onChange={e => setTagNumber(e.target.value)}
                placeholder="Ej: CO-105 o BF-302"
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3.5 py-2 font-mono font-bold text-stone-900 outline-none focus:border-[#c9983d]"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Nombre del Animal *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ej: Princesa, Sultán, Azabache"
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3.5 py-2 font-semibold text-stone-900 outline-none focus:border-[#c9983d]"
              />
            </div>
          </div>

          {/* Breed, Sex, Birth Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-stone-700 font-semibold mb-1">Raza</label>
              <input
                type="text"
                required
                value={breed}
                onChange={e => setBreed(e.target.value)}
                placeholder="Ej: Holstein, Brahman, Criollo"
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 outline-none focus:border-[#c9983d]"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-1">Sexo</label>
              <select
                value={sex}
                onChange={e => setSex(e.target.value as 'female' | 'male')}
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 outline-none"
              >
                <option value="female">Hembra</option>
                <option value="male">Macho</option>
              </select>
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Fecha Nacimiento
              </label>
              <input
                type="date"
                required
                value={birthDate}
                onChange={e => setBirthDate(e.target.value)}
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 outline-none font-mono"
              />
            </div>
          </div>

          {/* Weight & Milk Production (if dairy) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Peso Inicial (kg) *
              </label>
              <input
                type="number"
                step="0.5"
                required
                value={weightKg}
                onChange={e => setWeightKg(e.target.value)}
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3.5 py-2 font-mono font-bold outline-none"
              />
            </div>
            {category === 'dairy' ? (
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Producción Láctea Diaria (Litros)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={dailyMilk}
                  onChange={e => setDailyMilk(e.target.value)}
                  className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3.5 py-2 font-mono font-bold text-blue-900 outline-none"
                />
              </div>
            ) : (
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Lote / Potrero de Asignación
                </label>
                <select
                  value={lotId}
                  onChange={e => setLotId(e.target.value)}
                  className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 outline-none"
                >
                  {lots.map(l => (
                    <option key={l.id} value={l.id}>
                      {l.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Photo Section with Presets & Upload */}
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-2 flex items-center justify-between">
              <span>Fotografía del Animal</span>
              <label className="cursor-pointer text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1">
                <Upload className="w-3.5 h-3.5" />
                <span>Subir foto propia</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </label>

            {/* Photo preview + Presets picker */}
            <div className="flex items-center gap-4">
              <div className="w-24 h-20 rounded-2xl overflow-hidden border-2 border-stone-300 shrink-0 bg-stone-100 shadow-sm relative">
                <img src={photo} alt="Preview" className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 grid grid-cols-3 gap-2">
                {PRESET_PHOTOS.map((p, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPhoto(p.url)}
                    className={`relative rounded-xl overflow-hidden h-14 border transition-all ${
                      photo === p.url
                        ? 'ring-2 ring-[#c9983d] border-transparent'
                        : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                    {photo === p.url && (
                      <div className="absolute inset-0 bg-[#c9983d]/40 flex items-center justify-center text-white">
                        <Check className="w-4 h-4 font-bold" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sire & Dam Pedigree */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Padre (Semental / Sire)
              </label>
              <input
                type="text"
                value={sire}
                onChange={e => setSire(e.target.value)}
                placeholder="Nombre o registro del padre"
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Madre (Vaca / Dam)
              </label>
              <input
                type="text"
                value={dam}
                onChange={e => setDam(e.target.value)}
                placeholder="Nombre o arete de la madre"
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 outline-none"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-stone-700 font-semibold mb-1">
              Notas y Observaciones
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Características físicas, temperamento, cuidados particulares..."
              className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3.5 py-2 outline-none resize-none"
            />
          </div>

          {/* Footer Submit */}
          <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsAddAnimalOpen(false)}
              className="px-4 py-2.5 rounded-xl text-stone-600 hover:bg-stone-100 font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#0c2a1a] hover:bg-[#153b26] text-white font-bold shadow-md transition-all flex items-center gap-2"
            >
              <span>Guardar en Finca</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
