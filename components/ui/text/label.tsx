import * as React from 'react';
import { Text } from '@/components/ui/text';

interface Props {
  title: string;
  variant:
    | 'default'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'p'
    | 'blockquote'
    | 'code'
    | 'lead'
    | 'large'
    | 'small'
    | 'muted'
    | null
    | undefined;
}

const Label: React.FC<Props> = ({ title, variant }) => {
  return <Text variant={variant}>{title}</Text>;
};

export default Label;
