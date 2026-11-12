import React, { useState } from 'react';
import { Plus, Calendar, Eye, Heart, Activity, Scale, ShieldCheck, Edit, Trash2 } from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { Animal } from '../types/farm';
import { EditAnimalModal } from './EditAnimalModal';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

export const PigsView: React.FC = () => {
  const { animals, setSelectedAnimal, setIsAddAnimalOpen, setIsAddEventOpen, addPigFarrowingRecord, deleteAnimal } = useFarm();

  const pigs = animals.filter(a => a.category === 'pig');
  const breedingSows = pigs.filter(p => p.sex === 'female');
  const fatteningPigs = pigs.filter(p => p.pigStage === 'fattening');

  const [selectedSowId, setSelectedSowId] = useState(breedingSows[0]?.id || '');
  const [livePigletsInput, setLivePigletsInput] = useState('12');
  const [stillbornInput, setStillbornInput] = useState('0');
  const [birthWeightInput, setBirthWeightInput] = useState('1.45');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Edit & Delete modals
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);
  const [animalToDelete, setAnimalToDelete] = useState<Animal | null>(null);

  const handleFarrowingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSowId || !livePigletsInput) return;
    addPigFarrowingRecord(
      selectedSowId,
      Number(livePigletsInput),
      Number(stillbornInput || 0),
      Number(birthWeightInput || 1.4)
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
            <span className="w-8 h-8 rounded-2xl bg-[#fdf1e2] text-[#995924] flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </span>
            <h2 className="text-2xl font-bold font-display text-[#18291c]">
              Cochinos, Cerdos &amp; Porcicultura
            </h2>
          </div>
          <p className="text-xs text-[#6e7e72] mt-0.5">
            Maternidad, control de partos y lechones, verracos padrotes y engorde porcino a camal
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setIsAddEventOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold rounded-2xl shadow-xs transition-all"
          >
            <Calendar className="w-3.5 h-3.5 text-[#25633e]" />
            <span>Vacunar PPC / Desparasitar</span>
          </button>
          <button
            onClick={() => setIsAddAnimalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#0c2a1a] hover:bg-[#163e27] text-white text-xs font-bold rounded-2xl shadow-md transition-all"
          >
            <Plus className="w-4 h-4 text-[#e0a94b]" />
            <span>Registrar Cerdo / Cerda</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-[#fdf1e2] p-5 rounded-3xl border border-[#fae2c6]">
          <span className="text-xs font-bold text-[#995924] uppercase tracking-wider">
            Total Piara Porcina
          </span>
          <div className="text-3xl font-extrabold text-[#3b2311] font-display mt-1 font-mono-nums">
            65 Cerdos
          </div>
          <p className="text-[11px] text-[#8a572c] mt-0.5">Madres, verracos y lotes de ceba</p>
        </div>

        <div className="bg-[#def7ed] p-5 rounded-3xl border border-[#c3edd9]">
          <span className="text-xs font-bold text-[#1e7e59] uppercase tracking-wider">
            Promedio Lechones / Parto
          </span>
          <div className="text-3xl font-extrabold text-[#0e3b29] font-display mt-1 font-mono-nums">
            12.5 Vivos
          </div>
          <p className="text-[11px] text-[#257755] mt-0.5">Línea materna hiperprolífica</p>
        </div>

        <div className="bg-[#fbf2d8] p-5 rounded-3xl border border-[#f5e4b3]">
          <span className="text-xs font-bold text-[#8e6e16] uppercase tracking-wider">
            Ganancia en Ceba (GMD)
          </span>
          <div className="text-3xl font-extrabold text-[#42330a] font-display mt-1 font-mono-nums">
            +880 g/día
          </div>
          <p className="text-[11px] text-[#826b24] mt-0.5">Cruce Duroc x Pietrain magro</p>
        </div>

        <div className="bg-[#ece6fa] p-5 rounded-3xl border border-[#ded4f5]">
          <span className="text-xs font-bold text-[#6948ad] uppercase tracking-wider">
            Peso Meta de Salida
          </span>
          <div className="text-2xl font-extrabold text-[#29184d] font-display mt-1 font-mono-nums">
            110 - 115 kg
          </div>
          <p className="text-[11px] text-[#664b9e] mt-0.5">A las 22 semanas de edad</p>
        </div>
      </div>

      {/* Sow Farrowing Logger Form */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_4px_22px_rgba(0,0,0,0.04)] border border-[#0d2f1f]/8">
        <h3 className="text-base font-bold text-[#1a2c20] mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-500" />
          <span>Registrar Parto &amp; Nacimiento de Camada (Maternidad)</span>
        </h3>

        <form onSubmit={handleFarrowingSubmit} className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-end text-xs">
          <div>
            <label className="block text-stone-700 font-semibold mb-1">
              Cerda Madre
            </label>
            <select
              value={selectedSowId}
              onChange={e => setSelectedSowId(e.target.value)}
              className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 text-stone-900 font-semibold outline-none"
            >
              {breedingSows.map(s => (
                <option key={s.id} value={s.id}>
                  {s.tagNumber} - {s.name} ({s.breed})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-stone-700 font-semibold mb-1">
              Lechones Nacidos Vivos
            </label>
            <input
              type="number"
              required
              value={livePigletsInput}
              onChange={e => setLivePigletsInput(e.target.value)}
              className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 font-mono font-bold outline-none text-emerald-800"
            />
          </div>

          <div>
            <label className="block text-stone-700 font-semibold mb-1">
              Nacidos Muertos
            </label>
            <input
              type="number"
              value={stillbornInput}
              onChange={e => setStillbornInput(e.target.value)}
              className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 font-mono outline-none text-red-700"
            />
          </div>

          <div>
            <label className="block text-stone-700 font-semibold mb-1">
              Peso Promedio al Nacer (kg)
            </label>
            <input
              type="number"
              step="0.05"
              value={birthWeightInput}
              onChange={e => setBirthWeightInput(e.target.value)}
              className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 font-mono outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#25633e] hover:bg-[#1b4b2e] text-white font-bold rounded-xl shadow-sm transition-all"
          >
            {savedSuccess ? '¡Camada Guardada!' : 'Registrar Parto'}
          </button>
        </form>
      </div>

      {/* Pigs Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pigs.map(pig => (
          <div
            key={pig.id}
            className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_22px_rgba(0,0,0,0.04)] border border-[#0d2f1f]/8 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 w-full bg-stone-900">
                <img
                  src={pig.photo}
                  alt={pig.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="bg-[#182a1d]/90 text-[#e0a94b] text-xs font-mono font-bold px-2.5 py-1 rounded-xl">
                    {pig.tagNumber}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setEditingAnimal(pig)}
                      className="w-7 h-7 rounded-lg bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
                      title="Editar cerdo y cambiar foto"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setAnimalToDelete(pig)}
                      className="w-7 h-7 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white flex items-center justify-center transition-colors"
                      title="Eliminar cerdo (doble confirmación)"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm ml-1 ${
                        pig.pigStage === 'farrowing'
                          ? 'bg-rose-600 text-white'
                          : pig.pigStage === 'fattening'
                          ? 'bg-amber-600 text-white'
                          : 'bg-purple-600 text-white'
                      }`}
                    >
                      {pig.pigStage === 'farrowing'
                        ? '🤱 Maternidad'
                        : pig.pigStage === 'fattening'
                        ? '🥩 Ceba / Engorde'
                        : '🐗 Verraco Padrote'}
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white flex items-end justify-between">
                  <div>
                    <h3 className="text-xl font-bold font-display">{pig.name}</h3>
                    <p className="text-xs text-stone-200">{pig.breed}</p>
                  </div>
                  <span className="text-base font-extrabold font-mono text-white">
                    {pig.weightKg} kg
                  </span>
                </div>
              </div>

              {/* Farrowing details or Fattening gain */}
              <div className="p-4 space-y-3 text-xs">
                {pig.farrowingRecords && pig.farrowingRecords.length > 0 && (
                  <div>
                    <span className="font-bold text-stone-700 block mb-1">
                      Último Parto Registrado:
                    </span>
                    {pig.farrowingRecords.map((f, i) => (
                      <div
                        key={i}
                        className="p-2.5 bg-rose-50/70 border border-rose-200 rounded-xl space-y-1"
                      >
                        <div className="flex justify-between font-bold text-rose-950">
                          <span>Fecha: {f.date}</span>
                          <span className="text-emerald-800">{f.livePiglets} lechones vivos</span>
                        </div>
                        <div className="flex justify-between text-[11px] text-stone-600">
                          <span>Peso al nacer: {f.avgBirthWeightKg} kg</span>
                          <span>Destete: {f.weanedCount} lechones</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {pig.feedIntakeKgPerDay && (
                  <div className="flex justify-between text-stone-600 bg-[#faf8f4] p-2 rounded-xl border border-stone-100">
                    <span>Consumo alimento balanceado:</span>
                    <span className="font-bold font-mono text-stone-900">
                      {pig.feedIntakeKgPerDay} kg/día
                    </span>
                  </div>
                )}

                <p className="text-[11px] text-stone-600 italic bg-[#faf8f4] p-2.5 rounded-xl border border-stone-100">
                  {pig.notes}
                </p>
              </div>
            </div>

            <div className="p-4 pt-0">
              <button
                onClick={() => setSelectedAnimal(pig)}
                className="w-full py-2.5 rounded-2xl bg-[#0c2a1a] hover:bg-[#153b26] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-[#e0a94b]" />
                <span>Expediente Porcino</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Pig Modal */}
      <EditAnimalModal
        animal={editingAnimal}
        isOpen={Boolean(editingAnimal)}
        onClose={() => setEditingAnimal(null)}
      />

      {/* Double Confirmation Modal */}
      {animalToDelete && (
        <ConfirmDeleteModal
          isOpen={Boolean(animalToDelete)}
          title="¿Eliminar Registro Porcino?"
          itemName={animalToDelete.name}
          itemType="cochino / cerdo"
          itemTag={`${animalToDelete.tagNumber} · ${animalToDelete.breed}`}
          warningMessage={`Estás a punto de eliminar a "${animalToDelete.name}" (${animalToDelete.tagNumber}). Se purgarán permanentemente todos los historiales de partos, camadas de lechones y registros de ceba.`}
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
