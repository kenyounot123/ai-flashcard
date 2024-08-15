import { Stack, Typography, Button } from "@mui/material"
import Link from "next/link"
export default function WinningScreen() {
  const handleClick = () => {
    window.location.reload();
  };
  return (
    <>
      <Stack alignItems={'center'} justifyContent={'center'}>
        <Typography variant="h4" sx={{textAlign: 'center'}}>Congratulations!</Typography>  
        <Typography sx={{textAlign: 'center'}}>It seems like you know this topic pretty well</Typography>
        <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={'center'}>
          <Button onClick={handleClick} variant="contained">Review again</Button>
          <Link href={'/dashboard'}><Button variant="outlined">Back</Button></Link>
        </Stack>
      </Stack>
    </>
  )
}