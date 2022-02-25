export interface StrapiRootObject {
  data: StrapiProduct[];
  meta: Meta;
}

interface Meta {
  pagination: Pagination;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiProduct {
  id: number;
  attributes: StrapiProductAttributes;
}

export interface StrapiProductAttributes {
  title: string;
  shortDesc: string;
  longDesc: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  color: string;
  isFeatured: string;
  variations: ProductVariations[];
  images: ProductImages;
  category: Category;
}

interface Category {
  data: CategoryData;
}

interface CategoryData {
  id: number;
  attributes: CategoryAttributes;
}

interface CategoryAttributes {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Name: string;
}

interface ProductImages {
  data: ImageData[];
}

interface ImageData {
  id: number;
  attributes: ImageAttributes;
}

interface ImageAttributes {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: ImageFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: any;
  provider: string;
  provider_metadata?: any;
  createdAt: string;
  updatedAt: string;
}

interface ImageFormats {
  thumbnail: Thumbnail;
  large: Thumbnail;
  medium: Thumbnail;
  small: Thumbnail;
}

interface Thumbnail {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path?: any;
  url: string;
}

interface ProductVariations {
  id: number;
  size: string;
  quantity: number;
  price: number;
  discountPrice: number;
}
