import React, {useEffect} from 'react';
import {useCuisineActions, useCuisineDetailsActions} from 'state/hooks/UseActions';
import styles from 'routes/cuisines/Cuisines.module.scss';
import {useSelector} from 'state/hooks';
import {useHistory, useParams} from 'react-router-dom';
import {AuthInfoKeeper} from 'auth';
import Cuisine from 'entities/Cuisine';
import {Field, Form, Formik} from 'formik';
import {TextField} from 'components';
import {useTranslation} from 'react-i18next';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

interface CuisineFormValues {
  uploadFile: string;
  nationality: string;
  count: string;
  rating: string;
}

const Cuisines: React.FC = () => {
  const actions = useCuisineDetailsActions();
  const history = useHistory();
  const {t} = useTranslation('cuisine');

  const [isError, setError] = React.useState(false);
  const [isReady, setReady] = React.useState(true);
  const [isUniqueNationality, setUniqueNationality] = React.useState(true);

  const initialValues: CuisineFormValues = {
    uploadFile: '',
    nationality: '',
    count: '',
    rating: '',
  };

  useEffect(() => {
    AuthInfoKeeper.isAuthenticated().then((isAuthenticated) => {
      if (!isAuthenticated) {
        history.push('/auth');
      }
    });
  }, []);

  const cuisineActions = useCuisineActions();
  const cuisineDetailsActions = useCuisineDetailsActions();

  useEffect(() => {
    cuisineActions.fetchCuisines();
  }, []);

  const openCreateCuisine = () => {
    history.push('/cuisines/create');
    setError(false);
  };

  const {id} = useParams<{id: string | undefined}>();

  const data = useSelector((state) => state.cuisines);

  useEffect(() => {
    if (id) cuisineDetailsActions.fetchCuisineDetails(id);
  }, [id]);

  const openCuisine = (cuisine: Cuisine) => {
    setError(false);
    history.push(`/cuisines/${cuisine.id}`);
  };

  const cuisines = () => {
    return data ? (
      <List component="nav" aria-label="main mailbox folders" className={styles.list}>
        {data.isSuccess &&
          data.cuisines.map((cuisine: Cuisine) => (
            <ListItem
              key={cuisine.id}
              button
              selected={id === cuisine.id}
              onClick={() => openCuisine(cuisine)}
              className={styles.button}
            >
              <ListItemText primary={cuisine.nationality} />
            </ListItem>
          ))}
        <ListItem
          key="create"
          button
          selected={id === undefined}
          onClick={() => openCreateCuisine()}
          className={styles.button}
        >
          <ListItemText primary="+ create new cuisine" />
        </ListItem>
      </List>
    ) : (
      <List component="nav" aria-label="main mailbox folders">
        <ListItem
          key="create"
          button
          selected={id === undefined}
          onClick={() => openCreateCuisine()}
          className={styles.button}
        >
          <ListItemText primary="+ create new cuisine" />
        </ListItem>
      </List>
    );
  };

  const nationalityUniquenessCheck = (cuisine: Cuisine, nationality: string) =>
    cuisine.nationality !== nationality;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const save = (values: CuisineFormValues) => {
    setError(false);
    setUniqueNationality(true);
    setReady(true);

    if (id === undefined && data.isSuccess) {
      if (values.uploadFile && values.nationality && values.count && values.rating) {
        if (
          data.cuisines.every((cuisine: Cuisine) =>
            nationalityUniquenessCheck(cuisine, values.nationality),
          )
        ) {
          return actions.updateCuisine({id: '', ...values});
        }
      } else {
        setReady(false);
      }

      data.cuisines.forEach((cuisine: Cuisine) => {
        if (cuisine.nationality === values.nationality) {
          setUniqueNationality(false);
        }
      });

      setError(true);
    }

    if (id && values.uploadFile && values.nationality && values.count && values.rating) {
      return actions.updateCuisine({id, ...values});
    }
  };

  return (
    <div className={styles.pageContentContainer}>
      <div className={styles.mainContentHeader}>
        <h2 className={styles.pagesContainerTitle}>Cuisines</h2>
      </div>
      <div className={styles.container}>
        {cuisines()}
        <div className={styles.editorContainer}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, formActions) => {
              if (data && data.isSuccess) save(values);
              formActions.setSubmitting(false);
            }}
          >
            <Form className={styles.form}>
              <Field
                variant="outlined"
                margin="normal"
                fullWidth
                id="uploadFile"
                name="uploadFile"
                as={TextField}
                type="file"
              />
              <Field
                variant="outlined"
                fullWidth
                margin="normal"
                id="nationality"
                name="nationality"
                type="nationality"
                as={TextField}
                label={t('nationality')}
                className={styles.form__field}
              />
              <Field
                variant="outlined"
                margin="normal"
                fullWidth
                name="count"
                label={t('count')}
                type="count"
                id="count"
                as={TextField}
                className={styles.form__field}
              />
              <Field
                variant="outlined"
                margin="normal"
                fullWidth
                name="rating"
                label={t('rating')}
                type="rating"
                id="rating"
                as={TextField}
                className={styles.form__field}
              />
              <div className={styles.buttons}>
                <button className={styles.saveButton} type="submit">
                  Save
                </button>
              </div>
              {isError && (
                <div className={styles.errorMessages}>
                  {!isReady && <p>All fields must be filled</p>}
                  {!isUniqueNationality && <p>The nationality must be unique</p>}
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Cuisines;
