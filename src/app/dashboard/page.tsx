import { Container, Typography, Button, Stack, Grid } from "@mui/material";
import { currentUser } from "@clerk/nextjs/server";
import Flashcard from "@/components/Flashcard";
import Link from "next/link";

export default async function Dashboard() {
  const user = await currentUser()
  const studySets = [
    {
      "id": "1",
      "title": "Basic Algebra",
      "content": "Cover fundamental algebraic concepts including equations, inequalities, and polynomials.",
      "date": "2024-08-12",
    },
    {
      "id": "2",
      "title": "Introduction to Physics",
      "content": "Study basic principles of physics such as motion, force, and energy.",
      "date": "2024-08-13",
    },
    {
      "id": "3",
      "title": "World History Overview",
      "content": "Learn about major events and figures in world history from ancient to modern times.",
      "date": "2024-08-14",
    },
    {
      "id": "4",
      "title": "Introduction to Programming",
      "content": "Get started with programming concepts using Python. Topics include variables, control flow, and functions.",
      "date": "2024-08-15",
    },
  ]
      
  return (
    <Container sx={{mt:5, py:5, maxWidth:"xl"}} maxWidth={false}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography variant="h4"> Study Sets </Typography>
        <Link href={'/generate'}><Button variant="contained">Create study set</Button></Link>
      </Stack>
      <Grid mt={2} container spacing={2}>
        {studySets.map((set) => (
          <Grid item xs={12} sm={6} md={4} key={set.id}>
            <Flashcard
              title={set.title}
              date={set.date}
              content={set.content}
              rotate={`${Math.random() * 4 - 2}`}
              cardColor={`accent.accent${Math.floor(Math.random() * 4) + 1}`}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}