import anime from 'theme-shokax-anime'
import { siteNavHeight } from '../globals/globalVars'

/**
 * 参数  动画效果
 * 0  元素逐渐消失
 * 1  元素逐渐出现
 * bounceUpIn  元素从下方弹跳出现
 * shrinkIn  元素从放大到正常大小出现
 * slideRightIn  元素从右侧滑入
 * slideRightOut  元素向右侧滑出
 * TODO 函数功能过于复杂，需要拆分
 */
export const transition = (target: HTMLElement, type: number|string|Function, complete?: Function, begin?: Function): void => {
  let animation
  let display = 'none'
  switch (type) {
    case 0:
      animation = { opacity: [1, 0] }
      break
    case 1:
      animation = { opacity: [0, 1] }
      display = 'block'
      break
    case 'bounceUpIn':
      animation = {
        begin (anim) {
          target.display('block')
        },
        translateY: [
          { value: -60, duration: 200 },
          { value: 10, duration: 200 },
          { value: -5, duration: 200 },
          { value: 0, duration: 200 }
        ],
        opacity: [0, 1]
      }
      display = 'block'
      break
    case 'shrinkIn':
      animation = {
        begin (anim) {
          target.display('block')
        },
        scale: [
          { value: 1.1, duration: 300 },
          { value: 1, duration: 200 }
        ],
        opacity: 1
      }
      display = 'block'
      break
    case 'slideRightIn':
      animation = {
        begin (anim) {
          target.display('block')
        },
        translateX: ['100%', '0%'],
        opacity: [0, 1]
      }
      display = 'block'
      break
    case 'slideRightOut':
      animation = {
        translateX: ['0%', '100%'],
        opacity: [1, 0]
      }
      break
    default:
      animation = type
      // @ts-ignore
      display = type.display
      break
  }
  anime(Object.assign({
    targets: target,
    duration: 200,
    easing: 'linear',
    begin () {
      begin && begin()
    },
    complete () {
      target.display(display)
      complete && complete()
    }
  }, animation)).play()
}

export const pageScroll = (target: any, offset?: number, complete?: Function) => {
  // target: 滚动到的目标元素或坐标(number)
  // offset: 可选的偏移量
  // complete: 可选的回调函数，在动画完成时调用
  const opt = {
    // 动画目标
    targets: typeof offset === 'number' ? target.parentNode : document.scrollingElement,
    // 动画持续时间
    duration: 500,
    // 动画缓动函数
    easing: 'easeInOutQuad',
    // 如果 offset 存在，则滚动到 offset，如果 target 是数字，则滚动到 target，如果 target 是 DOM 元素，则滚动到下述表达式
    scrollTop: offset || (typeof target === 'number' ? target : (target ? target.getTop() + document.documentElement.scrollTop - siteNavHeight : 0)),
    // 完成回调函数
    complete () {
      complete && complete()
    }
  }
  anime(opt).play()
  // 调用 anime.js 函数，并传入参数
}
