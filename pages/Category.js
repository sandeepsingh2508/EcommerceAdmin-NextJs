import Layout from "@/components/Layout";

import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";

function Category({ swal }) {
  const [editedCategory, setEditedCategory] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);
  const [parentCategory, setParentCategory] = useState(null);
  const [properties, setProperties] = useState([]);

  //post data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name) {
        return alert("please fill category name");
      }
      const data = { name, parentCategory, properties:properties.map(p=>({
        name:p.name,
        value:p.value.split(',')[0]
      })
    )};
      if (editedCategory) {
        data._id = editedCategory._id;
        const res = await axios.put("/api/category", data);
        setName("");
        setParentCategory("");
        setProperties([])
      } else {
        const res = await axios.post("/api/category", data);
        setName("");
        setProperties([])
        // console.log(res);
      }

      //   console.log(res);
      axios.get("/api/category").then((res) => setCategory(res.data));
      editedCategory(null);
    } catch (err) {
      console.log(err);
    }
  };

  //fetch data
  const fetchCategory = async () => {
    await axios.get("/api/category").then((res) => setCategory(res.data));
  };

  useEffect(() => {
    fetchCategory();
  }, []);
  //editCategory
  function editCategory(value) {
    setEditedCategory(value);
    setName(value.name);
    setParentCategory(value.parent?._id);
  }

  //delete category
  function deleteData(value) {
    swal
      .fire({
        title: "Are you sure",
        text: `Do you want to delete ${value.name}? `,
        showCancelButton: "true",
        cancelButtonTitle: "Cancel",
        confirmButtonText: "Yes, Delete!",
        confirmButtonColor: "#d55",
        reverseButtons: "true",
      })
      .then(async (result) => {
        // when confirmed and promise resolved...
        if (result.isConfirmed) {
          const { _id } = value;
          await axios.delete("/api/category?_id=" + _id);
          fetchCategory();
        }
      })
      .catch((error) => {
        // when promise rejected...
      });
  }

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: "", value: "" }];
    });
  }
  function handlePropertyChangeName(index, property, newName) {
    // console.log({ index, property, newName });
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }

  function handlePropertyChangeValue(index, property, newValue) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].value = newValue;
      return properties;
    });
  }
  // console.log(properties)

  function removeProperties(removeToIndex) {
    setProperties((prev) => {
      const newProperties = [...prev].filter((p, pIndex) => {
        return pIndex !== removeToIndex;
      });
      return newProperties;
    });
  }

  return (
    <Layout>
      <h1 className="text-4xl font-bold">Categories</h1>
      <p className="font-bold ">
        {editedCategory
          ? `Edit category ${editedCategory.name}`
          : `Create new category`}
      </p>
      <form onSubmit={handleSubmit} className="">
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            name="category"
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-2/5 p-1 ml-0 transition duration-300 focus:outline-none focus:border-green-600"
          />
          <select
            value={parentCategory}
            onChange={(e) => setParentCategory(e.target.value)}
            className="w-1/6"
          >
            <option value="">No parent category</option>
            {category.map((value, index) => {
              return (
                <option key={index} value={value._id}>
                  {value.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="block">
          <p>Properties</p>
          <button
            onClick={addProperty}
            type="button"
            className="px-2 py-1 mt-1 mb-1 text-white bg-gray-500 rounded-md"
          >
            Add new property
          </button>
          {properties.map((property, index) => {
            return (
              <div className="flex w-3/5 gap-2 mt-2">
                <input
                  type="text"
                  value={property.name}
                  onChange={(e) =>
                    handlePropertyChangeName(index, property, e.target.value)
                  }
                  placeholder="name"
                />
                <input
                  type="value"
                  value={property.value}
                  onChange={(e) =>
                    handlePropertyChangeValue(index, property, e.target.value)
                  }
                  placeholder="value"
                />
                <button
                  type="button"
                  onClick={() => removeProperties(index)}
                  className="px-1 text-white bg-gray-500 rounded-md"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex gap-2">
          <button
            className="h-8 mt-2 text-white bg-blue-900 rounded-md w-14"
            type="submit"
          >
            Save
          </button>
          {editedCategory && (
            <button
              className="h-8 mt-2 text-white bg-red-700 rounded-md w-14"
              type="button"
              onClick={() => {
                setEditedCategory(null),
                setName('')
                setParentCategory('')
              }
              }
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      {!editedCategory && (
        <table className="w-2/3 mt-4">
          <thead>
            <tr>
              <th className="p-2 font-normal text-center text-green-200 bg-gray-800">
                Category name
              </th>
              <th className="p-2 font-normal text-center text-green-200 bg-gray-800">
                Parent category
              </th>
              <th className="p-2 font-normal text-center text-green-200 bg-gray-800">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-orange-100">
            {category.map((value, index) => {
              return (
                <tr key={index}>
                  <td className="text-center border-2 border-white">
                    {value.name}
                  </td>
                  <td className="text-center border-2 border-white">
                    {value?.parent?.name}
                  </td>
                  <td className="text-center border-2 border-white">
                    <button
                      className="px-4 py-1 my-2 text-blue-800 transition duration-300 rounded-full hover:bg-gray-700 hover:text-green-500"
                      onClick={() => editCategory(value)}
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
                    </button>
                    <button
                      className="px-4 py-1 my-2 text-red-700 transition duration-300 rounded-full hover:bg-gray-700 hover:text-red-500"
                      onClick={() => deleteData(value)}
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
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Category swal={swal} />);
