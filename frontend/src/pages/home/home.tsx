import { useState } from "react";
import { Header } from "../../components/header/header";
import { AddProductModal } from "../../components/addProductModal/addProductModal";
import { EditProductModal } from "../../components/editProductModal/editProductModal";
import { Product } from "@/types/types";
import { LearnMore } from "../../components/learnMore/learnMore";

export function Home() {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState<boolean>(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState<boolean>(false);
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Prato 1",
      price: "R$ 30,00",
      description: "Descrição detalhada do prato 1.",
      imageUrl:
        "https://i.pinimg.com/736x/d3/4d/0d/d34d0d692b8741172fe723669c9ab8de.jpg",
      category: "Prato principal",
    },
    {
      id: 2,
      name: "Prato 2",
      price: "R$ 25,00",
      description: "Descrição detalhada do prato 2.",
      imageUrl:
        "https://static.itdg.com.br/images/1200-630/4dfadc46568f5db05a8e4abd94cfeeb6/shutterstock-561846814.jpg",
      category: "Prato principal",
    },
  ]);
  const [staff, setStaff] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openAddProductModal = () => {
    setIsAddProductModalOpen(true);
  };

  const closeAddProductModal = () => {
    setIsAddProductModalOpen(false);
  };

  const openEditProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsEditProductModalOpen(true);
  };

  const closeEditProductModal = () => {
    setIsEditProductModalOpen(false);
    setSelectedProduct(null);
  };

  const openLearnMoreModal = (product: Product) => {
    setSelectedProduct(product);
    setIsLearnMoreOpen(true);
  };

  const closeLearnMoreModal = () => {
    setIsLearnMoreOpen(false);
    setSelectedProduct(null);
  };

  const handleAddProduct = (product: { name: string; price: string; category: string }) => {
    const newProduct: Product = {
      id: products.length + 1,
      name: product.name,
      price: product.price,
      description: "Descrição do novo produto.",
      imageUrl: "",
      category: product.category,
    };
    setProducts([...products, newProduct]);
  };

  return (
    <div className="overflow-x-hidden">
      <Header onStaffStatus={setStaff} staff={staff} />

      <div className="flex justify-between bg-gray-100 p-4">
        <h2 className="text-2xl font-semibold">Cardápio</h2>

        <div>
          <select
            className="border text-white bg-blue-600 border-gray-300 rounded-md p-2"
            name="products"
          >
            <option className="bg-white text-black" disabled selected>
              Selecionar tipo de refeição
            </option>
            <option className="bg-white text-black" value="all">
              Todos
            </option>
            <option className="bg-white text-black" value="starters">
              Entradas
            </option>
            <option className="bg-white text-black" value="sides">
              Acompanhamentos
            </option>
            <option className="bg-white text-black" value="drinks">
              Bebidas
            </option>
            <option className="bg-white text-black" value="meals">
              Pratos principais
            </option>
            <option className="bg-white text-black" value="desserts">
              Sobremesas
            </option>
          </select>

          {staff === 1 && (
            <button
              onClick={openAddProductModal}
              className="bg-green-600 text-white px-4 py-2 rounded-lg ml-2"
            >
              Adicionar mais produtos
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <div>
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.price}</p>
              <p className="text-sm text-gray-600">{product.category}</p>
            </div>

            
            <div className="flex justify-end mt-2">
              {staff === 1 && (
                <>
                  <button
                    onClick={() => openEditProductModal(product)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-2"
                  >
                    Editar
                  </button>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg">
                    Excluir
                  </button>
                </>
              )}
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => openLearnMoreModal(product)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Saiba Mais
              </button>

              <button className="bg-green-700 text-white px-4 py-2 rounded-lg">
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={closeAddProductModal}
        onAddProduct={handleAddProduct}
      />

      <EditProductModal
        isOpen={isEditProductModalOpen}
        onClose={closeEditProductModal}
        onAddProduct={handleAddProduct}
      />

      {selectedProduct && (
        <LearnMore
          isOpen={isLearnMoreOpen}
          onClose={closeLearnMoreModal}
          selectedProduct={selectedProduct}
        />
      )}
    </div>
  );
}
