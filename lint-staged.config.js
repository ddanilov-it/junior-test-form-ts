module.exports = {
  'src/**/*.{js,jsx,ts,tsx}': [
    'npm run lint --workspace=@starter/frontend',
    () => 'npm run lint:types --workspace=@starter/frontend',
  ],
};
