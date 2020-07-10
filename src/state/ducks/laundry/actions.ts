import {createAction} from 'redux-actions';
import types from './types';
import Laundry from 'entities/Laundry';

export default {
  fetchLaundries: createAction(types.FETCH_LAUNDRIES),
  fetchLaundriesCompleted: createAction<Laundry[]>(types.FETCH_LAUNDRIES_COMPLETED),
};
