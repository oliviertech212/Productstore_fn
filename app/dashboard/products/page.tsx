'use client';

import { useState } from 'react';
import { useGetProductsQuery, useDeleteProductMutation } from '@/store/services/productsApi';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import type { Product } from '@/types';

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');

  const { data, isLoading, refetch } = useGetProductsQuery({ page, limit, search });
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id).unwrap();
        refetch();
      } catch (error) {
        alert('Failed to delete product');
      }
    }
  };

  const columns: Column<Product>[] = [
    {
      key: 'thumbnail',
      label: 'Image',
      render: (product) => (
        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
          {product.thumbnail ? (
            <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
              No img
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'name',
      label: 'Product Name',
      sortable: true,
      render: (product) => (
        <div>
          <div className="font-medium">{product.name}</div>
          <div className="text-xs text-gray-500">{product.sku}</div>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
    },
    {
      key: 'price',
      label: 'Price',
      sortable: true,
      render: (product) => (
        <div>
          <div className="font-semibold">${product.price}</div>
          {product.compareAtPrice && (
            <div className="text-xs text-gray-400 line-through">
              ${product.compareAtPrice}
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'stock',
      label: 'Stock',
      sortable: true,
      render: (product) => (
        <span className={product.stock > 0 ? 'text-feli-green' : 'text-red-600'}>
          {product.stock}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (product) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            product.status === 'ACTIVE'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {product.status}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (product) => (
        <div className="flex gap-2">
          <Link href={`/dashboard/products/${product.id}/edit`}>
            <Button size="sm" variant="outline">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            size="sm"
            variant="outline"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => handleDelete(product.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600">Manage your product inventory</p>
          </div>
          <Link href="/dashboard/products/create">
            <Button className="bg-feli-green hover:bg-feli-dark-green">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <DataTable
          data={data?.data || []}
          columns={columns}
          pagination={{
            currentPage: page,
            totalPages: data?.pagination?.totalPages || 1,
            totalItems: data?.pagination?.total || 0,
            itemsPerPage: limit,
          }}
          loading={isLoading}
          onPageChange={setPage}
          onLimitChange={setLimit}
          onSearch={setSearch}
          searchPlaceholder="Search products..."
        />
      </div>
    </div>
  );
}