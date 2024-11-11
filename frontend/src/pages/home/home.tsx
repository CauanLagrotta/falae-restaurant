import { useState } from "react";
import { Header } from "../../components/header/header.tsx";

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  imageUrl: string;
}

export function Home() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products: Product[] = [
    {
      id: 1,
      name: "Prato 1",
      price: "R$ 30,00",
      description: "Descrição detalhada do prato 1.",
      imageUrl: "https://i.pinimg.com/736x/d3/4d/0d/d34d0d692b8741172fe723669c9ab8de.jpg",
    },
    {
      id: 2,
      name: "Prato 2",
      price: "R$ 25,00",
      description: "Descrição detalhada do prato 2.",
      imageUrl: "https://static.itdg.com.br/images/1200-630/4dfadc46568f5db05a8e4abd94cfeeb6/shutterstock-561846814.jpg",
    },
  ];

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="overflow-x-hidden">
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-md" />
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.price}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => openModal(product)}
                className="text-blue-500 hover:underline"
              >
                Saiba mais
              </button>
              <button className="bg-blue-700 text-white px-4 py-2 rounded-lg">
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h3 className="text-xl font-semibold">{selectedProduct.name}</h3>
            <p className="text-sm text-gray-600 mt-2">{selectedProduct.description}</p>
            <p className="text-lg font-semibold mt-4">{selectedProduct.price}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
