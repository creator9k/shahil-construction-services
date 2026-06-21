/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Material {
  id: string;
  name: string;
  hindiName: string;
  category: 'aggregate' | 'concrete' | 'masonry' | 'structural';
  description: string;
  extendedDescription: string;
  unit: string;
  approxPrice: number; // in INR
  showPrice: boolean; // if false, display "Contact for Price"
  features: string[];
  specifications: Record<string, string>;
  imageHue: string; // Tailwind hue class pattern for gradients
  iconName: string; // Name of Lucide icon to use
  imageUrl?: string; // Optional real photo to override gradient
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  location: string;
  materialId: string;
  quantity: number;
  quantityUnit: string;
  message?: string;
  timestamp: string;
  status: 'new' | 'contacted' | 'resolved';
}

export interface EstimationQuery {
  length: number; // in feet
  width: number; // in feet
  thickness?: number; // in inches (used for concrete slabs / floors)
  height?: number; // in feet (used for walls or boundary walls)
  materialType: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}
