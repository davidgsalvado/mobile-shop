export interface AddToCartBody {
    id:          string;
    colorCode:   number;
    storageCode: number;
}
  
export interface AddToCartResponse {
    count: number;
}

export interface CartStore {
    cartCount: number;
    setCartCount: (count: number) => void;
    pageTitle: string;
    setPageTitle: (title: string) => void;
}