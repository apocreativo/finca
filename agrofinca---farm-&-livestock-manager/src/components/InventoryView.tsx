import React, { useState } from 'react';
import { Package, Plus, AlertTriangle, CheckCircle, Search, Layers, Trash2 } from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { InventoryItem } from '../types/farm';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

export const InventoryView: React.FC = () => {
  const { inventory, updateInventoryQty, addInventoryItem, deleteInventoryItem } = useFarm();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<InventoryItem | null>(null);

  // New item form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'feed' | 'medicine' | 'vaccine' | 'fertilizer' | 'tools' | 'supplies'>('feed');
  const [quantity, setQuantity] = useState('50');
  const [unit, setUnit] = useState('bultos');
  const [costPerUnit, setCostPerUnit] = useState('25');
  const [location, setLocation] = useState('Bodega Principal');

  const totalItemsCount = inventory.reduce((acc, curr) => acc + curr.quantity, 0);

  const filteredItems = inventory.filter(item => {
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    addInventoryItem({
      name,
      category,
      quantity: Number(quantity),
      unit,
      minThreshold: 15,
      costPerUnit: Number(costPerUnit),
      location
    });
    setName('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-2xl bg-[#ece6fa] text-[#6948ad] flex items-center justify-center">
              <Package className="w-4 h-4" />
            </span>
            <h2 className="text-2xl font-bold font-display text-[#18291c]">
              Inventario de Insumos &amp; Bodega
            </h2>
          </div>
          <p className="text-xs text-[#6e7e72] mt-0.5">
            Concentrados, sal mineralizada, vacunas, medicamentos, fertilizantes y filtros
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0c2a1a] hover:bg-[#163e27] text-white text-xs font-bold rounded-2xl shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#e0a94b]" />
          <span>Nuevo Producto / Insumo</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#ece6fa] p-5 rounded-3xl border border-[#ded4f5]">
          <span className="text-xs font-bold text-[#6948ad] uppercase tracking-wider">
            Total Unidades en Bodega
          </span>
          <div className="text-3xl font-extrabold text-[#29184d] font-display mt-1 font-mono-nums">
            {totalItemsCount} items
          </div>
          <p className="text-[11px] text-[#664b9e] mt-0.5">Stock disponible en tiempo real</p>
        </div>

        <div className="bg-[#def7ed] p-5 rounded-3xl border border-[#c3edd9]">
          <span className="text-xs font-bold text-[#1e7e59] uppercase tracking-wider">
            Biológicos &amp; Vacunas
          </span>
          <div className="text-3xl font-extrabold text-[#0e3b29] font-display mt-1 font-mono-nums">
            250 dosis
          </div>
          <p className="text-[11px] text-[#257755] mt-0.5">Cadena de frío activa a 4°C</p>
        </div>

        <div className="bg-[#fdf1e2] p-5 rounded-3xl border border-[#fae2c6]">
          <span className="text-xs font-bold text-[#995924] uppercase tracking-wider">
            Nutrición y Sal Mineral
          </span>
          <div className="text-3xl font-extrabold text-[#3b2311] font-display mt-1 font-mono-nums">
            225 bultos
          </div>
          <p className="text-[11px] text-[#8a572c] mt-0.5">Suficiente para 45 días de ración</p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-3xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#0d2f1f]/8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['all', 'feed', 'vaccine', 'medicine', 'fertilizer', 'supplies'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl capitalize transition-all whitespace-nowrap ${
                categoryFilter === cat
                  ? 'bg-[#0c2a1a] text-white font-bold'
                  : 'bg-[#faf8f4] text-stone-600 hover:bg-stone-100'
              }`}
            >
              {cat === 'all'
                ? 'Todos'
                : cat === 'feed'
                ? 'Alimentos / Sal'
                : cat === 'vaccine'
                ? 'Vacunas'
                : cat === 'medicine'
                ? 'Medicinas'
                : cat === 'fertilizer'
                ? 'Fertilizantes'
                : 'Insumos'}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar producto..."
            className="w-full bg-[#f6f4ee] rounded-xl pl-8 pr-3 py-2 text-xs outline-none border border-stone-200"
          />
        </div>
      </div>

      {/* Inventory Items Table / Cards */}
      <div className="bg-white rounded-3xl shadow-[0_4px_22px_rgba(0,0,0,0.04)] border border-[#0d2f1f]/8 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#fbf9f4] text-stone-500 font-bold border-b border-stone-100">
              <tr>
                <th className="py-3 px-5">Insumo / Producto</th>
                <th className="py-3 px-5">Categoría</th>
                <th className="py-3 px-5">Ubicación</th>
                <th className="py-3 px-5">Stock Actual</th>
                <th className="py-3 px-5 text-right">Ajuste Rápido</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredItems.map(item => {
                const isLow = item.quantity <= item.minThreshold;

                return (
                  <tr key={item.id} className="hover:bg-[#faf8f4] transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="font-bold text-[#182a1d]">{item.name}</div>
                      {item.expiryDate && (
                        <span className="text-[10px] text-stone-400 font-mono">
                          Vence: {item.expiryDate}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-stone-100 text-stone-700 capitalize">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-stone-600">{item.location}</td>
                    <td className="py-3.5 px-5 font-mono-nums">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-extrabold text-[#182a1d]">
                          {item.quantity} {item.unit}
                        </span>
                        {isLow && (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            <AlertTriangle className="w-3 h-3" />
                            Stock Bajo
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => updateInventoryQty(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold flex items-center justify-center transition-colors"
                          title="Restar 1"
                        >
                          -
                        </button>
                        <button
                          onClick={() => updateInventoryQty(item.id, item.quantity + 5)}
                          className="px-2.5 py-1 rounded-lg bg-[#25633e] hover:bg-[#1a4b2e] text-white text-[11px] font-bold transition-colors"
                          title="Agregar 5"
                        >
                          +5
                        </button>
                        <button
                          onClick={() => setItemToDelete(item)}
                          className="w-7 h-7 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors ml-1"
                          title="Eliminar insumo (doble confirmación)"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 text-xs">
            <h3 className="text-base font-bold text-[#182a1d] mb-4">
              Registrar Insumo en Inventario
            </h3>
            <form onSubmit={handleAddItem} className="space-y-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Nombre</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Ej: Sal Mineralizada 8%"
                  className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Categoría</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 outline-none"
                  >
                    <option value="feed">Alimento / Forraje</option>
                    <option value="vaccine">Vacuna</option>
                    <option value="medicine">Medicamento</option>
                    <option value="fertilizer">Fertilizante</option>
                    <option value="supplies">Insumos Ordeño</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Cantidad Inicial</label>
                  <input
                    type="number"
                    required
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    className="w-full bg-[#faf8f4] border border-stone-300 rounded-xl px-3 py-2 outline-none font-mono"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-stone-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0c2a1a] text-white rounded-xl font-bold"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Double confirmation modal for deleting inventory item */}
      {itemToDelete && (
        <ConfirmDeleteModal
          isOpen={Boolean(itemToDelete)}
          title="¿Eliminar Insumo del Inventario?"
          itemName={itemToDelete.name}
          itemType="insumo de bodega"
          itemTag={`${itemToDelete.quantity} ${itemToDelete.unit} · ${itemToDelete.location}`}
          warningMessage={`Estás a punto de eliminar "${itemToDelete.name}" de la bodega. Se borrará permanentemente el registro de existencias y costos asociados.`}
          onConfirm={() => {
            deleteInventoryItem(itemToDelete.id);
            setItemToDelete(null);
          }}
          onCancel={() => setItemToDelete(null)}
        />
      )}
    </div>
  );
};
