export interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  imageUrl: string;
  category: string;
}

export interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: {
    name: string;
    price: string;
    category: string;
    imageUrl: string;
  }) => void;
}

export interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: {
    name: string;
    price: string;
    category: string;
    imageUrl: string;
  }) => void;
}

export interface LearnMoreProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct: {
    name: string;
    description: string;
    price: string;
    category: string;
  };
}

export interface HeaderProps {
  onStaffStatus: (isStaff: number) => void;
}
