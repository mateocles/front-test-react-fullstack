import { takeLatest, all } from 'redux-saga/effects';
import { message } from 'antd';
import Api from '../../common/Api/Api';
import {auth} from './AuthActions';



function* signup(data) {  
  const { auth: body, callback } = data.payload
  const response = yield Api.post('/auth/signup', body)
  if (response.ok) {
    message.success('Se creó el usuario con éxito.')
    yield callback()
  } else message.error('No se creó el usuario con éxito.')
}

function* ActionWatcher() {
  yield takeLatest(auth.signup, signup)
}

export default function* rootSaga() {
  yield all([
    ActionWatcher(),
  ]);
}