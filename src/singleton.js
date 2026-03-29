// class Singleton {
//   constructor() {
//     this.name = '单例模式'
//   }
//   method() {}
// }

// export default new Singleton();

// export class Singleton {
//   constructor() {
//     if (Singleton.instance) {
//       return Singleton.instance;
//     }
//     Singleton.instance = this;
//     this.name = '单例模式'
//   }
//   method() {}
// }

export const Singleton = (function () {
  let instance; // 私有变量，保存唯一实例

  function init() {
    // 私有属性和方法
    return {
      name: '单例实例',
      method() {
        console.log('方法调用');
      },
    };
  }

  return {
    getInstance() {
      if (!instance) {
        instance = init();
      }
      return instance;
    },
  };
})();
