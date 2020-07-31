import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDishActions, useDishDetailsActions} from 'state/hooks/UseActions';
import styles from 'routes/dishes/Dishes.module.scss';
import {useSelector} from 'state/hooks';
import {useHistory, useParams} from 'react-router-dom';
import {AuthInfoKeeper} from 'auth';
import Dish from 'entities/Dish';
import {Field, Form, Formik} from 'formik';
import {TextField} from 'components';
import {useTranslation} from 'react-i18next';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Logo} from 'assets';
import {DropzoneArea} from 'material-ui-dropzone';

interface DishFormValues {
  name: string;
  description: string;
  weight: string;
  kal: string;
}

const Dishes: React.FC = () => {
  const actions = useDishDetailsActions();
  const history = useHistory();
  const {t} = useTranslation('dish');

  const [file, setFile] = useState<File>();
  const [ingredients, setIngredients] = useState<string>('');
  const [isError, setError] = React.useState(false);
  const [isReady, setReady] = React.useState(true);
  const [isUniqueNationality, setUniqueNationality] = React.useState(true);

  useEffect(() => {
    AuthInfoKeeper.isAuthenticated().then((isAuthenticated) => {
      if (!isAuthenticated) {
        history.push('/auth');
      }
    });
  }, []);

  const dishActions = useDishActions();
  const dishDetailsActions = useDishDetailsActions();

  useEffect(() => {
    dishActions.fetchDishes();
  }, []);

  const openCreateDish = () => {
    history.push('/dishes/create');
    setError(false);
  };

  const {id} = useParams<{id: string | undefined}>();

  const data = useSelector((state) => state.dishes);

  const initialValues: DishFormValues =
    id && data.isSuccess
      ? data.dishes
          .filter((dish) => dish.id === id)
          .map((item) => {
            return {
              name: item.name,
              description: item.description,
              weight: item.weight,
              kal: item.kal,
            };
          })[0]
      : {
          name: '',
          description: '',
          weight: '',
          kal: '',
        };

  useEffect(() => {
    if (id) dishDetailsActions.fetchDishDetails(id);
  }, [id]);

  const openDish = (dish: Dish) => {
    setError(false);
    setIngredients(dish.ingredients.map((ingredient) => ingredient.name).join(', '));
    history.push(`/dishes/${dish.id}`);
  };

  const dishes = () => {
    return data ? (
      <List component="nav" aria-label="main mailbox folders" className={styles.list}>
        {data.isSuccess &&
          data.dishes.map((dish: Dish) => (
            <ListItem
              key={dish.id}
              button
              selected={id === dish.id}
              onClick={() => openDish(dish)}
              className={styles.button}
            >
              <ListItemText primary={dish.name} />
            </ListItem>
          ))}
        <ListItem
          key="create"
          button
          selected={id === undefined}
          onClick={() => openCreateDish()}
          className={styles.button}
        >
          <ListItemText primary="+ create new dish" />
        </ListItem>
      </List>
    ) : (
      <List component="nav" aria-label="main mailbox folders">
        <ListItem
          key="create"
          button
          selected={id === undefined}
          onClick={() => openCreateDish()}
          className={styles.button}
        >
          <ListItemText primary="+ create new dish" />
        </ListItem>
      </List>
    );
  };

  const nameUniquenessCheck = (dish: Dish, nationality: string) =>
    dish.name !== nationality;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const save = (values: DishFormValues) => {
    setError(false);
    setUniqueNationality(true);
    setReady(true);

    if (id === undefined && data.isSuccess) {
      if (
        file &&
        values.name &&
        values.description &&
        values.weight &&
        values.kal &&
        ingredients
      ) {
        if (data.dishes.every((dish: Dish) => nameUniquenessCheck(dish, values.name))) {
          return actions.createDish({
            ...values,
            uploadFile: file,
            ingredients: ingredients.split(', '),
          });
        }
      } else {
        setReady(false);
      }

      data.dishes.forEach((dish: Dish) => {
        if (dish.name === values.name) {
          setUniqueNationality(false);
        }
      });

      setError(true);
    }

    if (
      id &&
      values.name &&
      values.description &&
      values.weight &&
      values.kal &&
      ingredients &&
      data.isSuccess
    ) {
      return actions.updateDish({
        id,
        ...values,
        uploadFile: file || data.dishes.filter((dish) => dish.id === id)[0].image,
        ingredients: ingredients.split(', '),
      });
    }
  };

  return (
    <div className={styles.pageContentContainer}>
      <div className={styles.mainContentHeader}>
        <h2 className={styles.pagesContainerTitle}>Dishes</h2>
      </div>
      <div className={styles.container}>
        {dishes()}
        <div className={styles.editorContainer}>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={(values, formActions) => {
              if (data && data.isSuccess) save(values);
              formActions.setSubmitting(false);
            }}
          >
            <Form className={styles.form}>
              <div className={styles.dropdownContainer}>
                {id ? (
                  data.isSuccess &&
                  data.dishes
                    .filter((dish) => dish.id === id)
                    .map((item) => (
                      <div className={styles.imageContainer}>
                        <div className={styles.imageWrapper}>
                          <img className={styles.image} src={item.image} alt="Cuisine" />
                        </div>
                      </div>
                    ))[0]
                ) : (
                  <div className={styles.imageContainer}>
                    <div className={styles.imageWrapper}>
                      <img className={styles.image} src={Logo} alt="Cuisine" />
                    </div>
                  </div>
                )}
                <DropzoneArea
                  filesLimit={1}
                  onChange={(files: File[]) => {
                    setFile(files[0]);
                  }}
                  initialFiles={[]}
                />
              </div>
              <Field
                variant="outlined"
                fullWidth
                margin="normal"
                id="name"
                name="name"
                type="name"
                as={TextField}
                label={t('name')}
                className={styles.form__field}
              />
              <Field
                variant="outlined"
                margin="normal"
                fullWidth
                name="description"
                label={t('description')}
                type="description"
                id="description"
                as={TextField}
                className={styles.form__field}
              />
              <Field
                variant="outlined"
                margin="normal"
                fullWidth
                name="weight"
                label={t('weight')}
                type="weight"
                id="weight"
                as={TextField}
                className={styles.form__field}
              />
              <Field
                variant="outlined"
                margin="normal"
                fullWidth
                name="kal"
                label={t('kal')}
                type="kal"
                id="kal"
                as={TextField}
                className={styles.form__field}
              />
              <Field
                variant="outlined"
                margin="normal"
                fullWidth
                name="ingredients"
                label={t('ingredients')}
                id="ingredients"
                as={TextField}
                className={styles.form__field}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setIngredients(event.target.value);
                }}
                value={ingredients}
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

export default Dishes;
