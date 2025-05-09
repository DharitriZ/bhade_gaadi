import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRequest } from '../types';
import { mockUserRequests } from '../data/mockData';

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error';
}

interface AdminContextType {
  userRequests: UserRequest[];
  updateRequestStatus: (id: string, status: 'approved' | 'rejected' | 'pending', reason?: string) => void;
  loading: boolean;
  notifications: Notification[];
  addNotification: (message: string, type: 'success' | 'error') => void;
  removeNotification: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRequests, setUserRequests] = useState<UserRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise(res => setTimeout(res, 800));
        setUserRequests(mockUserRequests);
      } catch {
        addNotification('Failed to load user requests', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addNotification = (message: string, type: 'success' | 'error') => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeNotification(id), 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const updateRequestStatus = (id: string, status: 'approved' | 'rejected' | 'pending', reason?: string) => {
    setUserRequests(prev =>
      prev.map(req =>
        req.id === id
          ? { ...req, status, rejectionReason: status === 'rejected' ? reason : undefined }
          : req
      )
    );

    const request = userRequests.find(r => r.id === id);
    if (request) {
      const action = status === 'pending' ? 'reset to pending' : status;
      addNotification(`Request from ${request.username} ${action}`, 'success');
    }
  };

  return (
    <AdminContext.Provider value={{ userRequests, updateRequestStatus, loading, notifications, addNotification, removeNotification }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used inside an AdminProvider');
  }
  return context;
};
