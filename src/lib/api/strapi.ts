import axios from 'axios';
import qs from 'qs';
import {
  FAQ,
  FAQCategoryWithFAQs,
  FAQResponse,
  CarModelResponse,
  FilmBrandResponse,
} from '@/types/strapi';
import { FiltersType } from '@/app/works/page';

if (!process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL) {
  throw new Error(
    'Environment variable NEXT_PUBLIC_STRAPI_API_BASE_URL is not defined.'
  );
}

const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL;

// Create an axios instance with default config
const strapiClient = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generic function to fetch data from Strapi with pagination and filters
export async function fetchFromStrapi<T>(
  endpoint: string,
  params: Record<string, unknown> = {}
): Promise<{
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}> {
  try {
    const response = await strapiClient.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    throw error;
  }
}

// Function to fetch a single item by ID
export async function fetchSingleItem<T>(
  endpoint: string,
  id: string | number
): Promise<{ data: T }> {
  try {
    const response = await strapiClient.get(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching item with ID ${id}:`, error);
    throw error;
  }
}

// Specific function for fetching FAQ categories
export async function fetchFAQCategories() {
  return fetchFromStrapi<FAQCategoryWithFAQs>('faq-categories', {
    populate: '*',
  });
}

// Function to fetch questions by category ID
export async function fetchQuestionsByCategory(
  categoryId: number | string
): Promise<FAQResponse> {
  return fetchFromStrapi<FAQ>('faqs', {
    filters: {
      category: {
        id: {
          $eq: categoryId,
        },
      },
    },
    populate: '*',
  });
}

// Function to search questions
export async function searchQuestions(
  search: string,
  params: {
    pagination?: { page: number; pageSize: number };
  }
): Promise<FAQResponse> {
  const queryParams: Record<string, unknown> = {
    populate: '*',
  };

  // Add search if provided
  if (search) {
    queryParams['filters[question][$containsi]'] = search;
    queryParams['filters[answer][$containsi]'] = search;
  }

  // Add pagination if provided, otherwise set default values
  if (params.pagination) {
    queryParams['pagination[page]'] = params.pagination.page;
    queryParams['pagination[pageSize]'] = params.pagination.pageSize;
  }

  // Convert queryParams to a query string using qs
  const queryString = qs.stringify(queryParams, {
    encodeValuesOnly: true, // prettify URL
  });

  return fetchFromStrapi<FAQ>(`faqs?${queryString}`);
}

// Function to fetch car models
export async function fetchCarModels(
  filters?: FiltersType
): Promise<CarModelResponse> {
  try {
    let query = '';
    if (filters) {
      query = qs.stringify(
        {
          filters: {
            filmType:
              filters.filmType && filters.filmType !== 'all'
                ? { $eq: filters.filmType }
                : undefined,
            glossEffect: filters.glossEffect?.length
              ? { $in: filters.glossEffect }
              : undefined,
            filmBrand: filters.filmBrand?.length
              ? { $in: filters.filmBrand }
              : undefined,
            colorTone: filters.colorTone?.length
              ? { $in: filters.colorTone }
              : undefined,
            colorSeries: filters.colorSeries?.length
              ? { $in: filters.colorSeries }
              : undefined,
            carBrand: filters.carBrand?.length
              ? { $in: filters.carBrand }
              : undefined,
          },
        },
        { encodeValuesOnly: true }
      );
    }
    const response = await strapiClient.get<CarModelResponse>(
      `car-models${query ? `?${query}` : ''}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching car models:', error);
    throw error;
  }
}

// Function to fetch film brands
export async function fetchFilmBrands(): Promise<FilmBrandResponse> {
  try {
    const response = await strapiClient.get<FilmBrandResponse>('film-brands');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching film brands:', error);
    throw error;
  }
}
