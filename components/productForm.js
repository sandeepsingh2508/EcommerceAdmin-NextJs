import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";


const ProductForm = ({
  _id,
  pname: existName,
  desc: existDesc,
  price: existPrice,
  myFile: existFile,
  category:existCategory
}) => {
  const [pname, setPname] = useState(existName || "");
  const [desc, setDesc] = useState(existDesc || "");
  const [price, setPrice] = useState(existPrice || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const [postImages, setPostImages] = useState(existFile|| []);
  const [categories,setCategories]=useState([])
  const [category,setCategory]=useState(existCategory||'')
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { pname, desc, price, myFile:postImages,category};
    if (_id) {
      // console.log("_id", _id);
      //update
      await axios.put("/api/products", { ...data, _id });
      setGoToProducts(true);
    } else {
      //create new product
      const ret = await axios.post("/api/products", data);
      setGoToProducts(true);
      console.log(ret)
    }
  };

  if (goToProducts) {
    router.push("/Products");
  }

  //image uploadng
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    // console.log("file", file);
    const base64 = await convertToBase64(file);
    // console.log("converted file", base64);
    setPostImages((prev) => [...prev, base64]);
  };
useEffect(()=>{
 
axios.get('/api/category').then(result=>{
    setCategories(result.data)
})
},[])

  return (
    <div>
      <form>
        <p>Product Name</p>
        <input
          type="text"
          placeholder="new product"
          // name="pname"
          value={pname}
          onChange={(e) => setPname(e.target.value)}
        />
        <p>Category</p>
        <select value={category} onChange={(e)=>setCategory(e.target.value)}>
          <option value="">Uncategorized</option>
          {
            categories.map((cate,index)=>{
              return(
                <option value={cate._id}>{cate.name}</option>
              )
                
            })
          }
        </select>
        <div className="mb-3">
          <p>Photos</p>
          <div className="flex gap-2">
         
            {postImages.map((postImage, index) => (
              <img
                src={postImage}
                alt={`image${index}`}
                key={index}
                className="flex w-24 h-24 rounded-md"
              />
            ))}
            
            <label className="btn-img">
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
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              <div>Upload</div>
              <input
                type="file"
                label="Image"
                name="myFile"
                accept=".jpeg,.png,.jpg"
                className="hidden"
                onChange={(e) => handleFileUpload(e)}
              />
            </label>
          </div>
          {/* {!images?.length && <div>No Photos in this product</div>} */}
        </div>
        <p>Description</p>
        <textarea
          type="text"
          placeholder="description"
          name="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
        <p>Price in(USD)</p>
        <input
          type="number"
          name="price"
          placeholder="price"
          value={price === "e" ? Number(e) : price}
          onChange={(e) => setPrice(e.target.value)}
          className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button type="submit" className="btn" onClick={handleSubmit}>
          Save
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
