// build environment convenience data

const isProduction = (process.env.NODE_ENV === 'production');

export default {
  prod: isProduction,
  dev: !isProduction
};
