import { useToast as useToastGL } from '@gluestack-ui/themed';
import { Toast as ToastGL } from '../../atom';
import { StyleProp, ViewStyle } from 'react-native';

interface ShowToastProps {
  variant: 'outline' | 'solid' | 'accent';
  action: 'error' | 'warning' | 'success' | 'info' | 'attention';
  title: string;
  text: string;
  style?: StyleProp<ViewStyle>;
}

export const useToast = () => {
  const toast = useToastGL();

  const showToast = ({ variant, action, title, text, style }: ShowToastProps) => {
    toast.show({
      duration: 2000,
      placement: 'top',
      render: () => {
        return (
          <ToastGL variant={variant} action={action} title={title} text={text} style={style} />
        );
      },
    });
  };

  return { showToast };
};
