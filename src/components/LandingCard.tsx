import Box from '@mui/material/Box';
import { Typography, Stack, Paper } from '@mui/material';
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
    <Stack sx={{rotate: `${rotate}deg`}} justifyContent={"center"} alignItems={"center"}>
      <Box sx={{width: "100%"}}>
        <Stack justifyContent={"center"} direction="row" alignItems={"center"}>
          {icon && <Image alt="Flash Prep AI" width={50} height={50} src={icon}/>}
          <Typography fontWeight={600} variant='h5'>{title}</Typography>
        </Stack>
      </Box>
      <Paper
        square
        elevation={3}
        sx={{
          minWidth: '308px',
          minHeight: '109.7px',
          maxWidth: '444.93px',
          maxHeight: '131px',
          backgroundColor: `${cardColor}`,   
          p:2, 
        }}
      >
        <Typography sx={{fontSize:20}} variant="body1">{content}</Typography>
      </Paper>
    </Stack>
  );
};

export default LandingCard;