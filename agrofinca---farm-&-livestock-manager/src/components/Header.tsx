import React, { useState } from 'react';
import { Search, Bell, Plus, CheckCircle, Calendar, Sparkles } from 'lucide-react';
import { useFarm } from '../context/FarmContext';

export const Header: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    animals,
    lots,
    setSelectedAnimal,
    setIsAddAnimalOpen,
    setIsAddEventOpen,
    setIsAddCropOpen
  } = useFarm();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickMenu, setShowQuickMenu] = useState(false);

  // Search filtered matches
  const trimmed = searchQuery.trim().toLowerCase();
  const matchedAnimals = trimmed
    ? animals.filter(
        a =>
          a.name.toLowerCase().includes(trimmed) ||
          a.tagNumber.toLowerCase().includes(trimmed) ||
          a.breed.toLowerCase().includes(trimmed)
      ).slice(0, 4)
    : [];

  const matchedLots = trimmed
    ? lots.filter(l => l.name.toLowerCase().includes(trimmed)).slice(0, 2)
    : [];

  return (
    <header className="h-18 px-8 flex items-center justify-between border-b border-[#0d2f1f]/5 bg-[#f6f4ee] sticky top-0 z-30">
      {/* Search Input Bar */}
      <div className="relative w-full max-w-md">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-[#8a998e] absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar lote o animal..."
            className="w-full bg-[#eae6dc]/80 hover:bg-[#eae6dc] focus:bg-white text-sm text-[#1e2a22] placeholder-[#859489] rounded-2xl pl-10 pr-4 py-2.5 outline-none border border-[#d8d3c5] focus:border-[#c9983d] transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-xs text-[#859489] hover:text-[#1e2a22]"
            >
              ✕
            </button>
          )}
        </div>

        {/* Live Search Popup */}
        {trimmed && (
          <div className="absolute top-12 left-0 right-0 bg-white rounded-2xl shadow-xl border border-[#0d2f1f]/10 p-3 z-50 animate-in fade-in slide-in-from-top-2">
            <p className="text-[11px] font-semibold text-[#7c8b80] uppercase px-2 mb-1.5">
              Resultados de búsqueda
            </p>
            {matchedAnimals.length === 0 && matchedLots.length === 0 ? (
              <p className="text-xs text-stone-500 py-3 text-center">
                No se encontraron animales ni lotes para &quot;{searchQuery}&quot;
              </p>
            ) : (
              <div className="space-y-1">
                {matchedAnimals.map(anim => (
                  <button
                    key={anim.id}
                    onClick={() => {
                      setSelectedAnimal(anim);
                      setSearchQuery('');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#f6f4ee] flex items-center gap-3 transition-colors"
                  >
                    <img
                      src={anim.photo}
                      alt={anim.name}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#182a1d]">{anim.name}</span>
                        <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-stone-100 text-stone-600">
                          {anim.tagNumber}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#718276] truncate">
                        {anim.breed} · {anim.lotName}
                      </p>
                    </div>
                  </button>
                ))}
                {matchedLots.map(lot => (
                  <div
                    key={lot.id}
                    className="px-3 py-2 rounded-xl bg-emerald-50/60 flex items-center justify-between text-xs"
                  >
                    <span className="font-semibold text-emerald-900">{lot.name}</span>
                    <span className="text-emerald-700">{lot.animalCount} animales</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Quick Add Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowQuickMenu(!showQuickMenu)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0c2a1a] hover:bg-[#123824] text-[#f2ede4] text-xs font-semibold shadow-sm transition-all"
          >
            <Plus className="w-4 h-4 text-[#e3aa4a]" />
            <span>+ Registrar</span>
          </button>

          {showQuickMenu && (
            <div className="absolute right-0 top-11 w-52 bg-white rounded-2xl shadow-xl border border-stone-200 py-1.5 z-50 text-xs">
              <button
                onClick={() => {
                  setShowQuickMenu(false);
                  setIsAddAnimalOpen(true);
                }}
                className="w-full text-left px-4 py-2.5 hover:bg-stone-50 flex items-center gap-2 text-stone-800"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Nuevo Animal (Vaca / Caballo)</span>
              </button>
              <button
                onClick={() => {
                  setShowQuickMenu(false);
                  setIsAddEventOpen(true);
                }}
                className="w-full text-left px-4 py-2.5 hover:bg-stone-50 flex items-center gap-2 text-stone-800"
              >
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Cita Vacuna / Fumigación</span>
              </button>
              <button
                onClick={() => {
                  setShowQuickMenu(false);
                  setIsAddCropOpen(true);
                }}
                className="w-full text-left px-4 py-2.5 hover:bg-stone-50 flex items-center gap-2 text-stone-800"
              >
                <CheckCircle className="w-4 h-4 text-lime-600" />
                <span>Nueva Siembra / Parcela</span>
              </button>
            </div>
          )}
        </div>

        {/* User Profile Pill matching screenshot */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-[#ece7dd] hover:bg-[#e4decb] transition-colors cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-[#274431] text-[#e8c88f] flex items-center justify-center text-xs font-bold shadow-sm">
            JC
          </div>
          <span className="text-xs font-semibold text-[#1f2b22]">Juan Carlos</span>
        </div>

        {/* Notifications Bell matching screenshot */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[#37493d] hover:bg-[#ece7dc] transition-colors relative"
            title="Notificaciones"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#d9534f]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-11 w-80 bg-white rounded-2xl shadow-xl border border-stone-200 p-4 z-50 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <span className="font-bold text-stone-900">Alertas de la Finca</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                  3 Activas
                </span>
              </div>
              <div className="space-y-3 mt-3">
                <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-100">
                  <p className="font-semibold text-amber-900">Vacunación Fiebre Aftosa</p>
                  <p className="text-[11px] text-amber-700 mt-0.5">
                    Lote Lechero programado en 14 días. 120 dosis requeridas.
                  </p>
                </div>
                <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
                  <p className="font-semibold text-emerald-900">Cosecha de Tomate</p>
                  <p className="text-[11px] text-emerald-700 mt-0.5">
                    Parcela Sur lista para corte el 25 de noviembre.
                  </p>
                </div>
                <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="font-semibold text-blue-900">Herraje Caballos</p>
                  <p className="text-[11px] text-blue-700 mt-0.5">
                    Visita del herrador programada para Azabache y Centinela.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
