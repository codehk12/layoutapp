import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, selectCount } from "../redux/slice/cartSlice";
import { Form, Col, Row, Image, Card, Button } from "antd";
import { removeCart } from "../redux/slice/cartSlice";
import "./cartPage.css";
import { reduce } from "lodash";
// import { find, findIndex } from "lodash";

export default function CartPage() {
  const _cart = useSelector((state) => state.cart);

  const carts = useSelector(selectCount);

  const dispatch = useDispatch();

  const totalAmount = () => {
    const grandTotal = reduce(
      _cart.cartItems,
      (prevValue, current) => {
        const quantity = current?.quantity ?? 1;
        const totalPrice = current.price * quantity;
        return prevValue + totalPrice;
      },
      0
    );

    return grandTotal;
  };

  const func = () => {
    alert("Payment Successful")
  }
 

  // Create a handler function for inc and dec quantity.
  /**
   * STEP 1: Find index for product
   * STEP 2: Create a reducer for handling logic.
   * STEP 3: Once you know the index of a product then add a new property quantity with its value (quantity)
   */

  // You can use rest and speard operator in step 3.

  return (
    <div>
      <p
        style={{
          textAlign: "center",
          fontSize: 22,
          color: "red",
          fontWeight: "bold",
        }}
      >
        CART-PAGE
      </p>

      {/* <pre>{JSON.stringify(_cart.cartItems, null, 5)}</pre> */}

      <Form>
        <Row gutter={[15]}>
          {_cart?.cartItems?.map((item) => {
            return (
              <Col key={item.id} xs={24} sm={24} md={12} lg={8}>
                <Card>
                  <Image
                    src={item.image}
                    className="image"
                    style={{
                      display: "block",
                      marginLeft: 100,
                      // marginright: "auto",
                      width: "50%",
                    }}
                  />
                  <p
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    style={{
                      textAlign: "center",
                      color: "grey",
                    }}
                  >
                    Price: {item.price}
                  </p>

                  <p>
                    Total Price:{" "}
                    {item.quantity ? item.price * item.quantity : item.price}
                  </p>

                  <div className="button">
                    <Button onClick={() => dispatch(increment(item.id))}>
                      +
                    </Button>

                    <div className="count">{item.quantity ?? 1}</div>

                    <Button onClick={() => dispatch(decrement(item.id))}>
                      -
                    </Button>

                    <div>
                      <Button
                        onClick={() => dispatch(removeCart(item.id))}
                        className="remove"
                      >
                        Remove
                      </Button>

                      {/* <p>Total : {subTotal} </p> */}
                    </div>

                    {/* <p>SubTotal: {subTotal} </p> */}

                    {/* <p>{JSON.stringify(_cart.cartItems, null, 4)}</p> */}
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Form>
      <div className="amount-pay">
      <p className = "amount" >Check Out : {totalAmount().toFixed(2)}</p>
      <Button className="pay" onClick={ () => func()}>Pay</Button>
      </div>
    </div>
  );
}
