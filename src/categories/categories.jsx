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


  // <pre> {JSON.stringify(Data, null, 5)} </pre>

  return (
    <div className="Main">
      <div className="main-div">
        {data.map((item) => {
          return (
            <Button
              className="catego"
              style={{ backgroundColor: "grey", fontSize: 18, color: "white" }}
              onClick={() => dispatch(selectCategory(item.Categories))}
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
          {data.map((item) => {
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
