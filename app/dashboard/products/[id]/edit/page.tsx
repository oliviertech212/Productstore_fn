'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useGetProductByIdQuery, useUpdateProductMutation } from '@/store/services/productsApi';
import { ProductForm } from '@/components/forms/ProductForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { data, isLoading: loadingProduct } = useGetProductByIdQuery(id);
  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();

  const handleSubmit = async (formData: any) => {
    try {
      await updateProduct({ id, data: formData }).unwrap();
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-feli-green mx-auto"></div>
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
          <Link href="/dashboard" className="text-feli-green hover:text-feli-dark-green mt-4 inline-block">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ProductForm
      initialData={data.data}
      onSubmit={handleSubmit}
      isLoading={updating}
      title="Edit Product"
    />
  );
}
