import React, { useState } from 'react';
import { Plus, Star, ShieldCheck, Calendar, Activity, Eye } from 'lucide-react';
import { useFarm } from '../context/FarmContext';

export const HorsesView: React.FC = () => {
  const { animals, setSelectedAnimal, setIsAddAnimalOpen, setIsAddEventOpen } = useFarm();

  const horses = animals.filter(a => a.category === 'horse');

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-2xl bg-[#ece6fa] text-[#6948ad] flex items-center justify-center">
              <Star className="w-4 h-4 fill-current" />
            </span>
            <h2 className="text-2xl font-bold font-display text-[#18291c]">
              Caballos y Equinos
            </h2>
          </div>
          <p className="text-xs text-[#6e7e72] mt-0.5">
            Registro de ejemplares, genealogía, herrajes, adiestramiento y plan sanitario equino
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setIsAddEventOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold rounded-2xl shadow-xs transition-all"
          >
            <Calendar className="w-3.5 h-3.5 text-[#25633e]" />
            <span>Agendar Herraje / Vacuna</span>
          </button>
          <button
            onClick={() => setIsAddAnimalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#0c2a1a] hover:bg-[#163e27] text-white text-xs font-bold rounded-2xl shadow-md transition-all"
          >
            <Plus className="w-4 h-4 text-[#e0a94b]" />
            <span>Registrar Caballo</span>
          </button>
        </div>
      </div>

      {/* Highlights Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#ece6fa] p-5 rounded-3xl border border-[#ded4f5]">
          <span className="text-xs font-bold text-[#6948ad] uppercase tracking-wider">
            Total Ejemplares
          </span>
          <div className="text-3xl font-extrabold text-[#2c1757] font-display mt-1">
            {horses.length} Caballos
          </div>
          <p className="text-[11px] text-[#6948ad] mt-0.5">Paso Fino, Criollos y Cuarto de Milla</p>
        </div>
        <div className="bg-[#def7ed] p-5 rounded-3xl border border-[#c3edd9]">
          <span className="text-xs font-bold text-[#1e7e59] uppercase tracking-wider">
            Plan Sanitario EEV
          </span>
          <div className="text-2xl font-extrabold text-[#0e3b29] font-display mt-1">
            100% Vacunados
          </div>
          <p className="text-[11px] text-[#257755] mt-0.5">Encefalitis, tétanos e influenza al día</p>
        </div>
        <div className="bg-[#fbf2d8] p-5 rounded-3xl border border-[#f5e4b3]">
          <span className="text-xs font-bold text-[#8e6e16] uppercase tracking-wider">
            Próximo Herraje
          </span>
          <div className="text-2xl font-extrabold text-[#42330a] font-display mt-1">
            28 Noviembre
          </div>
          <p className="text-[11px] text-[#826b24] mt-0.5">Visita de herrador maestro programada</p>
        </div>
      </div>

      {/* Horses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {horses.map(horse => (
          <div
            key={horse.id}
            className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_22px_rgba(0,0,0,0.04)] border border-[#0d2f1f]/8 hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 w-full bg-stone-900">
                <img
                  src={horse.photo}
                  alt={horse.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="bg-black/60 backdrop-blur-xs text-[#e0a94b] text-xs font-mono font-bold px-2.5 py-1 rounded-xl">
                    {horse.tagNumber}
                  </span>
                  <span className="bg-[#6948ad] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                    {horse.reproductiveStatus === 'breeding'
                      ? 'Semental'
                      : horse.reproductiveStatus === 'pregnant'
                      ? 'Gestante'
                      : 'Trabajo / Vaquería'}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white flex items-end justify-between">
                  <div>
                    <h3 className="text-xl font-bold font-display">{horse.name}</h3>
                    <p className="text-xs text-stone-200">{horse.breed}</p>
                  </div>
                  <span className="text-base font-extrabold font-mono-nums">
                    {horse.weightKg} kg
                  </span>
                </div>
              </div>

              {/* Horse details */}
              <div className="p-4 space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-[#faf8f4] p-2.5 rounded-xl border border-stone-200/70">
                    <span className="text-stone-400 block text-[10px]">Padre:</span>
                    <span className="font-semibold text-stone-800 truncate block">
                      {horse.sire || 'Registro genético'}
                    </span>
                  </div>
                  <div className="bg-[#faf8f4] p-2.5 rounded-xl border border-stone-200/70">
                    <span className="text-stone-400 block text-[10px]">Madre:</span>
                    <span className="font-semibold text-stone-800 truncate block">
                      {horse.dam || 'Línea materna'}
                    </span>
                  </div>
                </div>

                <div className="p-2.5 bg-[#f6f4ee] rounded-xl text-stone-700 leading-relaxed text-[11px]">
                  {horse.notes}
                </div>

                <div className="border-t border-stone-100 pt-2 flex items-center justify-between text-[11px] text-stone-500">
                  <span>Vacunas aplicadas:</span>
                  <span className="font-bold text-emerald-800">
                    {horse.vaccinesApplied.length} vacunas al día
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <button
                onClick={() => setSelectedAnimal(horse)}
                className="w-full py-2.5 rounded-2xl bg-[#0c2a1a] hover:bg-[#153b26] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-[#e0a94b]" />
                <span>Expediente del Caballo</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
