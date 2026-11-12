import React, { useState } from 'react';
import {
  X,
  Syringe,
  Scale,
  Milk,
  Calendar,
  AlertCircle,
  Plus,
  CheckCircle2,
  FileText,
  Edit,
  Trash2,
  Camera
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { Animal } from '../types/farm';
import { EditAnimalModal } from './EditAnimalModal';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

export const AnimalDetailModal: React.FC = () => {
  const {
    selectedAnimal,
    setSelectedAnimal,
    addWeightRecord,
    addMilkRecord,
    deleteAnimal,
    lots,
    updateAnimal
  } = useFarm();

  const [activeTab, setActiveTab] = useState<'info' | 'pesaje' | 'leche' | 'sanidad'>('info');
  const [newWeight, setNewWeight] = useState('');
  const [morningMilk, setMorningMilk] = useState('');
  const [eveningMilk, setEveningMilk] = useState('');
  const [fatPct, setFatPct] = useState('');
  const [newVaccineName, setNewVaccineName] = useState('');

  // Modals state
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  if (!selectedAnimal) return null;

  const handleAddWeight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWeight) return;
    addWeightRecord(selectedAnimal.id, Number(newWeight));
    setNewWeight('');
  };

  const handleAddMilk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!morningMilk || !eveningMilk) return;
    addMilkRecord(
      selectedAnimal.id,
      Number(morningMilk),
      Number(eveningMilk),
      fatPct ? Number(fatPct) : undefined
    );
    setMorningMilk('');
    setEveningMilk('');
    setFatPct('');
  };

  const handleAddVaccine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVaccineName) return;
    const updated = [
      ...selectedAnimal.vaccinesApplied,
      {
        vaccineName: newVaccineName,
        date: new Date().toISOString().split('T')[0]
      }
    ];
    updateAnimal(selectedAnimal.id, { vaccinesApplied: updated });
    setNewVaccineName('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-stone-200">
        {/* Modal Header with Photo Banner */}
        <div className="relative h-48 bg-[#0c2a1a] text-white">
          <img
            src={selectedAnimal.photo}
            alt={selectedAnimal.name}
            className="w-full h-full object-cover opacity-65"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Top action buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => setIsEditOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 transition-all border border-white/25 shadow-sm"
              title="Editar datos y cambiar fotografía"
            >
              <Camera className="w-3.5 h-3.5 text-amber-300" />
              <span>Editar / Cambiar Foto</span>
            </button>

            <button
              onClick={() => setIsDeleteConfirmOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              title="Eliminar animal con doble confirmación"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Eliminar</span>
            </button>

            <button
              onClick={() => setSelectedAnimal(null)}
              className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Title info overlay */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#d9aa4f] text-[#131b13] text-xs font-bold px-2.5 py-0.5 rounded-md font-mono">
                  {selectedAnimal.tagNumber}
                </span>
                <span className="text-xs text-emerald-300 font-semibold uppercase tracking-wider">
                  {selectedAnimal.category === 'dairy'
                    ? 'Vaca Lechera'
                    : selectedAnimal.category === 'beef'
                    ? 'Ganado de Carne'
                    : selectedAnimal.category === 'horse'
                    ? 'Caballo / Equino'
                    : selectedAnimal.category === 'laying_hen'
                    ? 'Gallina Ponedora'
                    : selectedAnimal.category === 'broiler'
                    ? 'Pollo de Engorde'
                    : selectedAnimal.category === 'goat'
                    ? 'Chivo / Cabra'
                    : 'Cochino / Cerdo'}
                </span>
              </div>
              <h2 className="text-2xl font-bold font-display mt-0.5">
                {selectedAnimal.name}
              </h2>
              <p className="text-xs text-stone-300">
                {selectedAnimal.breed} · {selectedAnimal.lotName}
              </p>
            </div>

            <div className="text-right">
              <span className="text-2xl font-extrabold font-mono-nums">
                {selectedAnimal.weightKg} kg
              </span>
              <p className="text-[11px] text-emerald-400 font-medium">Peso Actual</p>
            </div>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-stone-100 bg-[#faf8f4] text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('info')}
            className={`px-4 py-2.5 font-semibold rounded-t-xl transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'info'
                ? 'border-[#25633e] text-[#1a442b] bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Ficha General
          </button>
          <button
            onClick={() => setActiveTab('pesaje')}
            className={`px-4 py-2.5 font-semibold rounded-t-xl transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'pesaje'
                ? 'border-[#25633e] text-[#1a442b] bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Control de Peso
          </button>
          {(selectedAnimal.category === 'dairy' || (selectedAnimal.category === 'goat' && selectedAnimal.goatPurpose === 'milk')) && (
            <button
              onClick={() => setActiveTab('leche')}
              className={`px-4 py-2.5 font-semibold rounded-t-xl transition-colors border-b-2 whitespace-nowrap ${
                activeTab === 'leche'
                  ? 'border-[#25633e] text-[#1a442b] bg-white'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Producción de Leche
            </button>
          )}
          <button
            onClick={() => setActiveTab('sanidad')}
            className={`px-4 py-2.5 font-semibold rounded-t-xl transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'sanidad'
                ? 'border-[#25633e] text-[#1a442b] bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Vacunas &amp; Sanidad
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Tab 1: Ficha General */}
          {activeTab === 'info' && (
            <div className="space-y-5 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[#faf8f4] p-3.5 rounded-2xl border border-stone-200/70">
                  <span className="text-[11px] text-stone-500 block">Sexo</span>
                  <span className="font-bold text-stone-800 text-sm capitalize">
                    {selectedAnimal.sex === 'female' ? 'Hembra' : 'Macho'}
                  </span>
                </div>
                <div className="bg-[#faf8f4] p-3.5 rounded-2xl border border-stone-200/70">
                  <span className="text-[11px] text-stone-500 block">Fecha Nacimiento</span>
                  <span className="font-bold text-stone-800 text-sm">
                    {selectedAnimal.birthDate}
                  </span>
                </div>
                <div className="bg-[#faf8f4] p-3.5 rounded-2xl border border-stone-200/70">
                  <span className="text-[11px] text-stone-500 block">Lote / Potrero</span>
                  <span className="font-bold text-stone-800 text-sm">
                    {selectedAnimal.lotName}
                  </span>
                </div>
                <div className="bg-[#faf8f4] p-3.5 rounded-2xl border border-stone-200/70">
                  <span className="text-[11px] text-stone-500 block">Estado Reproductivo</span>
                  <span className="font-bold text-emerald-800 text-sm capitalize">
                    {selectedAnimal.reproductiveStatus || 'Normal'}
                  </span>
                </div>
              </div>

              {/* Pedigree Lineage */}
              <div className="bg-[#f5f2e8] p-4 rounded-2xl border border-[#ded7c4]">
                <h4 className="text-xs font-bold text-[#233527] uppercase tracking-wider mb-2">
                  Genealogía &amp; Linaje
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[11px] text-stone-500">Padre (Sire):</span>
                    <p className="font-semibold text-stone-800">
                      {selectedAnimal.sire || 'No registrado / Inseminación artificial'}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] text-stone-500">Madre (Dam):</span>
                    <p className="font-semibold text-stone-800">
                      {selectedAnimal.dam || 'Madre interna de finca'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <h4 className="text-xs font-bold text-stone-800 mb-1 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-stone-500" />
                  <span>Observaciones y Manejo</span>
                </h4>
                <p className="text-stone-700 bg-[#faf8f4] p-3.5 rounded-2xl border border-stone-200 text-xs leading-relaxed">
                  {selectedAnimal.notes || 'Animal en condiciones óptimas de salud y condición corporal.'}
                </p>
              </div>

              {/* Move to another lot selector */}
              <div className="pt-2 flex items-center gap-3">
                <span className="text-stone-600 font-medium">Reubicar a otro lote:</span>
                <select
                  value={selectedAnimal.lotId}
                  onChange={e => {
                    const lot = lots.find(l => l.id === e.target.value);
                    if (lot) {
                      updateAnimal(selectedAnimal.id, {
                        lotId: lot.id,
                        lotName: lot.name
                      });
                    }
                  }}
                  className="bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs text-stone-800 outline-none"
                >
                  {lots.map(l => (
                    <option key={l.id} value={l.id}>
                      {l.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Tab 2: Control de Peso */}
          {activeTab === 'pesaje' && (
            <div className="space-y-5 text-xs">
              <form onSubmit={handleAddWeight} className="bg-[#f6f4ee] p-4 rounded-2xl border border-stone-200 flex items-center gap-3">
                <div className="flex-1">
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                    Registrar Nuevo Pesaje (kg)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={newWeight}
                    onChange={e => setNewWeight(e.target.value)}
                    placeholder="Ej: 585"
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-sm font-bold font-mono outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-5 px-5 py-2.5 bg-[#25633e] hover:bg-[#194b2d] text-white font-semibold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Guardar Pesaje</span>
                </button>
              </form>

              {/* Weight History Table */}
              <div>
                <h4 className="font-bold text-stone-800 mb-2">Historial de Pesajes</h4>
                <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#faf8f4] text-stone-500 font-semibold border-b border-stone-200">
                      <tr>
                        <th className="py-2.5 px-4">Fecha</th>
                        <th className="py-2.5 px-4">Peso Vivo</th>
                        <th className="py-2.5 px-4">Ganancia Diaria (GMD)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {selectedAnimal.weightHistory.map((rec, i) => (
                        <tr key={i} className="hover:bg-stone-50 font-mono-nums">
                          <td className="py-2.5 px-4 text-stone-700">{rec.date}</td>
                          <td className="py-2.5 px-4 font-bold text-stone-900">{rec.weightKg} kg</td>
                          <td className="py-2.5 px-4 text-emerald-700 font-semibold">
                            {rec.gainRateKgPerDay ? `+${rec.gainRateKgPerDay} kg/día` : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Producción de Leche (Para Vacas Lecheras) */}
          {activeTab === 'leche' && selectedAnimal.category === 'dairy' && (
            <div className="space-y-5 text-xs">
              <form onSubmit={handleAddMilk} className="bg-[#e8f1fa] p-4 rounded-2xl border border-blue-200 grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
                <div>
                  <label className="block text-[11px] font-semibold text-blue-900 mb-1">
                    Ordeño Mañana (L)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={morningMilk}
                    onChange={e => setMorningMilk(e.target.value)}
                    placeholder="14.5"
                    className="w-full bg-white border border-blue-200 rounded-xl px-3 py-2 text-sm font-bold font-mono outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-blue-900 mb-1">
                    Ordeño Tarde (L)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={eveningMilk}
                    onChange={e => setEveningMilk(e.target.value)}
                    placeholder="11.0"
                    className="w-full bg-white border border-blue-200 rounded-xl px-3 py-2 text-sm font-bold font-mono outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-blue-900 mb-1">
                    % Grasa (opcional)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={fatPct}
                    onChange={e => setFatPct(e.target.value)}
                    placeholder="3.8"
                    className="w-full bg-white border border-blue-200 rounded-xl px-3 py-2 text-sm font-mono outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#1965b3] hover:bg-[#124d8c] text-white font-semibold rounded-xl transition-all shadow-sm"
                >
                  Registrar Ordeño
                </button>
              </form>

              {/* Milk History */}
              <div>
                <h4 className="font-bold text-stone-800 mb-2">Registro de Producción Diaria</h4>
                <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#faf8f4] text-stone-500 font-semibold border-b border-stone-200">
                      <tr>
                        <th className="py-2.5 px-4">Fecha</th>
                        <th className="py-2.5 px-4">Mañana</th>
                        <th className="py-2.5 px-4">Tarde</th>
                        <th className="py-2.5 px-4">Total Día</th>
                        <th className="py-2.5 px-4">% Grasa</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 font-mono-nums">
                      {(selectedAnimal.milkHistory || []).map((m, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-2.5 px-4 text-stone-700">{m.date}</td>
                          <td className="py-2.5 px-4 text-stone-800">{m.morningLiters} L</td>
                          <td className="py-2.5 px-4 text-stone-800">{m.eveningLiters} L</td>
                          <td className="py-2.5 px-4 font-bold text-blue-900">
                            {(m.morningLiters + m.eveningLiters).toFixed(1)} L
                          </td>
                          <td className="py-2.5 px-4 text-stone-600">{m.fatPercentage ? `${m.fatPercentage}%` : '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Vacunas & Sanidad */}
          {activeTab === 'sanidad' && (
            <div className="space-y-5 text-xs">
              <form onSubmit={handleAddVaccine} className="bg-[#f0f9f3] p-4 rounded-2xl border border-emerald-200 flex items-center gap-3">
                <div className="flex-1">
                  <label className="block text-[11px] font-semibold text-emerald-900 mb-1">
                    Registrar Vacuna o Tratamiento Aplicado
                  </label>
                  <input
                    type="text"
                    required
                    value={newVaccineName}
                    onChange={e => setNewVaccineName(e.target.value)}
                    placeholder="Ej: Fiebre Aftosa Bivalente, Ivermectina..."
                    className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-2 text-xs outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-5 px-5 py-2.5 bg-[#25633e] hover:bg-[#1a4a2e] text-white font-semibold rounded-xl"
                >
                  Agregar Vacuna
                </button>
              </form>

              <div>
                <h4 className="font-bold text-stone-800 mb-2">Historial de Vacunación Oficial</h4>
                <div className="space-y-2">
                  {selectedAnimal.vaccinesApplied.map((v, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-2xl bg-[#faf8f4] border border-stone-200 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-stone-900">{v.vaccineName}</p>
                          <p className="text-[10px] text-stone-500 font-mono">
                            {v.batchNumber ? `Lote: ${v.batchNumber}` : 'Dosis certificada ICA'}
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-stone-600 bg-white px-2.5 py-1 rounded-md border border-stone-200">
                        {v.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Animal & Photo Modal */}
      <EditAnimalModal
        animal={selectedAnimal}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />

      {/* Double Confirmation Modal for Deletion */}
      <ConfirmDeleteModal
        isOpen={isDeleteConfirmOpen}
        title="¿Dar de baja y eliminar animal?"
        itemName={selectedAnimal.name}
        itemType="animal"
        itemTag={selectedAnimal.tagNumber}
        warningMessage={`Estás a punto de eliminar a "${selectedAnimal.name}" (${selectedAnimal.tagNumber}). Se purgarán permanentemente sus pesajes, registros sanitarios, producción de leche y datos genealógicos de la base de datos.`}
        onConfirm={() => {
          deleteAnimal(selectedAnimal.id);
          setIsDeleteConfirmOpen(false);
          setSelectedAnimal(null);
        }}
        onCancel={() => setIsDeleteConfirmOpen(false)}
      />
    </div>
  );
};
