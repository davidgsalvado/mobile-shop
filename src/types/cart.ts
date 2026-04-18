export interface AddToCartBody {
    id:          string;
    colorCode:   number;
    storageCode: number;
  }
  
  export interface AddToCartResponse {
    count: number;
  }