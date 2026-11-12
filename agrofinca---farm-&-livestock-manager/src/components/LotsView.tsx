import React, { useState } from 'react';
import { Layers, Plus, Users, MapPin, CheckCircle2, Eye } from 'lucide-react';
import { useFarm } from '../context/FarmContext';

export const LotsView: React.FC = () => {
  const { lots, animals, setSelectedAnimal, setActiveSection } = useFarm();
  const [selectedLotId, setSelectedLotId] = useState<string>(lots[0]?.id || '');

  const activeLot = lots.find(l => l.id === selectedLotId) || lots[0];
  const animalsInLot = animals.filter(a => a.lotId === activeLot?.id);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-2xl bg-[#e0f4f0] text-[#1e7e59] flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </span>
            <h2 className="text-2xl font-bold font-display text-[#18291c]">
              Lotes y Potreros de la Finca
            </h2>
          </div>
          <p className="text-xs text-[#6e7e72] mt-0.5">
            Manejo rotacional de pastos, capacidad de carga y asignación de animales
          </p>
        </div>
      </div>

      {/* Lots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {lots.map(lot => {
          const isSelected = lot.id === selectedLotId;
          const lotAnimals = animals.filter(a => a.lotId === lot.id);

          return (
            <div
              key={lot.id}
              onClick={() => setSelectedLotId(lot.id)}
              className={`bg-white rounded-3xl overflow-hidden shadow-[0_4px_22px_rgba(0,0,0,0.04)] border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'ring-2 ring-[#c9983d] border-transparent shadow-lg scale-[1.01]'
                  : 'border-[#0d2f1f]/8 hover:border-stone-300'
              }`}
            >
              <div>
                <div className="relative h-44 w-full bg-stone-900">
                  <img
                    src={lot.photo}
                    alt={lot.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="bg-[#246643] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                      • {lot.status === 'active' ? 'Activo' : 'En Descanso'}
                    </span>
                    <span className="bg-white/90 text-stone-900 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                      {lot.hectares} Ha
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white flex items-end justify-between">
                    <div>
                      <h3 className="text-lg font-bold font-display">{lot.name}</h3>
                      <p className="text-xs text-stone-300 font-medium">
                        {lot.pastureType}
                      </p>
                    </div>
                    <span className="text-sm font-extrabold font-mono bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-lg">
                      {lotAnimals.length} cabezas
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2 text-xs">
                  <p className="text-stone-600 leading-relaxed text-[11px]">
                    {lot.description}
                  </p>
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-stone-500">
                    <span>Capacidad de carga:</span>
                    <span className="font-bold text-stone-800">
                      {lotAnimals.length} / {lot.capacity} animales
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Animals inside selected Lot */}
      {activeLot && (
        <div className="bg-white rounded-3xl p-6 shadow-[0_4px_22px_rgba(0,0,0,0.04)] border border-[#0d2f1f]/8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#18291c]">
                Animales asignados a {activeLot.name} ({animalsInLot.length})
              </h3>
              <p className="text-xs text-stone-500">
                Selecciona cualquier animal para abrir su ficha médica y productiva
              </p>
            </div>
            <button
              onClick={() => setActiveSection('animales')}
              className="text-xs text-[#25633e] font-bold hover:underline"
            >
              Ver en Catálogo General &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {animalsInLot.map(animal => (
              <div
                key={animal.id}
                onClick={() => setSelectedAnimal(animal)}
                className="bg-[#faf8f4] hover:bg-white rounded-2xl p-3 border border-stone-200/80 cursor-pointer transition-all hover:shadow-md flex items-center gap-3"
              >
                <img
                  src={animal.photo}
                  alt={animal.name}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-stone-900 truncate">
                      {animal.name}
                    </span>
                    <span className="text-[10px] font-mono font-semibold px-1 rounded bg-stone-200 text-stone-700">
                      {animal.tagNumber}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 truncate">{animal.breed}</p>
                  <span className="text-[11px] font-extrabold text-[#25633e] font-mono-nums">
                    {animal.weightKg} kg
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
