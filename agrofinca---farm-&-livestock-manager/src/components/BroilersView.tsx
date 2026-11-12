import React, { useState } from 'react';
import { Scale, Plus, TrendingUp, AlertTriangle, Calendar, DollarSign, Activity, Edit, Trash2 } from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { Animal } from '../types/farm';
import { EditAnimalModal } from './EditAnimalModal';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

export const BroilersView: React.FC = () => {
  const { animals, addBroilerSampleRecord, setIsAddAnimalOpen, deleteAnimal } = useFarm();

  const broilerBatches = animals.filter(a => a.category === 'broiler');

  const [selectedBatchId, setSelectedBatchId] = useState(broilerBatches[0]?.id || '');
  const [weekInput, setWeekInput] = useState('6');
  const [ageDaysInput, setAgeDaysInput] = useState('38');
  const [weightGramsInput, setWeightGramsInput] = useState('2450');
  const [mortalityInput, setMortalityInput] = useState('1');
  const [feedKgInput, setFeedKgInput] = useState('720');
  const [liveChickenPricePerKg, setLiveChickenPricePerKg] = useState(7200); // COP per kg live chicken
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Edit & Delete modals
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);
  const [animalToDelete, setAnimalToDelete] = useState<Animal | null>(null);

  const selectedBatch = broilerBatches.find(b => b.id === selectedBatchId) || broilerBatches[0];

  const totalBroilers = broilerBatches.reduce((acc, curr) => acc + (curr.broilerBatchSize || 0), 0);
  const totalBiomassKg = broilerBatches.reduce(
    (acc, curr) => acc + (curr.broilerBatchSize || 0) * (curr.weightKg || 0),
    0
  );
  const estimatedBatchValue = totalBiomassKg * liveChickenPricePerKg;

  const handleSampleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBatchId || !weightGramsInput) return;
    addBroilerSampleRecord(
      selectedBatchId,
      Number(weekInput),
      Number(ageDaysInput),
      Number(weightGramsInput),
      Number(mortalityInput || 0),
      Number(feedKgInput || 0)
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
            <span className="w-8 h-8 rounded-2xl bg-[#def7ed] text-[#1e7e59] flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </span>
            <h2 className="text-2xl font-bold font-display text-[#18291c]">
              Gallinas &amp; Pollos de Engorde (Ceba Aviar)
            </h2>
          </div>
          <p className="text-xs text-[#6e7e72] mt-0.5">
            Control de lotes, conversión alimenticia (FCR), muestreo de pesos semanales y fecha de beneficio
          </p>
        </div>

        <button
          onClick={() => setIsAddAnimalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0c2a1a] hover:bg-[#163e27] text-white text-xs font-bold rounded-2xl shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#e0a94b]" />
          <span>Registrar Lote de Engorde</span>
        </button>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-[#def7ed] p-5 rounded-3xl border border-[#c3edd9]">
          <span className="text-xs font-bold text-[#1e7e59] uppercase tracking-wider">
            Total Pollos en Ceba
          </span>
          <div className="text-3xl font-extrabold text-[#0e3b29] font-display mt-1 font-mono-nums">
            {totalBroilers} Aves
          </div>
          <p className="text-[11px] text-[#257755] mt-0.5">2 lotes en distintas fases</p>
        </div>

        <div className="bg-[#fbf2d8] p-5 rounded-3xl border border-[#f5e4b3]">
          <span className="text-xs font-bold text-[#8e6e16] uppercase tracking-wider">
            Conversión Alimenticia (FCR)
          </span>
          <div className="text-3xl font-extrabold text-[#42330a] font-display mt-1 font-mono-nums">
            1.62
          </div>
          <p className="text-[11px] text-[#826b24] mt-0.5">1.62 kg alimento por kg de carne</p>
        </div>

        <div className="bg-[#e3f0fc] p-5 rounded-3xl border border-[#cbe1f8]">
          <span className="text-xs font-bold text-[#246bb4] uppercase tracking-wider">
            Biomasa en Pie Total
          </span>
          <div className="text-3xl font-extrabold text-[#0e3763] font-display mt-1 font-mono-nums">
            {totalBiomassKg.toFixed(0)} kg
          </div>
          <p className="text-[11px] text-[#27649f] mt-0.5">Peso vivo acumulado en galpones</p>
        </div>

        <div className="bg-[#fdf1e2] p-5 rounded-3xl border border-[#fae2c6]">
          <span className="text-xs font-bold text-[#995924] uppercase tracking-wider">
            Valoración Lote Listo
          </span>
          <div className="text-2xl font-extrabold text-[#3b2311] font-display mt-1 font-mono-nums">
            ${estimatedBatchValue.toLocaleString()}
          </div>
          <p className="text-[11px] text-[#8a572c] mt-0.5">A ${liveChickenPricePerKg} COP/kg vivo</p>
        </div>
      </div>

      {/* Weekly Weight Sampling Form */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_4px_22px_rgba(0,0,0,0.04)] border border-[#0d2f1f]/8">
        <h3 className="text-base font-bold text-[#1a2c20] mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#1e7e59]" />
          <span>Registrar Muestreo de Peso Semanal</span>
        </h3>

        <form onSubmit={handleSampleSubmit} className="grid grid-cols-1 sm:grid-cols-6 gap-3 items-end text-xs">
          <div className="sm:col-span-2">
            <label className="block text-stone-700 font-semibold mb-1">
              Seleccionar Lote
            </label>
            <select
              value={selectedBatchId}
              onChange={e => setSelectedBatchId(e.target.value)}
              className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 text-stone-900 font-semibold outline-none"
            >
              {broilerBatches.map(b => (
                <option key={b.id} value={b.id}>
                  {b.tagNumber} - {b.name} ({b.broilerBatchSize} pollos)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-stone-700 font-semibold mb-1">
              Edad (Días de vida)
            </label>
            <input
              type="number"
              required
              value={ageDaysInput}
              onChange={e => setAgeDaysInput(e.target.value)}
              className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 font-mono font-bold outline-none"
            />
          </div>

          <div>
            <label className="block text-stone-700 font-semibold mb-1">
              Peso Promedio (Gramos)
            </label>
            <input
              type="number"
              required
              value={weightGramsInput}
              onChange={e => setWeightGramsInput(e.target.value)}
              placeholder="Ej: 2250"
              className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 font-mono font-bold text-emerald-800 outline-none"
            />
          </div>

          <div>
            <label className="block text-stone-700 font-semibold mb-1">
              Bajas / Mortalidad
            </label>
            <input
              type="number"
              value={mortalityInput}
              onChange={e => setMortalityInput(e.target.value)}
              className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 font-mono outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#25633e] hover:bg-[#1b4b2e] text-white font-bold rounded-xl shadow-sm transition-all"
          >
            {savedSuccess ? '¡Guardado!' : 'Guardar Muestra'}
          </button>
        </form>
      </div>

      {/* Batches Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {broilerBatches.map(batch => (
          <div
            key={batch.id}
            className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_22px_rgba(0,0,0,0.04)] border border-[#0d2f1f]/8 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 w-full bg-stone-900">
                <img
                  src={batch.photo}
                  alt={batch.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="bg-[#182a1d]/90 text-[#e0a94b] text-xs font-mono font-bold px-2.5 py-1 rounded-xl">
                    {batch.tagNumber}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setEditingAnimal(batch)}
                      className="w-7 h-7 rounded-lg bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
                      title="Editar lote de engorde y cambiar foto"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setAnimalToDelete(batch)}
                      className="w-7 h-7 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white flex items-center justify-center transition-colors"
                      title="Eliminar lote de engorde (doble confirmación)"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <span className="bg-[#1e7e59] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm ml-1">
                      Día {batch.batchAgeDays || 30} de 42
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white flex items-end justify-between">
                  <div>
                    <h3 className="text-xl font-bold font-display">{batch.name}</h3>
                    <p className="text-xs text-stone-200">
                      {batch.breed} · Meta: {batch.targetWeightKg} kg
                    </p>
                  </div>
                  <span className="text-base font-extrabold font-mono text-emerald-300">
                    {batch.weightKg} kg / ave
                  </span>
                </div>
              </div>

              {/* Weekly Sampling Table */}
              <div className="p-4 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-stone-800">Curva de Ganancia de Peso Semanal</h4>
                  <span className="text-[11px] font-bold text-stone-500 font-mono">
                    FCR: {batch.feedConversionRatio}
                  </span>
                </div>

                <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#faf8f4] text-stone-500 font-semibold border-b border-stone-200">
                      <tr>
                        <th className="py-2 px-3">Semana</th>
                        <th className="py-2 px-3">Edad (Días)</th>
                        <th className="py-2 px-3">Peso Promedio</th>
                        <th className="py-2 px-3">Mortalidad</th>
                        <th className="py-2 px-3">Alimento</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 font-mono-nums">
                      {(batch.broilerSamples || []).map((sample, i) => (
                        <tr key={i} className="hover:bg-emerald-50/40">
                          <td className="py-2 px-3 font-bold text-stone-800">Sem {sample.week}</td>
                          <td className="py-2 px-3 text-stone-700">Día {sample.ageDays}</td>
                          <td className="py-2 px-3 font-bold text-emerald-800">
                            {sample.avgWeightGrams} g
                          </td>
                          <td className="py-2 px-3 text-red-600">{sample.mortality} aves</td>
                          <td className="py-2 px-3 text-stone-600">{sample.feedConsumedKg} kg</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-[11px] text-stone-500 italic bg-[#faf8f4] p-2.5 rounded-xl border border-stone-100">
                  {batch.notes}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Broiler Batch Modal */}
      <EditAnimalModal
        animal={editingAnimal}
        isOpen={Boolean(editingAnimal)}
        onClose={() => setEditingAnimal(null)}
      />

      {/* Double Confirmation Modal */}
      {animalToDelete && (
        <ConfirmDeleteModal
          isOpen={Boolean(animalToDelete)}
          title="¿Eliminar Lote de Ceba / Engorde?"
          itemName={animalToDelete.name}
          itemType="lote avícola"
          itemTag={`${animalToDelete.tagNumber} · ${animalToDelete.broilerBatchSize} aves`}
          warningMessage={`Estás a punto de eliminar el lote "${animalToDelete.name}" (${animalToDelete.tagNumber}). Se purgarán permanentemente todas las muestras de peso, curva de ganancia y conversión alimenticia asociadas.`}
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
