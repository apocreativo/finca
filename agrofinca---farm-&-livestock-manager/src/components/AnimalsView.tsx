import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Milk,
  Scale,
  Calendar,
  Eye,
  CheckCircle2,
  Syringe
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { AnimalCategory, Animal } from '../types/farm';

export const AnimalsView: React.FC = () => {
  const { animals, setSelectedAnimal, setIsAddAnimalOpen, lots } = useFarm();

  const [categoryFilter, setCategoryFilter] = useState<'all' | AnimalCategory>('all');
  const [selectedLotFilter, setSelectedLotFilter] = useState<string>('all');
  const [localSearch, setLocalSearch] = useState('');

  // Filter animals
  const filteredAnimals = animals.filter(animal => {
    if (categoryFilter !== 'all' && animal.category !== categoryFilter) return false;
    if (selectedLotFilter !== 'all' && animal.lotId !== selectedLotFilter) return false;
    if (localSearch) {
      const q = localSearch.toLowerCase();
      return (
        animal.name.toLowerCase().includes(q) ||
        animal.tagNumber.toLowerCase().includes(q) ||
        animal.breed.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const dairyCount = animals.filter(a => a.category === 'dairy').length;
  const beefCount = animals.filter(a => a.category === 'beef').length;
  const horseCount = animals.filter(a => a.category === 'horse').length;
  const henCount = animals.filter(a => a.category === 'laying_hen').length;
  const broilerCount = animals.filter(a => a.category === 'broiler').length;
  const goatCount = animals.filter(a => a.category === 'goat').length;
  const pigCount = animals.filter(a => a.category === 'pig').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-[#18291c]">
            Catálogo y Registro de Animales
          </h2>
          <p className="text-xs text-[#6e7e72] mt-0.5">
            Vacas (leche/carne), caballos, gallinas ponedoras, pollos de engorde, chivos y cochinos
          </p>
        </div>

        <button
          onClick={() => setIsAddAnimalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0c2a1a] hover:bg-[#163e27] text-white text-xs font-bold rounded-2xl shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#e0a94b]" />
          <span>Registrar Nuevo Animal</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-3xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#0d2f1f]/8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs font-medium">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-2xl transition-all whitespace-nowrap ${
              categoryFilter === 'all'
                ? 'bg-[#0c2a1a] text-white font-bold shadow-xs'
                : 'bg-[#faf8f4] text-stone-600 hover:bg-stone-100'
            }`}
          >
            Todos ({animals.length})
          </button>
          <button
            onClick={() => setCategoryFilter('dairy')}
            className={`px-3 py-1.5 rounded-2xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              categoryFilter === 'dairy'
                ? 'bg-[#e2f0fc] text-[#0e3763] border border-[#246bb4] font-bold shadow-xs'
                : 'bg-[#faf8f4] text-stone-600 hover:bg-stone-100'
            }`}
          >
            <span>🥛 Lecheras ({dairyCount})</span>
          </button>
          <button
            onClick={() => setCategoryFilter('beef')}
            className={`px-3 py-1.5 rounded-2xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              categoryFilter === 'beef'
                ? 'bg-[#fdf1e2] text-[#4d290c] border border-[#b06f2e] font-bold shadow-xs'
                : 'bg-[#faf8f4] text-stone-600 hover:bg-stone-100'
            }`}
          >
            <span>🥩 Carne ({beefCount})</span>
          </button>
          <button
            onClick={() => setCategoryFilter('horse')}
            className={`px-3 py-1.5 rounded-2xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              categoryFilter === 'horse'
                ? 'bg-[#ece6fa] text-[#2c1757] border border-[#6948ad] font-bold shadow-xs'
                : 'bg-[#faf8f4] text-stone-600 hover:bg-stone-100'
            }`}
          >
            <span>⭐ Caballos ({horseCount})</span>
          </button>
          <button
            onClick={() => setCategoryFilter('laying_hen')}
            className={`px-3 py-1.5 rounded-2xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              categoryFilter === 'laying_hen'
                ? 'bg-[#fbf2d8] text-[#8e6e16] border border-[#8e6e16] font-bold shadow-xs'
                : 'bg-[#faf8f4] text-stone-600 hover:bg-stone-100'
            }`}
          >
            <span>🥚 Ponedoras ({henCount})</span>
          </button>
          <button
            onClick={() => setCategoryFilter('broiler')}
            className={`px-3 py-1.5 rounded-2xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              categoryFilter === 'broiler'
                ? 'bg-[#def7ed] text-[#0e3b29] border border-[#1e7e59] font-bold shadow-xs'
                : 'bg-[#faf8f4] text-stone-600 hover:bg-stone-100'
            }`}
          >
            <span>🍗 Engorde ({broilerCount})</span>
          </button>
          <button
            onClick={() => setCategoryFilter('goat')}
            className={`px-3 py-1.5 rounded-2xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              categoryFilter === 'goat'
                ? 'bg-[#e3f0fc] text-[#0e3763] border border-[#246bb4] font-bold shadow-xs'
                : 'bg-[#faf8f4] text-stone-600 hover:bg-stone-100'
            }`}
          >
            <span>🐐 Chivos ({goatCount})</span>
          </button>
          <button
            onClick={() => setCategoryFilter('pig')}
            className={`px-3 py-1.5 rounded-2xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              categoryFilter === 'pig'
                ? 'bg-[#fdf1e2] text-[#995924] border border-[#b06f2e] font-bold shadow-xs'
                : 'bg-[#faf8f4] text-stone-600 hover:bg-stone-100'
            }`}
          >
            <span>🐷 Cochinos ({pigCount})</span>
          </button>
        </div>

        {/* Search & Lot selector */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex-1 md:w-56">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={localSearch}
              onChange={e => setLocalSearch(e.target.value)}
              placeholder="Buscar arete o nombre..."
              className="w-full bg-[#f6f4ee] text-xs rounded-xl pl-8 pr-3 py-2 outline-none border border-stone-200 focus:border-[#c9983d]"
            />
          </div>

          <select
            value={selectedLotFilter}
            onChange={e => setSelectedLotFilter(e.target.value)}
            className="bg-[#f6f4ee] border border-stone-200 text-xs rounded-xl px-3 py-2 text-stone-700 outline-none"
          >
            <option value="all">Todos los lotes</option>
            {lots.map(l => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Animals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAnimals.map(animal => (
          <div
            key={animal.id}
            className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#0d2f1f]/8 hover:shadow-lg transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Photo & Badges Header */}
              <div className="relative h-44 w-full bg-stone-900 overflow-hidden">
                <img
                  src={animal.photo}
                  alt={animal.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Top badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="bg-[#182a1d]/90 backdrop-blur-xs text-[#e8c88f] text-xs font-bold font-mono px-2.5 py-1 rounded-xl shadow-sm border border-[#e8c88f]/30">
                    {animal.tagNumber}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs shadow-sm ${
                      animal.category === 'dairy'
                        ? 'bg-blue-600/90 text-white'
                        : animal.category === 'beef'
                        ? 'bg-amber-600/90 text-white'
                        : animal.category === 'horse'
                        ? 'bg-purple-600/90 text-white'
                        : animal.category === 'laying_hen'
                        ? 'bg-yellow-600/90 text-white'
                        : animal.category === 'broiler'
                        ? 'bg-emerald-600/90 text-white'
                        : animal.category === 'goat'
                        ? 'bg-cyan-600/90 text-white'
                        : 'bg-rose-600/90 text-white'
                    }`}
                  >
                    {animal.category === 'dairy'
                      ? 'Leche Bovina'
                      : animal.category === 'beef'
                      ? 'Carne / Ceba'
                      : animal.category === 'horse'
                      ? 'Caballo'
                      : animal.category === 'laying_hen'
                      ? 'Gallina Ponedora'
                      : animal.category === 'broiler'
                      ? 'Pollo de Engorde'
                      : animal.category === 'goat'
                      ? 'Chivo / Cabra'
                      : 'Cochino / Cerdo'}
                  </span>
                </div>

                {/* Bottom photo overlay */}
                <div className="absolute bottom-3 left-3 right-3 text-white flex items-end justify-between">
                  <div>
                    <h3 className="text-lg font-bold font-display">{animal.name}</h3>
                    <p className="text-xs text-stone-300 font-medium">
                      {animal.breed} · {animal.lotName}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-extrabold font-mono-nums">
                      {animal.weightKg} kg
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-4 space-y-3 text-xs">
                {/* Specific metric depending on category */}
                {animal.category === 'dairy' && (
                  <div className="p-2.5 bg-[#e3f0fc] rounded-2xl flex items-center justify-between border border-[#cbe1f8]">
                    <div className="flex items-center gap-2 text-[#0e3763]">
                      <Milk className="w-4 h-4 text-[#246bb4]" />
                      <span className="font-semibold">Producción Diaria:</span>
                    </div>
                    <span className="font-extrabold font-mono text-sm text-[#0e3763]">
                      {animal.dailyMilkLiters || 22.0} L / día
                    </span>
                  </div>
                )}

                {animal.category === 'beef' && (
                  <div className="p-2.5 bg-[#def7ed] rounded-2xl flex items-center justify-between border border-[#c3edd9]">
                    <div className="flex items-center gap-2 text-[#0e3b29]">
                      <Scale className="w-4 h-4 text-[#1e7e59]" />
                      <span className="font-semibold">Ganancia de Peso (GMD):</span>
                    </div>
                    <span className="font-extrabold font-mono text-sm text-[#0e3b29]">
                      +1.3 kg / día
                    </span>
                  </div>
                )}

                {animal.category === 'horse' && (
                  <div className="p-2.5 bg-[#ece6fa] rounded-2xl flex items-center justify-between border border-[#ded4f5]">
                    <div className="flex items-center gap-2 text-[#29184d]">
                      <Calendar className="w-4 h-4 text-[#6948ad]" />
                      <span className="font-semibold">Uso / Aptitud:</span>
                    </div>
                    <span className="font-bold text-xs text-[#29184d] capitalize">
                      {animal.reproductiveStatus || 'Paso / Trabajo'}
                    </span>
                  </div>
                )}

                {animal.category === 'laying_hen' && (
                  <div className="p-2.5 bg-[#fbf2d8] rounded-2xl flex items-center justify-between border border-[#f5e4b3]">
                    <div className="flex items-center gap-2 text-[#42330a]">
                      <span className="text-sm">🥚</span>
                      <span className="font-semibold">% Postura / Huevos:</span>
                    </div>
                    <span className="font-extrabold font-mono text-sm text-[#42330a]">
                      {animal.layingPercentage || 91}% Postura
                    </span>
                  </div>
                )}

                {animal.category === 'broiler' && (
                  <div className="p-2.5 bg-[#def7ed] rounded-2xl flex items-center justify-between border border-[#c3edd9]">
                    <div className="flex items-center gap-2 text-[#0e3b29]">
                      <span className="text-sm">🍗</span>
                      <span className="font-semibold">Conversión Alimenticia:</span>
                    </div>
                    <span className="font-extrabold font-mono text-sm text-[#0e3b29]">
                      {animal.feedConversionRatio || 1.62} FCR
                    </span>
                  </div>
                )}

                {animal.category === 'goat' && (
                  <div className="p-2.5 bg-[#e3f0fc] rounded-2xl flex items-center justify-between border border-[#cbe1f8]">
                    <div className="flex items-center gap-2 text-[#0e3763]">
                      <span className="text-sm">🐐</span>
                      <span className="font-semibold">Aptitud:</span>
                    </div>
                    <span className="font-bold text-xs text-[#0e3763]">
                      {animal.goatPurpose === 'milk'
                        ? `${animal.dailyMilkLiters} L leche/día`
                        : 'Carne Boer'}
                    </span>
                  </div>
                )}

                {animal.category === 'pig' && (
                  <div className="p-2.5 bg-[#fdf1e2] rounded-2xl flex items-center justify-between border border-[#fae2c6]">
                    <div className="flex items-center gap-2 text-[#3b2311]">
                      <span className="text-sm">🐷</span>
                      <span className="font-semibold">Fase / Estado:</span>
                    </div>
                    <span className="font-bold text-xs text-[#3b2311] capitalize">
                      {animal.pigStage === 'farrowing'
                        ? '🤱 Maternidad con lechones'
                        : animal.pigStage === 'fattening'
                        ? '🥩 Ceba a 110 kg'
                        : '🐗 Semental reproductor'}
                    </span>
                  </div>
                )}

                {/* Pedigree & Vaccines Count */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-[#55665b]">
                  <div className="bg-[#f7f5ee] p-2 rounded-xl border border-stone-200/60">
                    <span className="text-stone-400 block text-[10px]">Padre:</span>
                    <span className="font-semibold text-stone-800 truncate block">
                      {animal.sire || 'No registrado'}
                    </span>
                  </div>
                  <div className="bg-[#f7f5ee] p-2 rounded-xl border border-stone-200/60">
                    <span className="text-stone-400 block text-[10px]">Vacunas:</span>
                    <span className="font-semibold text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{animal.vaccinesApplied.length} aplicadas</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 pt-0">
              <button
                onClick={() => setSelectedAnimal(animal)}
                className="w-full py-2.5 rounded-2xl bg-[#0c2a1a] hover:bg-[#153b26] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-[#e0a94b]" />
                <span>Ver Expediente Completo</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
