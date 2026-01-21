'use client';

import { useRouter } from 'next/navigation';
import { useCreateProductMutation } from '@/store/services/productsApi';
import { ProductForm } from '@/components/forms/ProductForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CreateProductPage() {
  const router = useRouter();
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const handleSubmit = async (data: any) => {
    try {
      await createProduct(data).unwrap();
      alert('Product created successfully!');
      router.push('/dashboard');
    } catch (error: any) {
      alert(error?.data?.message || 'Failed to create product');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/dashboard" className="flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Create New Product</h1>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <ProductForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
