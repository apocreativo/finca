import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Plus,
  CheckCircle2,
  Clock,
  Syringe,
  Bug,
  Wheat,
  ShieldCheck,
  Stethoscope,
  Trash2
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
import { CalendarEvent, EventType } from '../types/farm';

export const CalendarView: React.FC = () => {
  const { events, setIsAddEventOpen, toggleEventStatus, deleteEvent } = useFarm();

  const [typeFilter, setTypeFilter] = useState<'all' | EventType>('all');
  const [eventToDelete, setEventToDelete] = useState<CalendarEvent | null>(null);

  const filteredEvents = events.filter(e => {
    if (typeFilter !== 'all' && e.type !== typeFilter) return false;
    return true;
  });

  const getEventBadge = (type: EventType) => {
    switch (type) {
      case 'vaccine':
        return {
          icon: <Syringe className="w-4 h-4" />,
          label: 'Vacunación',
          bg: 'bg-blue-100 text-blue-900 border-blue-200'
        };
      case 'fumigation':
        return {
          icon: <Bug className="w-4 h-4" />,
          label: 'Fumigación',
          bg: 'bg-emerald-100 text-emerald-900 border-emerald-200'
        };
      case 'treatment':
        return {
          icon: <Stethoscope className="w-4 h-4" />,
          label: 'Tratamiento Médico',
          bg: 'bg-amber-100 text-amber-900 border-amber-200'
        };
      case 'deworming':
        return {
          icon: <ShieldCheck className="w-4 h-4" />,
          label: 'Desparasitación',
          bg: 'bg-purple-100 text-purple-900 border-purple-200'
        };
      case 'harvest':
        return {
          icon: <Wheat className="w-4 h-4" />,
          label: 'Cosecha',
          bg: 'bg-yellow-100 text-yellow-900 border-yellow-200'
        };
      default:
        return {
          icon: <CalendarIcon className="w-4 h-4" />,
          label: 'Actividad',
          bg: 'bg-stone-100 text-stone-900 border-stone-200'
        };
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-2xl bg-[#e8f5e9] text-[#2e7d32] flex items-center justify-center">
              <CalendarIcon className="w-4 h-4" />
            </span>
            <h2 className="text-2xl font-bold font-display text-[#18291c]">
              Calendario Sanitario &amp; Actividades
            </h2>
          </div>
          <p className="text-xs text-[#6e7e72] mt-0.5">
            Citas programadas para vacunas, tratamientos veterinarios, fumigaciones y cosechas
          </p>
        </div>

        <button
          onClick={() => setIsAddEventOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0c2a1a] hover:bg-[#163e27] text-white text-xs font-bold rounded-2xl shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#e0a94b]" />
          <span>Agendar Nueva Cita</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-3xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#0d2f1f]/8 flex items-center gap-2 overflow-x-auto text-xs">
        <button
          onClick={() => setTypeFilter('all')}
          className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
            typeFilter === 'all'
              ? 'bg-[#0c2a1a] text-white font-bold'
              : 'bg-[#faf8f4] text-stone-600 hover:bg-stone-100'
          }`}
        >
          Todas las Actividades ({events.length})
        </button>
        <button
          onClick={() => setTypeFilter('vaccine')}
          className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            typeFilter === 'vaccine'
              ? 'bg-blue-100 text-blue-900 font-bold border border-blue-300'
              : 'bg-[#faf8f4] text-stone-600 hover:bg-stone-100'
          }`}
        >
          <span>💉 Vacunas</span>
        </button>
        <button
          onClick={() => setTypeFilter('fumigation')}
          className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            typeFilter === 'fumigation'
              ? 'bg-emerald-100 text-emerald-900 font-bold border border-emerald-300'
              : 'bg-[#faf8f4] text-stone-600 hover:bg-stone-100'
          }`}
        >
          <span>🌿 Fumigaciones</span>
        </button>
        <button
          onClick={() => setTypeFilter('treatment')}
          className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            typeFilter === 'treatment'
              ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300'
              : 'bg-[#faf8f4] text-stone-600 hover:bg-stone-100'
          }`}
        >
          <span>🩺 Tratamientos Médicos</span>
        </button>
        <button
          onClick={() => setTypeFilter('deworming')}
          className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            typeFilter === 'deworming'
              ? 'bg-purple-100 text-purple-900 font-bold border border-purple-300'
              : 'bg-[#faf8f4] text-stone-600 hover:bg-stone-100'
          }`}
        >
          <span>🛡️ Desparasitación</span>
        </button>
        <button
          onClick={() => setTypeFilter('harvest')}
          className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            typeFilter === 'harvest'
              ? 'bg-yellow-100 text-yellow-900 font-bold border border-yellow-300'
              : 'bg-[#faf8f4] text-stone-600 hover:bg-stone-100'
          }`}
        >
          <span>🌾 Cosechas</span>
        </button>
      </div>

      {/* Events Agenda List */}
      <div className="space-y-4">
        {filteredEvents.map(event => {
          const badge = getEventBadge(event.type);
          const isCompleted = event.status === 'completed';

          return (
            <div
              key={event.id}
              className={`bg-white rounded-3xl p-5 shadow-[0_4px_22px_rgba(0,0,0,0.04)] border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isCompleted
                  ? 'border-emerald-200 bg-emerald-50/20 opacity-80'
                  : 'border-[#0d2f1f]/8 hover:border-[#c9983d]/50'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Date block */}
                <div className="w-16 h-16 rounded-2xl bg-[#0c2a1a] text-white flex flex-col items-center justify-center shrink-0 shadow-sm">
                  <span className="text-[10px] uppercase font-bold text-[#e0a94b]">
                    {new Date(event.date + 'T00:00:00').toLocaleString('es-ES', { month: 'short' })}
                  </span>
                  <span className="text-xl font-extrabold font-mono leading-none mt-0.5">
                    {event.date.split('-')[2]}
                  </span>
                  {event.time && (
                    <span className="text-[9px] text-[#9fc5ae] mt-1 font-mono">
                      {event.time}
                    </span>
                  )}
                </div>

                {/* Event info */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badge.bg}`}
                    >
                      {badge.icon}
                      <span>{badge.label}</span>
                    </span>

                    <span className="font-semibold text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md">
                      {event.targetName}
                    </span>

                    {isCompleted && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                        Completado
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-[#182a1d]">{event.title}</h3>

                  <div className="flex items-center gap-4 text-stone-600 flex-wrap">
                    {event.productOrAction && (
                      <span className="text-stone-800 font-medium">
                        💊 {event.productOrAction}
                      </span>
                    )}
                    {event.dosage && (
                      <span className="text-stone-500 font-mono">
                        Dosis: {event.dosage}
                      </span>
                    )}
                    <span className="text-stone-500">
                      👤 {event.operator}
                    </span>
                  </div>

                  {event.notes && (
                    <p className="text-[11px] text-stone-500 italic">
                      Nota: {event.notes}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                <button
                  onClick={() => toggleEventStatus(event.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isCompleted
                      ? 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                      : 'bg-[#25633e] hover:bg-[#1a4b2e] text-white shadow-sm'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isCompleted ? 'Desmarcar' : 'Marcar Completado'}</span>
                </button>

                <button
                  onClick={() => setEventToDelete(event)}
                  className="w-8 h-8 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors"
                  title="Eliminar cita (doble confirmación)"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Double confirmation modal for deleting calendar appointment */}
      {eventToDelete && (
        <ConfirmDeleteModal
          isOpen={Boolean(eventToDelete)}
          title="¿Eliminar Cita del Calendario?"
          itemName={eventToDelete.title}
          itemType="cita / actividad"
          itemTag={`${eventToDelete.date} · ${eventToDelete.targetName}`}
          warningMessage={`Estás a punto de cancelar y eliminar definitivamente la actividad "${eventToDelete.title}" programada para ${eventToDelete.targetName}.`}
          onConfirm={() => {
            deleteEvent(eventToDelete.id);
            setEventToDelete(null);
          }}
          onCancel={() => setEventToDelete(null)}
        />
      )}
    </div>
  );
};
