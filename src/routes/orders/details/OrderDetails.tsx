import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useOrderDetailsActions} from 'state/hooks/UseActions';
import {useSelector} from 'state/hooks';
import {Grid} from '@material-ui/core';
import styles from './OrderDetails.module.scss';
import {Loader} from 'components';
import Order from 'entities/Order';
import {useTranslation} from 'react-i18next';

const OrderDetails: React.FC = () => {
  const {t} = useTranslation('order');
  const {id} = useParams<{id: string}>();
  const actions = useOrderDetailsActions();
  const {order} = useSelector((state) => state.orderDetails);

  useEffect(() => {
    actions.fetchOrderDetails(id);
  }, []);

  // const renderDetails = (order: Order) => {
  //   return (
  //     <Grid container className={styles.container}>
  //       <Grid className={styles.orderMainInfo} item>
  //         <p className={styles.orderMainInfo__number}>
  //           <span>{t('order')}</span>
  //           {order.number}
  //         </p>
  //         <p className={styles.orderMainInfo__status}>
  //           <span className={styles.orderMainInfo__status__fieldName}>{t('status')}</span>
  //           {order.state}
  //         </p>
  //       </Grid>
  //       <Grid className={styles.detailsContainer__paper__field} item>
  //         <p className={styles.detailsContainer__paper__element}>
  //           <span className={styles.detailsContainer__paper__label}>{t('customer')}</span>
  //           {order.client.name}
  //         </p>
  //         <p className={styles.detailsContainer__paper__element}>
  //           <span className={styles.detailsContainer__paper__label}>{t('address')}</span>
  //           {order.orderInfo.clientAddress.description}
  //         </p>
  //       </Grid>
  //       <Grid className={styles.detailsContainer__paper__field} item>
  //         <p className={styles.detailsContainer__paper__element}>
  //           <span className={styles.detailsContainer__paper__label}>{t('courier')}</span>
  //           {order.courierId}
  //         </p>
  //         <p className={styles.detailsContainer__paper__element}>
  //           <span className={styles.detailsContainer__paper__label}>
  //             {t('restaurant')}
  //           </span>
  //           {order.restaurant.address.description}
  //         </p>
  //       </Grid>
  //     </Grid>
  //   );
  // };
  //
  // const renderExtraInfo = (order: Order) => {
  //   return (
  //     <div className={styles.extraInfoContainer}>
  //       <div>
  //         <h1 className={styles.containerName}>Order info</h1>
  //         <ul className={styles.ordersList}>
  //           <li className={styles.listElement}>
  //             <span>Order status</span>
  //             <span>{order.state}</span>
  //           </li>
  //           <li className={styles.listElement}>
  //             <span>Order cost</span>
  //             <span>${((order.orderInfo.priceCents * 2) / 100)?.toFixed(2)}</span>
  //           </li>
  //         </ul>
  //       </div>
  //       <div className={styles.buttons}>
  //         {order.courierId && (
  //           <button
  //             type="submit"
  //             className={styles.button}
  //             onClick={() => actions.leaveCourier(order.id)}
  //           >
  //             Leave courier
  //           </button>
  //         )}
  //         <button
  //           type="submit"
  //           className={styles.button}
  //           onClick={() => actions.closeOrder(order.id)}
  //         >
  //           Close order
  //         </button>
  //       </div>
  //     </div>
  //   );
  // };

  const renderTitle = (order: Order) => (
    <Grid className={styles.mainInfoContainer}>
      <Grid className={styles.user} item>
        <p className={styles.user__name}>
          {t('order')} {order.number}
        </p>
        <p className={styles.user__position}>
          {t('status')}: {order.state}
        </p>
      </Grid>
    </Grid>
  );

  const renderMainInfo = (order: Order) => (
    <div className={styles.extraInfo}>
      <div className={styles.extraInfo__header}>
        <p className={styles.extraInfo__title}>{t('orderMainInfo')}</p>
      </div>
      <div className={styles.extraInfo__details}>
        <div className={styles.extraInfo__fieldsRow}>
          <div className={styles.extraInfo__field}>
            <p className={styles.extraInfo__field__name}>{t('customer')}</p>
            <p className={styles.extraInfo__field__value}>{order.client.name}</p>
          </div>
          <div className={styles.extraInfo__field}>
            <p className={styles.extraInfo__field__name}>{t('deliveryAddress')}</p>
            <p className={styles.extraInfo__field__value}>
              {order.orderInfo.clientAddress.description}
            </p>
          </div>
        </div>
        <div className={styles.extraInfo__fieldsRow}>
          <div className={styles.extraInfo__field}>
            <p className={styles.extraInfo__field__name}>{t('courier')}</p>
            <p className={styles.extraInfo__field__value}>
              {order.courier ? order.courier?.user.name : '-'}
            </p>
          </div>
          <div className={styles.extraInfo__field}>
            <p className={styles.extraInfo__field__name}>{t('restaurant')}</p>
            <p className={styles.extraInfo__field__value}>
              {order.restaurant.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExtraInfo = (order: Order) => {
    return (
      <div className={styles.extraInfo}>
        <div className={styles.extraInfo__header}>
          <p className={styles.extraInfo__title}>{t('orderExtraInfo')}</p>
        </div>
        <div className={styles.extraInfo__details}>
          <div className={styles.extraInfo__fieldsRow}>
            <div className={styles.extraInfo__field}>
              <p className={styles.extraInfo__field__name}>{t('orderStatus')}</p>
              <p className={styles.extraInfo__field__value}>{order.state}</p>
            </div>
            <div className={styles.extraInfo__field}>
              <p className={styles.extraInfo__field__name}>{t('orderCost')}</p>
              <p className={styles.extraInfo__field__value}>
                ${((order.orderInfo.priceCents * 2) / 100)?.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.buttons}>
          {order.courierId && (
            <button
              type="submit"
              className={styles.button}
              onClick={() => actions.leaveCourier(order.id)}
            >
              {t('leaveCourier')}
            </button>
          )}
          <button
            type="submit"
            className={styles.button}
            onClick={() => actions.closeOrder(order.id)}
          >
            {t('closeOrder')}
          </button>
        </div>
      </div>
    );
  };

  return (
    // <div className={styles.detailsContainer}>
    //   <Paper elevation={3} className={styles.detailsContainer__paper}>
    //     <InfoSummary>{order.isSuccess ? renderDetails(order) : <Loader />}</InfoSummary>
    //     <div>{order.isSuccess ? renderExtraInfo(order) : <Loader />}</div>
    //   </Paper>
    // </div>

    <div className={styles.orderContainer}>
      {order.isSuccess ? renderTitle(order) : <Loader />}
      <div className={styles.orderInfoContainer}>
        <div className={styles.infoContainer}>
          {order.isSuccess ? renderMainInfo(order) : <Loader />}
        </div>
        <div className={styles.infoContainer}>
          {order.isSuccess ? renderExtraInfo(order) : <Loader />}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
