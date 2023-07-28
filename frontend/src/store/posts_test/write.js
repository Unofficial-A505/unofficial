import { createAction, handleActions } from 'redux-actions';

const INITIALIZE = 'write/INITAILIZE';
const CHANGE_FIELD = 'write/CHANGE_FIELD';

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FILED, ({ key, value }) => ({
  key,
  value,
}))

const initialState = {
  title: '',
  body: '',
}


const write = handleActions(
  {
    [INITIALIZE]: state => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value }}) => ({
      ...state,
      [key]: value,
    }),
  }, initialState,
)

export default write;