import { useNavigate } from 'common/utils/router-fill';
import { useEffect } from 'react';
import HomePage from './web/HomePage';

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (JSON.parse(window.localStorage.auth || '{}')?.user) {
      navigate('/feed');
    }
  }, [navigate]);
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default Home;
