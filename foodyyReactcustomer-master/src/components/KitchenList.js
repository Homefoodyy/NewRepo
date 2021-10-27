import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row } from "reactstrap";
import api from "../helper/apiHelper";
import FoodCard from "./FoodCard";
import Loading from "./Loading";

const KitchenList = ({
  foodType = "All kitchens",
  delivery,
  both,
  supportsTakeaway,
  setHomeLoading,
}) => {
  const [results, setResult] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.userReducer);
  useEffect(() => {
    const retriveData = async () => {
      try {
        if (localStorage.getItem("food-app-zip-code") !== undefined) {
          const result = await api.get(
            `/kitchens/zipcode/${localStorage.getItem("food-app-zip-code")}`
          );
          if(result){

            setResult(result.data.data);
          }
          
          // const filtered = result.data.data;

          // if (supportsTakeaway) {
          //   setResult(
          //     filtered.filter((k) => {
          //       return k.supports_takeaway === 1;
          //     })
          //   );
          // } else {
          //   setResult(
          //     filtered.filter((k) => {
          //       return k.supports_takeaway === 0;
          //     })
          //   );
          // }
          // if (delivery) {
          //   setResult(
          //     filtered.filter((k) => {
          //       return k.supports_delivery === 1;
          //     })
          //   );
          // }

          // if (both) {
          //   setResult(
          //     filtered.filter((k) => {
          //       return k.supports_delivery === 1 || k.supports_takeaway === 1;
          //     })
          //   );
          // }

          // if (delivery && supportsTakeaway) {
          //   setResult(
          //     filtered.filter((k) => {
          //       return k.supports_delivery === 1 || k.supports_takeaway === 1;
          //     })
          //   );
          // }

          setHomeLoading(false);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    };
    retriveData();
  
  }, [both, delivery, supportsTakeaway, user]);

  return loading ? (
    <Loading />
  ) : (
    <Container className="my-4">
      <h2>{foodType}</h2>

      <Row>
        { results && !results[0] ? (
          <Loading
            loading={false}
            msg="We are not active on this Zip Code yet"
          />
        ) : (
          results.map((kitchen) => (
            <FoodCard
              both={both}
              id={kitchen.k_uid}
              key={kitchen.k_id}
              kitchen={kitchen}
            />
          ))
        )}
      </Row>
    </Container>
  );
};

export default KitchenList;
