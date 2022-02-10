import React from 'react';
import { useNavigate } from 'react-router-dom';
import { generateRandomCode } from '../helpers/generate-random-code-helper';
import Button from '../shared/components/buttons/Button';

const MeetingLoby: React.FC = () => {
  let navigate = useNavigate();

  function createMeeting() {
    const code = generateRandomCode();
    navigate(`/meeting/${code}`);
  }

  return (
    <div className="my-24">
      <div className="w-72 mx-auto text-center">
        <Button onClick={createMeeting}>Create a meeting room</Button>
      </div>
    </div>
  );
};

export default MeetingLoby;
