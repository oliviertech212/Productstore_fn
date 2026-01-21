'use client';

import { useRouter } from 'next/navigation';
import { useGetProductByIdQuery, useUpdateProductMutation } from '@/store/services/productsApi';
import { ProductForm } from '@/components/forms/ProductForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data, isLoading: loadingProduct } = useGetProductByIdQuery(params.id);
  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();

  const handleSubmit = async (formData: any) => {
    try {
      await updateProduct({ id: params.id, data: formData }).unwrap();
      alert('Product updated successfully!');
      router.push('/dashboard');
    } catch (error: any) {
      alert(error?.data?.message || 'Failed to update product');
    }
  };

  if (loadingProduct) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Product not found</p>
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/dashboard" className="flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <ProductForm
            initialData={data.data}
            onSubmit={handleSubmit}
            isLoading={updating}
          />
        </div>
      </div>
    </div>
  );
}
