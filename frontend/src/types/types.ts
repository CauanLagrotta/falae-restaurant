export interface Product {
  id: number;
  productname: string;
  productprice: string;
  productcategory: string;
  productdescription: string;
  productImageUrl: string;
}

export interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: {
    productname: string;
    productprice: string;
    productcategory: string;
    productdescription: string;
    productImageUrl: string;
  }) => void;
}

export interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: {
    productname: string;
    productprice: string;
    productcategory: string;
    productdescription: string;
    productImageUrl: string;
  }) => void;

  selectedProduct: Product | null;
}

export interface LearnMoreProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct: {
    productname: string;
    productdescription: string;
    productprice: string;
    productcategory: string;
  };
}

export interface HeaderProps {
  onStaffStatus: (isStaff: number) => void;
}
