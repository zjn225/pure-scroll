import pureScroll from './pure-scroll/index';
import './pure-scroll/index.scss';
import './icon/loading.scss';
import './utils/rem'

export default {
  install (Vue, options = {}) {
    Vue.component('pure-scroll', pureScroll);
  }
};

