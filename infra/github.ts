import { isPermanentStage } from './stage'

const GH_ORG = 'natac13'
const GH_REPO = 'seanpaulcampbell.com'

if (isPermanentStage) {
  const github = aws.iam.OpenIdConnectProvider.get(
    'Github',
    $interpolate`arn:aws:iam::${aws.getCallerIdentityOutput().accountId}:oidc-provider/token.actions.githubusercontent.com`,
  )

  const githubRole = new aws.iam.Role('GithubRole', {
    name: [$app.name, $app.stage, 'github'].join('-'),
    assumeRolePolicy: {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: {
            Federated: github.arn,
          },
          Action: 'sts:AssumeRoleWithWebIdentity',
          Condition: {
            StringLike: github.url.apply((url) => ({
              [`${url}:sub`]: `repo:${GH_ORG}/${GH_REPO}:*`,
            })),
          },
        },
      ],
    },
    maxSessionDuration: 3600,
  })

  new aws.iam.RolePolicyAttachment('GithubRolePolicy', {
    policyArn: 'arn:aws:iam::aws:policy/AdministratorAccess',
    role: githubRole.name,
  })
}
