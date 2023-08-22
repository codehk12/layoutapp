import React, { useEffect, useState } from "react";
import axios from "axios";
import { find } from "lodash";
import { Input, Form, Col, Row, Image, Card, Button } from "antd";
import "./App.css";
import { ShoppingCartOutlined, MoreOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "./redux/slice/cartSlice";

function App() {
  //data
  const [get, setGet] = useState([]);

  //cart
  // const [cart, setCart ] = useState([]);
  // const [total, setTotal] = useState(0);

  // search
  const searchHandler = (searchText) => {
    debugger;
    const searchResult = find(get, {
      title: searchText,
    });
    console.log(searchResult);
  };

  //api
  const getData = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");

      setGet(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  

  //navigate
  const navigate = useNavigate();

  const handleCart = () => {
    navigate("/cart");
  };

  const handleCategories = () => {
    navigate("/categories");
  };

  const dispatch = useDispatch();


  //cart
  // const addToCart = (item)=> {
  //   setCart(...cart, item);
  //   setTotal(total + item.id);
  // };

  // const removeFromCart = (item) => {
  //   const updatedCart = cart.filter(cartItem => cartItem.id !== item.id );
  //   setCart(updatedCart);
  //   setTotal(total - item.id)
  // }

  return (
    <div className="App">
      <div
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Input
          className="search"
          placeholder="Search"
          onChange={(e) => searchHandler(e.target.value)}
        />
        <Button style={{ margin: 10 }} onClick={handleCart}>
          <ShoppingCartOutlined />
        </Button>

        <Button style={{ margin: 10 }} onClick={handleCategories}>
          <MoreOutlined />
        </Button>
      </div>

      <Form
        style={{
          margin: "10px",
        }}
      >
        <Row gutter={[15]}>
          {get.map((item) => {
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

export default App;
