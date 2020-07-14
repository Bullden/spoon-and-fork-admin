import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useCourierDetailsActions, useOrderActions} from 'state/hooks/UseActions';
import {useSelector} from 'state/hooks';
import {Grid} from '@material-ui/core';
import styles from 'routes/couriers/details/CourierDetails.module.scss';
import {Loader} from 'components';
import {format} from 'date-fns';
import Courier from 'entities/Courier';
import {useTranslation} from 'react-i18next';
import Order from 'entities/Order';

const editProfileIcon = require('./assets/editProfile.svg');

const CourierDetails: React.FC = () => {
  const {t} = useTranslation('courierDetails');
  const {courierId} = useParams<{courierId: string}>();
  const actions = useCourierDetailsActions();
  const {courier} = useSelector((state) => state.courierDetails);

  const history = useHistory();

  const [isEditing, setEdit] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const openEditUserInformationPage = (courier: Courier) => {
    setEdit(true);
    setName(courier.user.name);
    setPhoneNumber(
      courier.user.additionalInfo ? courier.user.additionalInfo?.phoneNumber : '',
    );
    setEmail(courier.user.additionalInfo ? courier.user.additionalInfo?.email : '');
    history.push(`/couriers/${courierId}/editProfile`);
  };

  const cancelEditingUserInformation = () => {
    setEdit(false);
    history.push(`/couriers/${courierId}`);
  };

  const updateUserInformation = () => {
    actions.updateCourierInformation({
      id: courierId,
      name,
      email,
      phoneNumber,
    });
    setEdit(false);
    history.push(`/couriers/${courierId}`);
  };

  useEffect(() => {
    actions.fetchCourierDetails(courierId);
  }, []);

  const orderActions = useOrderActions();

  useEffect(() => {
    orderActions.fetchOrders();
  }, []);

  const data = useSelector((state) => state.orders);

  const renderOrdersList = (orders: Order[]) => {
    const selectOrder = (order: Order) => {
      if (order.id) {
        orderActions.selectOrder(order.id);
      }
    };

    return (
      <ul className={styles.orders__list}>
        <li className={styles.orders__listItem__header} key="header">
          <p>Created</p>
          <p>Weight</p>
          <p>Price</p>
        </li>
        {orders.map((order) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events
          <li
            className={styles.orders__listItem}
            key={order.id}
            onClick={() => selectOrder(order)}
          >
            <p>{format(new Date(order.created), 'MM.dd.yyyy')}</p>
            <p>${(order.orderInfo.priceCents / 100).toFixed(2)}</p>
          </li>
        ))}
      </ul>
    );
  };

  const courierOrders =
    data.isSuccess &&
    courier.isSuccess &&
    courier.user &&
    data.orders.filter((order) => order.courierId === courier.user.id);

  const renderMainInfo = (courier: Courier) => (
    <Grid className={styles.mainInfoContainer}>
      <Grid className={styles.user} item>
        <p className={styles.user__name}>{courier.user.name}</p>
        <p className={styles.user__position}>{t('courier')}</p>
      </Grid>
    </Grid>
  );

  const renderOrders = () => (
    <Grid className={styles.orders}>
      <p className={styles.orders__title}>Customer&apos;s orders</p>

      {data &&
        data.isSuccess &&
        courierOrders &&
        (courierOrders.length > 0 ? (
          renderOrdersList(courierOrders)
        ) : (
          <p className={styles.orders__ordersAbsentMessage}>
            This courier not have orders
          </p>
        ))}
    </Grid>
  );

  const renderExtraInfo = (courier: Courier) => (
    <div className={styles.extraInfo}>
      <div className={styles.extraInfo__header}>
        <p className={styles.extraInfo__title}>Profile details</p>
        {isEditing ? (
          <>
            <div className={styles.extraInfo__editProfile}>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
              <p onClick={() => updateUserInformation()}>Save</p>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
              <p onClick={() => cancelEditingUserInformation()}>Cancel</p>
            </div>
          </>
        ) : (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <div
            className={styles.extraInfo__editProfile}
            onClick={() => openEditUserInformationPage(courier)}
          >
            <img src={editProfileIcon} alt="Edit profile icon" />
            <p>Edit profile</p>
          </div>
        )}
      </div>
      <div className={styles.extraInfo__details}>
        <div className={styles.extraInfo__fieldsRow}>
          <div className={styles.extraInfo__field}>
            <p className={styles.extraInfo__field__name}>Full Name:</p>
            {isEditing ? (
              <input
                className={styles.extraInfo__input}
                type="text"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />
            ) : (
              <p className={styles.extraInfo__field__value}>{courier.user.name}</p>
            )}
          </div>
          <div className={styles.extraInfo__field}>
            <p className={styles.extraInfo__field__name}>Mobile phone:</p>
            {isEditing ? (
              <input
                className={styles.extraInfo__input}
                type="text"
                value={phoneNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPhoneNumber(e.target.value)
                }
              />
            ) : (
              <p className={styles.extraInfo__field__value}>
                {courier.user.additionalInfo
                  ? courier.user.additionalInfo?.phoneNumber
                  : '-'}
              </p>
            )}
          </div>
        </div>
        <div className={styles.extraInfo__fieldsRow}>
          <div className={styles.extraInfo__field}>
            <p className={styles.extraInfo__field__name}>E-mail address:</p>
            {isEditing ? (
              <input
                className={styles.extraInfo__input}
                type="text"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            ) : (
              <p className={styles.extraInfo__field__value}>
                {courier.user.additionalInfo ? courier.user.additionalInfo?.email : '-'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.infoContainer}>
        {courier.isSuccess ? renderMainInfo(courier) : <Loader />}
        {courier.isSuccess ? renderExtraInfo(courier) : <Loader />}
      </div>
      <div className={styles.infoContainer}>
        {courier.isSuccess ? renderOrders() : <Loader />}
      </div>
    </div>
  );
};

export default CourierDetails;
