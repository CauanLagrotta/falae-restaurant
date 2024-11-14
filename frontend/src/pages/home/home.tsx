import { useState, useEffect } from "react";
import { Header } from "../../components/header/header";
import { AddProductModal } from "../../components/addProductModal/addProductModal";
import { EditProductModal } from "../../components/editProductModal/editProductModal";
import { Product } from "@/types/types";
import { LearnMore } from "../../components/learnMore/learnMore";
import Axios from "axios";

export function Home() {
  const [isAddProductModalOpen, setIsAddProductModalOpen] =
    useState<boolean>(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] =
    useState<boolean>(false);
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [staff, setStaff] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");


  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "all") {
      return true;
    }
    return product.productcategory === selectedCategory;
  });

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };
  
  const fetchProducts = async () => {
    try {
      const res = await Axios.get("http://localhost:3000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.log("Erro ao buscar produtos:", error);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await Axios.delete(`http://localhost:3000/api/products/${id}`).then(() =>{
        Axios.get("http://localhost:3000/api/products").then((res) => {
          setProducts(res.data);
        })
      })
      fetchProducts();
    } catch (error) {
      console.log("Erro ao excluir o produto:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAddProductModal = () => setIsAddProductModalOpen(true);
  const closeAddProductModal = () => setIsAddProductModalOpen(false);

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

  const handleProductAdded = () => {
    closeAddProductModal();
    fetchProducts();
  };

  const handleProductEdited = () => {
    closeEditProductModal();
    fetchProducts();
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
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            <option className="bg-white text-black" disabled selected>
              Selecionar tipo de refeição
            </option>
            <option className="bg-white text-black" value="all">
              Todos
            </option>
            <option className="bg-white text-black" value="entradas">
              Entradas
            </option>
            <option className="bg-white text-black" value="pratos-principais">
              Pratos Principais
            </option>
            <option className="bg-white text-black" value="acompanhamentos">
              Acompanhamentos
            </option>
            <option className="bg-white text-black" value="bebidas">
              Bebidas
            </option>
            <option className="bg-white text-black" value="sobremesas">
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
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={product.productImageUrl}
              alt={product.productname}
              className="w-full h-48 object-cover rounded-md"
            />
            <div>
              <h3 className="text-lg font-semibold mt-2">{product.productname}</h3>
              <p className="text-sm text-gray-600">
                R$ {product.productprice}
              </p>
              <p className="text-sm text-gray-600">{product.productcategory.replace("-", " ")}</p>
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
                  <button onClick={() => handleDeleteProduct(product.id)} className="bg-red-600 text-white px-4 py-2 rounded-lg">
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

              { staff === 0 &&
                <button className="bg-green-700 text-white px-4 py-2 rounded-lg">
                  Adicionar ao Carrinho
                </button>
              }
            </div>
          </div>
        ))}
      </div>

      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={handleProductAdded}
        onAddProduct={handleProductAdded}
      />
      <EditProductModal
        isOpen={isEditProductModalOpen}
        onClose={handleProductEdited}
        selectedProduct={selectedProduct}
        onAddProduct={handleProductEdited}
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
