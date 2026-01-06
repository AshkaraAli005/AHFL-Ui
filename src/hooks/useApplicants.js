import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { apiService } from "../services/api";
import { toast } from "./use-toast";


export const useApplicants = (params) => {
  return useQuery({
    queryKey: ['applicants', params],
    queryFn: () => apiService.getApplicants(params),
    staleTime: 30000,
  });
};

export const useApplicant = (id) => {
  return useQuery({
    queryKey: ['applicant', id],
    queryFn: () => apiService.getApplicantById(id),
    enabled: !!id,
  });
};

export const useUpdateApplicantStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) =>
      apiService.updateApplicantStatus(id, status),

    onSuccess: (response) => {
      if (response?.success) {
        queryClient.invalidateQueries({ queryKey: ['applicants'] });
        queryClient.invalidateQueries({ queryKey: ['applicant'] });
        queryClient.invalidateQueries({ queryKey: ['dashboard'] });

        toast({
          title: 'Status Updated',
          description: 'Applicant status has been updated successfully.',
        });
      }
    },

    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update applicant status.',
        variant: 'destructive',
      });
    },
  });
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: () => apiService.getDashboardStats(),
    staleTime: 60000,
  });
};

export const useRecentActivity = () => {
  return useQuery({
    queryKey: ['dashboard', 'activity'],
    queryFn: () => apiService.getRecentActivity(),
    staleTime: 30000,
  });
};

export const useDailyStats = (days = 7) => {
  return useQuery({
    queryKey: ['dashboard', 'dailyStats', days],
    queryFn: () => apiService.getDailyStats(days),
    staleTime: 60000,
  });
};
