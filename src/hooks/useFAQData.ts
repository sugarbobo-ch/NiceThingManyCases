// hooks/useFAQData.ts
import { useState, useEffect } from 'react';
import { fetchFAQCategories, fetchQuestionsByCategory, searchQuestions } from '@/lib/api/strapi';
import { FAQCategoryWithFAQs, StrapiPagination, FAQ } from '@/types/strapi';

// Hook for fetching FAQ categories
export function useFAQCategories(initialSearch = '') {
  const [categories, setCategories] = useState<FAQCategoryWithFAQs[]>([]);
  const [faqs, setFAQs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [search, setSearch] = useState(initialSearch);
  const [pagination, setPagination] = useState<StrapiPagination>({
    page: 1,
    pageSize: 25,
    pageCount: 1,
    total: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchFAQCategories();

        setCategories(response.data);
        setPagination(response.meta.pagination);
        setError(null);
      } catch (err) {
        setError(new Error('發生錯誤，請稍後再試'));
        console.error('Error fetching FAQ categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page on new search
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await searchQuestions(search, {
          pagination: { page: pagination.page, pageSize: pagination.pageSize }
        });

        setFAQs(response.data);
        setCategories([]);
        if (response.meta.pagination) {
          setPagination(response.meta.pagination);
        }
        setError(null);
      } catch (err) {
        setError(new Error('發生錯誤，請稍後再試'));
        console.error('Error fetching FAQs:', err);
      } finally {
        setLoading(false);
      }
    };

    if (search) {
      fetchData();
    }
  }, [search, pagination.page, pagination.pageSize]);

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const clearSearch = async () => {
    try {
      setLoading(true);
      setSearch('');
      const response = await fetchFAQCategories();

      setCategories(response.data);
      setFAQs([]);
      setPagination(response.meta.pagination);
      setError(null);
    } catch (err) {
      setError(new Error('發生錯誤，請稍後再試'));
      console.error('Error clearing search and fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    faqs,
    loading,
    error,
    search,
    pagination,
    handleSearch,
    handlePageChange,
    clearSearch,
  };
}

// Hook for fetching FAQs by category
export function useFAQsByCategory(categoryId: number | string | null) {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!categoryId) {
      setFaqs([]);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchQuestionsByCategory(categoryId);

        setFaqs(response.data);
        setError(null);
      } catch (err) {
        setError(new Error('發生錯誤，請稍後再試'));
        console.error('Error fetching FAQs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  return { faqs, loading, error };
}
