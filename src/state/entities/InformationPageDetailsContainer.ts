import InformationPage from 'entities/InformationPage';
import {LoadableContainer} from 'state/entities/LoadableContainer';

export interface InformationPageDetailsContainer {
  informationPage: LoadableContainer<InformationPage>;
}
