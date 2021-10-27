import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import api from "../helper/apiHelper";

const Categories = () => {
  const [result, setResult] = useState([]);
  useEffect( () => {
    async function fetchData(){
      try {
        const result = await api.get("/categories");
        setResult(result.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  return (
    <Container
      style={{ background: "#fafafa" }}
      className="d-flex justify-content-between hide-scroll categories rounded-3"
    >
      {result.map((item) => {
        return (
          <div
            key={item.cat_id}
            className="category mx-3"
            style={{ maxWidth: "150px", cursor: "pointer" }}
          >
            <img
              src="https://media.istockphoto.com/photos/last-straw-picture-id516329534?s=612x612"
              alt="category-"
              height="100px"
              width="100px"
              className="rounded-circle"
            />
            <h6 className="text-center mt-2 text-muted text-capitalize">
              {item?.name.toString()}
            </h6>
          </div>
        );
      })}
    </Container>
  );
};

export default Categories;
