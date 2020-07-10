import Laundry from 'entities/Laundry';
import {LoadableContainer} from 'state/entities/LoadableContainer';

export interface LaundryDetailsContainer {
  laundry: LoadableContainer<Laundry>;
}
