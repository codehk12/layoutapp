import React, { useEffect, useState } from "react";
import axios from "axios";
import "./categories.css";
import { Button, Form, Row, Col, Card, Image } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCart, selectCategory } from "../redux/slice/cartSlice";
import { ShoppingCartOutlined } from "@ant-design/icons";

function Categories() {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const Data = async () => {
    try {
      const res = await axios.get(
        "https://fakestoreapi.com/products/categories"
      );
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Data();
  }, []);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleCart = () => {
    navigate("/cart");
  };

  const filterCategories = (item) => {
    setSelectedCategory(item); // Set the selected category
  };

  const filteredProducts = selectedCategory
    ? data.filter((item) => item.category === selectedCategory)
    : data;

  // console.log(filterCategories);

  // <pre> {JSON.stringify(Data, null, 5)} </pre>

  return (
    <div className="Main">
      <div className="main-div">
        {data.map((item) => {
          return (
            <Button
              key={item.category}
              className="catego"
              type={selectCategory === item.category ? "primary" : "default"}
              style={{ backgroundColor: "grey", fontSize: 18, color: "white" }}
              onClick={() => filterCategories(item.category)}
            >
              {item}
            </Button>
          );
        })}
        <Button style={{ margin: 10 }} onClick={handleCart}>
          <ShoppingCartOutlined />
        </Button>
      </div>

      <Form
        style={{
          margin: "10px",
        }}
      >
        <Row gutter={[15]}>
          {filteredProducts.map((item) => {
            return (
              <Col key={item.id} xs={24} sm={24} md={12} lg={8}>
                <Card
                  style={{
                    margin: "10px",
                  }}
                >
                  <Image
                    src={item.image}
                    className="image"
                    style={{
                      height: "280px",
                      width: "250px",
                    }}
                  />
                  <p>{item.title}</p>
                  <p>Price: {item.price}</p>
                  <Button onClick={() => dispatch(addCart(item))}>
                    Add to Cart
                  </Button>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Form>
    </div>
  );
}

export default Categories;
