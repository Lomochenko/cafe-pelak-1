/** @type {import('@liara/api').LiaraConfig} */
module.exports = {
  app: 'cafepelakyek',
  disk: {
    name: 'disk1',  // actual disk name
    mountPoint: '/app/disk1',  // Persistent location
  },
  build: {
    docker: {
      commands: [
        'RUN npm install --production=false',
        'RUN npm run build',
      ],
    },
  },
  env: {
    NODE_ENV: 'production',
    UPLOAD_PATH: '/app/disk1/uploads',  // For uploads
    DATABASE_URL: '/app/disk1/data.db', // database
  },
}