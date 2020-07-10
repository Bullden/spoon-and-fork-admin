import React, {useEffect, useState} from 'react';
import {
  useInformationPageActions,
  useInformationPageDetailsActions,
} from 'state/hooks/UseActions';
import styles from 'routes/informationPages/InformationPages.module.scss';
import {useSelector} from 'state/hooks';
import {useHistory, useParams} from 'react-router-dom';
import {AuthInfoKeeper} from 'auth';
import InformationPage from 'entities/InformationPage';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import PhoneHeader from './assets/PhoneHeader.png';
import Markdown from 'markdown-to-jsx';
import {Field, Form, Formik} from 'formik';
import {TextField} from 'components';
import {useTranslation} from 'react-i18next';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

interface InformationPagesFormValues {
  key: string;
  title: string;
  body: string;
}

const editorStyles = {
  height: '500px',
  width: '100%',
};

const mdParser = new MarkdownIt();

const date = new Date();

const InformationPages: React.FC = () => {
  const actions = useInformationPageDetailsActions();
  const history = useHistory();
  const {t} = useTranslation('pages');

  const [key, setKey] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedId, setSelectedId] = React.useState('');
  const [isError, setError] = React.useState(false);
  const [isReady, setReady] = React.useState(true);
  const [isUniqueKey, setUniqueKey] = React.useState(true);

  const initialValues: InformationPagesFormValues = {
    key: '',
    title: '',
    body: '',
  };

  useEffect(() => {
    AuthInfoKeeper.isAuthenticated().then((isAuthenticated) => {
      if (!isAuthenticated) {
        history.push('/auth');
      }
    });
  }, []);

  const informationPageActions = useInformationPageActions();
  const informationPageDetailsActions = useInformationPageDetailsActions();

  useEffect(() => {
    informationPageActions.fetchInformationPages();
  }, []);

  const openCreateInformationPage = () => {
    setKey('');
    setTitle('');
    setBody('');
    setSelectedId('');
    history.push('/informationPages/create');
    setError(false);
  };

  const {id} = useParams<{id: string | undefined}>();

  const data = useSelector((state) => state.informationPages);

  useEffect(() => {
    if (id) informationPageDetailsActions.fetchInformationPageDetails(id);
  }, [id]);

  const openInformationPage = (page: InformationPage) => {
    setKey(page.key);
    setTitle(page.title);
    setBody(page.body);
    setSelectedId(page.id);
    setError(false);
    history.push(`/informationPages/${page.id}`);
  };

  const pages = () => {
    return data ? (
      <List component="nav" aria-label="main mailbox folders" className={styles.list}>
        {data.isSuccess &&
          data.informationPages.map((page: InformationPage) => (
            <ListItem
              key={page.id}
              button
              selected={selectedId === page.id}
              onClick={() => openInformationPage(page)}
              className={styles.button}
            >
              <ListItemText primary={page.title} />
            </ListItem>
          ))}
        <ListItem
          key="create"
          button
          selected={selectedId === ''}
          onClick={() => openCreateInformationPage()}
          className={styles.button}
        >
          <ListItemText primary="+ create new page" />
        </ListItem>
      </List>
    ) : (
      <List component="nav" aria-label="main mailbox folders">
        <ListItem
          key="create"
          button
          selected={selectedId === ''}
          onClick={() => openCreateInformationPage()}
          className={styles.button}
        >
          <ListItemText primary="+ create new page" />
        </ListItem>
      </List>
    );
  };

  const handleEditorChange = (it: {text: string}) => {
    setBody(it.text);
  };

  const handleImageUpload = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (data) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        resolve(data.target.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const keyUniquenessCheck = (infoPage: InformationPage, key: string) =>
    infoPage.key !== key;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const save = (data: any) => {
    setError(false);
    setUniqueKey(true);
    setReady(true);

    if (id === undefined) {
      if (key && title && body) {
        if (
          data.informationPages.every((page: InformationPage) =>
            keyUniquenessCheck(page, key),
          )
        ) {
          return actions.createOrUpdateInformationPage({key, title, body});
        }
      } else {
        setReady(false);
      }

      data.informationPages.forEach((page: InformationPage) => {
        if (page.key === key) {
          setUniqueKey(false);
        }
      });

      setError(true);
    }

    if (id && key && title && body) {
      return actions.createOrUpdateInformationPage({key, title, body});
    }
  };

  return (
    <div className={styles.pageContentContainer}>
      <div className={styles.mainContentHeader}>
        <h2 className={styles.pagesContainerTitle}>Pages</h2>
      </div>
      <div className={styles.container}>
        {pages()}
        <div className={styles.editorContainer}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, formActions) => {
              if (data && data.isSuccess) save(data);
              formActions.setSubmitting(false);
            }}
          >
            <Form className={styles.form}>
              <Field
                variant="outlined"
                fullWidth
                id="keyword"
                name="keyword"
                type="keyword"
                as={TextField}
                label={t('keyword')}
                className={styles.form__field}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  return setKey(e.target.value);
                }}
                value={key}
              />
              <Field
                variant="outlined"
                fullWidth
                name="title"
                label={t('title')}
                type="title"
                id="title"
                as={TextField}
                className={styles.form__field}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  return setTitle(e.target.value);
                }}
                value={title}
              />
              <MdEditor
                value={body}
                renderHTML={(text) => mdParser.render(text)}
                style={editorStyles}
                config={{
                  view: {
                    menu: true,
                    md: true,
                    hideMenu: true,
                    linkify: true,
                    typographer: true,
                  },
                  syncScrollMode: ['leftFollowRight', 'rightFollowLeft'],
                }}
                onChange={handleEditorChange}
                onImageUpload={handleImageUpload}
              />
              <div className={styles.buttons}>
                <button className={styles.saveButton} type="submit">
                  Save
                </button>
              </div>
              {isError && (
                <div className={styles.errorMessages}>
                  {!isReady && <p>All fields must be filled</p>}
                  {!isUniqueKey && <p>The key must be unique</p>}
                </div>
              )}
            </Form>
          </Formik>
        </div>
        <div className={styles.phonePreviewContainer}>
          <h3 className={styles.containerName}>Preview</h3>
          <div className={styles.phone}>
            <p className={styles.time}>
              {`
              ${date.getHours()}:
              ${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`}
            </p>
            <img src={PhoneHeader} alt="Phone" className={styles.phoneHeader} />
            <div className={styles.textPreview}>
              <h1>{title}</h1>
              <Markdown>{body}</Markdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationPages;
