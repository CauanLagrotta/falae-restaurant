import { useState } from "react";
import { AddProductModalProps } from "@/types/types";

export function AddProductModal({ isOpen, onClose, onAddProduct }: AddProductModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("entradas");

  const handleAddProduct = () => {
    onAddProduct({ name, price, category, imageUrl: "" });
    onClose();
    setName("");
    setPrice("");
    setCategory("entradas");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">Adicionar Novo Produto</h3>

        <label className="block text-gray-700">Nome do produto:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded w-full p-2 mt-1 mb-4"
          placeholder="Digite o nome do produto"
        />

        <label className="block text-gray-700">Preço:</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border border-gray-300 rounded w-full p-2 mt-1 mb-4"
          placeholder="Digite o preço do produto"
        />

        <label className="block text-gray-700">Imagem:</label>
        <input
          type="text"
          className="border border-gray-300 rounded w-full p-2 mt-1 mb-4"
          placeholder="Digite o link da imagem do produto"
        />

        <label className="block text-gray-700">Descrição:</label>
        <input
          type="text"
          className="border border-gray-300 rounded w-full p-2 mt-1 mb-4"
          placeholder="Digite a descrição do produto"
        />

        <label className="block text-gray-700">Categoria:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded w-full p-2 mt-1 mb-4"
        >
          <option value="entradas">Entradas</option>
          <option value="pratos principais">Pratos Principais</option>
          <option value="acompanhamentos">Acompanhamentos</option>
          <option value="bebidas">Bebidas</option>
          <option value="sobremesas">Sobremesas</option>
        </select>

        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-lg">
            Cancelar
          </button>
          <button onClick={handleAddProduct} className="bg-green-600 text-white px-4 py-2 rounded-lg">
            Adicionar Produto
          </button>
        </div>
      </div>
    </div>
  );
}
