import { Navigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Image, Form, Row, Col, Card } from "antd";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/slice/cartSlice";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState([]);

  const jeweleryItems = async () => {
    try {
      const res = await axios.get(
        "https://fakestoreapi.com/products/category/jewelery"
      );
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    jeweleryItems();
  }, []);

  const handleCart = () => {
    navigate("/cart");
  };

  const dispatch = useDispatch();

  return (
    <div className="main">
      <p>{category}</p>
      <Button style={{ margin: 10 }} onClick={handleCart}>
        <ShoppingCartOutlined />
      </Button>
      <div className="main-div">
        <Form
          style={{
            margin: "10px",
          }}
        >
          <Row gutter={[15]}>
            {product.map((item) => {
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
    </div>
  );
}
