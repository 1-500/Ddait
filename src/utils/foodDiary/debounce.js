export const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    const context = this;

    clearTimeout(timeoutId);

    // 새로운 타임아웃 설정
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
};
