import { Stack, Typography, Button } from "@mui/material"
import Link from "next/link"
import Image from "next/image";
export default function WinningScreen() {
  const handleClick = () => {
    window.location.reload();
  };
  return (
    <>
      <Stack alignItems={'center'} justifyContent={'center'} spacing={2}>
        <Typography variant="h4" sx={{textAlign: 'center'}}>Congratulations!</Typography>  
        <Typography sx={{textAlign: 'center', fontSize: 24}}>It seems like you know this topic pretty well</Typography>
        <Image width={230} height={244} alt="Cat thumbs up" src={'/icons/cat.png'}/>
        <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={'center'}>
          <Button onClick={handleClick} variant="contained">Review again</Button>
          <Link href={'/dashboard'}><Button variant="outlined">Back</Button></Link>
        </Stack>
      </Stack>
    </>
  )
}