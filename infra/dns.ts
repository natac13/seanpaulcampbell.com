import { isPermanentStage } from './stage'

export const domain =
  {
    production: 'seanpaulcampbell.com',
    dev: 'dev.seanpaulcampbell.com',
  }[$app.stage] || `${$app.stage}.seanpaulcampbell.com`

export const zone = aws.route53.Zone.get('Zone', 'Z08643431OQ6HBHUENMOY')
