import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useCourierDetailsActions, useOrderActions} from 'state/hooks/UseActions';
import {useSelector} from 'state/hooks';
import {Grid, Paper} from '@material-ui/core';
import styles from 'routes/couriers/details/CourierDetails.module.scss';
import InfoSummary from 'components/InfoSummary/InfoSummary';
import Avatar from 'components/Avatar/Avatar';
import {Loader} from 'components';
import {differenceInYears} from 'date-fns';
import {
  DocumentsGroup,
  DocumentsGroups,
  DocumentsRevision,
  DocumentsRevisionStatus,
  EvaluateDocumentsRevisionType,
} from 'entities/Documents';
import Courier from 'entities/Courier';
import {useTranslation} from 'react-i18next';
import {AuthInfoKeeper} from 'auth';
import Order from 'entities/Order';
import Table from 'components/Table/Table';

const newStatusIcon = require('./assets/newStatusIcon.png');
const verificationRequestedStatusIcon = require('./assets/verificationRequestedStatusIcon.png');
// const changesRequestedStatusIcon = require('./assetsarrow-204-24.png');
const approvedStatusIcon = require('./assets/approvedStatusIcon.png');
const rejectedStatusIcon = require('./assets/rejectedStatusIcon.png');

const CourierDetails: React.FC = () => {
  const {t} = useTranslation(['courierDetails', 'orders']);
  const history = useHistory();
  const {courierId} = useParams<{courierId: string}>();
  const actions = useCourierDetailsActions();
  const {courier, groups} = useSelector((state) => state.courierDetails);
  const [comment, setComment] = useState('');
  const [openDocumentsPage, setOpenDocumentsPage] = useState(true);
  const [openOrdersHistoryPage, setOpenOrdersHistoryPage] = useState(false);

  useEffect(() => {
    actions.fetchCourierDetails(courierId);
  }, []);

  const updateStatus = (type: EvaluateDocumentsRevisionType, comment: string) => {
    if (courier.isSuccess && courier.revision) {
      actions.evaluateDocumentsRevision(courier.id, type, comment);
    }
  };

  const renderFooter = (revision: DocumentsRevision) => {
    return (
      <div className={styles.detailsContainer__paper__footer}>
        <div className={styles.buttonContainer}>
          {revision.status !== DocumentsRevisionStatus.New ? (
            <>
              <input
                placeholder="Comments"
                value={comment}
                className={styles.commentField}
                onChange={(event) => setComment(event.target.value)}
              />
              <div>
                <button
                  className={styles.buttonAcceptCourier}
                  onClick={() => {
                    return updateStatus(EvaluateDocumentsRevisionType.Approve, comment);
                  }}
                  type="submit"
                >
                  {t('accept')}
                </button>
                <button
                  className={styles.buttonDeclineCourier}
                  onClick={() => {
                    return updateStatus(EvaluateDocumentsRevisionType.Reject, comment);
                  }}
                  type="submit"
                >
                  {t('decline')}
                </button>
              </div>
            </>
          ) : (
            <span>{t('waitVerificationCourier')}</span>
          )}
        </div>
      </div>
    );
  };

  const renderDetails = (courier: Courier) => {
    return (
      <Grid container>
        <Grid item className={styles.avatarContainer}>
          <Avatar url={courier.user.image} />
          <div className={styles.statusIcon}>
            {courier.revision?.status === 'New' && (
              <div className={styles.statusIcon__newStatusIcon}>
                {/* eslint-disable-next-line no-inline-styles/no-inline-styles */}
                <img src={newStatusIcon} alt="New" style={{width: 17, height: 17}} />
              </div>
            )}
            {courier.revision?.status === 'VerificationRequested' && (
              <div className={styles.statusIcon__verificationRequestedStatusIcon}>
                <img
                  src={verificationRequestedStatusIcon}
                  alt="Verification requested"
                  {/* eslint-disable-next-line no-inline-styles/no-inline-styles */}
                  style={{width: 6, height: 20}}
                />
              </div>
            )}
            {courier.revision?.status === 'ChangesRequested' && <img src="" alt="" />}
            {courier.revision?.status === 'Approved' && (
              <div className={styles.statusIcon__approvedStatusIcon}>
                <img
                  src={approvedStatusIcon}
                  alt="Approved"
                  style={{width: 17, height: 17, marginTop: 1}}
                />
              </div>
            )}
            {courier.revision?.status === 'Rejected' && (
              <div className={styles.statusIcon__rejectedStatusIcon}>
                <img
                  src={rejectedStatusIcon}
                  alt="Rejected"
                  style={{width: 15, height: 15}}
                />
              </div>
            )}
          </div>
        </Grid>
        <Grid className={styles.user} item>
          <p className={styles.user__name}>{courier.user.name}</p>
          <p className={styles.user__position}>{t('courier')}</p>
        </Grid>
        <Grid className={styles.details} item>
          <p>
            <span className={styles.details__fieldName}>{t('age')}</span>
            {differenceInYears(new Date(), new Date(courier.user.birthday))} years
          </p>
          <p>
            <span className={styles.details__fieldName}>{t('phone')}</span>
            {courier.user.additionalUserInfo?.phoneNumber}
          </p>
        </Grid>
        <Grid className={styles.details} item>
          <p>
            <span className={styles.details__fieldName}>{t('email')}</span>
            {courier.user.additionalUserInfo?.email}
          </p>
          <p>
            <span className={styles.details__fieldName}>{t('revisionStatus')}</span>
            {courier.revision?.status}
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

  const renderDocumentsPage = (courier: Courier) => {
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
        {courier.revision && renderFooter(courier.revision)}
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
          // @ts-ignore
          rowClick={selectOrder}
          columns={columns}
          data={
            data.isSuccess
              ? data.orders.filter(
                  (order) =>
                    order.secondCourierId === courierId ||
                    order.firstCourierId === courierId,
                )
              : []
          }
        />
        {data.isSuccess &&
          data.orders &&
          data.orders.filter(
            (order) =>
              order.secondCourierId === courierId || order.firstCourierId === courierId,
          ).length === 0 && (
            <p className={styles.noOrders}>The courier has not yet taken any orders</p>
          )}
      </div>
    );
  };

  const renderExtraInfo = (courier: Courier) => {
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
        {openDocumentsPage && renderDocumentsPage(courier)}
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
        <div>{courier.isSuccess ? renderExtraInfo(courier) : <Loader />}</div>
      </Paper>
    </div>
  );
};

export default CourierDetails;
