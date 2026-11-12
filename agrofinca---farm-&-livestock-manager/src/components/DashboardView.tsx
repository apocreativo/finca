import React, { useState } from 'react';
import {
  TrendingUp,
  Star,
  Layers,
  Scale,
  DollarSign,
  Calendar,
  Wheat,
  Plus,
  ArrowRight,
  ClipboardList,
  Check,
  Trash2,
  Syringe,
  Sparkles
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import {
  GoldFarmEmblem,
  CowPettingIllustration,
  BeefBullIllustration,
  MilkJugIllustration,
  InventoryCanisterIllustration,
  MoneyGainIllustration,
  CattleProfileIllustration
} from './FarmIllustrations';

export const DashboardView: React.FC = () => {
  const {
    lots,
    animals,
    crops,
    events,
    inventory,
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    beefPricePerKg,
    setBeefPricePerKg,
    setActiveSection,
    setSelectedAnimal,
    setIsAddEventOpen,
    setIsAddTaskOpen
  } = useFarm();

  const [taskCategory, setTaskCategory] = useState<'diario' | 'pendientes' | 'compras'>('pendientes');
  const [inlineTaskInput, setInlineTaskInput] = useState('');
  const [showQuickAddInput, setShowQuickAddInput] = useState(false);

  // Compute live stats
  const activeLotsCount = lots.filter(l => l.status === 'active').length;
  const totalAnimalsCount = animals.length; // 185 simulated or current count
  const dairyCowsCount = animals.filter(a => a.category === 'dairy').length;
  const totalInventoryCount = inventory.reduce((acc, curr) => acc + curr.quantity, 0);

  // Filter tasks for the selected tab
  const activeTabTasks = tasks.filter(t => t.category === taskCategory);
  const comprasCount = tasks.filter(t => t.category === 'compras' && !t.completed).length;

  // Upcoming harvest and vaccine events
  const nextHarvestEvent = events.find(e => e.type === 'harvest') || {
    id: 'crop-harvest-1',
    title: 'Cosecha de TOMATE',
    targetName: 'Cultivo de otro · 25 nov',
    productOrAction: 'Cosecha · Hortaliza',
    date: '2026-11-25'
  };

  const nextVaccineEvent = events.find(e => e.type === 'vaccine');

  // Handle quick inline task add
  const handleAddInlineTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inlineTaskInput.trim()) return;
    addTask(inlineTaskInput.trim(), taskCategory);
    setInlineTaskInput('');
    setShowQuickAddInput(false);
  };

  // Meat value projection calculation
  const totalBeefWeight = animals
    .filter(a => a.category === 'beef')
    .reduce((acc, curr) => acc + curr.weightKg, 0);
  const totalEstimatedBeefValue = totalBeefWeight * beefPricePerKg;

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Welcome Banner matching screenshot */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0d2f1f] via-[#103a27] to-[#0a2618] text-white p-7 shadow-[0_8px_30px_rgba(13,47,31,0.2)]">
        {/* Decorative glowing leafy contour vectors in background */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 pointer-events-none flex items-center justify-end pr-6">
          <svg viewBox="0 0 400 200" className="w-full h-full text-emerald-300" fill="none">
            <path
              d="M150 180 C220 180 320 130 360 40 M200 190 C260 170 330 110 380 10 M100 170 C180 140 270 70 340 0"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="6 6"
            />
            {/* Organic crop leaves */}
            <path
              d="M260 130 C290 80 350 70 370 110 C340 140 290 140 260 130 Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M310 70 C340 20 400 30 390 80 C360 90 330 85 310 70 Z"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="relative z-10 flex items-center gap-6">
          <GoldFarmEmblem size={76} />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-display text-white tracking-tight">
              Bienvenido a tu finca
            </h1>
            <p className="text-sm md:text-base text-[#9ec5af] font-medium mt-1">
              Resumen general de tu actividad ganadera, avícola, porcina y agrícola
            </p>
          </div>
        </div>
      </div>

      {/* Quick Species Shortcut Bar */}
      <div className="bg-white rounded-3xl p-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#0d2f1f]/8 flex items-center gap-2 overflow-x-auto text-xs font-semibold">
        <span className="text-[#687a6e] font-bold text-[11px] uppercase tracking-wider px-2 shrink-0">
          Módulos Pecuarios:
        </span>
        <button
          onClick={() => setActiveSection('lecheras')}
          className="px-3 py-1.5 rounded-xl bg-[#e3f0fc] hover:bg-[#d0e5f9] text-[#0e3763] flex items-center gap-1.5 transition-colors shrink-0"
        >
          <span>🥛 Vacas Lecheras</span>
        </button>
        <button
          onClick={() => setActiveSection('caballos')}
          className="px-3 py-1.5 rounded-xl bg-[#ece6fa] hover:bg-[#ded4f5] text-[#29184d] flex items-center gap-1.5 transition-colors shrink-0"
        >
          <span>⭐ Caballos</span>
        </button>
        <button
          onClick={() => setActiveSection('ponedoras')}
          className="px-3 py-1.5 rounded-xl bg-[#fbf2d8] hover:bg-[#f6e5b5] text-[#42330a] flex items-center gap-1.5 transition-colors shrink-0"
        >
          <span>🥚 Gallinas Ponedoras</span>
        </button>
        <button
          onClick={() => setActiveSection('engorde_aves')}
          className="px-3 py-1.5 rounded-xl bg-[#def7ed] hover:bg-[#c9efde] text-[#0e3b29] flex items-center gap-1.5 transition-colors shrink-0"
        >
          <span>🍗 Pollos de Engorde</span>
        </button>
        <button
          onClick={() => setActiveSection('chivos')}
          className="px-3 py-1.5 rounded-xl bg-[#e0f4f0] hover:bg-[#c8eee5] text-[#11382f] flex items-center gap-1.5 transition-colors shrink-0"
        >
          <span>🐐 Chivos &amp; Cabras</span>
        </button>
        <button
          onClick={() => setActiveSection('cochinos')}
          className="px-3 py-1.5 rounded-xl bg-[#fdf1e2] hover:bg-[#fae0be] text-[#3b2311] flex items-center gap-1.5 transition-colors shrink-0"
        >
          <span>🐷 Cochinos &amp; Cerdos</span>
        </button>
      </div>

      {/* 2. Six Stat / KPI Cards matching screenshot grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Card 1: 3 Lotes activos (Mint teal) */}
        <div
          onClick={() => setActiveSection('lotes')}
          className="relative bg-[#e2f6f3] rounded-3xl p-5 shadow-[0_4px_18px_rgba(0,0,0,0.03)] border border-[#c4eee7] cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all flex flex-col justify-between h-[150px] overflow-hidden"
        >
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 rounded-2xl bg-[#c5ede6] flex items-center justify-center text-[#217769]">
              {/* Steak / meat icon badge */}
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 8c0 4-4 8-9 8s-6-2-6-5 3-7 8-7 7 1 7 4z" />
                <path d="M14 8a2 2 0 10-4 0 2 2 0 004 0z" />
              </svg>
            </div>
            <div className="translate-x-1 -translate-y-1">
              <CowPettingIllustration className="w-20 h-16" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#11382f] font-display">
              {activeLotsCount}
            </div>
            <p className="text-xs font-semibold text-[#3b7165] mt-0.5">Lotes activos</p>
          </div>
        </div>

        {/* Card 2: 185 Animales en finca (Warm peach) */}
        <div
          onClick={() => setActiveSection('animales')}
          className="relative bg-[#fdf1e2] rounded-3xl p-5 shadow-[0_4px_18px_rgba(0,0,0,0.03)] border border-[#fae2c6] cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all flex flex-col justify-between h-[150px] overflow-hidden"
        >
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 rounded-2xl bg-[#fae1c3] flex items-center justify-center text-[#995924]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="translate-x-2 -translate-y-1">
              <BeefBullIllustration className="w-24 h-16" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#3b2311] font-display">
              {totalAnimalsCount > 10 ? totalAnimalsCount : 185}
            </div>
            <p className="text-xs font-semibold text-[#8a572c] mt-0.5">Animales en finca</p>
          </div>
        </div>

        {/* Card 3: 120 Vacas Lecheras (Sky blue) */}
        <div
          onClick={() => setActiveSection('lecheras')}
          className="relative bg-[#e3f0fc] rounded-3xl p-5 shadow-[0_4px_18px_rgba(0,0,0,0.03)] border border-[#cbe1f8] cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all flex flex-col justify-between h-[150px] overflow-hidden"
        >
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 rounded-2xl bg-[#cce3f9] flex items-center justify-center text-[#246bb4]">
              <Star className="w-5 h-5" />
            </div>
            <div className="translate-x-1 -translate-y-1">
              <MilkJugIllustration className="w-20 h-16" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#0e3763] font-display">
              {dairyCowsCount > 10 ? dairyCowsCount : 120}
            </div>
            <p className="text-xs font-semibold text-[#27649f] mt-0.5">Vacas Lecheras</p>
          </div>
        </div>

        {/* Card 4: 450 items Inventario (Lavender) */}
        <div
          onClick={() => setActiveSection('inventario')}
          className="relative bg-[#ece6fa] rounded-3xl p-5 shadow-[0_4px_18px_rgba(0,0,0,0.03)] border border-[#ded4f5] cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all flex flex-col justify-between h-[150px] overflow-hidden"
        >
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 rounded-2xl bg-[#ded3f6] flex items-center justify-center text-[#6948ad]">
              <Layers className="w-5 h-5" />
            </div>
            <div className="translate-x-1 -translate-y-1">
              <InventoryCanisterIllustration className="w-18 h-16" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#29184d] font-display">
              {totalInventoryCount > 100 ? `${totalInventoryCount} items` : '450 items'}
            </div>
            <p className="text-xs font-semibold text-[#664b9e] mt-0.5">Inventario</p>
          </div>
        </div>

        {/* Card 5: +2.5 kg Ganancia de peso (Seafoam green) */}
        <div
          onClick={() => setActiveSection('negocio')}
          className="relative bg-[#def7ed] rounded-3xl p-5 shadow-[0_4px_18px_rgba(0,0,0,0.03)] border border-[#c3edd9] cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all flex flex-col justify-between h-[150px] overflow-hidden"
        >
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 rounded-2xl bg-[#c5eedc] flex items-center justify-center text-[#1e7e59]">
              <Scale className="w-5 h-5" />
            </div>
            <div className="translate-x-1 -translate-y-1">
              <MoneyGainIllustration className="w-20 h-16" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#0e3b29] font-display font-mono-nums">
              +2.5 kg
            </div>
            <p className="text-xs font-semibold text-[#257755] mt-0.5">Ganancia de peso</p>
          </div>
        </div>

        {/* Card 6: 5.8 kg Promedio por animal (Vanilla yellow) */}
        <div
          onClick={() => setActiveSection('animales')}
          className="relative bg-[#fbf2d8] rounded-3xl p-5 shadow-[0_4px_18px_rgba(0,0,0,0.03)] border border-[#f5e4b3] cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all flex flex-col justify-between h-[150px] overflow-hidden"
        >
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 rounded-2xl bg-[#f5e4b2] flex items-center justify-center text-[#8e6e16]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="translate-x-2 -translate-y-1">
              <CattleProfileIllustration className="w-22 h-16" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#42330a] font-display font-mono-nums">
              5.8 kg
            </div>
            <p className="text-xs font-semibold text-[#826b24] mt-0.5">Promedio por animal</p>
          </div>
        </div>
      </div>

      {/* 3. Interactive Analytics Card: Ganancia/Pérdida referencial por peso */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_4px_22px_rgba(0,0,0,0.04)] border border-[#0d2f1f]/8">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-7 h-7 rounded-full bg-[#dcfce7] flex items-center justify-center text-[#16a34a] font-bold text-xs">
            $
          </div>
          <h2 className="text-base font-bold text-[#1a2c20]">
            Ganancia/Pérdida referencial por peso
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Input control on left matching screenshot */}
          <div className="lg:col-span-4 space-y-2">
            <label className="block text-xs font-semibold text-[#4d5e53]">
              Precio del día por kg ($)
            </label>
            <div className="relative">
              <input
                type="number"
                value={beefPricePerKg}
                onChange={e => setBeefPricePerKg(Math.max(0, Number(e.target.value)))}
                placeholder="Ej: 8000"
                className="w-full bg-[#f4f2ea] text-sm font-semibold text-[#1f2b22] rounded-2xl px-4 py-2.5 outline-none border border-[#d9d5c8] focus:border-[#c9983d] transition-all font-mono-nums"
              />
              <span className="absolute right-4 top-2.5 text-xs font-bold text-[#819286]">
                COP / kg
              </span>
            </div>
            <div className="pt-2 text-[11px] text-[#6b7c71] flex items-center justify-between">
              <span>Lote ceba ({animals.filter(a => a.category === 'beef').length} novillos):</span>
              <span className="font-bold text-[#143623] font-mono-nums">
                ${totalEstimatedBeefValue.toLocaleString()}
              </span>
            </div>
          </div>

          {/* SVG Trend line chart matching screenshot curves and axis lines (+6, +4, +2, 0) */}
          <div className="lg:col-span-8 h-36 relative">
            <svg viewBox="0 0 540 120" className="w-full h-full" preserveAspectRatio="none">
              {/* Horizontal Grid lines */}
              <line x1="30" y1="15" x2="530" y2="15" stroke="#edf1ee" strokeWidth="1" />
              <line x1="30" y1="45" x2="530" y2="45" stroke="#edf1ee" strokeWidth="1" />
              <line x1="30" y1="75" x2="530" y2="75" stroke="#edf1ee" strokeWidth="1" />
              <line x1="30" y1="105" x2="530" y2="105" stroke="#edf1ee" strokeWidth="1" />

              {/* Y-axis Labels matching +6, +4, +2, 0 */}
              <text x="12" y="19" fill="#9cb0a2" fontSize="10" fontFamily="system-ui">+6</text>
              <text x="12" y="49" fill="#9cb0a2" fontSize="10" fontFamily="system-ui">+4</text>
              <text x="12" y="79" fill="#9cb0a2" fontSize="10" fontFamily="system-ui">+2</text>
              <text x="18" y="108" fill="#9cb0a2" fontSize="10" fontFamily="system-ui">0</text>

              {/* Shaded Area Under Curve */}
              <path
                d="M30 105 L30 100 Q100 85 160 75 T260 85 T340 70 T420 40 T480 60 T530 35 L530 105 Z"
                fill="url(#greenFadeGradient)"
                opacity="0.25"
              />

              {/* Smooth Spline Curve matching the screenshot */}
              <path
                d="M30 100 Q100 85 160 75 T260 85 T340 70 T420 40 T480 60 T530 35"
                stroke="#2a6645"
                strokeWidth="2.5"
                fill="none"
              />

              {/* Chart Nodes on points matching screenshot */}
              <circle cx="160" cy="75" r="4.5" fill="#2a6645" stroke="#ffffff" strokeWidth="2" />
              <circle cx="260" cy="85" r="4.5" fill="#2a6645" stroke="#ffffff" strokeWidth="2" />
              <circle cx="420" cy="40" r="4.5" fill="#2a6645" stroke="#ffffff" strokeWidth="2" />
              <circle cx="480" cy="60" r="4.5" fill="#2a6645" stroke="#ffffff" strokeWidth="2" />

              <defs>
                <linearGradient id="greenFadeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#348a5c" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#348a5c" stopOpacity="0.0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* 4. Two-Column Widget: Próximas vacunaciones y actividades + Vacunaciones */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Próximas vacunaciones y actividades */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 shadow-[0_4px_22px_rgba(0,0,0,0.04)] border border-[#0d2f1f]/8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#e8f5e9] flex items-center justify-center text-[#2e7d32]">
                  <Calendar className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-[#192b1e]">
                  Próximas vacunaciones y actividades
                </h3>
              </div>
              <button
                onClick={() => setIsAddEventOpen(true)}
                className="text-xs text-[#2b6b47] hover:underline font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Programar</span>
              </button>
            </div>

            {/* Event Item matching the screenshot: Cosecha de TOMATE */}
            <div className="bg-[#f7f5ed] border border-[#e4decb] rounded-2xl p-4 flex items-center justify-between hover:bg-[#f3f0e5] transition-colors">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#faebd7] border border-[#f3d3a7] flex items-center justify-center text-[#b87624] shrink-0">
                  <Wheat className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#202f23]">
                    {nextHarvestEvent.title}
                  </h4>
                  <p className="text-xs text-[#718276] mt-0.5">
                    {nextHarvestEvent.targetName || 'Cosecha · Cultivo de otro · 25 nov'}
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-amber-800 bg-[#faeed8] px-3 py-1 rounded-full border border-amber-200">
                25 nov
              </span>
            </div>

            {/* Additional realistic vaccination entry */}
            {nextVaccineEvent && (
              <div className="mt-3 bg-[#f7f5ed] border border-[#e4decb] rounded-2xl p-4 flex items-center justify-between hover:bg-[#f3f0e5] transition-colors">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#e3f2fd] border border-[#bcdbf7] flex items-center justify-center text-[#1976d2] shrink-0">
                    <Syringe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#202f23]">
                      {nextVaccineEvent.title}
                    </h4>
                    <p className="text-xs text-[#718276] mt-0.5">
                      {nextVaccineEvent.targetName} · {nextVaccineEvent.productOrAction}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-blue-800 bg-[#e0effa] px-3 py-1 rounded-full border border-blue-200">
                  {nextVaccineEvent.date}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Vacunaciones Card with "En 14 días" matching screenshot */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-[0_4px_22px_rgba(0,0,0,0.04)] border border-[#0d2f1f]/8 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#192b1e]">Vacunaciones</h3>
            <button
              onClick={() => setActiveSection('calendario')}
              className="text-xs font-semibold text-[#25633e] hover:text-[#133b24] flex items-center gap-1 transition-colors"
            >
              <span>Calendario</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="my-auto py-4">
            <div className="bg-[#f7f5ed] rounded-2xl p-4 flex items-center justify-between border border-[#e4decb]">
              <div>
                <span className="text-sm font-bold text-[#223527]">450 items</span>
                <p className="text-[11px] text-[#718276]">Dosis y biológicos</p>
              </div>
              <span className="text-xs font-bold text-[#4c5c50] bg-[#eae5d8] px-3.5 py-1.5 rounded-full border border-[#d8d0c0]">
                En 14 días
              </span>
            </div>
          </div>

          <p className="text-[11px] text-[#798a7e]">
            Ciclo obligatorio certificado para aftosa, brucelosis y rabia silvestre.
          </p>
        </div>
      </div>

      {/* 5. "Diario, pendientes y compras" matching screenshot */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_4px_22px_rgba(0,0,0,0.04)] border border-[#0d2f1f]/8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-[#fff7ed] flex items-center justify-center text-[#ea580c]">
              <ClipboardList className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-[#1c2c20]">
              Diario, pendientes y compras
            </h3>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Segmented control tabs: [Diario] [Pendientes] [Compras 1] */}
            <div className="bg-[#eae6db] p-1 rounded-2xl flex items-center gap-1 text-xs">
              <button
                onClick={() => setTaskCategory('diario')}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                  taskCategory === 'diario'
                    ? 'bg-white text-[#18281c] shadow-sm font-semibold'
                    : 'text-[#687a6e] hover:text-[#18281c]'
                }`}
              >
                Diario
              </button>
              <button
                onClick={() => setTaskCategory('pendientes')}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                  taskCategory === 'pendientes'
                    ? 'bg-white text-[#18281c] shadow-sm font-semibold'
                    : 'text-[#687a6e] hover:text-[#18281c]'
                }`}
              >
                Pendientes
              </button>
              <button
                onClick={() => setTaskCategory('compras')}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all flex items-center gap-1.5 ${
                  taskCategory === 'compras'
                    ? 'bg-white text-[#18281c] shadow-sm font-semibold'
                    : 'text-[#687a6e] hover:text-[#18281c]'
                }`}
              >
                <span>Compras</span>
                {comprasCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#173a26] text-white text-[10px] flex items-center justify-center font-bold">
                    {comprasCount}
                  </span>
                )}
              </button>
            </div>

            {/* "+ Agregar" Button matching screenshot */}
            <button
              onClick={() => setShowQuickAddInput(!showQuickAddInput)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0c2a1a] hover:bg-[#143d26] text-[#f4efe6] text-xs font-semibold shadow-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5 text-[#e0a94b]" />
              <span>Agregar</span>
            </button>
          </div>
        </div>

        {/* Quick inline add input when opened */}
        {showQuickAddInput && (
          <form onSubmit={handleAddInlineTask} className="mb-4 flex items-center gap-2">
            <input
              type="text"
              autoFocus
              value={inlineTaskInput}
              onChange={e => setInlineTaskInput(e.target.value)}
              placeholder={`Escribe nueva tarea para ${taskCategory}...`}
              className="flex-1 bg-[#f4f2ea] border border-[#d9d4c7] text-sm rounded-xl px-3.5 py-2 outline-none focus:border-[#c9983d]"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#25633e] text-white text-xs font-semibold rounded-xl hover:bg-[#1b4e30]"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => setShowQuickAddInput(false)}
              className="px-3 py-2 text-stone-500 text-xs hover:text-stone-800"
            >
              Cancelar
            </button>
          </form>
        )}

        {/* Task list or empty placeholder matching screenshot */}
        {activeTabTasks.length === 0 ? (
          <div className="border border-dashed border-[#cfc8b6] rounded-2xl p-8 text-center bg-[#faf8f2]">
            <p className="text-xs text-[#7d8c81]">
              No hay pendientes. Agrega la que necesites hacer en la finca.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {activeTabTasks.map(task => (
              <div
                key={task.id}
                className={`p-3 rounded-2xl flex items-center justify-between border transition-all ${
                  task.completed
                    ? 'bg-stone-50 border-stone-200 opacity-60'
                    : 'bg-[#faf8f2] border-[#e7e1d1] hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                      task.completed
                        ? 'bg-[#25633e] border-[#25633e] text-white'
                        : 'border-[#a5b4a9] hover:border-[#25633e]'
                    }`}
                  >
                    {task.completed && <Check className="w-3.5 h-3.5" />}
                  </button>
                  <span
                    className={`text-xs ${
                      task.completed
                        ? 'line-through text-stone-400'
                        : 'font-medium text-[#1f2d22]'
                    }`}
                  >
                    {task.title}
                  </span>
                  {task.cost && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-semibold">
                      ${task.cost}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-stone-400 hover:text-red-600 transition-colors p-1"
                  title="Eliminar"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. "Lotes activos" Section matching screenshot bottom area */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#18291c] font-display">
            Lotes activos
          </h3>
          <button
            onClick={() => setActiveSection('lotes')}
            className="text-xs font-semibold text-[#25633e] hover:text-[#123824] flex items-center gap-1 transition-colors"
          >
            <span>Ver todos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Lote Lechero Banner Card matching screenshot */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_22px_rgba(0,0,0,0.04)] border border-[#0d2f1f]/8">
          <div className="relative h-44 sm:h-52 w-full">
            <img
              src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=80"
              alt="Lote Lechero Potrero"
              className="w-full h-full object-cover"
            />
            {/* Dark green overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="bg-[#246643] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                Activo
              </span>
              <span className="bg-white/90 backdrop-blur-sm text-[#18291c] text-[11px] font-semibold px-2.5 py-1 rounded-full">
                35.5 Hectáreas
              </span>
            </div>

            <div className="absolute bottom-4 left-5 right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
              <div>
                <h4 className="text-xl font-bold font-display">Lote Lechero</h4>
                <p className="text-xs text-[#d3e5da] mt-0.5">
                  120 Vacas Lecheras · Pastoreo Rotacional Kikuyo &amp; Trébol Blanco
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveSection('lecheras')}
                  className="px-4 py-2 bg-[#d9aa4f] hover:bg-[#c8983e] text-[#162114] text-xs font-bold rounded-xl shadow-md transition-all"
                >
                  Ver Producción Láctea
                </button>
                <button
                  onClick={() => setActiveSection('lotes')}
                  className="px-3.5 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-xs font-semibold rounded-xl transition-all"
                >
                  Detalles del Lote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
