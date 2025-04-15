import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (token) => {
    const decoded = jwtDecode(token);
    const userData = {
      username: decoded.username,
      userId: decoded.userId,
      token,
    };
    setUser(userData);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

   // Auto login khi app khởi động
   useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);

        // Kiểm tra token hết hạn chưa (nếu muốn chắc chắn hơn)
        if (decoded.exp * 1000 > Date.now()) {
          setUser({
            username: decoded.username,
            userId: decoded.userId,
            token,
          });
        } else {
          localStorage.removeItem('token');
        }
      } catch (err) {
        console.error('Lỗi giải mã token:', err);
        localStorage.removeItem('token');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
