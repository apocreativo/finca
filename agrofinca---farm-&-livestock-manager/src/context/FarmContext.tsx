import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Animal,
  Lot,
  Crop,
  CalendarEvent,
  InventoryItem,
  TaskItem,
  FarmOperator
} from '../types/farm';
import {
  INITIAL_ANIMALS,
  INITIAL_LOTS,
  INITIAL_CROPS,
  INITIAL_EVENTS,
  INITIAL_INVENTORY,
  INITIAL_TASKS,
  INITIAL_OPERATORS
} from '../data/mockData';

export type NavSection =
  | 'dashboard'
  | 'lotes'
  | 'animales'
  | 'caballos'
  | 'lecheras'
  | 'ponedoras'
  | 'engorde_aves'
  | 'chivos'
  | 'cochinos'
  | 'calendario'
  | 'siembras'
  | 'inventario'
  | 'negocio'
  | 'operadores';

interface FarmContextType {
  activeSection: NavSection;
  setActiveSection: (sec: NavSection) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  language: 'es' | 'en';
  setLanguage: (lang: 'es' | 'en') => void;

  // Animals
  animals: Animal[];
  addAnimal: (animal: Omit<Animal, 'id'>) => void;
  updateAnimal: (id: string, updates: Partial<Animal>) => void;
  deleteAnimal: (id: string) => void;
  selectedAnimal: Animal | null;
  setSelectedAnimal: (animal: Animal | null) => void;
  addWeightRecord: (animalId: string, weightKg: number, date?: string) => void;
  addMilkRecord: (animalId: string, morningLiters: number, eveningLiters: number, fatPct?: number) => void;

  // Specialized methods for new animal sectors
  addEggCollectionRecord: (animalId: string, eggsCollected: number, brokenEggs: number, feedKg?: number) => void;
  addBroilerSampleRecord: (animalId: string, week: number, ageDays: number, avgWeightGrams: number, mortality: number, feedKg: number) => void;
  addPigFarrowingRecord: (animalId: string, livePiglets: number, stillborn: number, avgBirthWeightKg: number) => void;

  // Lots
  lots: Lot[];
  addLot: (lot: Omit<Lot, 'id'>) => void;
  updateLot: (id: string, updates: Partial<Lot>) => void;
  selectedLotId: string | null;
  setSelectedLotId: (id: string | null) => void;

  // Crops
  crops: Crop[];
  addCrop: (crop: Omit<Crop, 'id'>) => void;
  updateCrop: (id: string, updates: Partial<Crop>) => void;
  deleteCrop: (id: string) => void;
  addFumigationToCrop: (cropId: string, fumigation: { product: string; target: string; date: string }) => void;
  selectedCrop: Crop | null;
  setSelectedCrop: (crop: Crop | null) => void;

  // Events / Calendar
  events: CalendarEvent[];
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  toggleEventStatus: (id: string) => void;
  deleteEvent: (id: string) => void;

  // Inventory
  inventory: InventoryItem[];
  addInventoryItem: (item: Omit<InventoryItem, 'id'>) => void;
  updateInventoryQty: (id: string, newQty: number) => void;
  updateInventoryItem: (id: string, updates: Partial<InventoryItem>) => void;
  deleteInventoryItem: (id: string) => void;

  // Tasks
  tasks: TaskItem[];
  addTask: (title: string, category: 'diario' | 'pendientes' | 'compras', cost?: number) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;

  // Operators
  operators: FarmOperator[];

  // Price & Market
  beefPricePerKg: number;
  setBeefPricePerKg: (price: number) => void;
  priceHistory: { day: string; value: number }[];

  // Modals
  isAddAnimalOpen: boolean;
  setIsAddAnimalOpen: (open: boolean) => void;
  isAddEventOpen: boolean;
  setIsAddEventOpen: (open: boolean) => void;
  isAddCropOpen: boolean;
  setIsAddCropOpen: (open: boolean) => void;
  isAddTaskOpen: boolean;
  setIsAddTaskOpen: (open: boolean) => void;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

const LOCAL_STORAGE_PREFIX = 'agrofinca_v1_';

export const FarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSection] = useState<NavSection>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [selectedLotId, setSelectedLotId] = useState<string | null>(null);

  // Modals
  const [isAddAnimalOpen, setIsAddAnimalOpen] = useState(false);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [isAddCropOpen, setIsAddCropOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  // Pricing
  const [beefPricePerKg, setBeefPricePerKg] = useState<number>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'beef_price');
    return saved ? Number(saved) : 8000;
  });

  const [priceHistory] = useState([
    { day: 'Lun', value: 7800 },
    { day: 'Mar', value: 7950 },
    { day: 'Mié', value: 8100 },
    { day: 'Jue', value: 7900 },
    { day: 'Vie', value: 8250 },
    { day: 'Sáb', value: 8150 },
    { day: 'Dom', value: 8400 }
  ]);

  // Data collections with localStorage
  const [animals, setAnimals] = useState<Animal[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'animals');
    return saved ? JSON.parse(saved) : INITIAL_ANIMALS;
  });

  const [lots, setLots] = useState<Lot[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'lots');
    return saved ? JSON.parse(saved) : INITIAL_LOTS;
  });

  const [crops, setCrops] = useState<Crop[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'crops');
    return saved ? JSON.parse(saved) : INITIAL_CROPS;
  });

  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'inventory');
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [operators] = useState<FarmOperator[]>(INITIAL_OPERATORS);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'animals', JSON.stringify(animals));
  }, [animals]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'lots', JSON.stringify(lots));
  }, [lots]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'crops', JSON.stringify(crops));
  }, [crops]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'beef_price', String(beefPricePerKg));
  }, [beefPricePerKg]);

  // Handlers for Animals
  const addAnimal = (newAnimalData: Omit<Animal, 'id'>) => {
    const newAnimal: Animal = {
      ...newAnimalData,
      id: `anim-${Date.now()}`
    };
    setAnimals(prev => [newAnimal, ...prev]);
  };

  const updateAnimal = (id: string, updates: Partial<Animal>) => {
    setAnimals(prev => prev.map(a => (a.id === id ? { ...a, ...updates } : a)));
    if (selectedAnimal && selectedAnimal.id === id) {
      setSelectedAnimal(prev => (prev ? { ...prev, ...updates } : null));
    }
  };

  const deleteAnimal = (id: string) => {
    setAnimals(prev => prev.filter(a => a.id !== id));
    if (selectedAnimal?.id === id) setSelectedAnimal(null);
  };

  const addWeightRecord = (animalId: string, weightKg: number, dateStr?: string) => {
    const today = dateStr || new Date().toISOString().split('T')[0];
    setAnimals(prev =>
      prev.map(a => {
        if (a.id !== animalId) return a;
        const lastWeight = a.weightKg;
        const diff = weightKg - lastWeight;
        const newHistory = [...a.weightHistory, { date: today, weightKg, gainRateKgPerDay: diff > 0 ? Number((diff / 30).toFixed(2)) : 0 }];
        return {
          ...a,
          weightKg,
          weightHistory: newHistory
        };
      })
    );
  };

  const addMilkRecord = (animalId: string, morningLiters: number, eveningLiters: number, fatPct?: number) => {
    const today = new Date().toISOString().split('T')[0];
    const totalToday = Number((morningLiters + eveningLiters).toFixed(1));
    setAnimals(prev =>
      prev.map(a => {
        if (a.id !== animalId) return a;
        const prevHistory = a.milkHistory || [];
        return {
          ...a,
          dailyMilkLiters: totalToday,
          milkHistory: [
            ...prevHistory,
            { date: today, morningLiters, eveningLiters, fatPercentage: fatPct }
          ]
        };
      })
    );
  };

  // Laying Hens Egg Collection
  const addEggCollectionRecord = (
    animalId: string,
    eggsCollected: number,
    brokenEggs: number,
    feedKg?: number
  ) => {
    const today = new Date().toISOString().split('T')[0];
    const crates = Number((eggsCollected / 30).toFixed(1));

    setAnimals(prev =>
      prev.map(a => {
        if (a.id !== animalId) return a;
        const history = a.eggCollectionHistory || [];
        const flock = a.totalFlockCount || 450;
        const layingPct = Number(((eggsCollected / flock) * 100).toFixed(1));
        return {
          ...a,
          layingPercentage: layingPct,
          eggCollectionHistory: [
            { date: today, eggsCollected, brokenEggs, crates, feedConsumedKg: feedKg },
            ...history
          ]
        };
      })
    );
  };

  // Broiler Weekly Sampling
  const addBroilerSampleRecord = (
    animalId: string,
    week: number,
    ageDays: number,
    avgWeightGrams: number,
    mortality: number,
    feedKg: number
  ) => {
    setAnimals(prev =>
      prev.map(a => {
        if (a.id !== animalId) return a;
        const prevSamples = a.broilerSamples || [];
        const currentWeightKg = Number((avgWeightGrams / 1000).toFixed(2));
        return {
          ...a,
          batchAgeDays: ageDays,
          weightKg: currentWeightKg,
          broilerSamples: [
            ...prevSamples,
            { week, ageDays, avgWeightGrams, mortality, feedConsumedKg: feedKg }
          ]
        };
      })
    );
  };

  // Pig Farrowing Record
  const addPigFarrowingRecord = (
    animalId: string,
    livePiglets: number,
    stillborn: number,
    avgBirthWeightKg: number
  ) => {
    const today = new Date().toISOString().split('T')[0];
    setAnimals(prev =>
      prev.map(a => {
        if (a.id !== animalId) return a;
        const prevFarrowing = a.farrowingRecords || [];
        return {
          ...a,
          pigStage: 'farrowing',
          reproductiveStatus: 'lactating',
          farrowingRecords: [
            {
              date: today,
              livePiglets,
              stillborn,
              weanedCount: livePiglets,
              avgBirthWeightKg
            },
            ...prevFarrowing
          ]
        };
      })
    );
  };

  // Handlers for Lots
  const addLot = (lotData: Omit<Lot, 'id'>) => {
    const newLot: Lot = {
      ...lotData,
      id: `lot-${Date.now()}`
    };
    setLots(prev => [...prev, newLot]);
  };

  const updateLot = (id: string, updates: Partial<Lot>) => {
    setLots(prev => prev.map(l => (l.id === id ? { ...l, ...updates } : l)));
  };

  // Handlers for Crops
  const addCrop = (cropData: Omit<Crop, 'id'>) => {
    const newCrop: Crop = {
      ...cropData,
      id: `crop-${Date.now()}`
    };
    setCrops(prev => [newCrop, ...prev]);
  };

  const updateCrop = (id: string, updates: Partial<Crop>) => {
    setCrops(prev => prev.map(c => (c.id === id ? { ...c, ...updates } : c)));
    if (selectedCrop?.id === id) {
      setSelectedCrop(prev => (prev ? { ...prev, ...updates } : null));
    }
  };

  const deleteCrop = (id: string) => {
    setCrops(prev => prev.filter(c => c.id !== id));
    if (selectedCrop?.id === id) setSelectedCrop(null);
  };

  const addFumigationToCrop = (
    cropId: string,
    fumigation: { product: string; target: string; date: string }
  ) => {
    setCrops(prev =>
      prev.map(c => {
        if (c.id !== cropId) return c;
        return {
          ...c,
          fumigationHistory: [
            ...c.fumigationHistory,
            { ...fumigation, completed: true }
          ]
        };
      })
    );
  };

  // Handlers for Events
  const addEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: `ev-${Date.now()}`
    };
    setEvents(prev => [...prev, newEvent].sort((a, b) => a.date.localeCompare(b.date)));
  };

  const toggleEventStatus = (id: string) => {
    setEvents(prev =>
      prev.map(ev => {
        if (ev.id !== id) return ev;
        const nextStatus = ev.status === 'completed' ? 'scheduled' : 'completed';
        return { ...ev, status: nextStatus };
      })
    );
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  // Handlers for Inventory
  const addInventoryItem = (itemData: Omit<InventoryItem, 'id'>) => {
    const newItem: InventoryItem = {
      ...itemData,
      id: `inv-${Date.now()}`
    };
    setInventory(prev => [newItem, ...prev]);
  };

  const updateInventoryQty = (id: string, newQty: number) => {
    setInventory(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity: Math.max(0, newQty) } : item))
    );
  };

  const updateInventoryItem = (id: string, updates: Partial<InventoryItem>) => {
    setInventory(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const deleteInventoryItem = (id: string) => {
    setInventory(prev => prev.filter(item => item.id !== id));
  };

  // Handlers for Tasks
  const addTask = (title: string, category: 'diario' | 'pendientes' | 'compras', cost?: number) => {
    const newTask: TaskItem = {
      id: `tsk-${Date.now()}`,
      title,
      category,
      completed: false,
      date: new Date().toISOString().split('T')[0],
      cost
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <FarmContext.Provider
      value={{
        activeSection,
        setActiveSection,
        searchQuery,
        setSearchQuery,
        language,
        setLanguage,
        animals,
        addAnimal,
        updateAnimal,
        deleteAnimal,
        selectedAnimal,
        setSelectedAnimal,
        addWeightRecord,
        addMilkRecord,
        addEggCollectionRecord,
        addBroilerSampleRecord,
        addPigFarrowingRecord,
        lots,
        addLot,
        updateLot,
        selectedLotId,
        setSelectedLotId,
        crops,
        addCrop,
        updateCrop,
        deleteCrop,
        addFumigationToCrop,
        selectedCrop,
        setSelectedCrop,
        events,
        addEvent,
        toggleEventStatus,
        deleteEvent,
        inventory,
        addInventoryItem,
        updateInventoryQty,
        updateInventoryItem,
        deleteInventoryItem,
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        operators,
        beefPricePerKg,
        setBeefPricePerKg,
        priceHistory,
        isAddAnimalOpen,
        setIsAddAnimalOpen,
        isAddEventOpen,
        setIsAddEventOpen,
        isAddCropOpen,
        setIsAddCropOpen,
        isAddTaskOpen,
        setIsAddTaskOpen
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
};
