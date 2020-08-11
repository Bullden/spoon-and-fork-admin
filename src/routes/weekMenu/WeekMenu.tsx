import React, {useEffect, useState} from 'react';
import {useCuisineActions, useSetActions} from 'state/hooks/UseActions';
import styles from 'routes/weekMenu/WeekMenu.module.scss';
import {useSelector} from 'state/hooks';
import {useHistory, useParams} from 'react-router-dom';
import {AuthInfoKeeper} from 'auth';
import Cuisine from 'entities/Cuisine';
import Set from 'entities/Set';
import {Loader} from 'components';
import {useTranslation} from 'react-i18next';
import {List, ListItem} from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';

const WeekMenu: React.FC = () => {
  const history = useHistory();
  const {t} = useTranslation('cuisine');

  const [setIdsAndDays, setSetIdsAndDays] = useState<{setId: string; day: string}[]>([]);
  const [setIds, setSetIds] = useState<string[]>([]);

  useEffect(() => {
    AuthInfoKeeper.isAuthenticated().then((isAuthenticated) => {
      if (!isAuthenticated) {
        history.push('/auth');
      }
    });
  }, []);

  const cuisineActions = useCuisineActions();
  const setActions = useSetActions();

  useEffect(() => {
    setSetIds([]);
    setSetIdsAndDays([]);
    cuisineActions.fetchCuisines();
  }, []);

  const {id} = useParams<{id: string | undefined}>();

  const {cuisines, sets} = useSelector((state) => state);

  useEffect(() => {
    setSetIds([]);
    setSetIdsAndDays([]);
    if (id) setActions.fetchSetsByCuisineId(id);
  }, [id]);

  const setSelectedSetToState = (set: Set) => {
    if (setIds.includes(set.id)) {
      setSetIds(setIds.filter((item) => item !== set.id));
    } else {
      setSetIds([...setIds, set.id]);
    }

    if (
      setIdsAndDays.filter((item) => item.setId !== set.id).length ===
        setIdsAndDays.length &&
      set.day
    ) {
      setSetIdsAndDays([...setIdsAndDays, {setId: set.id, day: set.day}]);
    } else {
      setSetIdsAndDays(setIdsAndDays.filter((item) => item.setId !== set.id));
    }
  };

  const openCuisineWeekMenu = (cuisine: Cuisine) => {
    history.push(`/weekMenu/cuisine/${cuisine.id}`);
    if (id && sets.isSuccess) {
      sets.sets.forEach((set) => {
        if (set.day !== undefined) {
          setSelectedSetToState(set);
        }
      });
    }
  };

  const cuisinesList = (cuisines: Cuisine[]) => {
    return (
      <List component="nav" aria-label="main mailbox folders" className={styles.list}>
        {cuisines.map((cuisine: Cuisine) => (
          <ListItem
            key={cuisine.id}
            button
            selected={id === cuisine.id}
            onClick={() => openCuisineWeekMenu(cuisine)}
            className={styles.button}
          >
            <ListItemText primary={cuisine.nationality} />
          </ListItem>
        ))}
      </List>
    );
  };

  const save = () => {
    return setActions.distributeSetsByDays(setIdsAndDays);
  };

  return (
    <div className={styles.content}>
      <div className={styles.pageContentContainer}>
        <div className={styles.mainContentHeader}>
          <h2 className={styles.pagesContainerTitle}>{t('cuisines')}</h2>
        </div>
        <div className={styles.container}>
          <div className={styles.listContainer}>
            {cuisines.isSuccess ? cuisinesList(cuisines.cuisines) : <Loader />}
          </div>
        </div>
      </div>
      <div>
        <div className={styles.editorContainer}>
          <div className={styles.mainContentHeader}>
            <h2 className={styles.pagesContainerTitle}>Sets by day of the week</h2>
          </div>
          <div className={styles.weekTable}>
            <div>
              <div className={styles.weekDay}>
                <span>Sunday</span>
              </div>
              {sets.isSuccess &&
                sets.sets
                  .filter((item) => item.day === 'Sunday' || item.day === null)
                  .map((set) => (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                    <div
                      className={
                        setIds.includes(set.id)
                          ? styles.selectList__selectedItem
                          : styles.selectList__item
                      }
                      onClick={() => setSelectedSetToState(set)}
                    >
                      <span>{set.name}</span>
                    </div>
                  ))}
            </div>
            <div>
              <div className={styles.weekDay}>
                <span>Monday</span>
              </div>
              {sets.isSuccess &&
                sets.sets
                  .filter((item) => item.day === 'Monday' || item.day === null)
                  .map((set) => (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                    <div
                      className={
                        setIds.includes(set.id)
                          ? styles.selectList__selectedItem
                          : styles.selectList__item
                      }
                      onClick={() => setSelectedSetToState(set)}
                    >
                      <span>{set.name}</span>
                    </div>
                  ))}
            </div>
            <div>
              <div className={styles.weekDay}>
                <span>Tuesday</span>
              </div>
              {sets.isSuccess &&
                sets.sets
                  .filter((item) => item.day === 'Tuesday' || item.day === null)
                  .map((set) => (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                    <div
                      className={
                        setIds.includes(set.id)
                          ? styles.selectList__selectedItem
                          : styles.selectList__item
                      }
                      onClick={() => setSelectedSetToState(set)}
                    >
                      <span>{set.name}</span>
                    </div>
                  ))}
            </div>
            <div>
              <div className={styles.weekDay}>
                <span>Wednesday</span>
              </div>
              {sets.isSuccess &&
                sets.sets
                  .filter((item) => item.day === 'Wednesday' || item.day === null)
                  .map((set) => (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                    <div
                      className={
                        setIds.includes(set.id)
                          ? styles.selectList__selectedItem
                          : styles.selectList__item
                      }
                      onClick={() => setSelectedSetToState(set)}
                    >
                      <span>{set.name}</span>
                    </div>
                  ))}
            </div>
            <div>
              <div className={styles.weekDay}>
                <span>Thursday</span>
              </div>
              {sets.isSuccess &&
                sets.sets
                  .filter((item) => item.day === 'Thursday' || item.day === null)
                  .map((set) => (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                    <div
                      className={
                        setIds.includes(set.id)
                          ? styles.selectList__selectedItem
                          : styles.selectList__item
                      }
                      onClick={() => setSelectedSetToState(set)}
                    >
                      <span>{set.name}</span>
                    </div>
                  ))}
            </div>
            <div>
              <div className={styles.weekDay}>
                <span>Friday</span>
              </div>
              {sets.isSuccess &&
                sets.sets
                  .filter((item) => item.day === 'Friday' || item.day === null)
                  .map((set) => (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                    <div
                      className={
                        setIds.includes(set.id)
                          ? styles.selectList__selectedItem
                          : styles.selectList__item
                      }
                      onClick={() => setSelectedSetToState(set)}
                    >
                      <span>{set.name}</span>
                    </div>
                  ))}
            </div>
            <div>
              <div className={styles.weekDay}>
                <span>Saturday</span>
              </div>
              {sets.isSuccess &&
                sets.sets
                  .filter((item) => item.day === 'Saturday' || item.day === null)
                  .map((set) => (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                    <div
                      className={
                        setIds.includes(set.id)
                          ? styles.selectList__selectedItem
                          : styles.selectList__item
                      }
                      onClick={() => setSelectedSetToState(set)}
                    >
                      <span>{set.name}</span>
                    </div>
                  ))}
            </div>
          </div>
          <div className={styles.buttons}>
            <button
              className={styles.saveButton}
              type="submit"
              onClick={() => id && cuisines.isSuccess && save()}
            >
              {t('save')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekMenu;
