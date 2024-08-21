import { Box } from '@/components/ui/box';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';

const EmailRegisterForm = () => {
  return (
    <Box>
      <Box className="flex flex-col gap-2">
        <Text className="text-white text-[20px] font-semibold">나라짱짱님의 이메일과 비밀번호를 알려주세요!</Text>
        <Text className="text-[#D9D9D9] text-[16px] font-semibold">이메일 로그인에 사용되어집니다.</Text>
      </Box>

      <Box className="flex gap-4 mt-10">
        <Input
          variant="underlined"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          className="border-b-[#4C4CE8] p-2"
        >
          <InputField
            placeholder="이메일을 입력해주세요"
            className="text-white placeholder:text-[#888888] font-medium text-[18px]"
          />
        </Input>
        <Input
          variant="underlined"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          className="border-b-[#4C4CE8] p-2"
        >
          <InputField
            type="password"
            placeholder="비밀번호를 입력해주세요"
            className="text-white placeholder:text-[#888888] font-medium text-[18px]"
          />
        </Input>
        <Input
          variant="underlined"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          className="border-b-[#4C4CE8] p-2"
        >
          <InputField
            type="password"
            placeholder="비밀번호 확인"
            className="text-white placeholder:text-[#888888] font-medium text-[18px]"
          />
        </Input>
      </Box>
    </Box>
  );
};

export default EmailRegisterForm;
