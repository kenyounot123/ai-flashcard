import { Container, Typography, Button, Stack, Grid } from "@mui/material";
import Flashcard from "@/components/Flashcard";
import Link from "next/link";
import { readFlashcardSets } from "../actions";
export default async function Dashboard() {
  const allFlashCards =  await readFlashcardSets() 
  return (
    <Container sx={{mt:5, py:5, maxWidth:"xl"}} maxWidth={false}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography variant="h4"> Study Sets </Typography>
        <Link href={'/generate'}><Button variant="contained">Create study set</Button></Link>
      </Stack>
      <Grid mt={2} container spacing={2}>
        {allFlashCards.map((set) => (
          <Grid item xs={12} sm={8} md={4} key={set.id}>
            <Link href={`/dashboard/study_set/${set.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <Flashcard
                hover={true}
                title={set.name}
                date={set.date}
                content={set.description as string}
                rotate={`${Math.random() * 4 - 2}`}
                cardColor={`accent.accent${Math.floor(Math.random() * 4) + 1}`}
              />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}