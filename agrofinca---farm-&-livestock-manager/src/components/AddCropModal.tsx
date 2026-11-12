import React, { useState } from 'react';
import { X, Sprout, Upload } from 'lucide-react';
import { useFarm } from '../context/FarmContext';

const CROP_PRESETS = [
  {
    name: 'Tomate Chonto',
    variety: 'Chonto F1 Resiliente',
    type: 'vegetable' as const,
    photo: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    hectares: 3.5,
    expectedYieldKg: 15000
  },
  {
    name: 'Maíz Blanco Forrajero',
    variety: 'Híbrido Silo Pionner',
    type: 'grain' as const,
    photo: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
    hectares: 10.0,
    expectedYieldKg: 42000
  },
  {
    name: 'Pasto de Corte Cuba 22',
    variety: 'Pennisetum purpureum',
    type: 'pasture' as const,
    photo: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    hectares: 5.0,
    expectedYieldKg: 30000
  },
  {
    name: 'Café Especial Castillo',
    variety: 'Coffea arabica',
    type: 'fruit' as const,
    photo: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    hectares: 8.0,
    expectedYieldKg: 9500
  }
];

export const AddCropModal: React.FC = () => {
  const { isAddCropOpen, setIsAddCropOpen, addCrop } = useFarm();

  const [name, setName] = useState('Tomate Chonto');
  const [variety, setVariety] = useState('Chonto Seleccionado');
  const [type, setType] = useState<'vegetable' | 'grain' | 'pasture' | 'fruit'>('vegetable');
  const [plotName, setPlotName] = useState('Parcela Huerto 2');
  const [hectares, setHectares] = useState('3.5');
  const [plantingDate, setPlantingDate] = useState('2026-10-01');
  const [expectedHarvestDate, setExpectedHarvestDate] = useState('2026-12-15');
  const [expectedYieldKg, setExpectedYieldKg] = useState('14000');
  const [photo, setPhoto] = useState(CROP_PRESETS[0].photo);
  const [notes, setNotes] = useState('Riego por goteo diario y fertilización foliar balanceada.');

  if (!isAddCropOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addCrop({
      name,
      variety,
      type,
      plotName,
      hectares: Number(hectares),
      plantingDate,
      expectedHarvestDate,
      status: 'vegetative',
      expectedYieldKg: Number(expectedYieldKg),
      photo,
      fumigationHistory: [
        {
          date: plantingDate,
          product: 'Enraizador biológico + Trichoderma',
          target: 'Prevención de hongos en raíz',
          completed: true
        }
      ],
      notes
    });

    setIsAddCropOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-stone-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-[#fbf9f4]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-lime-100 text-lime-800 flex items-center justify-center">
              <Sprout className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#182a1d] font-display">
                Registrar Nueva Siembra / Cultivo
              </h3>
              <p className="text-xs text-[#718276]">
                Plantas, huertos, pastos de corte y cosechas agrícolas
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAddCropOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
          {/* Quick Preset Selector */}
          <div>
            <label className="block text-stone-700 font-semibold mb-1.5">
              Plantilla de Cultivo Rápida:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CROP_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setName(p.name);
                    setVariety(p.variety);
                    setType(p.type);
                    setPhoto(p.photo);
                    setHectares(String(p.hectares));
                    setExpectedYieldKg(String(p.expectedYieldKg));
                  }}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    name === p.name
                      ? 'border-[#25633e] bg-emerald-50 text-[#17462a] font-bold'
                      : 'border-stone-200 bg-[#faf8f4] text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <p className="truncate font-semibold">{p.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Name & Variety */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Nombre del Cultivo *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ej: Tomate Chonto, Maíz..."
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 outline-none font-semibold text-stone-900"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Variedad / Semilla
              </label>
              <input
                type="text"
                value={variety}
                onChange={e => setVariety(e.target.value)}
                placeholder="Ej: Híbrido, Criolla..."
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 outline-none"
              />
            </div>
          </div>

          {/* Plot & Hectares */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Parcela o Potrero Agrícola *
              </label>
              <input
                type="text"
                required
                value={plotName}
                onChange={e => setPlotName(e.target.value)}
                placeholder="Ej: Parcela Sur 1"
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Área (Hectáreas) *
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={hectares}
                onChange={e => setHectares(e.target.value)}
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 font-mono outline-none"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Fecha de Siembra *
              </label>
              <input
                type="date"
                required
                value={plantingDate}
                onChange={e => setPlantingDate(e.target.value)}
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 font-mono outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Fecha Estimada de Cosecha *
              </label>
              <input
                type="date"
                required
                value={expectedHarvestDate}
                onChange={e => setExpectedHarvestDate(e.target.value)}
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 font-mono outline-none"
              />
            </div>
          </div>

          {/* Yield */}
          <div>
            <label className="block text-stone-700 font-semibold mb-1">
              Rendimiento Estimado (kg)
            </label>
            <input
              type="number"
              value={expectedYieldKg}
              onChange={e => setExpectedYieldKg(e.target.value)}
              placeholder="Ej: 14000"
              className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3.5 py-2 font-mono outline-none font-bold"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-stone-700 font-semibold mb-1">
              Plan Nutricional y Notas
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3.5 py-2 outline-none resize-none"
            />
          </div>

          {/* Submit */}
          <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsAddCropOpen(false)}
              className="px-4 py-2.5 rounded-xl text-stone-600 hover:bg-stone-100 font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#0c2a1a] hover:bg-[#153b26] text-white font-bold shadow-md transition-all"
            >
              Registrar Siembra
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
