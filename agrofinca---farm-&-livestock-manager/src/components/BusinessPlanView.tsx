import React, { useState } from 'react';
import { TrendingUp, DollarSign, Scale, Milk, Wheat, PieChart, ShieldAlert } from 'lucide-react';
import { useFarm } from '../context/FarmContext';

export const BusinessPlanView: React.FC = () => {
  const { beefPricePerKg, setBeefPricePerKg, animals, crops } = useFarm();

  const [milkPrice, setMilkPrice] = useState(2450);
  const [tomatoPrice, setTomatoPrice] = useState(3200);

  // Beef herd metrics
  const beefAnimals = animals.filter(a => a.category === 'beef');
  const totalBeefKg = beefAnimals.reduce((acc, curr) => acc + curr.weightKg, 0);
  const totalBeefValue = totalBeefKg * beefPricePerKg;

  // Dairy herd metrics
  const dairyAnimals = animals.filter(a => a.category === 'dairy');
  const totalDailyMilk = dairyAnimals.reduce((acc, curr) => acc + (curr.dailyMilkLiters || 20), 0);
  const monthlyMilkRevenue = totalDailyMilk * 30 * milkPrice;

  // Crop revenue
  const tomatoCrop = crops.find(c => c.name.toLowerCase().includes('tomate'));
  const tomatoYield = tomatoCrop ? tomatoCrop.expectedYieldKg : 14500;
  const tomatoRevenue = tomatoYield * tomatoPrice;

  // Estimated Monthly Operations Costs
  const feedCostMonthly = 42000000;
  const laborCostMonthly = 14500000;
  const vetSanitaryCost = 6800000;
  const utilitiesAndFuel = 5500000;
  const totalMonthlyCosts = feedCostMonthly + laborCostMonthly + vetSanitaryCost + utilitiesAndFuel;

  const totalMonthlyRevenue = (totalBeefValue / 12) + monthlyMilkRevenue + (tomatoRevenue / 4);
  const estimatedNetMargin = totalMonthlyRevenue - totalMonthlyCosts;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-2xl bg-[#def7ed] text-[#1e7e59] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </span>
            <h2 className="text-2xl font-bold font-display text-[#18291c]">
              Plan de Negocio &amp; Rentabilidad Finca
            </h2>
          </div>
          <p className="text-xs text-[#6e7e72] mt-0.5">
            Valoración en pie de ganado de carne, flujo lácteo y proyección de cosechas
          </p>
        </div>
      </div>

      {/* Main Meat Price Interactive Card (directly linking to screenshot!) */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_4px_22px_rgba(0,0,0,0.04)] border border-[#0d2f1f]/8">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-full bg-[#dcfce7] text-[#16a34a] flex items-center justify-center font-bold">
            $
          </div>
          <div>
            <h3 className="text-base font-bold text-[#18291c]">
              Calculadora de Ganancia y Precio del Día
            </h3>
            <p className="text-xs text-stone-500">
              Ajusta el precio del novillo en báscula para proyectar la liquidación total
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center pt-2">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-700">
              Precio del día por kg ($ COP)
            </label>
            <div className="relative">
              <input
                type="number"
                value={beefPricePerKg}
                onChange={e => setBeefPricePerKg(Math.max(0, Number(e.target.value)))}
                className="w-full bg-[#f4f2ea] text-lg font-bold text-[#182a1d] rounded-2xl px-4 py-3 outline-none border border-stone-300 focus:border-[#c9983d] font-mono-nums"
              />
              <span className="absolute right-4 top-3.5 text-xs font-bold text-stone-400">
                / kg vivo
              </span>
            </div>
            <span className="text-[11px] text-stone-500 block">
              Precio referencial subasta ganadera regional
            </span>
          </div>

          <div className="bg-[#faf8f4] p-4 rounded-2xl border border-stone-200">
            <span className="text-xs text-stone-500">Total Kilos en Ganado Ceba</span>
            <div className="text-2xl font-extrabold text-[#18291c] font-mono-nums mt-0.5">
              {totalBeefKg.toLocaleString()} kg
            </div>
            <p className="text-[11px] text-stone-500 mt-0.5">
              {beefAnimals.length} novillos y toretes en potrero
            </p>
          </div>

          <div className="bg-[#def7ed] p-4 rounded-2xl border border-[#c3edd9]">
            <span className="text-xs text-[#1e7e59] font-bold uppercase">
              Valoración Total Lote Carne
            </span>
            <div className="text-2xl font-extrabold text-[#0e3b29] font-mono-nums mt-0.5">
              ${totalBeefValue.toLocaleString()}
            </div>
            <p className="text-[11px] text-[#257755] mt-0.5">
              Liquidación proyectada en finca
            </p>
          </div>
        </div>
      </div>

      {/* Revenue Streams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Stream 1: Milk */}
        <div className="bg-white rounded-3xl p-5 shadow-[0_4px_22px_rgba(0,0,0,0.04)] border border-[#0d2f1f]/8 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <Milk className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-sm font-bold text-[#18291c]">Ventas de Leche</h4>
                <p className="text-[11px] text-stone-500">Flujo de caja diario y quincenal</p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Producción diaria:</span>
                <span className="font-bold text-stone-900 font-mono-nums">{totalDailyMilk.toFixed(0)} L/día</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Precio litro:</span>
                <span className="font-bold text-stone-900 font-mono-nums">${milkPrice} COP</span>
              </div>
              <div className="flex justify-between py-1 pt-2">
                <span className="font-bold text-stone-800">Ingreso Mensual:</span>
                <span className="font-extrabold text-blue-800 font-mono-nums text-sm">
                  ${monthlyMilkRevenue.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stream 2: Beef */}
        <div className="bg-white rounded-3xl p-5 shadow-[0_4px_22px_rgba(0,0,0,0.04)] border border-[#0d2f1f]/8 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Scale className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-sm font-bold text-[#18291c]">Ventas de Ganado Ceba</h4>
                <p className="text-[11px] text-stone-500">Engorde y venta por lotes</p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Ganancia promedio:</span>
                <span className="font-bold text-stone-900 font-mono-nums">+1.3 kg / día</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Valor ganado por novillo/día:</span>
                <span className="font-bold text-stone-900 font-mono-nums">
                  ${(1.3 * beefPricePerKg).toFixed(0)} COP
                </span>
              </div>
              <div className="flex justify-between py-1 pt-2">
                <span className="font-bold text-stone-800">Cierre estimado lote:</span>
                <span className="font-extrabold text-emerald-800 font-mono-nums text-sm">
                  ${totalBeefValue.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stream 3: Crops */}
        <div className="bg-white rounded-3xl p-5 shadow-[0_4px_22px_rgba(0,0,0,0.04)] border border-[#0d2f1f]/8 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-lime-100 text-lime-700 flex items-center justify-center">
                <Wheat className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-sm font-bold text-[#18291c]">Cosecha de Tomate &amp; Huerto</h4>
                <p className="text-[11px] text-stone-500">Venta mayorista en canastillas</p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Kilos proyectados:</span>
                <span className="font-bold text-stone-900 font-mono-nums">{tomatoYield.toLocaleString()} kg</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Precio kilo tomate:</span>
                <span className="font-bold text-stone-900 font-mono-nums">${tomatoPrice} COP</span>
              </div>
              <div className="flex justify-between py-1 pt-2">
                <span className="font-bold text-stone-800">Ingreso Ciclo Tomate:</span>
                <span className="font-extrabold text-lime-800 font-mono-nums text-sm">
                  ${tomatoRevenue.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
