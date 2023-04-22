import Layout from "@/components/Layout";
import ProductForm from "@/components/productForm";

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function editProduct() {
  const [productInfo, setProductInfo] = useState(null);
  const router = useRouter();
  const id = router.query.id;
  //   console.log(id)
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);
  //   console.log(productInfo)
  return (
    <Layout>
      <div className="w-3/4 p-3 rounded-md bg-sky-100">
        <h1 className="font-serif text-3xl">Edit Product</h1>
        {productInfo && <ProductForm {...productInfo} />}
      </div>
    </Layout>
  );
}
