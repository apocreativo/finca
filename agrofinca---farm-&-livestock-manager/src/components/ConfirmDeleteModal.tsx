import React, { useState } from 'react';
import { AlertTriangle, Trash2, X, ShieldAlert, CheckSquare, Square } from 'lucide-react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  title?: string;
  itemName: string;
  itemType?: string;
  itemTag?: string;
  warningMessage?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  title = '¿Eliminar registro permanentemente?',
  itemName,
  itemType = 'registro',
  itemTag,
  warningMessage = 'Esta acción eliminará todos los datos asociados (historial de pesaje, sanidad, producción y registros). No se puede deshacer.',
  onConfirm,
  onCancel
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [confirmStep, setConfirmStep] = useState<1 | 2>(1);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsChecked(false);
    setConfirmStep(1);
    onCancel();
  };

  const handleExecuteDelete = () => {
    if (!isChecked) return;
    if (confirmStep === 1) {
      setConfirmStep(2);
      return;
    }
    // Confirmed 2nd step
    onConfirm();
    setIsChecked(false);
    setConfirmStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-rose-200 overflow-hidden text-stone-800">
        {/* Top Danger Accent Header */}
        <div className="bg-gradient-to-r from-rose-600 via-red-600 to-amber-700 p-5 text-white relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/30">
              <ShieldAlert className="w-7 h-7 text-white drop-shadow-sm" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-rose-200 bg-rose-950/30 px-2.5 py-0.5 rounded-full inline-block">
                Doble Confirmación de Seguridad
              </span>
              <h3 className="text-lg font-bold font-display mt-0.5">{title}</h3>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          {/* Target Item summary card */}
          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-rose-700 font-semibold block">
                {itemType} a eliminar:
              </span>
              <p className="font-bold text-stone-900 text-base">{itemName}</p>
            </div>
            {itemTag && (
              <span className="bg-white border border-rose-200 text-rose-800 text-xs font-mono font-bold px-2.5 py-1 rounded-lg">
                {itemTag}
              </span>
            )}
          </div>

          {/* Warning notice */}
          <div className="flex gap-2.5 items-start text-xs text-stone-600 bg-amber-50/80 p-3.5 rounded-2xl border border-amber-200">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">{warningMessage}</p>
          </div>

          {/* Checkbox verification (Step 1 of double confirmation) */}
          <button
            type="button"
            onClick={() => {
              setIsChecked(!isChecked);
              setConfirmStep(1);
            }}
            className="w-full text-left flex items-start gap-3 p-3.5 rounded-2xl border border-stone-200 hover:border-rose-300 hover:bg-rose-50/30 transition-all select-none cursor-pointer"
          >
            {isChecked ? (
              <CheckSquare className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            ) : (
              <Square className="w-5 h-5 text-stone-400 shrink-0 mt-0.5" />
            )}
            <div className="text-xs">
              <span className="font-bold text-stone-800 block">
                Paso 1: Confirmo la acción irreversible
              </span>
              <span className="text-stone-500 text-[11px]">
                He verificado el identificador y autorizo eliminar este {itemType} permanentemente.
              </span>
            </div>
          </button>

          {/* Double confirmation state banner */}
          {isChecked && confirmStep === 2 && (
            <div className="bg-rose-100 text-rose-900 text-xs p-3 rounded-xl border border-rose-300 text-center font-bold animate-pulse">
              ⚠️ Paso 2: Presiona nuevamente para ejecutar el borrado definitivo ahora.
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 px-4 rounded-xl border border-stone-300 text-stone-700 font-semibold text-xs hover:bg-stone-100 transition-colors"
            >
              Cancelar
            </button>

            <button
              type="button"
              disabled={!isChecked}
              onClick={handleExecuteDelete}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
                !isChecked
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed border border-stone-200'
                  : confirmStep === 2
                  ? 'bg-rose-700 hover:bg-rose-800 text-white animate-bounce'
                  : 'bg-rose-600 hover:bg-rose-700 text-white'
              }`}
            >
              <Trash2 className="w-4 h-4" />
              <span>
                {confirmStep === 1
                  ? 'Paso 2: Confirmar Borrado'
                  : '¡Sí, Eliminar Definitivamente!'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
