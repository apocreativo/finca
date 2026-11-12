import React, { useState } from 'react';
import { Sprout, Plus, Calendar, Bug, Wheat, CheckCircle2, AlertCircle, Edit, Trash2 } from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { Crop } from '../types/farm';
import { EditCropModal } from './EditCropModal';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

export const CropsView: React.FC = () => {
  const { crops, setIsAddCropOpen, setIsAddEventOpen, addFumigationToCrop, deleteCrop } = useFarm();

  const [activeFumigationCropId, setActiveFumigationCropId] = useState<string | null>(null);
  const [fumProduct, setFumProduct] = useState('');
  const [fumTarget, setFumTarget] = useState('');

  // Edit & Delete modal state
  const [editingCrop, setEditingCrop] = useState<Crop | null>(null);
  const [cropToDelete, setCropToDelete] = useState<Crop | null>(null);

  const totalHectares = crops.reduce((acc, curr) => acc + curr.hectares, 0);
  const totalExpectedYield = crops.reduce((acc, curr) => acc + curr.expectedYieldKg, 0);

  const handleApplyFumigation = (cropId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!fumProduct || !fumTarget) return;
    addFumigationToCrop(cropId, {
      product: fumProduct,
      target: fumTarget,
      date: new Date().toISOString().split('T')[0]
    });
    setFumProduct('');
    setFumTarget('');
    setActiveFumigationCropId(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-2xl bg-[#e8f5e9] text-[#2e7d32] flex items-center justify-center">
              <Sprout className="w-4 h-4" />
            </span>
            <h2 className="text-2xl font-bold font-display text-[#18291c]">
              Siembras, Plantas &amp; Cultivos Agrícolas
            </h2>
          </div>
          <p className="text-xs text-[#6e7e72] mt-0.5">
            Gestión de parcelas, siembra de tomate y maíz, cosechas y fumigaciones periódicas
          </p>
        </div>

        <button
          onClick={() => setIsAddCropOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0c2a1a] hover:bg-[#163e27] text-white text-xs font-bold rounded-2xl shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#e0a94b]" />
          <span>Nueva Siembra / Parcela</span>
        </button>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#def7ed] p-5 rounded-3xl border border-[#c3edd9]">
          <span className="text-xs font-bold text-[#1e7e59] uppercase tracking-wider">
            Área Cultivada Activa
          </span>
          <div className="text-3xl font-extrabold text-[#0e3b29] font-display mt-1 font-mono-nums">
            {totalHectares.toFixed(1)} Ha
          </div>
          <p className="text-[11px] text-[#257755] mt-0.5">Hortalizas, granos y bancos de forraje</p>
        </div>

        <div className="bg-[#fdf1e2] p-5 rounded-3xl border border-[#fae2c6]">
          <span className="text-xs font-bold text-[#995924] uppercase tracking-wider">
            Rendimiento Estimado Total
          </span>
          <div className="text-3xl font-extrabold text-[#3b2311] font-display mt-1 font-mono-nums">
            {(totalExpectedYield / 1000).toFixed(1)} Toneladas
          </div>
          <p className="text-[11px] text-[#8a572c] mt-0.5">Proyección de cosecha acumulada</p>
        </div>

        <div className="bg-[#fbf2d8] p-5 rounded-3xl border border-[#f5e4b3]">
          <span className="text-xs font-bold text-[#8e6e16] uppercase tracking-wider">
            Próxima Cosecha Principal
          </span>
          <div className="text-2xl font-extrabold text-[#42330a] font-display mt-1">
            Tomate (25 Nov)
          </div>
          <p className="text-[11px] text-[#826b24] mt-0.5">Parcela Sur 1 · 14,500 kg proyectados</p>
        </div>
      </div>

      {/* Crops Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {crops.map(crop => (
          <div
            key={crop.id}
            className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_22px_rgba(0,0,0,0.04)] border border-[#0d2f1f]/8 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 w-full bg-stone-900 group">
                <img
                  src={crop.photo}
                  alt={crop.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Top badges & action buttons */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="bg-[#182a1d]/90 text-[#e0a94b] text-xs font-bold px-2.5 py-1 rounded-xl">
                    {crop.plotName}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {/* Edit button */}
                    <button
                      onClick={() => setEditingCrop(crop)}
                      className="w-7 h-7 rounded-lg bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
                      title="Editar siembra o cambiar foto"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    {/* Delete button */}
                    <button
                      onClick={() => setCropToDelete(crop)}
                      className="w-7 h-7 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white flex items-center justify-center transition-colors"
                      title="Eliminar siembra (doble confirmación)"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm ml-1 ${
                        crop.status === 'harvesting'
                          ? 'bg-amber-500 text-white animate-pulse'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {crop.status === 'harvesting'
                        ? '🌾 Cosecha'
                        : crop.status === 'vegetative'
                        ? '🌿 Creciendo'
                        : '🌱 Germinando'}
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white flex items-end justify-between">
                  <div>
                    <h3 className="text-xl font-bold font-display">{crop.name}</h3>
                    <p className="text-xs text-stone-200">{crop.variety}</p>
                  </div>
                  <span className="text-sm font-bold bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                    {crop.hectares} Ha
                  </span>
                </div>
              </div>

              {/* Crop content */}
              <div className="p-4 space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-[#faf8f4] p-2.5 rounded-xl border border-stone-200/70">
                    <span className="text-stone-400 block text-[10px]">Fecha Siembra:</span>
                    <span className="font-semibold text-stone-800">{crop.plantingDate}</span>
                  </div>
                  <div className="bg-[#faf8f4] p-2.5 rounded-xl border border-stone-200/70">
                    <span className="text-stone-400 block text-[10px]">Cosecha Estimada:</span>
                    <span className="font-bold text-amber-800 font-mono-nums">
                      {crop.expectedHarvestDate}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-[#e8f5e9] rounded-2xl flex items-center justify-between border border-[#c8e6c9]">
                  <span className="font-semibold text-[#1b5e20]">Rendimiento Esperado:</span>
                  <span className="font-extrabold text-[#1b5e20] font-mono text-sm">
                    {crop.expectedYieldKg.toLocaleString()} kg
                  </span>
                </div>

                <p className="text-[11px] text-stone-600 italic bg-[#fbf9f4] p-2.5 rounded-xl border border-stone-100">
                  {crop.notes}
                </p>

                {/* Fumigations & Treatments on this crop */}
                <div className="border-t border-stone-100 pt-2 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-stone-700 flex items-center gap-1">
                      <Bug className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Fumigaciones Realizadas ({crop.fumigationHistory.length})</span>
                    </span>
                    <button
                      onClick={() =>
                        setActiveFumigationCropId(
                          activeFumigationCropId === crop.id ? null : crop.id
                        )
                      }
                      className="text-[10px] text-emerald-700 hover:underline font-bold"
                    >
                      + Aplicar
                    </button>
                  </div>

                  {/* Inline fumigation quick form */}
                  {activeFumigationCropId === crop.id && (
                    <form
                      onSubmit={e => handleApplyFumigation(crop.id, e)}
                      className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2 mt-2"
                    >
                      <input
                        type="text"
                        required
                        value={fumProduct}
                        onChange={e => setFumProduct(e.target.value)}
                        placeholder="Producto (ej: Fungicida Cobre)"
                        className="w-full bg-white border border-emerald-300 rounded-lg px-2.5 py-1 text-xs"
                      />
                      <input
                        type="text"
                        required
                        value={fumTarget}
                        onChange={e => setFumTarget(e.target.value)}
                        placeholder="Objetivo (ej: Tizón, mosca blanca)"
                        className="w-full bg-white border border-emerald-300 rounded-lg px-2.5 py-1 text-xs"
                      />
                      <div className="flex justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setActiveFumigationCropId(null)}
                          className="px-2 py-1 text-[11px] text-stone-600"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="px-3 py-1 bg-emerald-700 text-white rounded-lg text-[11px] font-bold"
                        >
                          Guardar Aplicación
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="space-y-1 max-h-24 overflow-y-auto">
                    {crop.fumigationHistory.slice(-2).map((f, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between text-[10px] bg-stone-50 p-1.5 rounded-lg text-stone-600"
                      >
                        <span className="font-semibold text-stone-800">{f.product}</span>
                        <span className="font-mono text-stone-500">{f.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <button
                onClick={() => setIsAddEventOpen(true)}
                className="w-full py-2.5 rounded-2xl bg-[#0c2a1a] hover:bg-[#153b26] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-[#e0a94b]" />
                <span>Programar Fumigación / Cosecha</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Crop Modal */}
      <EditCropModal
        crop={editingCrop}
        isOpen={Boolean(editingCrop)}
        onClose={() => setEditingCrop(null)}
      />

      {/* Double Confirmation Modal for deleting a crop */}
      {cropToDelete && (
        <ConfirmDeleteModal
          isOpen={Boolean(cropToDelete)}
          title="¿Eliminar Parcela / Siembra?"
          itemName={cropToDelete.name}
          itemType="cultivo"
          itemTag={`${cropToDelete.hectares} Ha · ${cropToDelete.plotName}`}
          warningMessage={`Estás a punto de eliminar el cultivo "${cropToDelete.name}" (${cropToDelete.variety}). Se perderán todos los historiales de fumigación y estimaciones de cosecha registradas.`}
          onConfirm={() => {
            deleteCrop(cropToDelete.id);
            setCropToDelete(null);
          }}
          onCancel={() => setCropToDelete(null)}
        />
      )}
    </div>
  );
};
