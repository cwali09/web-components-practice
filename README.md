Run 2 commands:

npm run build
npm start

If Video doesnt load, try to rename the one in the dist and then re-build (without clearwebpack extension in the webpack.config file). This will generate a second video with a hash, but your original renamed video will remain ('final.mp4') and you can rebuild however many times without losing it (unless clean webpack is enabled in the config)