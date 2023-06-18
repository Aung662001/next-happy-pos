interface BaseType {
  id?: number;
  name: string;
}

export interface Menu extends BaseType {
  price: number | undefined;
  addonCategoriesIds?: number[];
  menuCategoriesIds: number[];
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
export interface MenusMenuCategoriesLocation extends BaseType {
  menus_id: number;
  locations_id: number;
  menu_categories_id: number;
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
  id?: number;
  isPaid: boolean;
  tableId: number;
  orderLine: OrderLine[];
}
interface OrderLine {
  menu: Menu;
  addon?: Addon[];
  quantity: number;
  status: OrderLineStatus;
}

enum OrderLineStatus {
  PENDING = "pending",
  PREPARING = "preparing",
  COMPLETE = "complete",
}
