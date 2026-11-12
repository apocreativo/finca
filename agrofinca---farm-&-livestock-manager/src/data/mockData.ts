import { Animal, Lot, Crop, CalendarEvent, InventoryItem, TaskItem, FarmOperator } from '../types/farm';

export const INITIAL_LOTS: Lot[] = [
  {
    id: 'lot-1',
    name: 'Lote Lechero',
    type: 'dairy',
    hectares: 35.5,
    pastureType: 'Kikuyo & Trébol Blanco',
    animalCount: 120,
    status: 'active',
    photo: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=900&q=80',
    description: 'Potrero principal con sistema de riego por aspersión y cerca eléctrica rotacional para ordeño doble.',
    capacity: 130
  },
  {
    id: 'lot-2',
    name: 'Lote Ceba y Engorde',
    type: 'beef',
    hectares: 50.0,
    pastureType: 'Brachiaria Brizantha & Humidicola',
    animalCount: 52,
    status: 'active',
    photo: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=900&q=80',
    description: 'Potrero de alta ganancia de peso con comederos techados y saladeros automáticos.',
    capacity: 65
  },
  {
    id: 'lot-3',
    name: 'Caballerizas y Potrero Real',
    type: 'equine',
    hectares: 14.0,
    pastureType: 'Pasto Estrella & Bermuda',
    animalCount: 13,
    status: 'active',
    photo: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=900&q=80',
    description: 'Pistas de entrenamiento, 14 pesebreras ventiladas y potrero de descanso con sombra natural.',
    capacity: 18
  },
  {
    id: 'lot-4',
    name: 'Galpones Avícolas (Ponedoras y Engorde)',
    type: 'poultry',
    hectares: 2.5,
    pastureType: 'Galpón climatizado y área de pastoreo libre',
    animalCount: 1650,
    status: 'active',
    photo: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=900&q=80',
    description: 'Batería de nidales automáticos, bebederos niple y silos de alimento para postura y engorde.',
    capacity: 2000
  },
  {
    id: 'lot-5',
    name: 'Aprisco Caprino San Marcos (Chivos)',
    type: 'goat',
    hectares: 6.0,
    pastureType: 'Ramio, Morera, Botón de Oro y Brachiaria',
    animalCount: 38,
    status: 'active',
    photo: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=900&q=80',
    description: 'Instalaciones elevadas de madera con piso ranurado, comederos para forraje y sala de ordeño caprino.',
    capacity: 55
  },
  {
    id: 'lot-6',
    name: 'Granja Porcina La Herradura (Cochinos)',
    type: 'pig',
    hectares: 4.0,
    pastureType: 'Pocilgas techadas con biodigestor y bebederos chupón',
    animalCount: 65,
    status: 'active',
    photo: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=900&q=80',
    description: 'Módulos de gestación individual, jaulas de maternidad con calefactor infrarrojo y corrales de ceba.',
    capacity: 90
  }
];

export const INITIAL_ANIMALS: Animal[] = [
  // VACAS LECHERAS
  {
    id: 'anim-101',
    tagNumber: 'CO-101',
    name: 'Margarita',
    species: 'cattle',
    category: 'dairy',
    breed: 'Holstein Puro',
    sex: 'female',
    birthDate: '2021-04-12',
    weightKg: 580,
    weightHistory: [
      { date: '2026-08-10', weightKg: 565, gainRateKgPerDay: 0.4 },
      { date: '2026-09-15', weightKg: 572, gainRateKgPerDay: 0.5 },
      { date: '2026-10-20', weightKg: 580, gainRateKgPerDay: 0.45 }
    ],
    dailyMilkLiters: 26.5,
    milkHistory: [
      { date: '2026-11-09', morningLiters: 14.5, eveningLiters: 12.0, fatPercentage: 3.8 },
      { date: '2026-11-10', morningLiters: 15.0, eveningLiters: 12.2, fatPercentage: 3.9 },
      { date: '2026-11-11', morningLiters: 14.2, eveningLiters: 12.3, fatPercentage: 3.85 }
    ],
    lotId: 'lot-1',
    lotName: 'Lote Lechero',
    healthStatus: 'healthy',
    photo: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=800&q=80',
    sire: 'Champion Goldwyn US-49',
    dam: 'Estrella CO-045',
    reproductiveStatus: 'lactating',
    notes: 'Excelente conformación de ubre. Muy mansa en sala de ordeño.',
    vaccinesApplied: [
      { vaccineName: 'Fiebre Aftosa', date: '2026-05-14', batchNumber: 'FA-9921' },
      { vaccineName: 'Brucelosis RB51', date: '2026-02-10', batchNumber: 'BR-401' }
    ]
  },
  {
    id: 'anim-102',
    tagNumber: 'CO-102',
    name: 'Paloma',
    species: 'cattle',
    category: 'dairy',
    breed: 'Gyr Lechero',
    sex: 'female',
    birthDate: '2022-01-20',
    weightKg: 490,
    weightHistory: [
      { date: '2026-09-01', weightKg: 478, gainRateKgPerDay: 0.4 },
      { date: '2026-10-15', weightKg: 490, gainRateKgPerDay: 0.42 }
    ],
    dailyMilkLiters: 21.0,
    milkHistory: [
      { date: '2026-11-09', morningLiters: 11.5, eveningLiters: 9.5, fatPercentage: 4.4 },
      { date: '2026-11-10', morningLiters: 11.8, eveningLiters: 9.2, fatPercentage: 4.5 }
    ],
    lotId: 'lot-1',
    lotName: 'Lote Lechero',
    healthStatus: 'healthy',
    photo: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80',
    sire: 'Gaston Teatro da Silvania',
    dam: 'Maravilla CO-012',
    reproductiveStatus: 'lactating',
    notes: 'Resistente al calor, leche con alto porcentaje de sólidos totales.',
    vaccinesApplied: [
      { vaccineName: 'Fiebre Aftosa', date: '2026-05-14' }
    ]
  },
  {
    id: 'anim-103',
    tagNumber: 'CO-103',
    name: 'Bella',
    species: 'cattle',
    category: 'dairy',
    breed: 'Jersey Canadense',
    sex: 'female',
    birthDate: '2022-06-14',
    weightKg: 440,
    weightHistory: [
      { date: '2026-08-20', weightKg: 425 },
      { date: '2026-10-25', weightKg: 440 }
    ],
    dailyMilkLiters: 23.4,
    lotId: 'lot-1',
    lotName: 'Lote Lechero',
    healthStatus: 'healthy',
    photo: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80',
    reproductiveStatus: 'lactating',
    notes: 'Alimentada con ración especial rica en energía para mantener grasa láctea sobre 4.8%.',
    vaccinesApplied: [
      { vaccineName: 'Fiebre Aftosa', date: '2026-05-14' }
    ]
  },

  // GANADO DE CARNE (CEBA / ENGORDE)
  {
    id: 'anim-201',
    tagNumber: 'CB-201',
    name: 'Titán',
    species: 'cattle',
    category: 'beef',
    breed: 'Brahman Blanco',
    sex: 'male',
    birthDate: '2023-03-05',
    weightKg: 535,
    weightHistory: [
      { date: '2026-07-01', weightKg: 440, gainRateKgPerDay: 1.1 },
      { date: '2026-08-15', weightKg: 475, gainRateKgPerDay: 1.25 },
      { date: '2026-09-30', weightKg: 508, gainRateKgPerDay: 1.3 },
      { date: '2026-11-05', weightKg: 535, gainRateKgPerDay: 1.35 }
    ],
    lotId: 'lot-2',
    lotName: 'Lote Ceba y Engorde',
    healthStatus: 'healthy',
    photo: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=800&q=80',
    sire: 'Rey Brahman 504',
    dam: 'Reina 12',
    notes: 'Macho de gran musculatura dorsal. Listo para venta programada a final de mes.',
    vaccinesApplied: [
      { vaccineName: 'Fiebre Aftosa', date: '2026-05-14' },
      { vaccineName: 'Carbunco Sintomático', date: '2026-04-10' },
      { vaccineName: 'Desparasitación Ivermectina 3.15%', date: '2026-09-02' }
    ]
  },
  {
    id: 'anim-202',
    tagNumber: 'CB-202',
    name: 'Hércules',
    species: 'cattle',
    category: 'beef',
    breed: 'Black Angus',
    sex: 'male',
    birthDate: '2023-05-18',
    weightKg: 510,
    weightHistory: [
      { date: '2026-08-01', weightKg: 430, gainRateKgPerDay: 1.2 },
      { date: '2026-09-20', weightKg: 480, gainRateKgPerDay: 1.3 },
      { date: '2026-11-01', weightKg: 510, gainRateKgPerDay: 1.3 }
    ],
    lotId: 'lot-2',
    lotName: 'Lote Ceba y Engorde',
    healthStatus: 'healthy',
    photo: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80',
    notes: 'Genética de alto marmoleo y rápido engorde a pastoreo.',
    vaccinesApplied: [
      { vaccineName: 'Fiebre Aftosa', date: '2026-05-14' }
    ]
  },

  // CABALLOS (EQUINOS)
  {
    id: 'eq-301',
    tagNumber: 'EQ-01',
    name: 'Azabache',
    species: 'horse',
    category: 'horse',
    breed: 'Paso Fino Colombiano',
    sex: 'male',
    birthDate: '2020-02-14',
    weightKg: 420,
    weightHistory: [
      { date: '2026-06-10', weightKg: 415 },
      { date: '2026-10-10', weightKg: 420 }
    ],
    lotId: 'lot-3',
    lotName: 'Caballerizas y Potrero Real',
    healthStatus: 'healthy',
    photo: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    sire: 'Dulce Sueño de Lusitania',
    dam: 'Tormenta del Sol',
    reproductiveStatus: 'breeding',
    notes: 'Semental registrado. Andar suave de trocha y galope, excelente docilidad y temperamento.',
    vaccinesApplied: [
      { vaccineName: 'Encefalitis Equina Venezolana (EEV)', date: '2026-03-12' },
      { vaccineName: 'Tétanos Equino', date: '2026-04-18' },
      { vaccineName: 'Influenza Equina', date: '2026-07-22' }
    ]
  },
  {
    id: 'eq-302',
    tagNumber: 'EQ-02',
    name: 'Centinela',
    species: 'horse',
    category: 'horse',
    breed: 'Caballo Criollo de Trabajo',
    sex: 'male',
    birthDate: '2019-08-25',
    weightKg: 450,
    weightHistory: [
      { date: '2026-05-10', weightKg: 448 },
      { date: '2026-10-15', weightKg: 450 }
    ],
    lotId: 'lot-3',
    lotName: 'Caballerizas y Potrero Real',
    healthStatus: 'healthy',
    photo: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=800&q=80',
    reproductiveStatus: 'work',
    notes: 'Caballo líder de vaquería y arreo de ganado. Resistente y habituado a jornadas largas.',
    vaccinesApplied: [
      { vaccineName: 'Encefalitis Equina (EEV)', date: '2026-03-12' },
      { vaccineName: 'Tétanos', date: '2026-04-18' }
    ]
  },
  {
    id: 'eq-303',
    tagNumber: 'EQ-03',
    name: 'Gitana',
    species: 'horse',
    category: 'horse',
    breed: 'Cuarto de Milla',
    sex: 'female',
    birthDate: '2022-09-10',
    weightKg: 465,
    weightHistory: [
      { date: '2026-08-15', weightKg: 455 },
      { date: '2026-10-20', weightKg: 465 }
    ],
    lotId: 'lot-3',
    lotName: 'Caballerizas y Potrero Real',
    healthStatus: 'healthy',
    photo: 'https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=800&q=80',
    reproductiveStatus: 'pregnant',
    notes: 'Yegua gestante (5 meses). Dieta reforzada con heno de alfalfa y minerales.',
    vaccinesApplied: [
      { vaccineName: 'Encefalitis Equina (EEV)', date: '2026-03-12' }
    ]
  },

  // GALLINAS PONEDORAS (EGG LAYING HENS)
  {
    id: 'hen-401',
    tagNumber: 'GP-01',
    name: 'Galpón 1 Ponedoras Hy-Line Brown',
    species: 'poultry',
    category: 'laying_hen',
    breed: 'Hy-Line Brown',
    sex: 'female',
    birthDate: '2025-12-10',
    weightKg: 1.95,
    weightHistory: [
      { date: '2026-08-01', weightKg: 1.85 },
      { date: '2026-10-15', weightKg: 1.95 }
    ],
    totalFlockCount: 450,
    layingPercentage: 91.5,
    eggCollectionHistory: [
      { date: '2026-11-09', eggsCollected: 412, brokenEggs: 4, crates: 13.6, feedConsumedKg: 49.5 },
      { date: '2026-11-10', eggsCollected: 415, brokenEggs: 3, crates: 13.7, feedConsumedKg: 50.0 },
      { date: '2026-11-11', eggsCollected: 410, brokenEggs: 5, crates: 13.5, feedConsumedKg: 49.2 }
    ],
    lotId: 'lot-4',
    lotName: 'Galpones Avícolas (Ponedoras y Engorde)',
    healthStatus: 'healthy',
    photo: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
    notes: 'Semana 48 de vida. Excelente persistencia de postura con cáscara marrón resistente y yema naranja intensa.',
    vaccinesApplied: [
      { vaccineName: 'Newcastle + Bronquitis Infecciosa', date: '2026-02-15' },
      { vaccineName: 'Gumboro (Cepa Intermedia)', date: '2026-03-01' },
      { vaccineName: 'Viruela Aviar', date: '2026-04-10' }
    ]
  },
  {
    id: 'hen-402',
    tagNumber: 'GP-02',
    name: 'Galpón 2 Ponedoras Lohmann Brown',
    species: 'poultry',
    category: 'laying_hen',
    breed: 'Lohmann Brown Classic',
    sex: 'female',
    birthDate: '2026-02-20',
    weightKg: 1.90,
    weightHistory: [
      { date: '2026-09-01', weightKg: 1.78 },
      { date: '2026-10-20', weightKg: 1.90 }
    ],
    totalFlockCount: 300,
    layingPercentage: 88.0,
    eggCollectionHistory: [
      { date: '2026-11-09', eggsCollected: 265, brokenEggs: 2, crates: 8.8, feedConsumedKg: 33.0 },
      { date: '2026-11-10', eggsCollected: 268, brokenEggs: 3, crates: 8.9, feedConsumedKg: 33.5 },
      { date: '2026-11-11', eggsCollected: 262, brokenEggs: 2, crates: 8.7, feedConsumedKg: 33.0 }
    ],
    lotId: 'lot-4',
    lotName: 'Galpones Avícolas (Ponedoras y Engorde)',
    healthStatus: 'healthy',
    photo: 'https://images.unsplash.com/photo-1569246294372-ed319c674f14?auto=format&fit=crop&w=800&q=80',
    notes: 'Aves jóvenes en pleno desarrollo. Consumo promedio de 110 gramos por ave al día.',
    vaccinesApplied: [
      { vaccineName: 'Newcastle + Coriza Aviar', date: '2026-04-12' }
    ]
  },

  // GALLINAS DE ENGORDE (BROILERS)
  {
    id: 'broiler-501',
    tagNumber: 'ENG-01',
    name: 'Lote 01 Pollos de Engorde Cobb 500',
    species: 'poultry',
    category: 'broiler',
    breed: 'Cobb 500',
    sex: 'male',
    birthDate: '2026-10-10',
    weightKg: 2.25,
    weightHistory: [
      { date: '2026-10-17', weightKg: 0.18 },
      { date: '2026-10-24', weightKg: 0.52 },
      { date: '2026-10-31', weightKg: 1.15 },
      { date: '2026-11-07', weightKg: 1.82 },
      { date: '2026-11-11', weightKg: 2.25 }
    ],
    broilerBatchSize: 500,
    batchAgeDays: 33,
    targetWeightKg: 2.60,
    feedConversionRatio: 1.62,
    broilerSamples: [
      { week: 1, ageDays: 7, avgWeightGrams: 185, mortality: 2, feedConsumedKg: 85 },
      { week: 2, ageDays: 14, avgWeightGrams: 520, mortality: 1, feedConsumedKg: 240 },
      { week: 3, ageDays: 21, avgWeightGrams: 1150, mortality: 3, feedConsumedKg: 510 },
      { week: 4, ageDays: 28, avgWeightGrams: 1820, mortality: 2, feedConsumedKg: 890 },
      { week: 5, ageDays: 33, avgWeightGrams: 2250, mortality: 1, feedConsumedKg: 640 }
    ],
    lotId: 'lot-4',
    lotName: 'Galpones Avícolas (Ponedoras y Engorde)',
    healthStatus: 'healthy',
    photo: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
    notes: 'Día 33 de 42. Crecimiento acelerado con excelente pechuga. Cosecha/beneficio programado en 9 días.',
    vaccinesApplied: [
      { vaccineName: 'Marek (en planta de incubación)', date: '2026-10-10' },
      { vaccineName: 'Gumboro ocular', date: '2026-10-18' },
      { vaccineName: 'Newcastle ocular/agua', date: '2026-10-24' }
    ]
  },
  {
    id: 'broiler-502',
    tagNumber: 'ENG-02',
    name: 'Lote 02 Pollitos Iniciación Ross 308',
    species: 'poultry',
    category: 'broiler',
    breed: 'Ross 308',
    sex: 'male',
    birthDate: '2026-10-30',
    weightKg: 0.45,
    weightHistory: [
      { date: '2026-11-06', weightKg: 0.17 },
      { date: '2026-11-11', weightKg: 0.45 }
    ],
    broilerBatchSize: 400,
    batchAgeDays: 13,
    targetWeightKg: 2.65,
    feedConversionRatio: 1.58,
    broilerSamples: [
      { week: 1, ageDays: 7, avgWeightGrams: 172, mortality: 2, feedConsumedKg: 70 },
      { week: 2, ageDays: 13, avgWeightGrams: 450, mortality: 1, feedConsumedKg: 195 }
    ],
    lotId: 'lot-4',
    lotName: 'Galpones Avícolas (Ponedoras y Engorde)',
    healthStatus: 'healthy',
    photo: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
    notes: 'Fase de iniciación con criadora a gas y temperatura controlada a 30°C.',
    vaccinesApplied: [
      { vaccineName: 'Marek + Bronquitis', date: '2026-10-30' },
      { vaccineName: 'Gumboro cepa intermedia', date: '2026-11-08' }
    ]
  },

  // CHIVOS Y CABRAS (GOATS)
  {
    id: 'goat-601',
    tagNumber: 'CH-01',
    name: 'Manuela',
    species: 'goat',
    category: 'goat',
    breed: 'Saanen Lechera Suiza',
    sex: 'female',
    birthDate: '2022-04-18',
    weightKg: 64,
    weightHistory: [
      { date: '2026-06-10', weightKg: 61 },
      { date: '2026-10-15', weightKg: 64 }
    ],
    goatPurpose: 'milk',
    dailyMilkLiters: 3.8,
    milkHistory: [
      { date: '2026-11-09', morningLiters: 2.1, eveningLiters: 1.7, fatPercentage: 3.9 },
      { date: '2026-11-10', morningLiters: 2.2, eveningLiters: 1.6, fatPercentage: 4.0 },
      { date: '2026-11-11', morningLiters: 2.0, eveningLiters: 1.8, fatPercentage: 3.95 }
    ],
    kiddingHistory: [
      { date: '2025-05-12', kidsCount: 2, malesCount: 1, femalesCount: 1, avgBirthWeightKg: 3.4, sireTag: 'CH-99' },
      { date: '2026-03-20', kidsCount: 2, malesCount: 0, femalesCount: 2, avgBirthWeightKg: 3.6, sireTag: 'CH-99' }
    ],
    lotId: 'lot-5',
    lotName: 'Aprisco Caprino San Marcos (Chivos)',
    healthStatus: 'healthy',
    photo: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=800&q=80',
    sire: 'Edelweiss Saanen CH',
    dam: 'Heidi Suiza 02',
    reproductiveStatus: 'lactating',
    notes: 'Cabra de alta producción láctea (3.8 L/día). Ubre simétrica y pezones dóciles para ordeño.',
    vaccinesApplied: [
      { vaccineName: 'Clostridiosis Caprina (8 cepas)', date: '2026-04-05' },
      { vaccineName: 'Desparasitación Albendazol 10%', date: '2026-08-20' }
    ]
  },
  {
    id: 'goat-602',
    tagNumber: 'CH-02',
    name: 'Hércules',
    species: 'goat',
    category: 'goat',
    breed: 'Boer Sudafricano Puro',
    sex: 'male',
    birthDate: '2021-08-14',
    weightKg: 88,
    weightHistory: [
      { date: '2026-05-15', weightKg: 84 },
      { date: '2026-10-20', weightKg: 88 }
    ],
    goatPurpose: 'meat',
    lotId: 'lot-5',
    lotName: 'Aprisco Caprino San Marcos (Chivos)',
    healthStatus: 'healthy',
    photo: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?auto=format&fit=crop&w=800&q=80',
    sire: 'Kalahari King Boer',
    dam: 'Reina Boer 44',
    reproductiveStatus: 'breeding',
    notes: 'Macho reproductor / padrote de gran contextura cárnica. Excelente líbido y tasa de preñez.',
    vaccinesApplied: [
      { vaccineName: 'Clostridiosis Caprina', date: '2026-04-05' },
      { vaccineName: 'Vitaminas AD3E + Fósforo', date: '2026-09-10' }
    ]
  },
  {
    id: 'goat-603',
    tagNumber: 'CH-03',
    name: 'Blanquita',
    species: 'goat',
    category: 'goat',
    breed: 'Alpina Francesa',
    sex: 'female',
    birthDate: '2023-01-25',
    weightKg: 58,
    weightHistory: [
      { date: '2026-08-10', weightKg: 55 },
      { date: '2026-10-25', weightKg: 58 }
    ],
    goatPurpose: 'milk',
    dailyMilkLiters: 3.2,
    lotId: 'lot-5',
    lotName: 'Aprisco Caprino San Marcos (Chivos)',
    healthStatus: 'healthy',
    photo: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=800&q=80',
    reproductiveStatus: 'lactating',
    notes: 'Leche de alta digestibilidad destinada a quesos madurados de autor.',
    vaccinesApplied: [
      { vaccineName: 'Clostridiosis', date: '2026-04-05' }
    ]
  },

  // COCHINOS Y CERDOS (SWINE)
  {
    id: 'pig-701',
    tagNumber: 'PG-01',
    name: 'Duquesa',
    species: 'pig',
    category: 'pig',
    breed: 'Landrace x Large White',
    sex: 'female',
    birthDate: '2023-02-10',
    weightKg: 220,
    weightHistory: [
      { date: '2026-05-10', weightKg: 205 },
      { date: '2026-10-15', weightKg: 220 }
    ],
    pigStage: 'farrowing',
    farrowingRecords: [
      {
        date: '2026-10-18',
        livePiglets: 13,
        stillborn: 1,
        weanedCount: 12,
        avgBirthWeightKg: 1.45,
        weaningDate: '2026-11-15'
      }
    ],
    feedIntakeKgPerDay: 6.5,
    lotId: 'lot-6',
    lotName: 'Granja Porcina La Herradura (Cochinos)',
    healthStatus: 'healthy',
    photo: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
    reproductiveStatus: 'lactating',
    notes: 'Excelente instinto maternal. Camada actual de 12 lechones vigorosos con ganancia de peso óptima.',
    vaccinesApplied: [
      { vaccineName: 'Parvovirus + Erisipela + Leptospira (PLE)', date: '2026-05-20' },
      { vaccineName: 'Peste Porcina Clásica (PPC)', date: '2026-02-14' },
      { vaccineName: 'Micoplasma Hyopneumoniae', date: '2026-03-10' }
    ]
  },
  {
    id: 'pig-702',
    tagNumber: 'PG-02',
    name: 'Centauro',
    species: 'pig',
    category: 'pig',
    breed: 'Pietrain Alemán',
    sex: 'male',
    birthDate: '2022-09-05',
    weightKg: 265,
    weightHistory: [
      { date: '2026-06-01', weightKg: 250 },
      { date: '2026-10-20', weightKg: 265 }
    ],
    pigStage: 'fattening',
    feedIntakeKgPerDay: 3.2,
    lotId: 'lot-6',
    lotName: 'Granja Porcina La Herradura (Cochinos)',
    healthStatus: 'healthy',
    photo: 'https://images.unsplash.com/photo-1604848698030-c434ba08ece1?auto=format&fit=crop&w=800&q=80',
    sire: 'Max Pietrain Elite',
    reproductiveStatus: 'breeding',
    notes: 'Verraco padrote de línea terminal. Aporta alto porcentaje de magro y jamones voluminosos a la descendencia.',
    vaccinesApplied: [
      { vaccineName: 'Peste Porcina Clásica (PPC)', date: '2026-02-14' }
    ]
  },
  {
    id: 'pig-703',
    tagNumber: 'PG-03',
    name: 'Lote 24 Cerdos de Ceba',
    species: 'pig',
    category: 'pig',
    breed: 'Duroc x Pietrain',
    sex: 'male',
    birthDate: '2026-06-25',
    weightKg: 86,
    weightHistory: [
      { date: '2026-08-15', weightKg: 35, gainRateKgPerDay: 0.75 },
      { date: '2026-09-20', weightKg: 62, gainRateKgPerDay: 0.82 },
      { date: '2026-11-05', weightKg: 86, gainRateKgPerDay: 0.88 }
    ],
    pigStage: 'fattening',
    feedIntakeKgPerDay: 2.8,
    lotId: 'lot-6',
    lotName: 'Granja Porcina La Herradura (Cochinos)',
    healthStatus: 'healthy',
    photo: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=800&q=80',
    notes: 'Corral de engorde etapa final. Peso meta: 110 kg a frigorífico en 28 días.',
    vaccinesApplied: [
      { vaccineName: 'Circovirus Porcino Tipo 2 (PCV2)', date: '2026-07-20' },
      { vaccineName: 'Peste Porcina Clásica', date: '2026-08-01' }
    ]
  }
];

export const INITIAL_CROPS: Crop[] = [
  {
    id: 'crop-1',
    name: 'Cosecha de TOMATE',
    variety: 'Tomate Chonto Seleccionado',
    type: 'vegetable',
    plotName: 'Parcela Agrícola Sur 1',
    hectares: 3.2,
    plantingDate: '2026-08-15',
    expectedHarvestDate: '2026-11-25', // 25 nov as shown in screenshot!
    status: 'harvesting',
    expectedYieldKg: 14500,
    actualYieldKg: 2800,
    photo: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    fumigationHistory: [
      { date: '2026-09-10', product: 'Oxicloruro de Cobre', target: 'Tizón temprano', completed: true },
      { date: '2026-10-04', product: 'Bacillus thuringiensis', target: 'Gusano cogollero', completed: true },
      { date: '2026-11-02', product: 'Jabón Potásico y Neem', target: 'Mosca blanca', completed: true }
    ],
    notes: 'Frutos en óptimo color y firmeza. Recolección gradual en canastillas plásticas.'
  },
  {
    id: 'crop-2',
    name: 'Maíz Blanco Forrajero',
    variety: 'Híbrido Pionner 30F35',
    type: 'grain',
    plotName: 'Potrero Agrícola Norte 4',
    hectares: 12.0,
    plantingDate: '2026-09-01',
    expectedHarvestDate: '2026-12-20',
    status: 'vegetative',
    expectedYieldKg: 48000,
    photo: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
    fumigationHistory: [
      { date: '2026-09-22', product: 'Atrazina 500 SC', target: 'Maleza de hoja ancha', completed: true },
      { date: '2026-10-18', product: 'Fertilizante foliar con zinc y boro', target: 'Nutrición vegetativa', completed: true }
    ],
    notes: 'Destinado a ensilaje picado fino para alimentación del lote lechero en temporada seca.'
  },
  {
    id: 'crop-3',
    name: 'Pasto de Corte Cuba 22',
    variety: 'Pennisetum purpureum',
    type: 'pasture',
    plotName: 'Banco de Forraje Las Palmas',
    hectares: 6.5,
    plantingDate: '2026-05-10',
    expectedHarvestDate: '2026-12-05',
    status: 'vegetative',
    expectedYieldKg: 35000,
    photo: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    fumigationHistory: [
      { date: '2026-06-15', product: 'Urea disuelta y biofertilizante', target: 'Rebrote foliar', completed: true }
    ],
    notes: 'Corte cada 65 días. Alta palatabilidad y proteína cruda superior al 14%.'
  }
];

export const INITIAL_EVENTS: CalendarEvent[] = [
  {
    id: 'ev-1',
    title: 'Cosecha de TOMATE',
    type: 'harvest',
    date: '2026-11-25',
    time: '06:00',
    targetCategory: 'crop',
    targetId: 'crop-1',
    targetName: 'Parcela Agrícola Sur 1',
    productOrAction: 'Cosecha · Cultivo de hortaliza',
    operator: 'Pedro Gómez & Cuadrilla',
    status: 'scheduled',
    notes: 'Iniciar a primera hora para evitar calentamiento de fruta.'
  },
  {
    id: 'ev-2',
    title: 'Ciclo Nacional Fiebre Aftosa y Brucelosis',
    type: 'vaccine',
    date: '2026-11-26', // exactly in ~14 days matching screenshot "En 14 días"
    time: '07:30',
    targetCategory: 'lot',
    targetId: 'lot-1',
    targetName: 'Lote Lechero (120 cabezas)',
    productOrAction: 'Vacuna Aftosa Bivalente + Cepa 19',
    dosage: '2 ml vía subcutánea en tabla del cuello',
    operator: 'Dr. Santiago Morales (Médico Veterinario ICA)',
    status: 'scheduled',
    notes: 'Requerido registro oficial de vacunación sanitaria. Corral limpio desde las 6 AM.'
  },
  {
    id: 'ev-3',
    title: 'Fumigación Fitosanitaria y Nutricional',
    type: 'fumigation',
    date: '2026-11-18',
    time: '05:30',
    targetCategory: 'crop',
    targetId: 'crop-2',
    targetName: 'Potrero Maíz Norte',
    productOrAction: 'Bio-Fungicida + Bioestimulante Foliar',
    dosage: '350 litros por hectárea con aguilón tractor',
    operator: 'Andrés López (Maquinista)',
    status: 'scheduled',
    notes: 'Aplicar temprano antes de que el viento aumente a más de 8 km/h.'
  },
  {
    id: 'ev-4',
    title: 'Desparasitación y Vitaminas Lote Ceba',
    type: 'deworming',
    date: '2026-11-21',
    time: '08:00',
    targetCategory: 'lot',
    targetId: 'lot-2',
    targetName: 'Lote Ceba y Engorde (52 novillos)',
    productOrAction: 'Ivermectina 3.15% Larga Acción + Complejo B y AD3E',
    dosage: '1 ml por cada 50 kg peso vivo',
    operator: 'Dr. Santiago Morales',
    status: 'scheduled',
    notes: 'Pesaje previo en báscula electrónica para calibrar dosis exacta.'
  },
  {
    id: 'ev-5',
    title: 'Herraje y Recorte de Cascos Caballos',
    type: 'hoof_care',
    date: '2026-11-28',
    time: '09:00',
    targetCategory: 'animal',
    targetId: 'eq-301',
    targetName: 'Caballos: Azabache, Centinela y Gitana',
    productOrAction: 'Mantenimiento podológico y herraduras de aluminio',
    operator: 'Maestro Herrador Ramón Díaz',
    status: 'scheduled',
    notes: 'Revisión periódica cada 45 días para aplomos óptimos.'
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-1',
    name: 'Concentrado Lechero Alto Rendimiento 18% Proteína',
    category: 'feed',
    quantity: 140,
    unit: 'bultos (40kg)',
    minThreshold: 40,
    costPerUnit: 28.5,
    location: 'Bodega Principal Silo 1'
  },
  {
    id: 'inv-2',
    name: 'Sal Mineralizada Ganadera con Selenio y Fósforo 8%',
    category: 'feed',
    quantity: 85,
    unit: 'bultos (50kg)',
    minThreshold: 20,
    costPerUnit: 32.0,
    location: 'Bodega de Suplementos'
  },
  {
    id: 'inv-3',
    name: 'Vacuna Fiebre Aftosa (Frascos 50 Dosis)',
    category: 'vaccine',
    quantity: 5,
    unit: 'frascos (250 dosis)',
    minThreshold: 2,
    costPerUnit: 45.0,
    expiryDate: '2027-06-30',
    location: 'Nevera Biológicos (4°C)'
  },
  {
    id: 'inv-4',
    name: 'Ivermectina al 3.15% Frasco 500ml',
    category: 'medicine',
    quantity: 18,
    unit: 'frascos',
    minThreshold: 5,
    costPerUnit: 38.0,
    expiryDate: '2027-10-15',
    location: 'Botiquín Veterinario'
  },
  {
    id: 'inv-5',
    name: 'Fertilizante Urea Granulada 46% Nitrógeno',
    category: 'fertilizer',
    quantity: 120,
    unit: 'bultos (50kg)',
    minThreshold: 30,
    costPerUnit: 26.0,
    location: 'Bodega Agrícola'
  },
  {
    id: 'inv-6',
    name: 'Filtros Desechables para Línea de Ordeño',
    category: 'supplies',
    quantity: 82,
    unit: 'cajas (100 und)',
    minThreshold: 25,
    costPerUnit: 14.0,
    location: 'Cuarto de Tanque Lechero'
  }
];

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: 'tsk-1',
    title: 'Revisión matutina de bebederos y niveles de sal en Lote Ceba',
    category: 'diario',
    completed: true,
    date: '2026-11-12'
  },
  {
    id: 'tsk-2',
    title: 'Registro de litros de leche en planilla matutina',
    category: 'diario',
    completed: true,
    date: '2026-11-12'
  },
  {
    id: 'tsk-3',
    title: 'Calibración de la fumigadora de espalda para parcela de tomates',
    category: 'pendientes',
    completed: false,
    date: '2026-11-13'
  },
  {
    id: 'tsk-4',
    title: 'Reparación de cerca eléctrica en el Potrero 4 (sector quebrada)',
    category: 'pendientes',
    completed: false,
    date: '2026-11-14'
  },
  {
    id: 'tsk-5',
    title: 'Comprar 20 bultos de sal mineralizada y jeringas de repuesto 20ml',
    category: 'compras',
    completed: false,
    date: '2026-11-15',
    cost: 680
  }
];

export const INITIAL_OPERATORS: FarmOperator[] = [
  {
    id: 'op-1',
    name: 'Juan Carlos Sarmiento',
    role: 'Administrador General & Propietario',
    phone: '+57 312 458 9201',
    email: 'juancarlos@agrofinca.co',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    assignedAreas: ['Toda la finca', 'Finanzas', 'Ventas de ganado']
  },
  {
    id: 'op-2',
    name: 'Dr. Santiago Morales',
    role: 'Médico Veterinario Zootecnista',
    phone: '+57 320 891 3344',
    email: 'dr.morales@agrofinca.co',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    assignedAreas: ['Sanidad animal', 'Vacunaciones', 'Plan reproductivo']
  },
  {
    id: 'op-3',
    name: 'Pedro Gómez',
    role: 'Mayordomo de Campo & Siembras',
    phone: '+57 311 772 1090',
    email: 'pedro@agrofinca.co',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    assignedAreas: ['Potreros', 'Siembra de tomates y maíz', 'Maquinaria']
  }
];
