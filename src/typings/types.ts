interface BaseType {
  id?: number;
  name: string;
}

export interface Menu extends BaseType {
  price: number;
  locationIds?: number[];
  asseturl?: string;
  description?: string;
}

export interface MenuCategory extends BaseType {}

export interface Addon extends BaseType {
  price: number;
  is_avaiable: boolean;
  addon_categories_id: string;
}

export interface AddonCategory extends BaseType {
  isRequired: boolean;
}
export interface MenusLocation extends BaseType {
  menus_id: number;
  locations_id: number;
  is_avaiable: boolean;
}
export interface Company {
  id?: string;
  name: string;
  address: string;
}
export interface Location extends BaseType {
  name: string;
  address: string;
  companies_id: number;
}
export interface Order {
  order: [{ menuIds: number[]; addonIds: number }];
}
