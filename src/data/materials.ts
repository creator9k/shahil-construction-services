/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Material } from '../types';

export const INITIAL_MATERIALS: Material[] = [
  {
    id: 'sand',
    name: 'River Sand (Balu)',
    hindiName: 'नदी की रेत (बालू)',
    category: 'aggregate',
    description: 'High-quality coarse river sand, triple-washed and completely free of clay deposits. Perfect for brickwork masonry, plastering, and RCC concrete casting.',
    extendedDescription: 'Our river sand is sourced directly from clean river basins around Chhattisgarh. Sieve tested for grading and particle size distribution. Ensures strong bonding with cement, minimizing wall crack development in plaster and concrete structures.',
    unit: 'Brass (100 CFT) / Trolley / Dump',
    approxPrice: 2800,
    showPrice: true,
    features: [
      'Zero clay & silt content',
      'Medium to coarse grain sizing',
      'Perfect moisture balance',
      'Locally sourced and environmentally compliant'
    ],
    specifications: {
      'Source': 'Surguja Basin (Local Rivers)',
      'Silt Content': '< 3% (Lab Checked)',
      'Fine Modulus': '2.2 - 2.8',
      'Primary Use': 'Plastering, Concrete mix, Masonry block assembly'
    },
    imageHue: 'from-amber-100 to-amber-200 text-amber-800 border-amber-300',
    iconName: 'Sparkles',
    imageUrl: '/images/products/sand.png'
  },
  {
    id: 'bricks',
    name: 'Red Clay Bricks (Eeta)',
    hindiName: 'लाल मिट्टी की ईंटें (ईटा)',
    category: 'masonry',
    description: 'Premium kiln-burned red clay bricks with sharp edges and uniform shape. High structural crushing strength and low water absorption.',
    extendedDescription: 'Traditional and durable building blocks fabricated near Ambikapur. Baked in thermal-controlled chimneys ensuring ideal hardness. High sound and thermal insulation properties with heavy bearing capacity.',
    unit: 'Per Piece (Bulk Delivery Available)',
    approxPrice: 7,
    showPrice: true,
    features: [
      'High crushing resistance (> 10 N/mm²)',
      'Sharp edges and standard 9"x4"x3" sizing',
      'Rich metallic ringing sound on impact',
      'Low salt efflorescence (No whitish patches later)'
    ],
    specifications: {
      'Size': '9 x 4.25 x 3 inches (Standard)',
      'Weight': 'approx. 3.2 Kg per brick',
      'Water Absorption': '< 15% of dry weight',
      'Compressive Strength': '105 Kg/cm² (Grade A Quality)'
    },
    imageHue: 'from-orange-100 to-orange-200 text-orange-850 border-orange-300',
    iconName: 'Layers',
    imageUrl: '/images/products/bricks.png'
  },
  {
    id: 'gravel',
    name: 'Crushed Granite Gravel (Gitti)',
    hindiName: 'क्रश की हुई काली गिट्टी (गिट्टी)',
    category: 'aggregate',
    description: 'Angular crushed black granite aggregates. Available in standard 10mm, 20mm, and 40mm sizes for high-strength footing, beams, slab casting, and roads.',
    extendedDescription: 'Machine-crushed dense granite gitti. Superior angular lock structure provides outstanding mechanical bonding when paired with sand and cement. Recommended by civil engineers across Ambikapur for all critical load-bearing RCC elements.',
    unit: 'Brass (100 CFT) / Truck load',
    approxPrice: 3200,
    showPrice: true,
    features: [
      '100% genuine dense black granite stone',
      'Machine crush ensuring cubic structural shape',
      'Free from dust coatings and organic contaminants',
      'Available sizing: 10mm / 20mm / 40mm variants'
    ],
    specifications: {
      'Crushing Value': '< 25% (Extremely Durable)',
      'Flakiness Index': '< 15%',
      'Sizing': '10mm, 20mm, 40mm (Selectable)',
      'Primary Use': 'RCC Foundations, Columns, Beams, Roof Slabs, Roads'
    },
    imageHue: 'from-gray-105 to-gray-200 text-gray-800 border-gray-350',
    iconName: 'Grid',
    imageUrl: '/images/products/gravel.png'
  },
  {
    id: 'fencing_poles',
    name: 'Cemented Fencing Poles',
    hindiName: 'सीमेंटेड फेंसिंग बाउंड्री पोल',
    category: 'concrete',
    description: 'Heavy-duty precast concrete poles reinforced with internal TMT iron wire mesh. Perfect for farm fencing, garden boundaries, and property demarcation.',
    extendedDescription: 'Pre-machined concrete poles built with standard curing of 21 days for maximum load. Prevents termite rot, moisture wear, or physical bending. Comes with pre-drilled layout holes for convenient cross-wire or barbed wire tightening.',
    unit: 'Per Pole',
    approxPrice: 220,
    showPrice: true,
    features: [
      'Reinforced with high-tensile internal steel rods',
      'Pre-drilled holes for rapid wire arrangement',
      'Tapered design with flat burial base',
      'Unaffected by severe weathering or soil acidity'
    ],
    specifications: {
      'Length': '6 feet, 7 feet, or 8 feet available',
      'Cross Section': '4" x 4" base tapering to 3" x 3" top',
      'Reinforcement': '3 steel wire strands (4mm thick)',
      'Lifetime': 'Exceeds 25 years with zero maintenance'
    },
    imageHue: 'from-sky-100 to-sky-200 text-sky-850 border-sky-300',
    iconName: 'Navigation',
    imageUrl: '/images/products/fencing_pole.png'
  },
  {
    id: 'boundary_walls',
    name: 'Precast Boundary Walls (Slabs)',
    hindiName: 'प्रीकास्ट सीमेंट बाउंड्री दीवार',
    category: 'concrete',
    description: 'Modular lock-and-key design precast concrete panel walls. Features premium textured patterns, instant site assembly, and long-term security.',
    extendedDescription: 'A cost-effective and highly attractive substitute for traditional brick walls. Fabricated in our factory using high-frequency vibrational molds. Comprises concrete columns and slide-in concrete planks, taking 80% less assembly time as compared to heavy masonry work.',
    unit: 'Per Square Foot (Fitting Included)',
    approxPrice: 95,
    showPrice: true,
    features: [
      'Aesthetic designs (Brick pattern, wave texture)',
      'Save 60% of masonry labor costs and active curation',
      'Relocatable panels — dismantle and reinstall anywhere',
      'Manufactured using premium 53-Grade cement + TMT mesh'
    ],
    specifications: {
      'Plank Thickness': '50 mm (Heavy Concrete Slabs)',
      'Column Base': '6" x 6" reinforced pillar',
      'Available Heights': '4 ft, 5 ft, 6 ft, 8 ft from ground level',
      'Fitting Duration': 'Up to 100 running feet finished in 1-2 days'
    },
    imageHue: 'from-teal-100 to-teal-200 text-teal-850 border-teal-300',
    iconName: 'ShieldAlert',
    imageUrl: '/images/products/precast_boundarywall.png'
  }
];
