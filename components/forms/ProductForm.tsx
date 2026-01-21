'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import type { Product } from '@/types';

interface ProductFormProps {
  initialData?: Partial<Product>;
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
  title?: string;
}

export function ProductForm({ initialData, onSubmit, isLoading, title = 'Product Form' }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    shortDescription: initialData?.shortDescription || '',
    price: initialData?.price || 0,
    compareAtPrice: initialData?.compareAtPrice || 0,
    stock: initialData?.stock || 0,
    category: initialData?.category || '',
    tags: initialData?.tags?.join(', ') || '',
    images: initialData?.images?.join('\n') || '',
    thumbnail: initialData?.thumbnail || '',
    isFeatured: initialData?.isFeatured || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = {
      ...formData,
      price: Number(formData.price),
      compareAtPrice: formData.compareAtPrice ? Number(formData.compareAtPrice) : undefined,
      stock: Number(formData.stock),
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      images: formData.images.split('\n').map(i => i.trim()).filter(Boolean),
    };

    await onSubmit(submitData);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => window.history.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name" className="text-gray-700">Product Name *</Label>
              <Input
                id="name"
                required
                className="mt-1 focus:ring-feli-green focus:border-feli-green"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="iPhone 15 Pro"
              />
            </div>

            <div>
              <Label htmlFor="category" className="text-gray-700">Category</Label>
              <Input
                id="category"
                className="mt-1 focus:ring-feli-green focus:border-feli-green"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Electronics"
              />
            </div>

            <div>
              <Label htmlFor="price" className="text-gray-700">Price *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                required
                className="mt-1 focus:ring-feli-green focus:border-feli-green"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                placeholder="999.99"
              />
            </div>

            <div>
              <Label htmlFor="compareAtPrice" className="text-gray-700">Compare At Price</Label>
              <Input
                id="compareAtPrice"
                type="number"
                step="0.01"
                className="mt-1 focus:ring-feli-green focus:border-feli-green"
                value={formData.compareAtPrice}
                onChange={(e) => setFormData({ ...formData, compareAtPrice: Number(e.target.value) })}
                placeholder="1099.99"
              />
            </div>

            <div>
              <Label htmlFor="stock" className="text-gray-700">Stock *</Label>
              <Input
                id="stock"
                type="number"
                required
                className="mt-1 focus:ring-feli-green focus:border-feli-green"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                placeholder="50"
              />
            </div>

            <div>
              <Label htmlFor="tags" className="text-gray-700">Tags (comma separated)</Label>
              <Input
                id="tags"
                className="mt-1 focus:ring-feli-green focus:border-feli-green"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="smartphone, apple, featured"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="shortDescription" className="text-gray-700">Short Description</Label>
            <Input
              id="shortDescription"
              className="mt-1 focus:ring-feli-green focus:border-feli-green"
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              placeholder="Premium flagship smartphone"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-gray-700">Description *</Label>
            <textarea
              id="description"
              required
              rows={4}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-feli-green focus:border-feli-green"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed product description..."
            />
          </div>

          <div>
            <Label htmlFor="thumbnail" className="text-gray-700">Thumbnail Image URL</Label>
            <Input
              id="thumbnail"
              className="mt-1 focus:ring-feli-green focus:border-feli-green"
              value={formData.thumbnail}
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <Label htmlFor="images" className="text-gray-700">Product Images (one URL per line)</Label>
            <textarea
              id="images"
              rows={4}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-feli-green focus:border-feli-green"
              value={formData.images}
              onChange={(e) => setFormData({ ...formData, images: e.target.value })}
              placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isFeatured"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="w-4 h-4 text-feli-green focus:ring-feli-green border-gray-300 rounded"
            />
            <Label htmlFor="isFeatured" className="text-gray-700">Featured Product</Label>
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-feli-green hover:bg-feli-dark-green"
            >
              {isLoading ? 'Saving...' : 'Save Product'}
            </Button>
            <Button type="button" variant="outline" onClick={() => window.history.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
