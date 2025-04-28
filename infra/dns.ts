export const domain =
  {
    production: 'seanpaulcampbell.com',
    dev: 'dev.seanpaulcampbell.com',
  }[$app.stage] || `${$app.stage}.seanpaulcampbell.com`
