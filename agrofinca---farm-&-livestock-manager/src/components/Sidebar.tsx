import React from 'react';
import { LogOut } from 'lucide-react';
import { useFarm, NavSection } from '../context/FarmContext';
import { GoldFarmEmblem, MenuIconBadge } from './FarmIllustrations';

interface NavItemConfig {
  id: NavSection;
  label: string;
  badgeType:
    | 'dashboard'
    | 'lots'
    | 'horses'
    | 'calendar'
    | 'dairy'
    | 'laying_hens'
    | 'broilers'
    | 'goats'
    | 'pigs'
    | 'catalog'
    | 'crops'
    | 'inventory'
    | 'business'
    | 'operators';
}

export const Sidebar: React.FC = () => {
  const { activeSection, setActiveSection } = useFarm();

  const navItems: NavItemConfig[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      badgeType: 'dashboard'
    },
    {
      id: 'lotes',
      label: 'Lotes',
      badgeType: 'lots'
    },
    {
      id: 'caballos',
      label: 'Caballos',
      badgeType: 'horses'
    },
    {
      id: 'calendario',
      label: 'Calendario',
      badgeType: 'calendar'
    },
    {
      id: 'lecheras',
      label: 'Vacas Lecheras',
      badgeType: 'dairy'
    },
    {
      id: 'ponedoras',
      label: 'Gallinas Ponedoras',
      badgeType: 'laying_hens'
    },
    {
      id: 'engorde_aves',
      label: 'Gallinas de Engorde',
      badgeType: 'broilers'
    },
    {
      id: 'chivos',
      label: 'Chivos & Cabras',
      badgeType: 'goats'
    },
    {
      id: 'cochinos',
      label: 'Cochinos & Cerdos',
      badgeType: 'pigs'
    },
    {
      id: 'animales',
      label: 'Catálogo General',
      badgeType: 'catalog'
    },
    {
      id: 'siembras',
      label: 'Siembras',
      badgeType: 'crops'
    },
    {
      id: 'inventario',
      label: 'Inventario',
      badgeType: 'inventory'
    },
    {
      id: 'negocio',
      label: 'Plan de Negocio',
      badgeType: 'business'
    },
    {
      id: 'operadores',
      label: 'Operadores',
      badgeType: 'operators'
    }
  ];

  return (
    <aside className="w-[270px] shrink-0 bg-[#0c2a1a] min-h-screen text-white flex flex-col justify-between py-6 px-4 shadow-[4px_0_24px_rgba(0,0,0,0.18)] select-none">
      <div className="flex-1 flex flex-col">
        {/* Farm Medallion Brand Header */}
        <div className="flex flex-col items-center justify-center pb-6 pt-1">
          <GoldFarmEmblem size={70} />
          <h1 className="mt-3 text-[15px] font-bold tracking-wider text-[#faeed1] uppercase font-display text-center">
            AgroFinca
          </h1>
          <p className="text-[11px] text-[#86af97] font-medium tracking-wide">
            Gestión Ganadera &amp; Agrícola
          </p>
        </div>

        {/* Navigation items with Full-Color Illustrated Badges */}
        <nav className="space-y-1 flex-1 overflow-y-auto max-h-[calc(100vh-230px)] pr-1">
          {navItems.map(item => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-[13.5px] font-medium transition-all duration-150 group ${
                  isActive
                    ? 'bg-gradient-to-r from-[#d9aa4f] via-[#c9983d] to-[#b6842b] text-[#131b13] font-bold shadow-[0_4px_14px_rgba(201,152,61,0.38)] scale-[1.01]'
                    : 'text-[#d6e5d8]/80 hover:text-white hover:bg-white/[0.07]'
                }`}
              >
                <div className="shrink-0 transition-transform group-hover:scale-105">
                  <MenuIconBadge type={item.badgeType} size={28} />
                </div>
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="pt-3 border-t border-white/10 mt-4">
        <button
          onClick={() => {
            if (window.confirm('¿Deseas reiniciar la sesión o recargar datos de la finca?')) {
              localStorage.clear();
              window.location.reload();
            }
          }}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#8da596] hover:text-white hover:bg-white/[0.05] transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
};
