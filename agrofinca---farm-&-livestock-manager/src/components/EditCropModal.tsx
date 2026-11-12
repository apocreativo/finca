import React, { useState, useEffect } from 'react';
import { X, Camera, Upload, Check, Save, Image as ImageIcon } from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { Crop } from '../types/farm';

const CROP_PRESETS = [
  {
    label: 'Tomate Chonto / Riñón',
    url: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80'
  },
  {
    label: 'Cultivo de Maíz Tecnificado',
    url: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80'
  },
  {
    label: 'Pasto de Corte & Forraje',
    url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80'
  },
  {
    label: 'Hortalizas en Invernadero',
    url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80'
  }
];

interface EditCropModalProps {
  crop: Crop | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EditCropModal: React.FC<EditCropModalProps> = ({ crop, isOpen, onClose }) => {
  const { updateCrop } = useFarm();

  const [name, setName] = useState('');
  const [variety, setVariety] = useState('');
  const [plotName, setPlotName] = useState('');
  const [hectares, setHectares] = useState('');
  const [plantingDate, setPlantingDate] = useState('');
  const [expectedHarvestDate, setExpectedHarvestDate] = useState('');
  const [expectedYieldKg, setExpectedYieldKg] = useState('');
  const [status, setStatus] = useState<Crop['status']>('vegetative');
  const [photo, setPhoto] = useState('');
  const [notes, setNotes] = useState('');

  const [activePhotoTab, setActivePhotoTab] = useState<'presets' | 'upload' | 'url'>('presets');
  const [urlInput, setUrlInput] = useState('');

  useEffect(() => {
    if (crop) {
      setName(crop.name);
      setVariety(crop.variety);
      setPlotName(crop.plotName);
      setHectares(String(crop.hectares));
      setPlantingDate(crop.plantingDate);
      setExpectedHarvestDate(crop.expectedHarvestDate);
      setExpectedYieldKg(String(crop.expectedYieldKg));
      setStatus(crop.status);
      setPhoto(crop.photo);
      setUrlInput(crop.photo);
      setNotes(crop.notes);
    }
  }, [crop]);

  if (!isOpen || !crop) return null;

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
    updateCrop(crop.id, {
      name,
      variety,
      plotName,
      hectares: Number(hectares) || crop.hectares,
      plantingDate,
      expectedHarvestDate,
      expectedYieldKg: Number(expectedYieldKg) || crop.expectedYieldKg,
      status,
      photo: photo || crop.photo,
      notes
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-stone-200 text-stone-800">
        <div className="bg-[#1b432a] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              <Camera className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <span className="text-[11px] text-[#86efac] uppercase font-bold tracking-wider">
                Editar Cultivo / Siembra
              </span>
              <h2 className="text-xl font-bold font-display leading-tight">{crop.name}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
          {/* Photo Selection */}
          <div className="bg-[#faf8f4] p-4 rounded-2xl border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-bold text-stone-800 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-emerald-700" />
                <span>Foto de la Siembra / Parcela</span>
              </label>
              <div className="flex items-center gap-1 bg-stone-200 p-0.5 rounded-lg text-[11px]">
                <button
                  type="button"
                  onClick={() => setActivePhotoTab('presets')}
                  className={`px-2 py-0.5 rounded-md ${
                    activePhotoTab === 'presets' ? 'bg-white font-bold text-stone-900 shadow-xs' : 'text-stone-600'
                  }`}
                >
                  Galería
                </button>
                <button
                  type="button"
                  onClick={() => setActivePhotoTab('upload')}
                  className={`px-2 py-0.5 rounded-md ${
                    activePhotoTab === 'upload' ? 'bg-white font-bold text-stone-900 shadow-xs' : 'text-stone-600'
                  }`}
                >
                  Subir
                </button>
                <button
                  type="button"
                  onClick={() => setActivePhotoTab('url')}
                  className={`px-2 py-0.5 rounded-md ${
                    activePhotoTab === 'url' ? 'bg-white font-bold text-stone-900 shadow-xs' : 'text-stone-600'
                  }`}
                >
                  URL
                </button>
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-emerald-600 shrink-0 bg-stone-900 shadow-sm">
                <img src={photo || crop.photo} alt={name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1">
                {activePhotoTab === 'presets' && (
                  <div className="grid grid-cols-2 gap-2">
                    {CROP_PRESETS.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setPhoto(p.url)}
                        className={`relative rounded-lg overflow-hidden h-10 border transition-all ${
                          photo === p.url ? 'border-emerald-600 ring-2 ring-emerald-500/40' : 'border-stone-300 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                        {photo === p.url && (
                          <div className="absolute inset-0 bg-emerald-600/40 flex items-center justify-center text-white">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {activePhotoTab === 'upload' && (
                  <label className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-dashed border-stone-400 hover:bg-emerald-50 cursor-pointer bg-white">
                    <Upload className="w-4 h-4 text-emerald-700" />
                    <span className="font-semibold text-stone-700 text-[11px]">Elegir imagen local</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                  </label>
                )}

                {activePhotoTab === 'url' && (
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={urlInput}
                      onChange={e => setUrlInput(e.target.value)}
                      placeholder="https://..."
                      className="flex-1 bg-white border border-stone-300 rounded-lg px-2.5 py-1 text-xs"
                    />
                    <button
                      type="button"
                      onClick={handleApplyUrl}
                      className="px-2.5 py-1 bg-stone-800 text-white rounded-lg font-bold"
                    >
                      OK
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">Nombre Cultivo</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">Variedad / Híbrido</label>
              <input
                type="text"
                required
                value={variety}
                onChange={e => setVariety(e.target.value)}
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">Parcela / Sector</label>
              <input
                type="text"
                required
                value={plotName}
                onChange={e => setPlotName(e.target.value)}
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">Hectáreas (Ha)</label>
              <input
                type="number"
                step="0.1"
                required
                value={hectares}
                onChange={e => setHectares(e.target.value)}
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">Estado</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as Crop['status'])}
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 text-xs"
              >
                <option value="planted">🌱 Sembrado</option>
                <option value="vegetative">🌿 Vegetativo</option>
                <option value="harvesting">🌾 En Cosecha</option>
                <option value="completed">✅ Finalizado</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">Fecha Siembra</label>
              <input
                type="date"
                value={plantingDate}
                onChange={e => setPlantingDate(e.target.value)}
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-2.5 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">Cosecha Estimada</label>
              <input
                type="date"
                value={expectedHarvestDate}
                onChange={e => setExpectedHarvestDate(e.target.value)}
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-2.5 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">Rendimiento (kg)</label>
              <input
                type="number"
                value={expectedYieldKg}
                onChange={e => setExpectedYieldKg(e.target.value)}
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-2.5 py-2 text-xs font-mono font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-700 mb-1">Notas &amp; Cuidados</label>
            <textarea
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl p-2.5 text-xs resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 font-semibold text-xs hover:bg-stone-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#25633e] hover:bg-[#1a4a2e] text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5"
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
