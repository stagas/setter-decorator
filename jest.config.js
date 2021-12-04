module.exports = {
  // preset: 'ts-jest',
  testEnvironment: 'node', // or 'jsdom'
  rootDir: 'src',
  testMatch: ['**/*.spec.{js,jsx,ts,tsx}'],
  coverageDirectory: '../coverage',
  transform: {
    '\\.(js|jsx|ts|tsx)$': [
      '@swc-node/jest',
      {
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
        react: {
          pragma: 'h',
          pragmaFrag: 'Fragment',
        },
      },
    ],
  },
}