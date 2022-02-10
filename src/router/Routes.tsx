import { Route, Routes } from 'react-router-dom';
import MeetingLoby from '../pages/MeetingLoby';
import NotFound from '../pages/NotFound';
import VideoMeeting from '../pages/VideoMeeting';
import DefaultLayout from '../shared/layouts/DefaultLayout';

const Router: React.FC<any> = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<MeetingLoby />} />
        <Route path="meeting/:code" element={<VideoMeeting />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Router;
