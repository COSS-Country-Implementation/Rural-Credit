module.exports = {
  presets: [
    'module:@react-native/babel-preset',
    ['@babel/preset-typescript', {
      allowNamespaces: true,
      allowDeclareFields: true
    }]
  ],
  plugins: [
    ['@babel/plugin-transform-react-jsx', {
      runtime: 'classic'
    }],
    '@babel/plugin-transform-private-methods',
    '@babel/plugin-transform-class-properties'
  ]
};
