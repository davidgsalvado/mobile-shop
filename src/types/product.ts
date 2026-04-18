export interface Product {
    id:    string;
    brand: string;
    model: string;
    price: number;
    imgUrl: string;
}
  
export interface ProductDetail extends Product {
    cpu:         string;
    ram:         string;
    os:          string;
    displaySize: string;
    battery:     string;
    primaryCamera:   string[];
    secondaryCamera: string[];
    dimentions:  string;
    weight:      string;
    options: {
        colors:   { code: number; name: string }[];
        storages: { code: number; name: string }[];
    };
}