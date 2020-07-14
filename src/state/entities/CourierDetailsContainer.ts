import Courier from 'entities/Courier';
import {LoadableContainer} from 'state/entities/LoadableContainer';

export interface CourierDetailsContainer {
  courier: LoadableContainer<Courier>;
}
