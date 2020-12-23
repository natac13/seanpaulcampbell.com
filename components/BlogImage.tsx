import React from 'react'
import Image from 'next/image'
import Box from '@material-ui/core/Box'

interface Props {
  src: string
  alt: string
}

const BlogImage: React.FC<Props> = (props: Props) => {
  return (
    <Box
      component="div"
      sx={{
        gridColumn: '1 / -1',
        width: '80%',
        placeSelf: 'center center',
        textAlign: 'center',
        my: 2,
      }}
    >
      <Image
        src={props.src}
        width={1200}
        height={500}
        alt={props.alt}
        layout="intrinsic"
      />
    </Box>
  )
}

export default BlogImage
