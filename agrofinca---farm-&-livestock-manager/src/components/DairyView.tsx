import React, { useState } from 'react';
import { Milk, Plus, Droplets, TrendingUp, Award, Calendar, Eye } from 'lucide-react';
import { useFarm } from '../context/FarmContext';

export const DairyView: React.FC = () => {
  const { animals, setSelectedAnimal, setIsAddAnimalOpen, addMilkRecord } = useFarm();

  const dairyCows = animals.filter(a => a.category === 'dairy');

  // Compute total daily milk
  const totalDailyMilk = dairyCows.reduce(
    (acc, curr) => acc + (curr.dailyMilkLiters || 20),
    0
  );
  const avgMilkPerCow = dairyCows.length
    ? (totalDailyMilk / dairyCows.length).toFixed(1)
    : '0';

  const [milkPricePerLiter, setMilkPricePerLiter] = useState(2450); // COP or currency

  // Quick milk record state
  const [selectedCowId, setSelectedCowId] = useState(dairyCows[0]?.id || '');
  const [morningLiters, setMorningLiters] = useState('14.0');
  const [eveningLiters, setEveningLiters] = useState('11.5');
  const [fatPct, setFatPct] = useState('3.9');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleQuickMilkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCowId) return;
    addMilkRecord(
      selectedCowId,
      Number(morningLiters),
      Number(eveningLiters),
      Number(fatPct)
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
            <span className="w-8 h-8 rounded-2xl bg-[#e3f0fc] text-[#246bb4] flex items-center justify-center">
              <Milk className="w-4 h-4" />
            </span>
            <h2 className="text-2xl font-bold font-display text-[#18291c]">
              Vacas Lecheras &amp; Sala de Ordeño
            </h2>
          </div>
          <p className="text-xs text-[#6e7e72] mt-0.5">
            Control de producción láctea diaria, promedio por vaca, grasa y tanque de frío
          </p>
        </div>

        <button
          onClick={() => setIsAddAnimalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0c2a1a] hover:bg-[#163e27] text-white text-xs font-bold rounded-2xl shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#e0a94b]" />
          <span>Registrar Vaca Lechera</span>
        </button>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-[#e3f0fc] p-5 rounded-3xl border border-[#cbe1f8]">
          <span className="text-xs font-bold text-[#246bb4] uppercase tracking-wider">
            Producción Total Hoy
          </span>
          <div className="text-3xl font-extrabold text-[#0e3763] font-display mt-1 font-mono-nums">
            {totalDailyMilk.toFixed(0)} L
          </div>
          <p className="text-[11px] text-[#27649f] mt-0.5">Doble ordeño mecánico</p>
        </div>

        <div className="bg-[#def7ed] p-5 rounded-3xl border border-[#c3edd9]">
          <span className="text-xs font-bold text-[#1e7e59] uppercase tracking-wider">
            Promedio Por Vaca
          </span>
          <div className="text-3xl font-extrabold text-[#0e3b29] font-display mt-1 font-mono-nums">
            {avgMilkPerCow} L/día
          </div>
          <p className="text-[11px] text-[#257755] mt-0.5">Rendimiento óptimo Holstein/Jersey</p>
        </div>

        <div className="bg-[#fdf1e2] p-5 rounded-3xl border border-[#fae2c6]">
          <span className="text-xs font-bold text-[#995924] uppercase tracking-wider">
            Grasa Láctea Promedio
          </span>
          <div className="text-3xl font-extrabold text-[#3b2311] font-display mt-1 font-mono-nums">
            4.1 %
          </div>
          <p className="text-[11px] text-[#8a572c] mt-0.5">Bonificación por sólidos totales</p>
        </div>

        <div className="bg-[#fbf2d8] p-5 rounded-3xl border border-[#f5e4b3]">
          <span className="text-xs font-bold text-[#8e6e16] uppercase tracking-wider">
            Ingreso Diario Estimado
          </span>
          <div className="text-2xl font-extrabold text-[#42330a] font-display mt-1 font-mono-nums">
            ${(totalDailyMilk * milkPricePerLiter).toLocaleString()}
          </div>
          <p className="text-[11px] text-[#826b24] mt-0.5">A ${milkPricePerLiter} COP/litro</p>
        </div>
      </div>

      {/* Quick Milking Entry Form */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_4px_22px_rgba(0,0,0,0.04)] border border-[#0d2f1f]/8">
        <h3 className="text-base font-bold text-[#1a2c20] mb-4 flex items-center gap-2">
          <Droplets className="w-5 h-5 text-[#246bb4]" />
          <span>Planilla Rápida de Ordeño Diario</span>
        </h3>

        <form onSubmit={handleQuickMilkSubmit} className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-end text-xs">
          <div>
            <label className="block text-stone-700 font-semibold mb-1">
              Seleccionar Vaca
            </label>
            <select
              value={selectedCowId}
              onChange={e => setSelectedCowId(e.target.value)}
              className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 text-stone-900 font-semibold outline-none"
            >
              {dairyCows.map(cow => (
                <option key={cow.id} value={cow.id}>
                  {cow.tagNumber} - {cow.name} ({cow.breed})
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

          <div>
            <label className="block text-stone-700 font-semibold mb-1">
              % Grasa
            </label>
            <input
              type="number"
              step="0.1"
              value={fatPct}
              onChange={e => setFatPct(e.target.value)}
              className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 font-mono outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#25633e] hover:bg-[#1b4b2e] text-white font-bold rounded-xl shadow-sm transition-all"
          >
            {savedSuccess ? '¡Guardado con Éxito!' : 'Registrar Ordeño'}
          </button>
        </form>
      </div>

      {/* Dairy Cows Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {dairyCows.map(cow => (
          <div
            key={cow.id}
            className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_22px_rgba(0,0,0,0.04)] border border-[#0d2f1f]/8 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 w-full bg-stone-900">
                <img
                  src={cow.photo}
                  alt={cow.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="bg-[#182a1d]/90 text-[#e8c88f] text-xs font-mono font-bold px-2 py-0.5 rounded-lg border border-[#e8c88f]/30">
                    {cow.tagNumber}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white flex items-end justify-between">
                  <div>
                    <h3 className="text-lg font-bold font-display">{cow.name}</h3>
                    <p className="text-xs text-stone-300">{cow.breed}</p>
                  </div>
                  <span className="text-sm font-extrabold font-mono text-cyan-200">
                    {cow.dailyMilkLiters} L / día
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-2 text-xs">
                <div className="p-3 bg-[#e3f0fc] rounded-2xl flex items-center justify-between border border-[#cbe1f8]">
                  <span className="font-semibold text-[#0e3763]">Promedio Semanal:</span>
                  <span className="font-bold text-[#0e3763] font-mono">
                    {((cow.dailyMilkLiters || 20) * 7).toFixed(0)} Litros
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 italic">
                  {cow.notes}
                </p>
              </div>
            </div>

            <div className="p-4 pt-0">
              <button
                onClick={() => setSelectedAnimal(cow)}
                className="w-full py-2.5 rounded-2xl bg-[#0c2a1a] hover:bg-[#153b26] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-[#e0a94b]" />
                <span>Ver Curva de Lactancia</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
