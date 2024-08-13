import Box from '@mui/material/Box';
import { Typography, Stack } from '@mui/material';
import Image from 'next/image';

interface LandingCardProps {
  cardColor: string;         
  content: string;       
  title: string;        
  icon?: string;  
  rotate?: number;
}

const LandingCard = ({cardColor, content, title, icon, rotate}: LandingCardProps) => {
  return (
    <Stack sx={{rotate: `${rotate}deg`}}>
      <Stack direction="row">
        {icon && <Image alt="AI Flashcard" width={50} height={50} src={icon}/>}
        <Typography fontWeight={600} variant='h5'>{title}</Typography>
      </Stack>
      <Box
        sx={{
          minWidth: '308px',
          minHeight: '109.7px',
          maxWidth: '444.93px',
          maxHeight: '131px',
          backgroundColor: `${cardColor}`, 
          border: '1px solid black',  
          p:2  
        }}
      >
        <Typography variant="body1">{content}</Typography>
      </Box>
    </Stack>
  );
};

export default LandingCard;