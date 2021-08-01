import React, { useEffect } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import { Spin, Row, Col, Divider, Typography, Anchor, Menu } from "antd";
import styles from "./DetailPage.module.css";
import { Header, Footer, ProductIntro, ProductComments } from "../../components";
import { DatePicker } from "antd";
import { commentMockData } from "./mockup";
import { getProductDetail } from "../../redux/productDetail/slice";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { MainLayout } from "../../layouts/mainLayout";

const { RangePicker } = DatePicker;
const { Link } = Anchor;

interface MatchParams {
  touristRouteId: string;
}

export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = () => {
  const { touristRouteId } = useParams<MatchParams>();

  const loading = useSelector((state) => state.productDetail.loading);
  const error = useSelector((state) => state.productDetail.error);
  const product = useSelector((state) => state.productDetail.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetail(touristRouteId));
  }, []);

  if (loading) {
    return (
      <Spin
        size="large"
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
    return <div>api调用出错：{error}</div>;
  }

  return (
    <MainLayout>
      <div className={styles["product-intro-container"]}>
        <Row>
          <Col span={13}>
            <ProductIntro
              title={product.title}
              shortDescription={product.description}
              price={product.originalPrice}
              coupons={product.coupons}
              points={product.points}
              discount={product.price}
              rating={product.rating}
              pictures={product.touristRoutePictures.map((p) => p.url)}
            />
          </Col>
          <Col span={11}>
            <RangePicker
              open
              style={{
                marginTop: 20,
              }}
            />
          </Col>
        </Row>
      </div>
      <div className={styles["product-detail-anchor"]}>
        <Anchor>
          <Menu mode="horizontal" className={styles["anchor-menu"]}>
            <Menu.Item key="1">
              <Link href="#feature" title="产品特色"></Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link href="#fees" title="费用"></Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link href="#notes" title="预定须知"></Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link href="#comments" title="用户评价"></Link>
            </Menu.Item>
          </Menu>
        </Anchor>
      </div>
      <div id="feature" className={styles["product-detail-container"]}>
        <Divider orientation="center">
          <Typography.Title level={3}>产品特色</Typography.Title>
        </Divider>
        <div
          dangerouslySetInnerHTML={{ __html: product.features }}
          style={{ margin: 50 }}
        ></div>
      </div>
      <div id="fees" className={styles["product-detail-container"]}>
        <Divider orientation="center">
          <Typography.Title level={3}>费用</Typography.Title>
        </Divider>
        <div
          dangerouslySetInnerHTML={{ __html: product.fees }}
          style={{ margin: 50 }}
        ></div>
      </div>
      <div id="notes" className={styles["product-detail-container"]}>
        <Divider orientation="center">
          <Typography.Title level={3}>预定须知</Typography.Title>
        </Divider>
        <div
          dangerouslySetInnerHTML={{ __html: product.notes }}
          style={{ margin: 50 }}
        ></div>
      </div>
      <div id="comments" className={styles["product-detail-container"]}>
        <Divider orientation="center">
          <Typography.Title level={3}>预定须知</Typography.Title>
        </Divider>
        {commentMockData.map((i) => (
          <div style={{ margin: 40 }}>
            <ProductComments
              author={i.author}
              avatar={i.avatar}
              commentContent={i.content}
              createDate={i.createDate}
            />
          </div>
        ))}
      </div>
    </MainLayout>
  );
};
