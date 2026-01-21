'use client';

import { useRouter } from 'next/navigation';
import { useCreateProductMutation } from '@/store/services/productsApi';
import { ProductForm } from '@/components/forms/ProductForm';

export default function CreateProductPage() {
  const router = useRouter();
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const handleSubmit = async (formData: any) => {
    try {
      await createProduct(formData).unwrap();
      alert('Product created successfully!');
      router.push('/dashboard');
    } catch (error: any) {
      alert(error?.data?.message || 'Failed to create product');
    }
  };

  return (
    <ProductForm
      onSubmit={handleSubmit}
      isLoading={isLoading}
      title="Create New Product"
    />
  );
}