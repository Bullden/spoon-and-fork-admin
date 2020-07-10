import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useOrderDetailsActions} from 'state/hooks/UseActions';
import {useSelector} from 'state/hooks';
import {Grid, Paper} from '@material-ui/core';
import styles from './OrderDetails.module.scss';
import InfoSummary from 'components/InfoSummary/InfoSummary';
import {Loader} from 'components';
import Order from 'entities/Order';
import {useTranslation} from 'react-i18next';

const OrderDetails: React.FC = () => {
  const {t} = useTranslation('orderDetails');
  const {id} = useParams<{id: string}>();
  const actions = useOrderDetailsActions();
  const {order} = useSelector((state) => state.orderDetails);

  useEffect(() => {
    actions.fetchOrderDetails(id);
  }, []);

  const renderDetails = (order: Order) => {
    return (
      // eslint-disable-next-line no-inline-styles/no-inline-styles
      <Grid container style={{paddingLeft: 35}}>
        <Grid className={styles.orderMainInfo} item>
          <p className={styles.orderMainInfo__number}>
            <span>{t('order')}</span>
            {order.number}
          </p>
          <p className={styles.orderMainInfo__status}>
            <span className={styles.orderMainInfo__status__fieldName}>{t('status')}</span>
            {order.state}
          </p>
        </Grid>
        <Grid className={styles.detailsContainer__paper__field} item>
          <p className={styles.detailsContainer__paper__element}>
            <span className={styles.detailsContainer__paper__label}>{t('customer')}</span>
            {order.client.name}
          </p>
          <p className={styles.detailsContainer__paper__element}>
            <span className={styles.detailsContainer__paper__label}>{t('address')}</span>
            {order.orderInfo.clientAddress.description}
          </p>
        </Grid>
        <Grid className={styles.detailsContainer__paper__field} item>
          <p className={styles.detailsContainer__paper__element}>
            <span className={styles.detailsContainer__paper__label}>{t('courier')}</span>
            {order.secondCourierId ? order.secondCourierId : order.firstCourierId}
          </p>
          <p className={styles.detailsContainer__paper__element}>
            <span className={styles.detailsContainer__paper__label}>{t('laundry')}</span>
            {order.laundry.address.description}
          </p>
        </Grid>
      </Grid>
    );
  };

  const renderExtraInfo = (order: Order) => {
    return (
      <div className={styles.extraInfoContainer}>
        <div>
          <h1 className={styles.containerName}>Order info</h1>
          <ul className={styles.ordersList}>
            <li className={styles.listElement}>
              <span>Total bags</span>
              <span>{order.bags.length}</span>
            </li>
            <li className={styles.listElement}>
              <span>Total weight</span>
              <span>{order.orderInfo.weight}</span>
            </li>
            <li className={styles.listElement}>
              <span>Order status</span>
              <span>{order.state}</span>
            </li>
            <li className={styles.listElement}>
              <span>Order cost</span>
              <span>
                $
                {(order.washingInfo
                  ? order.washingInfo?.price &&
                    (order.washingInfo?.price + order.orderInfo.priceCents * 2) / 100
                  : (order.orderInfo.priceCents * 2) / 100
                )?.toFixed(2)}
              </span>
            </li>
            <li className={styles.listElementLaundryServices}>
              <span className={styles.orderServicesTitle}>Order services</span>
              <span>{order.preferredService}</span>
            </li>
          </ul>
        </div>
        <div className={styles.buttons}>
          {order.firstCourierId && (
            <button
              type="submit"
              className={styles.button}
              onClick={() => actions.leaveCourier(order.id)}
            >
              Leave courier
            </button>
          )}
          <button
            type="submit"
            className={styles.button}
            onClick={() => actions.closeOrder(order.id)}
          >
            Close order
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.detailsContainer}>
      <Paper elevation={3} className={styles.detailsContainer__paper}>
        <InfoSummary>{order.isSuccess ? renderDetails(order) : <Loader />}</InfoSummary>
        <div>{order.isSuccess ? renderExtraInfo(order) : <Loader />}</div>
      </Paper>
    </div>
  );
};

export default OrderDetails;
