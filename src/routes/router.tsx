import { Routes, Route, Navigate } from 'react-router-dom';
import AnalyticsWithLiveChat from 'src/pages/AnalyticsScreen';
import HomeScreen from 'src/pages/HomeScreen';
import LanguageTrainingScreen from 'src/pages/LanguageTrainingScreen';
import Login from 'src/pages/Login';
import Signup from 'src/pages/Signup';
// Import other authenticated components here (e.g., Profile)

function Router() {
  return (
    <Routes>
      <Route path="/language-training" element={<LanguageTrainingScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<HomeScreen />} />
      <Route path="/*" element={<Navigate to="/login" replace />} />
      <Route path="/symbol/:symbol" element={<HomeScreen />} />
      {/* Add other authenticated routes here */}
      <Route path="/chat-monitoring" element={<AnalyticsWithLiveChat />} />
    </Routes>
  );
}

export default Router;
