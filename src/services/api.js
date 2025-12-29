import axios from "axios";
import {
  mockApplicants,
  mockDashboardStats,
  mockRecentActivity,
} from "../data/mockData";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth tokens
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Simulate API delay
const simulateDelay = (ms = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// API Service
export const apiService = {
  // Dashboard
  async getDashboardStats() {
    await simulateDelay();
    return {
      success: true,
      data: mockDashboardStats,
    };
  },

  async getRecentActivity() {
    await simulateDelay(300);
    return {
      success: true,
      data: mockRecentActivity,
    };
  },

  // Applicants
  async getApplicants(params = {}) {
    await simulateDelay();
    let filtered = [...mockApplicants];

    if (params.search) {
      const search = params.search.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.name.toLowerCase().includes(search) ||
          a.email.toLowerCase().includes(search)
      );
    }

    if (params.status && params.status !== "all") {
      filtered = filtered.filter(
        (a) => a.status === params.status
      );
    }

    return {
      success: true,
      data: {
        applicants: filtered,
        total: filtered.length,
      },
    };
  },

  async getApplicantById(id) {
    await simulateDelay();
    const applicant = mockApplicants.find(
      (a) => a.id === id
    );

    return {
      success: !!applicant,
      data: applicant || null,
      message: applicant ? undefined : "Applicant not found",
    };
  },

  async updateApplicantStatus(id, status) {
    await simulateDelay();
    const applicant = mockApplicants.find(
      (a) => a.id === id
    );

    if (applicant) {
      applicant.status = status;
      applicant.updatedAt = new Date().toISOString();
    }

    return {
      success: !!applicant,
      data: applicant || null,
    };
  },

  // Documents
  async getDocumentsByApplicant(applicantId) {
    await simulateDelay(300);
    const applicant = mockApplicants.find(
      (a) => a.id === applicantId
    );

    return {
      success: true,
      data: applicant?.documents || [],
    };
  },

  async updateDocumentStatus(documentId, status) {
    await simulateDelay();

    for (const applicant of mockApplicants) {
      const doc = applicant.documents.find(
        (d) => d.id === documentId
      );
      if (doc) {
        doc.status = status;
        return { success: true, data: doc };
      }
    }

    return {
      success: false,
      data: null,
      message: "Document not found",
    };
  },
};

export default apiClient;
