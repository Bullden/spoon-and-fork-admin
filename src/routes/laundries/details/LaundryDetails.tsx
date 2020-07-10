import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useLaundryDetailsActions, useOrderActions} from 'state/hooks/UseActions';
import {useSelector} from 'state/hooks';
import {Grid} from '@material-ui/core';
import styles from './LaundryDetails.module.scss';
import Avatar from 'components/Avatar/Avatar';
import {Loader} from 'components';
import {format} from 'date-fns';
import Laundry from 'entities/Laundry';
import {useTranslation} from 'react-i18next';
import Order from 'entities/Order';
import {KeyboardTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-google-places-autocomplete';

const editProfileIcon = require('./assets/editProfile.png');

const LaundryDetails: React.FC = () => {
  const {t} = useTranslation('laundryDetails');
  const {laundryId} = useParams<{laundryId: string}>();
  const actions = useLaundryDetailsActions();

  const {laundry} = useSelector((state) => state.laundryDetails);

  const history = useHistory();

  const [isEditing, setEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [beginningOfWorkingDay, setBeginningOfWorkingDay] = useState<Date>(new Date());
  const [endOfWorkingDay, setEndOfWorkingDay] = useState<Date>(new Date());
  const [addressDescription, setAddressDescription] = useState<string>('');
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [contactPerson, setContactPerson] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [additionalInfo, setAdditionalInfo] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [services, setServices] = useState<string>('');

  const openEditUserInformationPage = (laundry: Laundry) => {
    setEdit(true);
    setTitle(laundry.title);
    setBeginningOfWorkingDay(laundry.beginningOfWorkingDay);
    setEndOfWorkingDay(laundry.endOfWorkingDay);
    setAddressDescription(laundry.address ? laundry.address.description : '');
    setLat(laundry.address ? laundry.address.latLng.lat : 0);
    setLng(laundry.address ? laundry.address.latLng.lng : 0);
    setContactPerson(laundry.contactPerson);
    setWebsite(laundry.website ? laundry.website : '');
    setAdditionalInfo(laundry.additionalInfo ? laundry.additionalInfo : '');
    setPhoneNumber(laundry.phoneNumber);
    history.push(`/laundries/${laundryId}/editProfile`);
    setServices(laundry.services ? laundry.services : '');
  };

  const cancelEditingUserInformation = () => {
    setEdit(false);
    history.push(`/laundries/${laundryId}`);
  };

  const updateUserInformation = () => {
    setEdit(false);
    actions.updateLaundryInformation({
      id: laundryId,
      title,
      beginningOfWorkingDay,
      endOfWorkingDay,
      addressDescription,
      lat,
      lng,
      contactPerson,
      website,
      additionalInfo,
      phoneNumber,
      services,
    });
    history.push(`/laundries/${laundryId}`);
  };

  useEffect(() => {
    actions.fetchLaundryDetails(laundryId);
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
      const washingOrderPrice = order.washingInfo ? order.washingInfo?.price / 100 : 0;

      const firstCourierPrice = order.firstCourierId
        ? order.orderInfo.priceCents / 100
        : 0;

      const secondCourierPrice = order.secondCourierId
        ? order.orderInfo.priceCents / 100
        : 0;
      return (washingOrderPrice + firstCourierPrice + secondCourierPrice).toFixed(2);
    };

    return (
      <ul className={styles.orders__list}>
        <li className={styles.orders__listItem__header} key="header">
          <p>Created</p>
          <p>Weight</p>
          <p>Price</p>
        </li>
        {orders.map((order) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
          <li
            className={styles.orders__listItem}
            key={order.id}
            onClick={() => selectOrder(order)}
          >
            <p>{format(new Date(order.created), 'MM.dd.yyyy')}</p>
            <p>{`${order.orderInfo.weight} lbs`}</p>
            <p>{`$${countPrice(order)}`}</p>
          </li>
        ))}
      </ul>
    );
  };

  const laundryOrders =
    data.isSuccess &&
    laundry.isSuccess &&
    data.orders.filter((order) => order.laundry.id === laundry.id);

  const renderMainInfo = (laundry: Laundry) => (
    <Grid className={styles.mainInfoContainer}>
      <Grid item className={styles.detailsContainer__paper__avatar}>
        <Avatar url={laundry.image} />
      </Grid>
      <Grid className={styles.user} item>
        <p className={styles.user__name}>{laundry.title}</p>
        <p className={styles.user__position}>{t('laundry')}</p>
      </Grid>
    </Grid>
  );

  const renderOrders = () => (
    <Grid className={styles.orders}>
      <p className={styles.orders__title}>Laundry orders</p>

      {data &&
        data.isSuccess &&
        laundryOrders &&
        (laundryOrders.length > 0 ? (
          renderOrdersList(laundryOrders)
        ) : (
          // eslint-disable-next-line no-inline-styles/no-inline-styles
          <p style={{textAlign: 'center'}}>This laundry not have orders</p>
        ))}
    </Grid>
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const renderExtraInfo = (laundry: Laundry) => (
    <div className={styles.extraInfo}>
      <div className={styles.extraInfo__header}>
        <p className={styles.extraInfo__title}>Profile details</p>
        {isEditing ? (
          <>
            <div className={styles.extraInfo__editProfile}>
              {/* eslint-disable-next-line no-inline-styles/no-inline-styles,jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
              <p style={{marginLeft: 20}} onClick={() => updateUserInformation()}>
                Save
              </p>
              {/* eslint-disable-next-line no-inline-styles/no-inline-styles,jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
              <p style={{marginLeft: 20}} onClick={() => cancelEditingUserInformation()}>
                Cancel
              </p>
            </div>
          </>
        ) : (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <div
            className={styles.extraInfo__editProfile}
            onClick={() => openEditUserInformationPage(laundry)}
          >
            <img src={editProfileIcon} alt="Edit profile icon" />
            <p>Edit profile</p>
          </div>
        )}
      </div>
      <div className={styles.extraInfo__details}>
        <div className={styles.extraInfo__fieldsRow}>
          <div className={styles.extraInfo__field}>
            <p className={styles.extraInfo__field__name}>Title:</p>
            {isEditing ? (
              <input
                className={styles.extraInfo__input}
                type="text"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
              />
            ) : (
              <p className={styles.extraInfo__field__value}>{laundry.title}</p>
            )}
          </div>
          <div className={styles.extraInfo__field}>
            <p className={styles.extraInfo__field__name}>Hours of operation:</p>
            <p className={styles.extraInfo__field__value}>
              {isEditing ? (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around" className={styles.datePicker}>
                    <KeyboardTimePicker
                      margin="normal"
                      id="time-picker"
                      label="Begin"
                      value={beginningOfWorkingDay}
                      onChange={(value) =>
                        setBeginningOfWorkingDay(new Date(value ? value.toString() : ''))
                      }
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                    />
                    <KeyboardTimePicker
                      margin="normal"
                      id="time-picker"
                      label="End"
                      value={endOfWorkingDay}
                      onChange={(value) =>
                        setEndOfWorkingDay(new Date(value ? value.toString() : ''))
                      }
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              ) : (
                <>
                  {format(new Date(laundry.beginningOfWorkingDay), 'hh:mm a')}
                  {' - '}
                  {format(new Date(laundry.endOfWorkingDay), 'hh:mm a')}
                </>
              )}
            </p>
          </div>
        </div>
        <div className={styles.extraInfo__fieldsRow}>
          <div className={styles.extraInfo__field}>
            <p className={styles.extraInfo__field__name}>Website:</p>
            {isEditing ? (
              <input
                className={styles.extraInfo__input}
                type="text"
                value={website}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setWebsite(e.target.value)
                }
              />
            ) : (
              <p className={styles.extraInfo__field__value}>
                {laundry.website ? laundry.website : '-'}
              </p>
            )}
          </div>
          <div className={styles.extraInfo__field}>
            <p className={styles.extraInfo__field__name}>Contact person:</p>
            {isEditing ? (
              <input
                className={styles.extraInfo__input}
                type="text"
                value={contactPerson}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setContactPerson(e.target.value)
                }
              />
            ) : (
              <p className={styles.extraInfo__field__value}>{laundry.contactPerson}</p>
            )}
          </div>
        </div>
        <div className={styles.extraInfo__fieldsRow}>
          <div className={styles.extraInfo__fullField}>
            <p className={styles.extraInfo__field__name}>Phone number:</p>
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
                {laundry.phoneNumber ? laundry.phoneNumber : '-'}
              </p>
            )}
          </div>
        </div>
        <div className={styles.extraInfo__fieldsRow}>
          <div className={styles.extraInfo__fullField}>
            <p className={styles.extraInfo__field__name}>Address:</p>
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
                initialValue={addressDescription || laundry.address.description}
              />
            ) : (
              <p className={styles.extraInfo__field__value}>
                {laundry.address.description}
              </p>
            )}
          </div>
        </div>
        <div className={styles.extraInfo__fieldsRow}>
          <div className={styles.extraInfo__fullField}>
            <p className={styles.extraInfo__field__name}>Additional info:</p>
            {isEditing ? (
              <input
                className={styles.extraInfo__input}
                type="text"
                value={additionalInfo}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAdditionalInfo(e.target.value)
                }
              />
            ) : (
              <p className={styles.extraInfo__field__value}>
                {laundry.additionalInfo ? laundry.additionalInfo : '-'}
              </p>
            )}
          </div>
        </div>
        <div className={styles.extraInfo__fieldsRow}>
          <div className={styles.extraInfo__fullField}>
            <p className={styles.extraInfo__field__name}>Services:</p>
            {isEditing ? (
              <input
                className={styles.extraInfo__input}
                type="text"
                value={services}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setServices(e.target.value)
                }
              />
            ) : (
              <p className={styles.extraInfo__field__value}>
                {laundry.services ? laundry.services : '-'}
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
        {laundry.isSuccess ? renderMainInfo(laundry) : <Loader />}
        {laundry.isSuccess ? renderExtraInfo(laundry) : <Loader />}
      </div>
      <div className={styles.infoContainer}>
        {laundry.isSuccess ? renderOrders() : <Loader />}
      </div>
    </div>
  );
};

export default LaundryDetails;
