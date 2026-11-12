import React from 'react';
import { Users, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { useFarm } from '../context/FarmContext';

export const OperatorsView: React.FC = () => {
  const { operators, tasks } = useFarm();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-2xl bg-[#e0f4f0] text-[#1e7e59] flex items-center justify-center">
            <Users className="w-4 h-4" />
          </span>
          <h2 className="text-2xl font-bold font-display text-[#18291c]">
            Operadores &amp; Equipo de la Finca
          </h2>
        </div>
        <p className="text-xs text-[#6e7e72] mt-0.5">
          Personal administrativo, médico veterinario, mayordomo y encargados de potreros
        </p>
      </div>

      {/* Operators Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {operators.map(op => (
          <div
            key={op.id}
            className="bg-white rounded-3xl p-6 shadow-[0_4px_22px_rgba(0,0,0,0.04)] border border-[#0d2f1f]/8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={op.avatar}
                  alt={op.name}
                  className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-stone-200"
                />
                <div>
                  <h3 className="text-base font-bold text-[#18291c] font-display">
                    {op.name}
                  </h3>
                  <p className="text-xs text-[#25633e] font-semibold">{op.role}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                  <span className="font-mono">{op.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  <span>{op.email}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100">
                <span className="text-[11px] font-bold text-stone-700 block mb-2">
                  Áreas a cargo:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {op.assignedAreas.map((area, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-xl bg-[#faf8f4] border border-stone-200 text-[11px] text-stone-700 font-medium"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
