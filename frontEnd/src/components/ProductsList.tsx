import { useEffect, useState } from "react";

interface product {
  name: string;
  description: string;
  price: number;
  promotionPrice: number;
  stock: number;
  category: string;
  alertStock: number;
  images: File[];
  details: string;
  specifications: string;
  dimensions: string;
  weight: number;
  material: string;
}

export default function ProductsList() {
  const [products, setProducts] = useState<product[]>([]);
  useEffect(() => {}, []);
  return (
    <div>
      <h1>Liste des Produits</h1>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Prix</th>
            <th>Prix en promotion</th>
            <th>Stock</th>
            <th>Categorie</th>
            <th>Alerte de Stock</th>
            <th>Images</th>
            <th>Details</th>
            <th>Specifications</th>
            <th>Dimensions</th>
            <th>Poids</th>
            <th>Matériaux</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.promotionPrice}</td>
              <td>{product.stock}</td>
              <td>{product.category}</td>
              <td>{product.alertStock}</td>
              {/* <td>{product.images}</td> */}
              <td>{product.details}</td>
              <td>{product.specifications}</td>
              <td>{product.dimensions}</td>
              <td>{product.weight}</td>
              <td>{product.material}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
