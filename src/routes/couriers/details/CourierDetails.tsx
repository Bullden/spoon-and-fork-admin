import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useCourierDetailsActions, useOrderActions} from 'state/hooks/UseActions';
import {useSelector} from 'state/hooks';
import {Grid, Paper} from '@material-ui/core';
import styles from 'routes/couriers/details/CourierDetails.module.scss';
import InfoSummary from 'components/InfoSummary/InfoSummary';
import {Loader} from 'components';
import {DocumentsGroup, DocumentsGroups} from 'entities/Documents';
import Courier from 'entities/Courier';
import {useTranslation} from 'react-i18next';
import {AuthInfoKeeper} from 'auth';
import Order from 'entities/Order';
import Table from 'components/Table/Table';

// const changesRequestedStatusIcon = require('./assetsarrow-204-24.png');

const CourierDetails: React.FC = () => {
  const {t} = useTranslation(['courierDetails', 'orders']);
  const history = useHistory();
  const {courierId} = useParams<{courierId: string}>();
  const actions = useCourierDetailsActions();
  const {courier, groups} = useSelector((state) => state.courierDetails);
  const [openDocumentsPage, setOpenDocumentsPage] = useState(true);
  const [openOrdersHistoryPage, setOpenOrdersHistoryPage] = useState(false);

  useEffect(() => {
    actions.fetchCourierDetails(courierId);
  }, []);

  const renderDetails = (courier: Courier) => {
    return (
      <Grid container>
        <Grid className={styles.user} item>
          <p className={styles.user__name}>{courier.user.name}</p>
          <p className={styles.user__position}>{t('courier')}</p>
        </Grid>
        <Grid className={styles.details} item>
          <p>
            <span className={styles.details__fieldName}>{t('phone')}</span>
            {courier.user.additionalInfo?.phoneNumber}
          </p>
        </Grid>
        <Grid className={styles.details} item>
          <p>
            <span className={styles.details__fieldName}>{t('email')}</span>
            {courier.user.additionalInfo?.email}
          </p>
        </Grid>
      </Grid>
    );
  };

  const openDocuments = () => {
    setOpenDocumentsPage(true);
    setOpenOrdersHistoryPage(false);
    history.push(`/couriers/${courierId}/documents`);
  };

  const openOrdersHistory = () => {
    setOpenDocumentsPage(false);
    setOpenOrdersHistoryPage(true);
    history.push(`/couriers/${courierId}/ordersHistory`);
  };

  const renderDocumentsGroup = (
    groups: DocumentsGroups,
    title: string,
    group: DocumentsGroup,
  ) => {
    return (
      <>
        <h2 className={styles.documentName}>{title}</h2>
        <div className={styles.documentsImagesContainer}>
          {groups[group].map((document) => (
            <div className={styles.documentImageContainer}>
              <img
                key={document.id}
                className={styles.detailsContainer__paper__documentImage}
                src={document.image}
                alt="document"
              />
            </div>
          ))}
          {groups[group].length === 0 && (
            <>
              <div className={styles.defaultImage} />
              <div className={styles.defaultImage} />
            </>
          )}
          {groups[group].length === 1 && <div className={styles.defaultImage} />}
        </div>
      </>
    );
  };

  const renderDocumentsPage = () => {
    return (
      <Grid className={styles.detailsContainer__paper__info}>
        {groups && (
          <div className={styles.documentsList}>
            <div className={styles.documentsGroupsList}>
              {renderDocumentsGroup(groups, t('W4'), 'w4')}
              {renderDocumentsGroup(groups, t('carInsurance'), 'carInsurance')}
              {renderDocumentsGroup(groups, t('driversLicense'), 'driversLicense')}
            </div>
            <div className={styles.documentsGroupsList}>
              {renderDocumentsGroup(groups, t('licensePlate'), 'licensePlate')}
              {renderDocumentsGroup(groups, t('carRegistration'), 'carRegistration')}
            </div>
          </div>
        )}
      </Grid>
    );
  };

  useEffect(() => {
    AuthInfoKeeper.isAuthenticated().then((isAuthenticated) => {
      if (!isAuthenticated) {
        history.push('/auth');
      }
    });
  }, []);

  const orderActions = useOrderActions();

  useEffect(() => {
    orderActions.fetchOrders();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Orders',
        accessor: 'number',
      },
      {
        Header: 'Date',
        accessor: 'created',
      },
      {
        Header: 'Status',
        accessor: 'state',
      },
    ],
    [],
  );

  const data = useSelector((state) => state.orders);

  const renderOrdersHistoryPage = () => {
    // TODO: IMPLEMENT BETTER SOLUTION WITH TYPES
    const selectOrder = (order: Order) => {
      if (order.id) {
        orderActions.selectOrder(order.id);
      }
    };

    return (
      <div className={styles.container}>
        <Table
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          rowClick={selectOrder}
          columns={columns}
          data={
            data.isSuccess
              ? data.orders.filter((order) => order.courierId === courierId)
              : []
          }
        />
        {data.isSuccess &&
          data.orders &&
          data.orders.filter((order) => order.courierId === courierId).length === 0 && (
            <p className={styles.noOrders}>The courier has not yet taken any orders</p>
          )}
      </div>
    );
  };

  const renderExtraInfo = () => {
    return (
      <Grid container direction="column" className={styles.extraInfoContainer}>
        <Grid className={styles.tabs}>
          <button
            type="button"
            onClick={() => openDocuments()}
            className={openDocumentsPage ? styles.tabs__opened : styles.tabs__default}
          >
            Documents
          </button>
          <button
            type="button"
            onClick={() => openOrdersHistory()}
            className={openOrdersHistoryPage ? styles.tabs__opened : styles.tabs__default}
          >
            Orders history
          </button>
        </Grid>
        {openDocumentsPage && renderDocumentsPage()}
        {openOrdersHistoryPage && renderOrdersHistoryPage()}
      </Grid>
    );
  };

  return (
    <div className={styles.detailsContainer}>
      <Paper elevation={3} className={styles.detailsContainer__paper}>
        <InfoSummary>
          {courier.isSuccess ? renderDetails(courier) : <Loader />}
        </InfoSummary>
        <div>{courier.isSuccess ? renderExtraInfo() : <Loader />}</div>
      </Paper>
    </div>
  );
};

export default CourierDetails;
