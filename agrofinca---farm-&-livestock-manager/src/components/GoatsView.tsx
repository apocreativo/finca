import React, { useState } from 'react';
import { Milk, Plus, Award, Calendar, Eye, Heart, ShieldAlert, Edit, Trash2 } from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { Animal } from '../types/farm';
import { EditAnimalModal } from './EditAnimalModal';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

export const GoatsView: React.FC = () => {
  const { animals, setSelectedAnimal, setIsAddAnimalOpen, setIsAddEventOpen, addMilkRecord, deleteAnimal } = useFarm();

  const goats = animals.filter(a => a.category === 'goat');
  const dairyGoats = goats.filter(g => g.goatPurpose === 'milk');
  const meatGoats = goats.filter(g => g.goatPurpose === 'meat');

  const totalGoatMilkToday = dairyGoats.reduce(
    (acc, curr) => acc + (curr.dailyMilkLiters || 0),
    0
  );

  const [selectedGoatId, setSelectedGoatId] = useState(dairyGoats[0]?.id || '');
  const [morningLiters, setMorningLiters] = useState('2.0');
  const [eveningLiters, setEveningLiters] = useState('1.6');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Edit & Delete modals
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);
  const [animalToDelete, setAnimalToDelete] = useState<Animal | null>(null);

  const handleGoatMilkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGoatId) return;
    addMilkRecord(selectedGoatId, Number(morningLiters), Number(eveningLiters));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-2xl bg-[#e3f0fc] text-[#246bb4] flex items-center justify-center">
              <Milk className="w-4 h-4" />
            </span>
            <h2 className="text-2xl font-bold font-display text-[#18291c]">
              Chivos &amp; Cabras (Explotación Caprina)
            </h2>
          </div>
          <p className="text-xs text-[#6e7e72] mt-0.5">
            Ordeño de leche de cabra, cría de padrotes Boer de carne, partos y desparasitaciones
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setIsAddEventOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold rounded-2xl shadow-xs transition-all"
          >
            <Calendar className="w-3.5 h-3.5 text-[#25633e]" />
            <span>Desparasitar / Recorte Pezuñas</span>
          </button>
          <button
            onClick={() => setIsAddAnimalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#0c2a1a] hover:bg-[#163e27] text-white text-xs font-bold rounded-2xl shadow-md transition-all"
          >
            <Plus className="w-4 h-4 text-[#e0a94b]" />
            <span>Registrar Chivo / Cabra</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-[#e3f0fc] p-5 rounded-3xl border border-[#cbe1f8]">
          <span className="text-xs font-bold text-[#246bb4] uppercase tracking-wider">
            Total Caprinos
          </span>
          <div className="text-3xl font-extrabold text-[#0e3763] font-display mt-1 font-mono-nums">
            {goats.length} Ejemplares
          </div>
          <p className="text-[11px] text-[#27649f] mt-0.5">Saanen, Alpina y Boer</p>
        </div>

        <div className="bg-[#def7ed] p-5 rounded-3xl border border-[#c3edd9]">
          <span className="text-xs font-bold text-[#1e7e59] uppercase tracking-wider">
            Leche de Cabra Hoy
          </span>
          <div className="text-3xl font-extrabold text-[#0e3b29] font-display mt-1 font-mono-nums">
            {totalGoatMilkToday.toFixed(1)} Litros
          </div>
          <p className="text-[11px] text-[#257755] mt-0.5">Destinada a quesos madurados</p>
        </div>

        <div className="bg-[#fdf1e2] p-5 rounded-3xl border border-[#fae2c6]">
          <span className="text-xs font-bold text-[#995924] uppercase tracking-wider">
            Padrotes de Carne
          </span>
          <div className="text-3xl font-extrabold text-[#3b2311] font-display mt-1 font-mono-nums">
            {meatGoats.length} Machos Boer
          </div>
          <p className="text-[11px] text-[#8a572c] mt-0.5">Genética sudafricana pura</p>
        </div>

        <div className="bg-[#fbf2d8] p-5 rounded-3xl border border-[#f5e4b3]">
          <span className="text-xs font-bold text-[#8e6e16] uppercase tracking-wider">
            Tasa de Prolificidad
          </span>
          <div className="text-2xl font-extrabold text-[#42330a] font-display mt-1 font-mono-nums">
            2.0 Cabritos/Parto
          </div>
          <p className="text-[11px] text-[#826b24] mt-0.5">Partos dobles frecuentes</p>
        </div>
      </div>

      {/* Goat Milking Register */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_4px_22px_rgba(0,0,0,0.04)] border border-[#0d2f1f]/8">
        <h3 className="text-base font-bold text-[#1a2c20] mb-4 flex items-center gap-2">
          <Milk className="w-5 h-5 text-[#246bb4]" />
          <span>Control de Ordeño Caprino Diario</span>
        </h3>

        <form onSubmit={handleGoatMilkSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end text-xs">
          <div>
            <label className="block text-stone-700 font-semibold mb-1">
              Seleccionar Cabra Lechera
            </label>
            <select
              value={selectedGoatId}
              onChange={e => setSelectedGoatId(e.target.value)}
              className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 text-stone-900 font-semibold outline-none"
            >
              {dairyGoats.map(g => (
                <option key={g.id} value={g.id}>
                  {g.tagNumber} - {g.name} ({g.breed})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-stone-700 font-semibold mb-1">
              Ordeño Mañana (Litros)
            </label>
            <input
              type="number"
              step="0.1"
              required
              value={morningLiters}
              onChange={e => setMorningLiters(e.target.value)}
              className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 font-mono font-bold outline-none"
            />
          </div>

          <div>
            <label className="block text-stone-700 font-semibold mb-1">
              Ordeño Tarde (Litros)
            </label>
            <input
              type="number"
              step="0.1"
              required
              value={eveningLiters}
              onChange={e => setEveningLiters(e.target.value)}
              className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 font-mono font-bold outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#25633e] hover:bg-[#1b4b2e] text-white font-bold rounded-xl shadow-sm transition-all"
          >
            {savedSuccess ? '¡Guardado con Éxito!' : 'Registrar Ordeño Caprino'}
          </button>
        </form>
      </div>

      {/* Goats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {goats.map(goat => (
          <div
            key={goat.id}
            className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_22px_rgba(0,0,0,0.04)] border border-[#0d2f1f]/8 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 w-full bg-stone-900">
                <img
                  src={goat.photo}
                  alt={goat.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="bg-[#182a1d]/90 text-[#e0a94b] text-xs font-mono font-bold px-2.5 py-1 rounded-xl">
                    {goat.tagNumber}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setEditingAnimal(goat)}
                      className="w-7 h-7 rounded-lg bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
                      title="Editar caprino y cambiar foto"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setAnimalToDelete(goat)}
                      className="w-7 h-7 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white flex items-center justify-center transition-colors"
                      title="Eliminar caprino (doble confirmación)"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm ml-1 ${
                        goat.goatPurpose === 'milk'
                          ? 'bg-blue-600 text-white'
                          : 'bg-amber-600 text-white'
                      }`}
                    >
                      {goat.goatPurpose === 'milk' ? '🥛 Leche' : '🥩 Carne / Padrote'}
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white flex items-end justify-between">
                  <div>
                    <h3 className="text-xl font-bold font-display">{goat.name}</h3>
                    <p className="text-xs text-stone-200">{goat.breed}</p>
                  </div>
                  <span className="text-base font-extrabold font-mono text-white">
                    {goat.weightKg} kg
                  </span>
                </div>
              </div>

              {/* Details & Kidding history */}
              <div className="p-4 space-y-3 text-xs">
                {goat.goatPurpose === 'milk' && (
                  <div className="p-2.5 bg-[#e3f0fc] rounded-2xl flex items-center justify-between border border-[#cbe1f8]">
                    <span className="font-semibold text-[#0e3763]">Producción Láctea:</span>
                    <span className="font-extrabold font-mono text-sm text-[#0e3763]">
                      {goat.dailyMilkLiters} L / día
                    </span>
                  </div>
                )}

                {goat.kiddingHistory && goat.kiddingHistory.length > 0 && (
                  <div>
                    <span className="font-bold text-stone-700 block mb-1">
                      Registro de Partos:
                    </span>
                    <div className="space-y-1">
                      {goat.kiddingHistory.map((k, idx) => (
                        <div
                          key={idx}
                          className="p-2 bg-[#faf8f4] rounded-xl border border-stone-200 text-[11px] flex items-center justify-between"
                        >
                          <span>{k.date}:</span>
                          <span className="font-bold text-emerald-800">
                            {k.kidsCount} cabritos ({k.avgBirthWeightKg} kg prom)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-[11px] text-stone-600 italic bg-[#faf8f4] p-2.5 rounded-xl border border-stone-100">
                  {goat.notes}
                </p>
              </div>
            </div>

            <div className="p-4 pt-0">
              <button
                onClick={() => setSelectedAnimal(goat)}
                className="w-full py-2.5 rounded-2xl bg-[#0c2a1a] hover:bg-[#153b26] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-[#e0a94b]" />
                <span>Expediente Caprino</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Goat Modal */}
      <EditAnimalModal
        animal={editingAnimal}
        isOpen={Boolean(editingAnimal)}
        onClose={() => setEditingAnimal(null)}
      />

      {/* Double Confirmation Modal */}
      {animalToDelete && (
        <ConfirmDeleteModal
          isOpen={Boolean(animalToDelete)}
          title="¿Eliminar Registro Caprino?"
          itemName={animalToDelete.name}
          itemType="chivo / cabra"
          itemTag={`${animalToDelete.tagNumber} · ${animalToDelete.breed}`}
          warningMessage={`Estás a punto de eliminar a "${animalToDelete.name}" (${animalToDelete.tagNumber}). Se purgarán permanentemente todas las producciones de leche y registros de partos de la finca.`}
          onConfirm={() => {
            deleteAnimal(animalToDelete.id);
            setAnimalToDelete(null);
          }}
          onCancel={() => setAnimalToDelete(null)}
        />
      )}
    </div>
  );
};
