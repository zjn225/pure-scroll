import pureScroll from '../packages/pure-scroll/index';
import { mount } from '@vue/test-utils';
import { trigger } from './utils/event';

// 下拉测试
test('pull refresh', () => {
  const wrapper = mount(pureScroll, {
    propsData: {
      onRefresh: (done) => { done() },
    },
  });
  const track = wrapper.find('.pure-scroll');

  // pulling
  trigger(track, 'touchstart', 0, 0);
  trigger(track, 'touchmove', 0, 20);
  expect(wrapper.vm.$el).toMatchSnapshot();
  

  // loosing
  trigger(track, 'touchmove', 0, 75);
  trigger(track, 'touchmove', 0, 100);
  expect(wrapper.vm.$el).toMatchSnapshot();

  // loading
  trigger(track, 'touchend', 0, 100);
  expect(wrapper.vm.$el).toMatchSnapshot();

});