import React, { useEffect } from "react";
import { Spin } from "antd";
import styles from "./SearchPage.module.css";
import { Header, Footer, FilterArea, ProductList } from "../../components";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "../../redux/hooks";
import { searchProduct } from "../../redux/productSearch/slice";

interface MatchParams {
  keywords: string;
}

export const SearchPage: React.FC = () => {
  const { keywords } = useParams<MatchParams>();
  const location = useLocation();

  const loading = useSelector((state) => state.searchProduct.loading);
  const error = useSelector((state) => state.searchProduct.error);
  const pagination = useSelector((state) => state.searchProduct.pagination);
  const productList = useSelector((state) => state.searchProduct.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchProduct({ nextPage: 1, pageSize: 10, keywords }));
  }, [location]);

  const onPageChange = (nextPage, pageSize) => {
    dispatch(searchProduct({ nextPage, pageSize, keywords }));
  };

  if (loading) {
    return (
      <Spin
        size={"large"}
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      />
    );
  }

  if (error) {
    return <div>网站出错：{error}</div>;
  }

  return (
    <>
      <Header />
      <div className={styles["page-content"]}>
        <div className={styles["product-list-container"]}>
          <FilterArea />
        </div>
        <div className={styles["product-list-container"]}>
          <ProductList
            data={productList}
            paging={pagination}
            onPageChange={onPageChange}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};
