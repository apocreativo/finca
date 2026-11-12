export type AnimalCategory =
  | 'dairy'
  | 'beef'
  | 'horse'
  | 'laying_hen'
  | 'broiler'
  | 'goat'
  | 'pig';

export type AnimalSpecies = 'cattle' | 'horse' | 'poultry' | 'goat' | 'pig';
export type HealthStatus = 'healthy' | 'treatment' | 'quarantine' | 'pregnant' | 'sold';

export interface WeightRecord {
  date: string;
  weightKg: number;
  gainRateKgPerDay?: number;
}

export interface MilkRecord {
  date: string;
  morningLiters: number;
  eveningLiters: number;
  fatPercentage?: number;
}

// Specific record for Laying Hens
export interface EggCollectionRecord {
  date: string;
  eggsCollected: number;
  brokenEggs: number;
  crates: number; // Maples / cartones de 30
  feedConsumedKg?: number;
}

// Specific record for Broilers (Pollos de Engorde)
export interface BroilerWeeklySample {
  week: number;
  ageDays: number;
  avgWeightGrams: number;
  mortality: number;
  feedConsumedKg: number;
}

// Specific record for Goats (Chivos y Cabras)
export interface GoatKiddingRecord {
  date: string;
  kidsCount: number;
  malesCount: number;
  femalesCount: number;
  avgBirthWeightKg: number;
  sireTag?: string;
}

// Specific record for Pigs (Cochinos / Cerdos)
export interface PigLitterRecord {
  date: string;
  livePiglets: number;
  stillborn: number;
  weanedCount?: number;
  avgBirthWeightKg: number;
  weaningDate?: string;
}

export interface Animal {
  id: string;
  tagNumber: string; // Caravana o arete identificador (ej: CO-102, PO-01, CH-14, PG-08)
  name: string;
  species: AnimalSpecies;
  category: AnimalCategory;
  breed: string; // ej: Holstein, Brahman, Hy-Line Brown, Cobb 500, Saanen, Pietrain, Landrace
  sex: 'female' | 'male';
  birthDate: string;
  weightKg: number;
  weightHistory: WeightRecord[];

  // Dairy Cows & Dairy Goats
  dailyMilkLiters?: number;
  milkHistory?: MilkRecord[];

  // Laying Hens (Gallinas Ponedoras)
  eggCollectionHistory?: EggCollectionRecord[];
  layingPercentage?: number; // % postura diario
  totalFlockCount?: number; // Aves en el galpón / lote

  // Broilers (Gallinas / Pollos de Engorde)
  broilerBatchSize?: number; // Cantidad de pollos en lote
  batchAgeDays?: number;
  targetWeightKg?: number;
  feedConversionRatio?: number; // Conversión alimenticia (ej: 1.68)
  broilerSamples?: BroilerWeeklySample[];

  // Goats (Chivos y Cabras)
  goatPurpose?: 'milk' | 'meat' | 'dual';
  kiddingHistory?: GoatKiddingRecord[];

  // Pigs (Cochinos / Cerdos)
  pigStage?: 'gestation' | 'farrowing' | 'nursery' | 'fattening';
  farrowingRecords?: PigLitterRecord[];
  feedIntakeKgPerDay?: number;

  lotId: string;
  lotName: string;
  healthStatus: HealthStatus;
  photo: string;
  sire?: string; // Padre
  dam?: string;  // Madre
  reproductiveStatus?: 'lactating' | 'dry' | 'pregnant' | 'open' | 'breeding' | 'work';
  notes?: string;
  vaccinesApplied: {
    vaccineName: string;
    date: string;
    batchNumber?: string;
  }[];
}

export interface Lot {
  id: string;
  name: string;
  type: 'dairy' | 'beef' | 'equine' | 'pasture' | 'poultry' | 'goat' | 'pig';
  hectares: number;
  pastureType: string;
  animalCount: number;
  status: 'active' | 'rotation' | 'resting';
  photo: string;
  description: string;
  capacity: number;
}

export interface Crop {
  id: string;
  name: string;
  variety: string;
  type: 'vegetable' | 'grain' | 'pasture' | 'fruit';
  plotName: string;
  hectares: number;
  plantingDate: string;
  expectedHarvestDate: string;
  status: 'sown' | 'germinating' | 'vegetative' | 'flowering' | 'harvesting' | 'completed';
  expectedYieldKg: number;
  actualYieldKg?: number;
  photo: string;
  fumigationHistory: {
    date: string;
    product: string;
    target: string;
    completed: boolean;
  }[];
  notes: string;
}

export type EventType =
  | 'vaccine'
  | 'treatment'
  | 'fumigation'
  | 'harvest'
  | 'deworming'
  | 'hoof_care'
  | 'egg_harvest'
  | 'slaughter'
  | 'farrowing';

export interface CalendarEvent {
  id: string;
  title: string;
  type: EventType;
  date: string; // YYYY-MM-DD
  time?: string;
  targetCategory: 'lot' | 'animal' | 'crop' | 'general';
  targetId?: string;
  targetName: string;
  productOrAction: string;
  dosage?: string;
  operator: string;
  status: 'scheduled' | 'completed' | 'overdue';
  notes?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'feed' | 'medicine' | 'vaccine' | 'fertilizer' | 'tools' | 'supplies';
  quantity: number;
  unit: string;
  minThreshold: number;
  costPerUnit: number;
  expiryDate?: string;
  location: string;
}

export interface TaskItem {
  id: string;
  title: string;
  category: 'diario' | 'pendientes' | 'compras';
  completed: boolean;
  date: string;
  cost?: number;
  assignedTo?: string;
}

export interface FarmOperator {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  avatar: string;
  assignedAreas: string[];
}
