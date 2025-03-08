// src/components/pages/products/DetailProducts.jsx

import {
    Box,
    Button,
    CircularProgress,
    ImageList,
    ImageListItem,
    Paper
} from '@mui/material'
import { BaseLayout } from '../../layouts'
import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import Grid from '@mui/material/Grid2'

const DetailProducts = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState()

    const getDetail = async (id) => {
        try {
            setLoading(true)
            const result = await fetch(`https://dummyjson.com/products/${id}`, {
                method: 'get'
            })
            const data = await result.json()
            setData(data)
            setLoading(false)
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getDetail(id)
    }, [id])

    return (
        <BaseLayout title={data?.title ?? '...'}>
          <Paper
            sx={{
              p: 3
            }}
          >
            <Box>
              <NavLink to={'/'}>
                <Button type="button" variant="text">
                  Back
                </Button>
              </NavLink>
            </Box>
            {loading ? (
              <Box
                sx={{
                  display: 'flex',
                  minHeight: 300,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  gap: 3,
                  my: 3
                }}
              >
                <Box flex={1}>
                  <Box component={'h2'}>Image</Box>
                  <Box
                    sx={{
                      width: '100%'
                    }}
                  >
                    <ImageList
                      sx={{ width: '100%', height: 450 }}
                      cols={3}
                      rowHeight={164}
                    >
                      {data?.images?.map((img) => (
                        <ImageListItem key={img}>
                          <img
                            srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            src={`${img}?w=164&h=164&fit=crop&auto=format`}
                            alt={data?.title ? `${data.title}-img` : 'product-img'}
                            loading="lazy"
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Box>
                </Box>
                <Box flex={1}>
                  <Box component={'h2'}>Details</Box>
                  <Grid container spacing={2}>
                    <Grid xs={6}>
                      <Box component={'h3'}>Title</Box>
                      <Box>{data?.title}</Box>
                    </Grid>
                    <Grid xs={6}>
                      <Box component={'h3'}>Brand</Box>
                      <Box>{data?.brand}</Box>
                    </Grid>
                    <Grid xs={6}>
                      <Box component={'h3'}>Category</Box>
                      <Box>{data?.category}</Box>
                    </Grid>
                    <Grid xs={6}>
                      <Box component={'h3'}>Price</Box>
                      <Box>{data?.price}</Box>
                    </Grid>
                    <Grid xs={6}>
                      <Box component={'h3'}>Tags</Box>
                      <Box>{data?.tags?.join(', ')}</Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            )}
          </Paper>
        </BaseLayout>
    )
}

export default DetailProducts