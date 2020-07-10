import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useClientDetailsActions, useOrderActions} from 'state/hooks/UseActions';
import {useSelector} from 'state/hooks';
import {Grid} from '@material-ui/core';
import styles from './ClientDetails.module.scss';
import Avatar from 'components/Avatar/Avatar';
import {Loader} from 'components';
import {format, differenceInYears} from 'date-fns';
import Client from 'entities/Client';
import {useTranslation} from 'react-i18next';
import Order from 'entities/Order';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const editProfileIcon = require('./assets/editProfile.png');

const ClientDetails: React.FC = () => {
  const {t} = useTranslation('clientDetails');
  const {clientId} = useParams<{clientId: string}>();
  const actions = useClientDetailsActions();
  const {client} = useSelector((state) => state.clientDetails);

  const history = useHistory();

  const [isEditing, setEdit] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [birthday, setBirthday] = useState<Date>(new Date());
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const openEditUserInformationPage = (client: Client) => {
    setEdit(true);
    setName(client.user.name);
    setBirthday(client.user.birthday);
    setPhoneNumber(
      client.user.additionalUserInfo ? client.user.additionalUserInfo?.phoneNumber : '',
    );
    setEmail(client.user.additionalUserInfo ? client.user.additionalUserInfo?.email : '');
    history.push(`/customers/${clientId}/editProfile`);
  };

  const cancelEditingUserInformation = () => {
    setEdit(false);
    history.push(`/customers/${clientId}`);
  };

  const updateUserInformation = () => {
    actions.updateClientInformation({
      id: clientId,
      name,
      birthday,
      email,
      phoneNumber,
    });
    setEdit(false);
    history.push(`/customers/${clientId}`);
  };

  useEffect(() => {
    actions.fetchClientDetails(clientId);
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
            <p>{`${order.orderInfo.weight} lbs`}</p>
            <p>
              $
              {(
                (order.washingInfo ? order.washingInfo?.price / 100 : 0) +
                (order.firstCourierId ? order.orderInfo.priceCents / 100 : 0) +
                (order.secondCourierId ? order.orderInfo.priceCents / 100 : 0)
              ).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>
    );
  };

  const customerOrders =
    data.isSuccess &&
    client.isSuccess &&
    client.user &&
    data.orders.filter((order) => order.client.id === client.user.id);

  const renderMainInfo = (client: Client) => (
    <Grid className={styles.mainInfoContainer}>
      <Grid item className={styles.detailsContainer__paper__avatar}>
        <Avatar url={client.user.image} />
      </Grid>
      <Grid className={styles.user} item>
        <p className={styles.user__name}>{client.user.name}</p>
        <p className={styles.user__position}>{t('customer')}</p>
      </Grid>
    </Grid>
  );

  const renderOrders = () => (
    <Grid className={styles.orders}>
      <p className={styles.orders__title}>Customer&apos;s orders</p>

      {data &&
        data.isSuccess &&
        customerOrders &&
        (customerOrders.length > 0 ? (
          renderOrdersList(customerOrders)
        ) : (
          // eslint-disable-next-line no-inline-styles/no-inline-styles
          <p style={{textAlign: 'center'}}>This client not have orders</p>
        ))}
    </Grid>
  );

  const renderExtraInfo = (client: Client) => (
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
            onClick={() => openEditUserInformationPage(client)}
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
              <p className={styles.extraInfo__field__value}>{client.user.name}</p>
            )}
          </div>
          <div className={styles.extraInfo__field}>
            <p className={styles.extraInfo__field__name}>Birthday:</p>
            <p className={styles.extraInfo__field__value}>
              {isEditing ? (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around" className={styles.datePicker}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM.dd.yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      value={birthday}
                      onChange={(value) =>
                        setBirthday(new Date(value ? value.toString() : ''))
                      }
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              ) : (
                <>
                  {format(new Date(client.user.birthday), 'MMMM dd, yyyy')}
                  {' ('}
                  {differenceInYears(new Date(), new Date(client.user.birthday))}
                  {' old)'}
                </>
              )}
            </p>
          </div>
        </div>
        <div className={styles.extraInfo__fieldsRow}>
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
                {client.user.additionalUserInfo
                  ? client.user.additionalUserInfo?.phoneNumber
                  : '-'}
              </p>
            )}
          </div>
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
                {client.user.additionalUserInfo
                  ? client.user.additionalUserInfo?.email
                  : '-'}
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
        {client.isSuccess ? renderMainInfo(client) : <Loader />}
        {client.isSuccess ? renderExtraInfo(client) : <Loader />}
      </div>
      <div className={styles.infoContainer}>
        {client.isSuccess ? renderOrders() : <Loader />}
      </div>
    </div>
  );
};

export default ClientDetails;
