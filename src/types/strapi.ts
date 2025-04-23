// Generic Strapi response format
export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination?: StrapiPagination;
  };
}

interface StrapiBaseModel {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

// Image format from Strapi
export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: StrapiImageFormat;
    small: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown | null;
}

export interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

// FAQ Category
export interface FAQCategory extends StrapiBaseModel {
  title: string;
  slug: string;
  description?: string;
  image?: StrapiImage;
}

export interface FAQCategoryWithFAQs extends FAQCategory {
  faqs: FAQ[];
}

export type FAQCategoryResponse = StrapiResponse<FAQCategoryWithFAQs>;

// FAQ
export interface FAQ extends StrapiBaseModel {
  question: string;
  slug: string;
  answer: string;
  category: FAQCategory;
}

export interface FAQWithCategory extends FAQ {
  category: FAQCategory;
}

export type FAQResponse = StrapiResponse<FAQ>;

// Work Model
export interface WorkModel extends StrapiBaseModel {
  name: string;
  slug: string;
  filmType: string | null;
  glossEffect: string | null;
  filmBrand: FilmBrand | null;
  brightness: string | null;
  colorCategories: ColorCategory[] | null;
  carModel: CarModel | null;
  thumbnail: StrapiImage;
  images: StrapiImage[];
}

export type WorkModelResponse = StrapiResponse<WorkModel>;

// Film Brand
export interface FilmBrand extends StrapiBaseModel {
  name: string;
  icon: StrapiImage[];
  works: WorkModel[];
}

export type FilmBrandResponse = StrapiResponse<FilmBrand>;

// Color Category
export interface ColorCategory extends StrapiBaseModel {
  name: string;
  hex: string;
  isDisplayColor: boolean;
  works: WorkModel[];
}

export type ColorCategoryResponse = StrapiResponse<ColorCategory>;

// Car Model
export interface CarModel extends StrapiBaseModel {
  name: string;
  works: WorkModel[];
}

export type CarModelResponse = StrapiResponse<CarModel>;
