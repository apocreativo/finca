import React from 'react';
import { FarmProvider, useFarm } from './context/FarmContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { AnimalsView } from './components/AnimalsView';
import { HorsesView } from './components/HorsesView';
import { DairyView } from './components/DairyView';
import { LayingHensView } from './components/LayingHensView';
import { BroilersView } from './components/BroilersView';
import { GoatsView } from './components/GoatsView';
import { PigsView } from './components/PigsView';
import { CropsView } from './components/CropsView';
import { CalendarView } from './components/CalendarView';
import { LotsView } from './components/LotsView';
import { InventoryView } from './components/InventoryView';
import { BusinessPlanView } from './components/BusinessPlanView';
import { OperatorsView } from './components/OperatorsView';
import { AnimalDetailModal } from './components/AnimalDetailModal';
import { AddAnimalModal } from './components/AddAnimalModal';
import { AddEventModal } from './components/AddEventModal';
import { AddCropModal } from './components/AddCropModal';

const MainContent: React.FC = () => {
  const { activeSection } = useFarm();

  const renderCurrentView = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardView />;
      case 'lotes':
        return <LotsView />;
      case 'caballos':
        return <HorsesView />;
      case 'calendario':
        return <CalendarView />;
      case 'lecheras':
        return <DairyView />;
      case 'ponedoras':
        return <LayingHensView />;
      case 'engorde_aves':
        return <BroilersView />;
      case 'chivos':
        return <GoatsView />;
      case 'cochinos':
        return <PigsView />;
      case 'animales':
        return <AnimalsView />;
      case 'siembras':
        return <CropsView />;
      case 'inventario':
        return <InventoryView />;
      case 'negocio':
        return <BusinessPlanView />;
      case 'operadores':
        return <OperatorsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f6f4ee]">
      {/* Left Dark Forest Green Sidebar matching design */}
      <Sidebar />

      {/* Main Viewport Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 px-8 py-7 overflow-y-auto max-w-[1360px] w-full mx-auto">
          {renderCurrentView()}
        </main>
      </div>

      {/* Application Modals */}
      <AnimalDetailModal />
      <AddAnimalModal />
      <AddEventModal />
      <AddCropModal />
    </div>
  );
};

export default function App() {
  return (
    <FarmProvider>
      <MainContent />
    </FarmProvider>
  );
}
