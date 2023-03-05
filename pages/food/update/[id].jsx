import { Fragment, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import CryptoJS from "crypto-js";
import Header from "../../../componets/layouts/header";
import SideBar from "../../../componets/layouts/sidebar";
import Footer from "../../../componets/layouts/footer";
import Link from "next/link";
import FormatMoney from "../../../utils/FormatMoney";
import axios from "axios";
import Cookies from "js-cookie";
import Select from "react-select";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Alert from "../../../componets/atoms/Alert";

export default function EditFood() {
  const { validation } = useSelector((state) => state);
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [image, setImage] = useState();
  const [previewImg, setPreviewImg] = useState();
  const [isUploadImage, setIsUploadImage] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectCategories, setSelectCategories] = useState([]);
  const [picturePathDB, setPicturePathDB] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    ingredients: "",
    price: null,
    rating: null,
  });
  const [messageError, setMessageError] = useState({
    text: "",
    code: 0,
  });

  useEffect(() => {
    getCategories();
    getProductById();
  }, []);

  const getCategories = async () => {
    const token = Cookies.get("token");
    const decryptAES = CryptoJS.AES.decrypt(token, "in_this_private_keys");
    const oriToken = decryptAES.toString(CryptoJS.enc.Utf8);
    const headers = {
      Authorization: `Bearer ${oriToken}`,
    };
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_APP_VERSION}/category`,
        { headers }
      );
      let newData = [];
      res.data.data.map((item) => {
        newData.push({ value: item._id, label: item.name });
      });

      setCategories(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductById = async () => {
    const token = Cookies.get("token");
    const decryptAES = CryptoJS.AES.decrypt(token, "in_this_private_keys");
    const oriToken = decryptAES.toString(CryptoJS.enc.Utf8);
    const headers = {
      Authorization: `Bearer ${oriToken}`,
    };
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_APP_VERSION}/product/${id}`,
        { headers }
      );
      const {
        name,
        description,
        ingredients,
        price,
        rating,
        category,
        picturePath,
      } = res.data.data;
      let newDataCategories = [];
      setForm({
        ...form,
        name,
        description,
        ingredients,
        price,
        rating,
      });
      category.map((item) => {
        return newDataCategories.push({ value: item._id, label: item.name });
      });
      setSelectCategories(newDataCategories);
      setPreviewImg(`${process.env.NEXT_PUBLIC_IMG}/${picturePath}`);
      setPicturePathDB(picturePath);
    } catch (error) {
      console.log(error);
    }
  };

  const renderStar = (point) => {
    let star = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= point) {
        star.push(
          <i key={i} className="bi bi-star-fill text-warning me-2"></i>
        );
      } else {
        star.push(
          <i key={i} className="bi bi-star-fill text-secondary me-2"></i>
        );
      }
    }
    return star;
  };

  const onValueChange = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const chooseImage = (value) => {
    const urlImage = URL.createObjectURL(value);
    setIsUploadImage(true);
    setPreviewImg(urlImage);
    return setImage(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    const decryptAES = CryptoJS.AES.decrypt(token, "in_this_private_keys");
    const oriToken = decryptAES.toString(CryptoJS.enc.Utf8);
    const headers = {
      Authorization: `Bearer ${oriToken}`,
    };
    try {
      if (isUploadImage) {
        const resUploadImage = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_APP_VERSION}/user/io-file`,
          { file: image },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (resUploadImage.data.status === 200) {
          let newData = [];
          selectCategories.map((item) => {
            newData.push(item.value);
          });
          const body = {
            ...form,
            category: newData,
            picturePath: resUploadImage.data.data.file,
          };
          const res = await axios.put(
            `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_APP_VERSION}/product/update/${id}`,
            body,
            { headers }
          );
          console.log(res.data);
          router.push("/food");
        }
      } else {
        let newData = [];
        selectCategories.map((item) => {
          newData.push(item.value);
        });
        const body = {
          ...form,
          category: newData,
          picturePath: picturePathDB,
        };
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_APP_VERSION}/product/update/${id}`,
          body,
          { headers }
        );
        if (res.data.status === 200) {
          console.log(res.data);
          router.push("/food");
        }
      }
    } catch (error) {
      console.log(error);
      const statusCode =
        error?.response?.status === undefined ? 0 : error?.response?.status;
      const message = error.response?.data;
      if (statusCode === 403) {
        setMessageError({
          ...messageError,
          text: message.message,
          code: statusCode,
        });
      } else if (statusCode === 500) {
        setMessageError({
          ...messageError,
          text: message.message,
          code: statusCode,
        });
      } else if (statusCode === 422) {
        dispatch({
          type: "set_error_validation",
          value: {
            statusCode,
            name: !message.message?.name ? "" : message.message?.name?.message,
            description: !message.message?.description
              ? ""
              : message.message?.description?.message,
            ingredients: !message.message?.ingredients
              ? ""
              : message.message?.ingredients?.message,
            price: !message.message?.price
              ? ""
              : message.message?.price?.message,
            rating: !message.message?.rating
              ? ""
              : message.message?.rating?.rating,
          },
        });
      } else {
        null;
      }
    }
  };

  const renderErrorValidation = () => {
    return (
      <ul>
        {validation.name && <li>{validation.name}</li>}
        {validation.description && <li>{validation.description}</li>}
        {validation.ingredients && <li>{validation.ingredients}</li>}
        {validation.price && <li>{validation.price}</li>}
        {validation.rating && <li>{validation.rating}</li>}
      </ul>
    );
  };

  return (
    <Fragment>
      <Header />
      <SideBar />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Food</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/food">Food</Link>
              </li>
              <li className="breadcrumb-item active">Edit</li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <div className="row">
            {/* <!-- Left side columns --> */}
            <div className="col-lg-4">
              <div className="card">
                {!previewImg && !isUploadImage ? (
                  <div
                    style={{
                      backgroundColor: "GrayText",
                      height: 200,
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      fontSize: "2rem",
                    }}
                  >
                    512 X 512
                  </div>
                ) : (
                  <img
                    src={previewImg}
                    className="card-img-top"
                    alt="Thumbnail"
                    width={512}
                    height={200}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">
                    {form.name ? form.name : "Belum di isi"}
                  </h5>
                  <p className="card-text">
                    {form.description ? form.description : "Belum diisi"}
                  </p>
                  <p className="card-text">
                    {FormatMoney.getFormattedMoney(form.price)}
                  </p>
                  <div className="d-flex mb-3">{renderStar(form.rating)}</div>
                </div>
              </div>
            </div>
            {/* Right side columns */}
            <div className="col-lg-8">
              {/* <!-- Food --> */}
              <div className="col-12">
                <div className="card recent-sales overflow-auto">
                  <div className="card-body">
                    <h5 className="card-title">Edit Food</h5>
                    {messageError.code === 403 && (
                      <Alert
                        className="alert-danger"
                        title={messageError.text}
                      />
                    )}
                    {messageError.code === 500 && (
                      <Alert
                        className="alert-danger"
                        title={messageError.text}
                      />
                    )}
                    {validation.statusCode === 422 && (
                      <Alert
                        className="alert-danger"
                        title={renderErrorValidation()}
                      />
                    )}
                    <form onSubmit={onSubmit}>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Name Food
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Type your name food"
                          value={form.name}
                          onChange={(val) =>
                            onValueChange("name", val.target.value)
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                          Description Food
                        </label>
                        <textarea
                          id="description"
                          placeholder="Type your description food"
                          className="form-control"
                          value={form.description}
                          onChange={(val) =>
                            onValueChange("description", val.target.value)
                          }
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="category" className="form-label">
                          Category Food
                        </label>
                        <Select
                          id="category"
                          isMulti
                          placeholder="Choose your category"
                          options={categories}
                          value={[...selectCategories]}
                          onChange={(val) => setSelectCategories([...val])}
                          formatGroupLabel={(e) => <span>{e.label}</span>}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="ingredients" className="form-label">
                          Ingredients Food
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="ingredients"
                          placeholder="Type your ingredients food"
                          value={form.ingredients}
                          onChange={(val) =>
                            onValueChange("ingredients", val.target.value)
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="price" className="form-label">
                          Price Food
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="price"
                          placeholder="Type your price food"
                          value={form.price}
                          onChange={(val) =>
                            onValueChange("price", val.target.value)
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="rating" className="form-label">
                          Rating Food
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="rating"
                          placeholder="Type your rating food"
                          value={form.rating}
                          onChange={(val) =>
                            onValueChange("rating", val.target.value)
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="image" className="form-label">
                          Image
                        </label>
                        <input
                          className="form-control"
                          id="image"
                          type="file"
                          accept="image/png, image/jpeg, image/jpg"
                          onChange={(val) => chooseImage(val.target.files[0])}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Edit Food
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              {/* <!-- End Recent Sales --> */}
            </div>
            {/* <!-- End Left side columns --> */}
          </div>
        </section>
      </main>
      {/* <!-- End #main --> */}
      <Footer />
    </Fragment>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const decryptAES = CryptoJS.AES.decrypt(token, "in_this_private_keys");
  const oriToken = decryptAES.toString(CryptoJS.enc.Utf8);

  const decode = jwtDecode(oriToken);

  if (decode.user.isAdmin === "USER") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: decode.user,
    },
  };
}
