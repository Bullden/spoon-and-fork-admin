import React, {useEffect} from 'react';
import {useCourierActions} from 'state/hooks/UseActions';
import styles from './Couriers.module.scss';
import {useSelector} from 'state/hooks';
import Table from 'components/Table/Table';
import Courier from 'entities/Courier';
import {useHistory} from 'react-router-dom';
import {AuthInfoKeeper} from 'auth';
import {useTranslation} from 'react-i18next';

const Couriers: React.FC = () => {
  const {t} = useTranslation('courier');
  const history = useHistory();

  useEffect(() => {
    AuthInfoKeeper.isAuthenticated().then((isAuthenticated) => {
      if (!isAuthenticated) {
        history.push('/auth');
      }
    });
  }, []);

  const courierActions = useCourierActions();

  const columns = React.useMemo(
    () => [
      {
        Header: t('name'),
        accessor: 'user.name',
      },
      {
        Header: t('phone'),
        accessor: 'user.additionalInfo.phoneNumber',
      },
      {
        Header: t('email'),
        accessor: 'user.additionalInfo.email',
      },
    ],
    [],
  );

  useEffect(() => {
    courierActions.fetchCouriers();
  }, []);

  // TODO: IMPLEMENT BETTER SOLUTION WITH TYPES
  const selectCourier = (courier: Courier) => {
    if (courier.id) {
      courierActions.selectCourier(courier.id);
    }
  };

  const data = useSelector((state) => state.couriers);

  return (
    <div className={styles.container}>
      <Table
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        rowClick={selectCourier}
        columns={columns}
        data={data.isSuccess ? data.couriers : []}
      />
    </div>
  );
};

export default Couriers;
