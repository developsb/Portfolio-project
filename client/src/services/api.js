import axios from 'axios';

const API_BASE_URL = 'http://portfolio-backend-sambath.ap-southeast-1.elasticbeanstalk.com/api';

export const getProjects = async () => {
  const response = await axios.get(`${API_BASE_URL}/projects`);
  return response.data;
};

export const getProjectById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/projects/${id}`);
  return response.data;
};

export const createProject = async (projectData, adminKey) => {
  const response = await axios.post(`${API_BASE_URL}/projects`, projectData, {
    headers: { 'x-admin-key': adminKey },
  });
  return response.data;
};

export const updateProject = async (id, projectData, adminKey) => {
  const response = await axios.put(`${API_BASE_URL}/projects/${id}`, projectData, {
    headers: { 'x-admin-key': adminKey },
  });
  return response.data;
};

export const deleteProject = async (id, adminKey) => {
  const response = await axios.delete(`${API_BASE_URL}/projects/${id}`, {
    headers: { 'x-admin-key': adminKey },
  });
  return response.data;
};

export const sendMessage = async (messageData) => {
  const response = await axios.post(`${API_BASE_URL}/messages`, messageData);
  return response.data;
};

export const getMessages = async (adminKey) => {
  const response = await axios.get(`${API_BASE_URL}/messages`, {
    headers: { 'x-admin-key': adminKey },
  });
  return response.data;
};