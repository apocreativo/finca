import React, { useState } from 'react';
import { Egg, Plus, TrendingUp, AlertCircle, Calendar, DollarSign, Package, Edit, Trash2 } from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { Animal } from '../types/farm';
import { EditAnimalModal } from './EditAnimalModal';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

export const LayingHensView: React.FC = () => {
  const { animals, addEggCollectionRecord, setIsAddAnimalOpen, setSelectedAnimal, deleteAnimal } = useFarm();

  const layingFlocks = animals.filter(a => a.category === 'laying_hen');

  const [selectedFlockId, setSelectedFlockId] = useState(layingFlocks[0]?.id || '');
  const [eggsInput, setEggsInput] = useState('415');
  const [brokenInput, setBrokenInput] = useState('3');
  const [feedInput, setFeedInput] = useState('50');
  const [eggCratePrice, setEggCratePrice] = useState(16000); // COP per crate of 30 eggs
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Edit & Delete modals
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);
  const [animalToDelete, setAnimalToDelete] = useState<Animal | null>(null);

  const selectedFlock = layingFlocks.find(f => f.id === selectedFlockId) || layingFlocks[0];

  const totalBirds = layingFlocks.reduce((acc, curr) => acc + (curr.totalFlockCount || 0), 0);
  const totalEggsToday = layingFlocks.reduce((acc, curr) => {
    const todayRec = curr.eggCollectionHistory?.[0];
    return acc + (todayRec?.eggsCollected || 0);
  }, 0);
  const avgLayingPct = layingFlocks.length
    ? (layingFlocks.reduce((acc, curr) => acc + (curr.layingPercentage || 0), 0) / layingFlocks.length).toFixed(1)
    : '0';

  const totalCratesToday = Number((totalEggsToday / 30).toFixed(1));
  const estimatedDailyRevenue = totalCratesToday * eggCratePrice;

  const handleEggSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFlockId || !eggsInput) return;
    addEggCollectionRecord(
      selectedFlockId,
      Number(eggsInput),
      Number(brokenInput || 0),
      Number(feedInput || 0)
    );
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-2xl bg-[#fdf2da] text-[#8e6e16] flex items-center justify-center">
              <Egg className="w-4 h-4 fill-current" />
            </span>
            <h2 className="text-2xl font-bold font-display text-[#18291c]">
              Gallinas Ponedoras &amp; Postura
            </h2>
          </div>
          <p className="text-xs text-[#6e7e72] mt-0.5">
            Recolección diaria de huevos, porcentaje de postura, cartones/maples y consumo de alimento
          </p>
        </div>

        <button
          onClick={() => setIsAddAnimalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0c2a1a] hover:bg-[#163e27] text-white text-xs font-bold rounded-2xl shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#e0a94b]" />
          <span>Registrar Lote de Ponedoras</span>
        </button>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-[#fbf2d8] p-5 rounded-3xl border border-[#f5e4b3]">
          <span className="text-xs font-bold text-[#8e6e16] uppercase tracking-wider">
            Huevos Recolectados Hoy
          </span>
          <div className="text-3xl font-extrabold text-[#42330a] font-display mt-1 font-mono-nums">
            {totalEggsToday} Huevos
          </div>
          <p className="text-[11px] text-[#826b24] mt-0.5">
            {totalCratesToday} Cartones / Maples (30 und)
          </p>
        </div>

        <div className="bg-[#def7ed] p-5 rounded-3xl border border-[#c3edd9]">
          <span className="text-xs font-bold text-[#1e7e59] uppercase tracking-wider">
            % Postura Promedio
          </span>
          <div className="text-3xl font-extrabold text-[#0e3b29] font-display mt-1 font-mono-nums">
            {avgLayingPct}%
          </div>
          <p className="text-[11px] text-[#257755] mt-0.5">Excelente rendimiento Hy-Line/Lohmann</p>
        </div>

        <div className="bg-[#e3f0fc] p-5 rounded-3xl border border-[#cbe1f8]">
          <span className="text-xs font-bold text-[#246bb4] uppercase tracking-wider">
            Población en Galpones
          </span>
          <div className="text-3xl font-extrabold text-[#0e3763] font-display mt-1 font-mono-nums">
            {totalBirds} Aves
          </div>
          <p className="text-[11px] text-[#27649f] mt-0.5">2 galpones en producción activa</p>
        </div>

        <div className="bg-[#ece6fa] p-5 rounded-3xl border border-[#ded4f5]">
          <span className="text-xs font-bold text-[#6948ad] uppercase tracking-wider">
            Ingreso Diario Estimado
          </span>
          <div className="text-2xl font-extrabold text-[#29184d] font-display mt-1 font-mono-nums">
            ${estimatedDailyRevenue.toLocaleString()}
          </div>
          <p className="text-[11px] text-[#664b9e] mt-0.5">A ${eggCratePrice} COP/cartón</p>
        </div>
      </div>

      {/* Daily Egg Collection Form */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_4px_22px_rgba(0,0,0,0.04)] border border-[#0d2f1f]/8">
        <h3 className="text-base font-bold text-[#1a2c20] mb-4 flex items-center gap-2">
          <Egg className="w-5 h-5 text-[#c9983d]" />
          <span>Planilla de Recolección Diaria de Huevos</span>
        </h3>

        <form onSubmit={handleEggSubmit} className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-end text-xs">
          <div>
            <label className="block text-stone-700 font-semibold mb-1">
              Seleccionar Galpón
            </label>
            <select
              value={selectedFlockId}
              onChange={e => setSelectedFlockId(e.target.value)}
              className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 text-stone-900 font-semibold outline-none"
            >
              {layingFlocks.map(f => (
                <option key={f.id} value={f.id}>
                  {f.tagNumber} - {f.name} ({f.totalFlockCount} aves)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-stone-700 font-semibold mb-1">
              Huevos Buenos Recolectados
            </label>
            <input
              type="number"
              required
              value={eggsInput}
              onChange={e => setEggsInput(e.target.value)}
              className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 font-mono font-bold outline-none"
            />
          </div>

          <div>
            <label className="block text-stone-700 font-semibold mb-1">
              Huevos Rotos / Sucios
            </label>
            <input
              type="number"
              value={brokenInput}
              onChange={e => setBrokenInput(e.target.value)}
              className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 font-mono outline-none"
            />
          </div>

          <div>
            <label className="block text-stone-700 font-semibold mb-1">
              Alimento Consumido (kg)
            </label>
            <input
              type="number"
              step="0.5"
              value={feedInput}
              onChange={e => setFeedInput(e.target.value)}
              className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 font-mono outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#25633e] hover:bg-[#1b4b2e] text-white font-bold rounded-xl shadow-sm transition-all"
          >
            {savedSuccess ? '¡Guardado con Éxito!' : 'Registrar Postura'}
          </button>
        </form>
      </div>

      {/* Flocks Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {layingFlocks.map(flock => (
          <div
            key={flock.id}
            className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_22px_rgba(0,0,0,0.04)] border border-[#0d2f1f]/8 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 w-full bg-stone-900">
                <img
                  src={flock.photo}
                  alt={flock.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="bg-[#182a1d]/90 text-[#e0a94b] text-xs font-mono font-bold px-2.5 py-1 rounded-xl">
                    {flock.tagNumber}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setEditingAnimal(flock)}
                      className="w-7 h-7 rounded-lg bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
                      title="Editar lote y cambiar foto"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setAnimalToDelete(flock)}
                      className="w-7 h-7 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white flex items-center justify-center transition-colors"
                      title="Eliminar lote (doble confirmación)"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <span className="bg-[#8e6e16] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm ml-1">
                      {flock.layingPercentage}% Postura
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white flex items-end justify-between">
                  <div>
                    <h3 className="text-xl font-bold font-display">{flock.name}</h3>
                    <p className="text-xs text-stone-200">{flock.breed}</p>
                  </div>
                  <span className="text-sm font-bold bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                    {flock.totalFlockCount} Aves
                  </span>
                </div>
              </div>

              {/* History Table */}
              <div className="p-4 space-y-3 text-xs">
                <h4 className="font-bold text-stone-800">Historial Reciente de Postura</h4>
                <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#faf8f4] text-stone-500 font-semibold border-b border-stone-200">
                      <tr>
                        <th className="py-2 px-3">Fecha</th>
                        <th className="py-2 px-3">Huevos</th>
                        <th className="py-2 px-3">Maples</th>
                        <th className="py-2 px-3">Rotos</th>
                        <th className="py-2 px-3">Alimento</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 font-mono-nums">
                      {(flock.eggCollectionHistory || []).map((rec, i) => (
                        <tr key={i} className="hover:bg-amber-50/40">
                          <td className="py-2 px-3 text-stone-700">{rec.date}</td>
                          <td className="py-2 px-3 font-bold text-stone-900">{rec.eggsCollected}</td>
                          <td className="py-2 px-3 text-amber-800 font-bold">{rec.crates}</td>
                          <td className="py-2 px-3 text-red-600">{rec.brokenEggs}</td>
                          <td className="py-2 px-3 text-stone-600">{rec.feedConsumedKg} kg</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-[11px] text-stone-500 italic bg-[#faf8f4] p-2.5 rounded-xl border border-stone-100">
                  {flock.notes}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Flock Modal */}
      <EditAnimalModal
        animal={editingAnimal}
        isOpen={Boolean(editingAnimal)}
        onClose={() => setEditingAnimal(null)}
      />

      {/* Double Confirmation Modal */}
      {animalToDelete && (
        <ConfirmDeleteModal
          isOpen={Boolean(animalToDelete)}
          title="¿Eliminar Lote de Gallinas Ponedoras?"
          itemName={animalToDelete.name}
          itemType="lote de aves"
          itemTag={`${animalToDelete.tagNumber} · ${animalToDelete.totalFlockCount} aves`}
          warningMessage={`Estás a punto de eliminar el lote "${animalToDelete.name}" (${animalToDelete.tagNumber}). Se purgarán permanentemente todas las estadísticas de postura y recolección asociadas.`}
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
