import { LinearProgress, Typography } from '@material-ui/core'
import { PageProps } from 'gatsby'
import React from 'react'
import Layout from '../../components/Layout'

interface Props extends PageProps {}

const PhotograhpyIndex: React.FC<Props> = (props: Props) => {
  return (
    <Layout>
      <Typography variant="h2">Work in Progress</Typography>
      <LinearProgress value={66} variant="indeterminate" color="primary" />
    </Layout>
  )
}

export default PhotograhpyIndex
