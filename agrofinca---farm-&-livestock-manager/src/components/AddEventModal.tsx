import React, { useState } from 'react';
import { X, Calendar, Syringe, Bug, Wheat, ShieldCheck } from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { EventType } from '../types/farm';

export const AddEventModal: React.FC = () => {
  const { isAddEventOpen, setIsAddEventOpen, addEvent, lots, animals, crops, operators } = useFarm();

  const [title, setTitle] = useState('');
  const [type, setType] = useState<EventType>('vaccine');
  const [date, setDate] = useState('2026-11-20');
  const [time, setTime] = useState('08:00');
  const [targetCategory, setTargetCategory] = useState<'lot' | 'animal' | 'crop'>('lot');
  const [targetId, setTargetId] = useState('');
  const [productOrAction, setProductOrAction] = useState('Vacuna Fiebre Aftosa Bivalente');
  const [dosage, setDosage] = useState('2 ml vía subcutánea');
  const [operator, setOperator] = useState(operators[1]?.name || 'Dr. Santiago Morales');
  const [notes, setNotes] = useState('');

  if (!isAddEventOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let targetName = 'Finca General';
    if (targetCategory === 'lot') {
      const lot = lots.find(l => l.id === targetId) || lots[0];
      targetName = lot ? `${lot.name} (${lot.animalCount} animales)` : 'Lote Principal';
    } else if (targetCategory === 'animal') {
      const anim = animals.find(a => a.id === targetId) || animals[0];
      targetName = anim ? `${anim.name} (${anim.tagNumber})` : 'Animal';
    } else if (targetCategory === 'crop') {
      const crop = crops.find(c => c.id === targetId) || crops[0];
      targetName = crop ? `${crop.name} - ${crop.plotName}` : 'Cultivo';
    }

    addEvent({
      title: title || `${type === 'vaccine' ? 'Vacunación' : type === 'fumigation' ? 'Fumigación' : 'Tratamiento'} - ${targetName}`,
      type,
      date,
      time,
      targetCategory,
      targetId,
      targetName,
      productOrAction,
      dosage,
      operator,
      status: 'scheduled',
      notes
    });

    setIsAddEventOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-stone-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-[#fbf9f4]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#182a1d] font-display">
                Programar Cita o Actividad Sanitaria
              </h3>
              <p className="text-xs text-[#718276]">
                Vacunación, tratamiento veterinario, fumigación o labores
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAddEventOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
          {/* Type selector */}
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1.5">
              Tipo de Actividad *
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setType('vaccine');
                  setProductOrAction('Vacuna Fiebre Aftosa Bivalente');
                  setDosage('2 ml subcutánea');
                }}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  type === 'vaccine'
                    ? 'bg-blue-50 border-blue-500 text-blue-900 font-bold'
                    : 'bg-[#faf8f4] border-stone-200 text-stone-700'
                }`}
              >
                💉 Vacunación
              </button>
              <button
                type="button"
                onClick={() => {
                  setType('fumigation');
                  setProductOrAction('Fungicida Cúprico + Fertilizante Foliar');
                  setDosage('250 L/ha');
                  setTargetCategory('crop');
                }}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  type === 'fumigation'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                    : 'bg-[#faf8f4] border-stone-200 text-stone-700'
                }`}
              >
                🌿 Fumigación
              </button>
              <button
                type="button"
                onClick={() => {
                  setType('treatment');
                  setProductOrAction('Complejo B12 + Calcio Inyectable');
                  setDosage('10 ml intramuscular');
                }}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  type === 'treatment'
                    ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold'
                    : 'bg-[#faf8f4] border-stone-200 text-stone-700'
                }`}
              >
                🩺 Tratamiento
              </button>
              <button
                type="button"
                onClick={() => {
                  setType('deworming');
                  setProductOrAction('Ivermectina 3.15% L.A.');
                  setDosage('1 ml por cada 50kg');
                }}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  type === 'deworming'
                    ? 'bg-purple-50 border-purple-500 text-purple-900 font-bold'
                    : 'bg-[#faf8f4] border-stone-200 text-stone-700'
                }`}
              >
                🛡️ Desparasitación
              </button>
              <button
                type="button"
                onClick={() => {
                  setType('harvest');
                  setProductOrAction('Cosecha y recolección');
                  setTargetCategory('crop');
                }}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  type === 'harvest'
                    ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold'
                    : 'bg-[#faf8f4] border-stone-200 text-stone-700'
                }`}
              >
                🌾 Cosecha
              </button>
              <button
                type="button"
                onClick={() => {
                  setType('hoof_care');
                  setProductOrAction('Herraje y desvasado de cascos');
                  setTargetCategory('animal');
                }}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  type === 'hoof_care'
                    ? 'bg-stone-200 border-stone-500 text-stone-900 font-bold'
                    : 'bg-[#faf8f4] border-stone-200 text-stone-700'
                }`}
              >
                🐎 Herraje Equino
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-stone-700 font-semibold mb-1">
              Título / Asunto de la Cita *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Ej: Vacunación Aftosa Lote Lechero, Fumigación Parcela Tomates..."
              className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3.5 py-2 text-stone-900 font-semibold outline-none focus:border-[#c9983d]"
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Fecha Programada *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 font-mono outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-1">Hora</label>
              <input
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 font-mono outline-none"
              />
            </div>
          </div>

          {/* Target category & target selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Aplicar A:
              </label>
              <select
                value={targetCategory}
                onChange={e => {
                  setTargetCategory(e.target.value as 'lot' | 'animal' | 'crop');
                  setTargetId('');
                }}
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 outline-none"
              >
                <option value="lot">Todo un Lote / Potrero</option>
                <option value="animal">Animal Individual</option>
                <option value="crop">Parcela / Siembra Agrícola</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Seleccionar Destinatario:
              </label>
              <select
                value={targetId}
                onChange={e => setTargetId(e.target.value)}
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 outline-none font-medium"
              >
                <option value="">Seleccione...</option>
                {targetCategory === 'lot' &&
                  lots.map(l => (
                    <option key={l.id} value={l.id}>
                      {l.name} ({l.animalCount} animales)
                    </option>
                  ))}
                {targetCategory === 'animal' &&
                  animals.map(a => (
                    <option key={a.id} value={a.id}>
                      {a.name} ({a.tagNumber}) - {a.breed}
                    </option>
                  ))}
                {targetCategory === 'crop' &&
                  crops.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.plotName})
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Product & Dosage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Producto / Medicamento / Dosis
              </label>
              <input
                type="text"
                value={productOrAction}
                onChange={e => setProductOrAction(e.target.value)}
                placeholder="Nombre del fármaco o biológico"
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-1">Dosis / Vía</label>
              <input
                type="text"
                value={dosage}
                onChange={e => setDosage(e.target.value)}
                placeholder="Ej: 2 ml s.c., 250 L/ha..."
                className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 outline-none"
              />
            </div>
          </div>

          {/* Responsible Operator */}
          <div>
            <label className="block text-stone-700 font-semibold mb-1">
              Responsable / Veterinario
            </label>
            <input
              type="text"
              value={operator}
              onChange={e => setOperator(e.target.value)}
              placeholder="Nombre del encargado"
              className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 outline-none"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-stone-700 font-semibold mb-1">
              Instrucciones y Observaciones
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Recomendaciones previas, tiempo de retiro de leche/carne..."
              className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3.5 py-2 outline-none resize-none"
            />
          </div>

          {/* Submit */}
          <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsAddEventOpen(false)}
              className="px-4 py-2.5 rounded-xl text-stone-600 hover:bg-stone-100 font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#0c2a1a] hover:bg-[#153b26] text-white font-bold shadow-md transition-all"
            >
              Agendar en Calendario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
