import { isPermanentStage } from './stage'

const GH_ORG = 'natac13'
const GH_REPO = 'seanpaulcampbell.com'

// if (isPermanentStage) {
//   const github = new aws.iam.OpenIdConnectProvider('Github', {
//     url: 'https://token.actions.githubusercontent.com',
//     clientIdLists: ['sts.amazonaws.com'],
//     thumbprintLists: [
//       '6938fd4d98bab03faadb97b34396831e3780aea1',
//       '1c58a3a8518e8759bf075b76b750d4f2df264fcd',
//     ], // see https://github.blog/changelog/2023-06-27-github-actions-update-on-oidc-integration-with-aws/
//   })

//   const githubRole = new aws.iam.Role('GithubRole', {
//     name: [$app.name, $app.stage, 'github'].join('-'),
//     assumeRolePolicy: {
//       Version: '2012-10-17',
//       Statement: [
//         {
//           Effect: 'Allow',
//           Principal: {
//             Federated: github.arn,
//           },
//           Action: 'sts:AssumeRoleWithWebIdentity',
//           Condition: {
//             StringLike: github.url.apply((url) => ({
//               [`${url}:sub`]: `repo:${GH_ORG}/${GH_REPO}:*`,
//             })),
//           },
//         },
//       ],
//     },
//     maxSessionDuration: 3600,
//   })

//   new aws.iam.RolePolicyAttachment('GithubRolePolicy', {
//     policyArn: 'arn:aws:iam::aws:policy/AdministratorAccess',
//     role: githubRole.name,
//   })
// }
