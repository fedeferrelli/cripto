module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-once': 'spin 1s ease-in-out',
        'bounce-once': 'ping 1s',
      }
    },
  },
  plugins: [],
}
