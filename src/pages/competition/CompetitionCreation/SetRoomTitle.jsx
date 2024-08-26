import React from 'react';

import CustomInput from '../../../components/CustomInput';
import useCompetitionRoomStore from '../../../store/competition/index';

const SetRoomTitle = () => {
  const { title, setTitle } = useCompetitionRoomStore((state) => ({
    title: state.title,
    setTitle: state.setTitle,
  }));

  const handleTitleChange = (newTitle) => {
    setTitle(newTitle);
  };

  return (
    <CustomInput
      size="large"
      placeholder={'경쟁방 이름을 입력하세요.'}
      theme="primary"
      value={title}
      onChangeText={handleTitleChange}
    />
  );
};

export default SetRoomTitle;
