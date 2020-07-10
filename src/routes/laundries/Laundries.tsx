import React, {useEffect} from 'react';
import {useLaundryActions} from 'state/hooks/UseActions';
import styles from './Laundries.module.scss';
import {useSelector} from 'state/hooks';
import Table from 'components/Table/Table';
import Laundry from 'entities/Laundry';
import {useHistory} from 'react-router-dom';
import {AuthInfoKeeper} from 'auth';
import {useTranslation} from 'react-i18next';

const Laundries: React.FC = () => {
  const {t} = useTranslation('laundries');
  const history = useHistory();

  useEffect(() => {
    AuthInfoKeeper.isAuthenticated().then((isAuthenticated) => {
      if (!isAuthenticated) {
        history.push('/auth');
      }
    });
  }, []);

  const laundryActions = useLaundryActions();

  const columns = React.useMemo(
    () => [
      {
        Header: t('title'),
        accessor: 'title',
      },
      {
        Header: t('contactPerson'),
        accessor: 'contactPerson',
      },
      {
        Header: t('address'),
        accessor: 'address.description',
      },
    ],
    [],
  );

  useEffect(() => {
    laundryActions.fetchLaundries();
  }, []);

  // TODO: IMPLEMENT BETTER SOLUTION WITH TYPES
  const selectLaundry = (laundry: Laundry) => {
    if (laundry.id) {
      laundryActions.selectLaundry(laundry.id);
    }
  };

  const data = useSelector((state) => state.laundries);

  return (
    <div className={styles.container}>
      <Table
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        rowClick={selectLaundry}
        columns={columns}
        data={data.isSuccess ? data.laundries : []}
      />
    </div>
  );
};

export default Laundries;
