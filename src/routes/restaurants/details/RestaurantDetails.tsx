import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useRestaurantDetailsActions, useOrderActions} from 'state/hooks/UseActions';
import {useSelector} from 'state/hooks';
import {Grid} from '@material-ui/core';
import styles from 'routes/restaurants/details/RestaurantDetails.module.scss';
import {Loader} from 'components';
import {format} from 'date-fns';
import Restaurant from 'entities/Restaurant';
import {useTranslation} from 'react-i18next';
import Order from 'entities/Order';

import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-google-places-autocomplete';

const editProfileIcon = require('./assets/editProfile.svg');

const RestaurantDetails: React.FC = () => {
  const {t} = useTranslation('restaurant');
  const {restaurantId} = useParams<{restaurantId: string}>();
  const actions = useRestaurantDetailsActions();

  const {restaurant} = useSelector((state) => state.restaurantDetails);

  const history = useHistory();

  const [isEditing, setEdit] = useState<boolean>(false);
  const [addressDescription, setAddressDescription] = useState<string>('');
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [description, setDescription] = useState<string>('');

  const openEditUserInformationPage = (restaurant: Restaurant) => {
    setEdit(true);
    setAddressDescription(restaurant.address ? restaurant.address.description : '');
    setLat(restaurant.address ? restaurant.address.latLng.lat : 0);
    setLng(restaurant.address ? restaurant.address.latLng.lng : 0);
    setDescription(restaurant.description ? restaurant.description : '');
    history.push(`/restaurants/${restaurantId}/editProfile`);
  };

  const cancelEditingUserInformation = () => {
    setEdit(false);
    history.push(`/restaurants/${restaurantId}`);
  };

  const updateUserInformation = () => {
    setEdit(false);
    actions.updateRestaurantInformation({
      id: restaurantId,
      addressDescription,
      lat,
      lng,
      description,
    });
    history.push(`/restaurants/${restaurantId}`);
  };

  useEffect(() => {
    actions.fetchRestaurantDetails(restaurantId);
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

    const countPrice = (order: Order) => {
      const courierPrice = order.orderInfo.priceCents / 100;

      return courierPrice.toFixed(2);
    };

    return (
      <ul className={styles.orders__list}>
        <li className={styles.orders__listItem__header} key="header">
          <p>{t('created')}</p>
          <p>{t('weight')}</p>
          <p>{t('price')}</p>
        </li>
        {orders.map((order) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
          <li
            className={styles.orders__listItem}
            key={order.id}
            onClick={() => selectOrder(order)}
          >
            <p>{format(new Date(order.created), 'MM.dd.yyyy')}</p>
            <p>{`$${countPrice(order)}`}</p>
          </li>
        ))}
      </ul>
    );
  };

  const restaurantOrders =
    data.isSuccess &&
    restaurant.isSuccess &&
    data.orders.filter((order) => order.restaurant.id === restaurant.id);

  const renderMainInfo = () => (
    <Grid className={styles.mainInfoContainer}>
      <Grid className={styles.user} item>
        <p className={styles.user__position}>{t('restaurant')}</p>
      </Grid>
    </Grid>
  );

  const renderOrders = () => (
    <Grid className={styles.orders}>
      <p className={styles.orders__title}>{t('orders')}</p>

      {data &&
        data.isSuccess &&
        restaurantOrders &&
        (restaurantOrders.length > 0 ? (
          renderOrdersList(restaurantOrders)
        ) : (
          <p className={styles.orders__ordersAbsentMessage}>{t('noOrders')}</p>
        ))}
    </Grid>
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const renderExtraInfo = (restaurant: Restaurant) => (
    <div className={styles.extraInfo}>
      <div className={styles.extraInfo__header}>
        <p className={styles.extraInfo__title}>{t('profileDetails')}</p>
        {isEditing ? (
          <>
            <div className={styles.extraInfo__editProfile}>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
              <p onClick={() => updateUserInformation()}>{t('save')}</p>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
              <p onClick={() => cancelEditingUserInformation()}>{t('cancel')}</p>
            </div>
          </>
        ) : (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <div
            className={styles.extraInfo__editProfile}
            onClick={() => openEditUserInformationPage(restaurant)}
          >
            <img src={editProfileIcon} alt={t('editProfile')} />
            <p>{t('editProfile')}</p>
          </div>
        )}
      </div>
      <div className={styles.extraInfo__details}>
        <div className={styles.extraInfo__fieldsRow}>
          <div className={styles.extraInfo__fullField}>
            <p className={styles.extraInfo__field__name}>{t('address')}:</p>
            {isEditing ? (
              <GooglePlacesAutocomplete
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onSelect={(value: any) => {
                  setAddressDescription(value.description);
                  geocodeByAddress(value.description)
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .then((results: any) => getLatLng(results[0]))
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-ignore
                    .then(({lat, lng}) => {
                      setLat(lat);
                      setLng(lng);
                    });
                }}
                // className={styles.addressAutocomplete}
                initialValue={addressDescription || restaurant.address.description}
              />
            ) : (
              <p className={styles.extraInfo__field__value}>
                {restaurant.address.description}
              </p>
            )}
          </div>
        </div>
        <div className={styles.extraInfo__fieldRow}>
          <div className={styles.extraInfo__fullField}>
            <p className={styles.extraInfo__field__name}>{t('description')}:</p>
            {isEditing ? (
              <input
                className={styles.extraInfo__input}
                type="text"
                value={description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDescription(e.target.value)
                }
              />
            ) : (
              <p className={styles.extraInfo__field__value}>{restaurant.description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.infoContainer}>
        {restaurant.isSuccess ? renderMainInfo() : <Loader />}
        {restaurant.isSuccess ? renderExtraInfo(restaurant) : <Loader />}
      </div>
      <div className={styles.infoContainer}>
        {restaurant.isSuccess ? renderOrders() : <Loader />}
      </div>
    </div>
  );
};

export default RestaurantDetails;
