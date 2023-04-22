// import axios from "axios";
// import { useRouter } from "next/router";
// import React, { useEffect, useState } from "react";

import Layout from "@/components/Layout";
import ProductForm from "@/components/productForm";

const newProduct = () => {
  return (
    <Layout>
      <div className="w-3/4 p-3 rounded-md bg-sky-100 ">
      <h1 className="font-serif text-3xl ">New Product</h1>
      <div className="flex flex-col justify-center">
      <ProductForm />
      </div>
      </div>
      
    </Layout>
  );
};
export default newProduct;
