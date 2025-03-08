// src/components/pages/products/Products.jsx

import {
    Box,
    Button,
    Pagination,
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
  } from '@mui/material'
  import { BaseLayout } from '../../layouts'
  import { useCallback, useEffect, useState } from 'react'
  import { useDebounce } from 'use-debounce'
  import { NavLink } from 'react-router-dom'
  
  const limit = 10
  
  const Products = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [meta, setMeta] = useState({})
    const [skip, setSkip] = useState(0)
    const [search, setSearch] = useState('')
    const [keyword] = useDebounce(search, 1000)
  
    const columns = [
      {
        id: 'id',
        label: 'SKU',
        render(data) {
          return (
            <NavLink to={`/detail/${data.id}`}>
              <Button type="button" variant="text" size="small">
                {data.id}
              </Button>
            </NavLink>
          )
        }
      },
      {
        id: 'title',
        label: 'Title'
      },
      {
        id: 'brand',
        label: 'Brand'
      },
      {
        id: 'category',
        label: 'Category'
      },
      {
        id: 'price',
        label: 'Price'
      },
      {
        id: 'stock',
        label: 'Availability',
        render(data) {
          return data.stock > 0 ? 'In Stock' : 'Out of Stock'
        }
      }
    ]
  
    const fetchProducts = async (skipValue) => {
      try {
        setLoading(true)
        const result = await fetch(
          `https://dummyjson.com/products?limit=${limit}&skip=${skipValue}`,
          {
            method: 'get'
          }
        )
        const data = await result.json()
        setData(data.products)
        setMeta({ limit: data.limit, skip: data.skip, total: data.total })
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }
  
    const searchProduct = async (keywordValue) => {
      try {
        setLoading(true)
        const result = await fetch(
          `https://dummyjson.com/products/search?q=${keywordValue}`,
          {
            method: 'get'
          }
        )
        const data = await result.json()
        setData(data.products)
        setMeta({ limit: data.limit, skip: data.skip, total: data.total })
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }
  
    useEffect(() => {
      fetchProducts(skip)
    }, [skip])
  
    useEffect(() => {
      if (keyword) {
        searchProduct(keyword)
      } else {
        fetchProducts(skip)
      }
    }, [keyword, skip])
  
    const handlePagination = useCallback(
      (_, page) => {
        setSkip((page - 1) * limit)
      },
      []
    )
  
    const handleSearch = useCallback(
      (e) => {
        setSearch(e.target.value)
      },
      []
    )
  
    const renderTableBody = () => {
      if (loading) {
        return Array.from({ length: 10 }, (_, key) => (
          <TableRow key={key}>
            {columns.map((col) => (
              <TableCell key={col.id}>
                <Skeleton />
              </TableCell>
            ))}
          </TableRow>
        ))
      }
  
      if (!data || data.length === 0) {
        return (
          <TableRow>
            <TableCell colSpan={columns.length}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: 500,
                  flexDirection: 'column'
                }}
              >
                <Box>
                  Keyword{' '}
                  <Box component={'span'} fontWeight={'bold'} sx={{ mx: 0.1 }}>
                    {keyword}
                  </Box>{' '}
                  not available
                </Box>
                <Box>Try another keyword to get products</Box>
              </Box>
            </TableCell>
          </TableRow>
        )
      }
  
      return data.map((item) => (
        <TableRow key={item.id}>
          {columns.map((col) => (
            <TableCell key={col.id}>
              {col.render ? col.render(item) : item[col.id]}
            </TableCell>
          ))}
        </TableRow>
      ))
    }
  
    return (
      <BaseLayout title="Products">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            mb: 3
          }}
        >
          <TextField
            size="small"
            label="Search by title"
            sx={{ width: 300 }}
            onChange={handleSearch}
            value={search}
          />
        </Box>
        <TableContainer sx={{ width: '100%' }} component={Paper}>
          <Table aria-label="table-products">
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell key={col.id}>{col.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{renderTableBody()}</TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ py: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Pagination
            count={meta?.total ? Math.ceil(meta.total / limit) : 0}
            color="primary"
            onChange={handlePagination}
          />
        </Box>
      </BaseLayout>
    )
  }
  
  export default Products