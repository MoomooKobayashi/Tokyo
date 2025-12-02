export interface SubItem {
    id: string;
    type: 'buy' | 'eat' | 'do';
    text: string;
    checked: boolean;
}

export interface TransportDetail {
    mode: 'train' | 'walk' | 'taxi' | 'bus' | 'other';
    duration: string;
    note?: string;
    url?: string;
}

export interface RestaurantOption {
    id: string;
    name: string;
    dish: string;
    priceLevel: string; // e.g., "¥1000~"
    rating?: string;
    url?: string; // Google Maps or Tablog
    locationUrl?: string; // Google Maps
    note?: string;
}

export interface MealPlan {
    breakfast: RestaurantOption[];
    lunch: RestaurantOption[];
    dinner: RestaurantOption[];
}

export interface Event {
    id: string;
    time: string;
    type: 'sight' | 'food' | 'transport' | 'hotel';
    title: string;
    loc: string;
    image?: string;
    tags?: string[];
    desc?: string;
    note?: string;
    // New features
    transitToNext?: TransportDetail; // Transport to the NEXT event
    subItems?: SubItem[]; // "Must Buy/Eat" list
}

export interface Day {
    date: string;
    weekday: string;
    title: string;
    weather: string;
    locationKey: string;
    imageUrl?: string;
    events: Event[];
    mealOptions?: MealPlan; // New feature
}

export interface Reservation {
    id: string;
    type: 'flight' | 'hotel' | 'restaurant' | 'ticket';
    name: string;
    status: 'booked' | 'pending' | 'to-book';
    dateTime: string;
    refNumber?: string;
    notes?: string;
    url?: string;
}

export interface PackingItem {
    id: string;
    category: string;
    text: string;
    checked: boolean;
}

export interface Expense {
    id: string;
    title: string;
    amount: number;
    payer: string;
    involved: string[];
    date: string;
}

export interface AppData {
    currencyRate: number;
    members: string[];
    expenses: Expense[];
    packingList: PackingItem[];
    reservations: Reservation[];
    days: Day[];
}

export const generateId = () => Math.random().toString(36).substr(2, 9);
