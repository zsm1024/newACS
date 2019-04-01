import axios from 'axios';
import Mock from 'mockjs'
import loginAPI from './data/login'
import MoveApi from './data/list';

export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
    Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
    Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

    Mock.mock(/\/move\/inlist\.*/, 'get', MoveApi.list)
    Mock.mock(/\/table\/personlist\.*/, 'post', MoveApi.personlist)
    
  }

}
