import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { customFetch, formatPrice } from "../utils";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";

export const loader = async ({ params }) => {
  const response = await customFetch(`/products/${params.id}`);
  return { product: response.data.data };
};

const SingleProduct = () => {
  const { product } = useLoaderData();
  const { image, title, price, description, colors, company } =
    product.attributes;
  const pesoAmount = formatPrice(price);
  const [productColor, setProductColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const cartProduct = {
    cartID: product.id + productColor,
    productID: product.id,
    image,
    title,
    price,
    company,
    productColor,
    quantity,
  };

  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(
      addItem({
        product: cartProduct,
      })
    );
  };
  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      <div className="grid mt-6 gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        <img
          src={image}
          alt={title}
          className="w-96 h-96 object-cover rounded-lg lg:w-full"
        />
        <div className="">
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          <h4 className="text-xl text-shadow-neutral-500 font-bold mt-2">
            {company}
          </h4>
          <p className="mt-3 text-xl">{pesoAmount}</p>
          <p className="mt-6 leading-8">{description}</p>
          <div className="">
            <div className="mt-6">
              <h4 className="text-md font-medium tracking-wider capitalize">
                Color
              </h4>
              <div className="mt-2">
                {colors.map((color) => {
                  return (
                    <button
                      key={color}
                      type="button"
                      className={`badge w-6 h-6 mr-2 ${
                        color === productColor && "border-2 border-secondary"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setProductColor(color)}
                    ></button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="form-control w-full max-w-xs mt-6">
            <label className="label" htmlFor="quantity">
              <h4 className="text-md font-medium tracking-wider capitalize mb-4">
                Quantity
              </h4>
            </label>
            <select
              id="quantity"
              className="select select-secondary select-bordered select-md"
              value={quantity}
              onChange={handleQuantity}
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-10">
            <button className="btn btn-secondary btn-md" onClick={addToCart}>
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SingleProduct;
