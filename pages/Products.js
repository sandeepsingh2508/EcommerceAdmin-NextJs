import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then((res) => {
      setProducts(res.data);
    });
  }, []);
  return (
    <Layout>
      <Link
        href={"/products/new"}
        className="p-1.5 text-white bg-blue-900 rounded-lg"
      >
        Add new Product
      </Link>
      <table className="w-2/3 mt-3 ">
        <thead className="">
          <tr>
            <th className="font-normal text-green-300 bg-gray-800 p-1.5">Product Name</th>
            <th className="font-normal text-green-300 bg-gray-800 p-1.5 ">Actions</th>
          </tr>
        </thead>
        <tbody className="">
          {products.map((value) => {
            return (
              <tr className=" p-1.5 bg-orange-100">
                <td className=" text-center border-white border-2 border-slate-100...">
                  {value.pname}
                </td>
                <td className="flex justify-center p-3 text-center border-2 border-white ">
                  <Link
                    href={"/products/edit/" + value._id}
                    className="px-4 py-1 text-green-600 rounded-full hover:bg-slate-700 "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6" 
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
            
                  </Link>
                  <Link
                    href={"products/delete/" + value._id}
                    className="px-4 py-1 text-red-400 rounded-full px- hover:bg-slate-700 "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Layout>
  );
};

export default Products;
